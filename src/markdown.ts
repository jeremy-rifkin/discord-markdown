import { strict as assert } from "assert";
import { document_fragment, list, markdown_node, plain_text } from "./markdown-nodes";
import { trim_trailing_newlines, unwrap } from "./utils";

// References:
// https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline
// Some regexes used here are based on discord/SimpleAST, which is Copyright [2018] [Discord] under the apache v2
// license
// eslint-disable-next-line max-len
// https://github.com/discord/SimpleAST/blob/master/simpleast-core/src/main/java/com/discord/simpleast/core/simple/SimpleMarkdownRules.kt
// https://github.com/Khan/perseus/blob/main/packages/simple-markdown/src/index.ts

// Rules:
// Italics: * or _
// Bold: **
// Underline: __
// Strikethrough: ~~
// Spoiler: ||
// Inline code: `text` or ``text``
// Header: # / ## / ### followed by a space and not immediately followed by a #, e.g. # # foo doesn't match
// Subtext: -# followed by a space and not immediately followed by -#, e.g. -# -# foo doesn't match
// Masked links [markdown](link), escapes are observed in the link
// Lists: - or * for an unordered bullet, 1. etc for a numbered bullet, two spaces for subsequent bullet indentation
// Code blocks:
// Blockquotes: > followed by a space at the start of the line, block quotes don't nest but you can put block quotes in
// other elements like list items or headers

// Discord markdown doesn't differentiate inline elements and block elements, for something like the following italics
// are matched before the code block:
//   *foo
//   ```
//   bar*
//   ```
// As another example, in the following the underlining applies to everything including the code block contents
//   __foo
//   ```bar```
//   baz__

// Some other edge cases:
// "# # foo" isn't a header, it only matches as text
// "# > # foo" matches both #'s but "# > # > # > foo" doesn't match beyond the starting "# > #"
// blockquotes appear to be one of the only things that can't nest, so # > # > foo doesn't nest but anything else can,
// e.g. this is valid up to 11 levels of list items:
//  - -# - -# - -# - -# - -# - -# - -# - -# - -# - -# - -# - -# - -# - -# - -# - -# foo
// and this is valid arbitrarily:
// eslint-disable-next-line max-len
// -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # -# # foo
// Masked links disallow "https://" in the masked text
// [foo[foo](https://google.com)](https://google.com) is rendered as plain text
// [foo[foo](google.com)](https://google.com) renders as the masked link "foo[foo](google.com)"
// ````foo```` renders as a code block with the content "`foo" and then a ` at the end of the code block
// foo * a * bar doesn't do italics (foo * a *bar doesn't either, foo *a * bar does)
// foo ** a ** bar does do bold, similar with all other formatters
// **foo__**bar__ renders as a bold "foo__" then "bar__"; **foo*** renders as a bold "foo*"
// The following:
//   **foo
//   > bar** baz
// renders as bold "foo", blockquote bold "bar", then "baz" on a new line, similarly for other block elements
// *** renders as "***", **** renders as an italic "**", ***** renders as a bold "*"
// - > - foo renders as a list item with a block quote and then a nested bullet
// # - > - ``` foo ``` is a thing that works
// *> foo* parses as an italicized blockquote
// This matches as a list item with a blockquote then foo on a different line outside the list/quote
//   - >>> foo
//   foo
// Headers and blockquotes allow leading spaces at the start of a line, subtext does not

// TODO: <br/> handling for "  \n"?

export type parse_result = { node: markdown_node; fragment_end: number };
export type match_result = string[];

export type parser_state = {
    at_start_of_line: boolean;
    in_quote: boolean;
    in_link: boolean;
};

export abstract class Rule {
    // attempt to match a rule at the start of the substring `remaining`
    abstract match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null;
    // given a `match_result`, parse a markdown node
    abstract parse(match: match_result, parser: MarkdownParser, state: parser_state, remaining: string): parse_result;
    // attempt to coalesce to sequential markdown nodes (e.g. to merge sequential plain text nodes into a single node)
    coalesce?(a: markdown_node, b: markdown_node): markdown_node | null;
}

const ESCAPE_RE = /^\\([^0-9A-Za-z\s])/;
export class EscapeRule extends Rule {
    override match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null {
        const match = remaining.match(ESCAPE_RE);
        return (match && match[1] !== "]") || !state.in_link ? match : null;
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        state.at_start_of_line = false;
        return {
            node: {
                type: "plain",
                content: match[1],
            },
            fragment_end: match[0].length,
        };
    }
}

const BOLD_RE = /^\*\*(.+?)\*\*(?!\*)/s;
export class BoldRule extends Rule {
    override match(remaining: string): match_result | null {
        return remaining.match(BOLD_RE);
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        return {
            node: {
                type: "bold",
                content: parser.parse_internal(match[1], state),
            },
            fragment_end: match[0].length,
        };
    }
}

const UNDERLINE_RE = /^__(.+?)__(?!_)/s;
export class UnderlineRule extends Rule {
    override match(remaining: string): match_result | null {
        return remaining.match(UNDERLINE_RE);
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        return {
            node: {
                type: "underline",
                content: parser.parse_internal(match[1], state),
            },
            fragment_end: match[0].length,
        };
    }
}

const ITALICS_RE = new RegExp(
    // only match _s surrounding words.
    "^\\b_" +
        "((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_" +
        "\\b" +
        "|" +
        // Or match *s that are followed by a non-space:
        "^\\*(?=\\S)(" +
        // Match any of:
        //  - `**`: so that bolds inside italics don't close the italics
        //  - `\*`: so that escaped *'s aren't considered
        //  - whitespace
        //  - non-whitespace, non-* characters
        "(?:\\\\\\*|\\*\\*|\\s+(?:[^*\\s]|\\\\\\*|\\*\\*)|[^\\s*])+?" +
        // followed by a non-space, non-* then *
        ")(?<!\\\\)\\*(?!\\*)",
);
export class ItalicsRule extends Rule {
    override match(remaining: string): match_result | null {
        return remaining.match(ITALICS_RE);
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        return {
            node: {
                type: "italics",
                content: parser.parse_internal((match[1] as string | undefined) ?? match[2], state),
            },
            fragment_end: match[0].length,
        };
    }
}

const STRIKETHROUGH_RE = /^~~(.+?)~~/s;
export class StrikethroughRule extends Rule {
    override match(remaining: string): match_result | null {
        return remaining.match(STRIKETHROUGH_RE);
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        return {
            node: {
                type: "strikethrough",
                content: parser.parse_internal(match[1], state),
            },
            fragment_end: match[0].length,
        };
    }
}

const SPOILER_RE = /^\|\|(.+?)\|\|/s;
export class SpoilerRule extends Rule {
    override match(remaining: string): match_result | null {
        return remaining.match(SPOILER_RE);
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        return {
            node: {
                type: "spoiler",
                content: parser.parse_internal(match[1], state),
            },
            fragment_end: match[0].length,
        };
    }
}

const CODE_BLOCK_RE = /^```(.+?)```/s;
const CODE_BLOCK_ANYWHERE_RE = /```(.+?)```/s;
export class CodeBlockRule extends Rule {
    override match(remaining: string): match_result | null {
        // original regex: /^```(?:([\w+\-.]+?)?(\s*\n))?([^\n].*?)\n*```/s
        // parsing this more manually due to redos concern
        const match = remaining.match(CODE_BLOCK_RE);
        return match && /[^\n]/.test(match[1]) ? match : null;
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        const content = trim_trailing_newlines(match[1]);
        const language_re = /^([\w+\-.]+?)(?:\s*\n)(.*)$/s;
        const language_match = content.match(language_re);
        let language: string | null = null;
        let code;
        if (language_match) {
            language = language_match[1];
            code = language_match[2];
        } else {
            code = content;
        }
        return {
            node: {
                type: "code_block",
                language,
                content: code,
            },
            fragment_end: match[0].length,
        };
    }
}

const INLINE_CODE_RE = /^(``?)(.*?)\1/s;
export class InlineCodeRule extends Rule {
    override match(remaining: string): match_result | null {
        const match = remaining.match(INLINE_CODE_RE);
        if (match && /[^`]/.test(match[2])) {
            return match;
        } else {
            return null;
        }
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        return {
            node: {
                type: "inline_code",
                content: match[2],
            },
            fragment_end: match[0].length,
        };
    }
}

const BLOCKQUOTE_RE = /^(?: *>>> (.+)| *>(?!>>) ([^\n]+\n?))/s;
export class BlockquoteRule extends Rule {
    override match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null {
        return state.at_start_of_line && !state.in_link && !state.in_quote ? remaining.match(BLOCKQUOTE_RE) : null;
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        state.in_quote = true;
        const node: parse_result = {
            node: {
                type: "blockquote",
                content: parser.parse_internal(((match[1] as string | undefined) || match[2]).trimEnd(), state),
            },
            fragment_end: match[0].length,
        };
        state.in_quote = false;
        state.at_start_of_line = true;
        return node;
    }
}

const SUBTEXT_RE = /^-# (?!-#) *([^\n]+\n?)/;
export class SubtextRule extends Rule {
    override match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null {
        return state.at_start_of_line && !state.in_link ? remaining.match(SUBTEXT_RE) : null;
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        const node: parse_result = {
            node: {
                type: "subtext",
                content: parser.parse_internal(match[1].trim(), state),
            },
            fragment_end: match[0].length,
        };
        state.at_start_of_line = true;
        return node;
    }
}

const HEADER_RE = /^ *(#{1,3}) (?!#) *([^\n]+\n?)/;
export class HeaderRule extends Rule {
    override match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null {
        return state.at_start_of_line && !state.in_link ? remaining.match(HEADER_RE) : null;
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        const node: parse_result = {
            node: {
                type: "header",
                level: match[1].length,
                content: parser.parse_internal(match[2].trim(), state),
            },
            fragment_end: match[0].length,
        };
        state.at_start_of_line = true;
        return node;
    }
}

// const URL_REGEX = /https?:\/\/[^\s<]+[^<.,:;"')\]\s]/;
const URL_REGEX_FULL_MATCH = /^https?:\/\/[^\s<]+[^<.,:;"')\]\s]$/;
const URL_DISCORD_WEIRDNESS_REGEX = /(?<!\[\s*\]\s*\(\s*)https?:\/\/[^\s<]+[^<.,:;"')\]\s](?!\s\))/;
export class LinkRule extends Rule {
    override match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null {
        // simple-markdown uses the following regex for matching the content of a masked link:
        // /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/s
        // https://github.com/Khan/perseus/blob/main/packages/simple-markdown/src/index.ts
        // This is attempting to handle some balanced braces but it ends up being theoretically vulnerable to ReDoS due
        // to catastrophic backtracking
        // To simplify things and avoid such concerns, it just makes sense to match the [] part with a loop
        let i = 0;
        if (remaining[i] !== "[" || state.in_link) {
            return null;
        }
        let depth = 1;
        while (i++ < remaining.length) {
            if (remaining[i] === "[") {
                depth++;
            } else if (remaining[i] === "]") {
                if (depth > 0) {
                    depth--;
                }
                if (depth === 0) {
                    // try to match the ending
                    const href_re = /^\(\s*<?((?:\([^)]*\)|[^\s\\]|\\.)*?)>?\s*\)/s;
                    const href_match = remaining.substring(i + 1).match(href_re);
                    if (href_match && href_match[1].match(URL_REGEX_FULL_MATCH)) {
                        return [
                            remaining.substring(0, i + href_match[0].length + 1),
                            remaining.substring(1, i),
                            href_match[1],
                        ];
                    }
                }
            }
        }
        return null;
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        if (match[1].match(URL_DISCORD_WEIRDNESS_REGEX) || match[1].match(CODE_BLOCK_ANYWHERE_RE)) {
            return {
                node: make_plain_node(match[0]),
                fragment_end: match[0].length,
            };
        }
        state.in_link = true;
        const node: parse_result = {
            node: {
                type: "masked_link",
                target: match[2],
                content: parser.parse_internal(match[1], state),
            },
            fragment_end: match[0].length,
        };
        state.in_link = false;
        return node;
    }
}

const LIST_RE = /^( *)([+*-]|(\d+)\.) +([^\n]+(?:\n\1 {2}[^\n]+)*\n?)/;
export class ListRule extends Rule {
    override match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null {
        return state.at_start_of_line && !state.in_link ? remaining.match(LIST_RE) : null;
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state, remaining: string): parse_result {
        const list_node: list = {
            type: "list",
            start_number: (match[3] as string | null) ? parseInt(match[3]) : null,
            items: [parser.parse_internal(match[4], state)],
        };
        let fragment_end = match[0].length;
        let next_match;
        while ((next_match = this.match(remaining.substring(fragment_end), parser, state))) {
            list_node.items.push(parser.parse_internal(next_match[4], state));
            fragment_end += next_match[0].length;
        }
        return {
            node: list_node,
            fragment_end,
        };
    }
}

export function make_plain_node(match: string): plain_text {
    return {
        type: "plain",
        content: match
            .split(/(?<=\n)/)
            .map(line => (line.endsWith("\n") ? line.trimEnd() + "\n" : line))
            .join(""),
    };
}

const TEXT_RE = /^.+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n|$)\n?/s;
export class TextRule extends Rule {
    override match(remaining: string): match_result | null {
        return remaining.match(TEXT_RE);
    }

    override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
        parser.update_state(match[0], state);
        return {
            node: make_plain_node(match[0]),
            fragment_end: match[0].length,
        };
    }

    override coalesce(a: markdown_node, b: markdown_node): markdown_node | null {
        if (a.type !== "plain" || b.type !== "plain") {
            return null;
        }
        return {
            type: "plain",
            content: a.content + b.content,
        };
    }
}

export class MarkdownParser {
    static readonly default_rules = [
        new EscapeRule(),
        new BoldRule(),
        new UnderlineRule(),
        new ItalicsRule(),
        new StrikethroughRule(),
        new SpoilerRule(),
        new CodeBlockRule(),
        new InlineCodeRule(),
        new BlockquoteRule(),
        new SubtextRule(),
        new HeaderRule(),
        new LinkRule(),
        new ListRule(),
        new TextRule(),
    ];

    constructor(readonly rules = MarkdownParser.default_rules) {}

    public parse(input: string) {
        const state: parser_state = {
            at_start_of_line: true,
            in_quote: false,
            in_link: false,
        };
        return this.parse_internal(input.trim(), state);
    }

    public parse_internal(input: string, state: parser_state): document_fragment {
        let cursor = 0;
        const parts: markdown_node[] = [];
        while (cursor < input.length) {
            const { node, fragment_end } = this.try_match_rules(input.substring(cursor), state);
            parts.push(node);
            this.try_coalesce_new_parts(parts);
            cursor += fragment_end;
        }
        return {
            type: "doc",
            content: parts,
        };
    }

    public update_state(slice: string, state: parser_state) {
        if (slice.length === 0) {
            return;
        }
        state.at_start_of_line = slice.endsWith("\n");
    }

    private try_match_rules(remaining: string, state: parser_state): parse_result {
        for (const rule of this.rules) {
            const match = rule.match(remaining, this, state);
            if (match) {
                return rule.parse(match, this, state, remaining);
            }
        }
        throw new Error(`No match when parsing ${remaining}`);
    }

    private try_coalesce_new_parts(parts: markdown_node[]) {
        if (parts.length < 2) {
            return;
        }
        for (const rule of this.rules) {
            if (rule.coalesce) {
                const coalesced = rule.coalesce(unwrap(parts.at(-2)), unwrap(parts.at(-1)));
                if (coalesced) {
                    parts.splice(parts.length - 2, 2, coalesced);
                }
            }
        }
    }
}
