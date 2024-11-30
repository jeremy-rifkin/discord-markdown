# Dismark <!-- omit in toc -->

[![ci](https://github.com/jeremy-rifkin/dismark/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-rifkin/dismark/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=jeremy-rifkin_discord-markdown&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=jeremy-rifkin_discord-markdown)

This is a discord-flavored markdown parser matching discord's desktop parsing bug for bug.

## Contents <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
- [AST Structure](#ast-structure)
- [Example](#example)
- [Parse Rules](#parse-rules)
  - [Example](#example-1)
- [Custom Rules](#custom-rules)
  - [Example](#example-2)

## Installation

```
npm i --save dismark
```

## Usage

```js
import { MarkdownParser } from "dismark";
const parser = new MarkdownParser();
console.log(JSON.stringify(parser.parse("Hello *World*"), null, 4));
// {
//     "type": "doc",
//     "content": [
//         {
//             "type": "plain",
//             "content": "Hello "
//         },
//         {
//             "type": "italics",
//             "content": {
//                 "type": "doc",
//                 "content": [
//                     {
//                         "type": "plain",
//                         "content": "World"
//                     }
//                 ]
//             }
//         }
//     ]
// }
```

## AST Structure

AST nodes take the following form:

```ts
export type document_fragment = {
  type: "doc";
  content: markdown_node[];
};

export type plain_text = {
  type: "plain";
  content: string;
};

export type italics = {
  type: "italics";
  content: markdown_node;
};

export type bold = {
  type: "bold";
  content: markdown_node;
};

export type underline = {
  type: "underline";
  content: markdown_node;
};

export type strikethrough = {
  type: "strikethrough";
  content: markdown_node;
};

export type spoiler = {
  type: "spoiler";
  content: markdown_node;
};

export type inline_code = {
  type: "inline_code";
  content: string;
};

export type code_block = {
  type: "code_block";
  language: string | null;
  content: string;
};

export type header = {
  type: "header";
  level: number;
  content: markdown_node;
};

export type subtext = {
  type: "subtext";
  content: markdown_node;
};

export type masked_link = {
  type: "masked_link";
  target: string;
  content: markdown_node;
};

export type list = {
  type: "list";
  start_number: number | null;
  items: markdown_node[];
};

export type blockquote = {
  type: "blockquote";
  content: markdown_node;
};

export type markdown_node =
  | document_fragment
  | plain_text
  | italics
  | bold
  | underline
  | strikethrough
  | spoiler
  | inline_code
  | code_block
  | header
  | subtext
  | masked_link
  | list
  | blockquote;
```

## Example

Here's a simple example for working with the generated AST: This function walks the AST and prints out the plain text
content, stripping all markdown formatting:

```ts
function extract_text(node: markdown_node): string {
  switch (node.type) {
    case "doc":
      return node.content.map(extract_text).join("");
    case "plain":
    case "inline_code":
    case "code_block":
      return node.content;
    case "italics":
    case "bold":
    case "underline":
    case "strikethrough":
    case "spoiler":
    case "masked_link":
      return extract_text(node.content);
    case "header":
    case "blockquote":
    case "subtext":
      return extract_text(node.content) + "\n";
    case "list":
      return node.items.map(extract_text).join("");
    default:
      throw new Error(`Unhandled markdown ast node type ${(node as any).type}`);
  }
}

function strip_formatting(ast: markdown_node) {
  return extract_text(ast);
}

const parser = new MarkdownParser();
const ast = parser.parse(`# foo
**bar** baz
- bar`);
console.log(strip_formatting(ast));
// prints:
// foo
// bar baz
// bar
```

## Parse Rules

The `MarkdownParser` class can be constructed with a list of parse rules to use. The default rules, available through
`MarkdownParser.default_rules` are the following:

1. `EscapeRule`
2. `BoldRule`
3. `UnderlineRule`
4. `ItalicsRule`
5. `StrikethroughRule`
6. `SpoilerRule`
7. `CodeBlockRule`
8. `InlineCodeRule`
9. `BlockquoteRule`
10. `SubtextRule`
11. `HeaderRule`
12. `LinkRule`
13. `ListRule`
14. `TextRule`

### Example

As an example, to construct a parser that only parses bold text, you can construct the parser with

```ts
const parser = new MarkdownParser([new BoldRule()]);
```

## Custom Rules

The `Rule` base class is defined as:

```ts
export type match_result = RegExpMatchArray;
export type parser_state = {
  at_start_of_line: boolean;
  in_quote: boolean;
};
export abstract class Rule {
  // attempt to match a rule at the start of the substring `remaining`
  abstract match(remaining: string, parser: MarkdownParser, state: parser_state): match_result | null;
  // given a `match_result`, parse a markdown node
  abstract parse(match: match_result, parser: MarkdownParser, state: parser_state, remaining: string): parse_result;
  // attempt to coalesce to sequential markdown nodes (e.g. to merge sequential plain text nodes into a single node)
  coalesce?(a: markdown_node, b: markdown_node): markdown_node | null;
}
```

### Example

Below is an example rule to add support for `$$math$$` syntax:

```ts
const MATH_RE = /^\$\$(.+?)\$\$/s;
type math = {
  type: "math";
  content: string;
};

class MathRule extends Rule {
  override match(remaining: string): match_result | null {
    return remaining.match(MATH_RE);
  }

  override parse(match: match_result, parser: MarkdownParser, state: parser_state): parse_result {
    return {
      node: {
        type: "math",
        content: match[1],
      } as markdown_node | math as markdown_node, // unfortunately for now this hack is needed in typescript
      fragment_end: match[0].length,
    };
  }
}

const custom_parser = new MarkdownParser([
  new EscapeRule(),
  new BoldRule(),
  new UnderlineRule(),
  new ItalicsRule(),
  new StrikethroughRule(),
  new SpoilerRule(),
  new MathRule(), // <-- added here
  new CodeBlockRule(),
  new InlineCodeRule(),
  new BlockquoteRule(),
  new SubtextRule(),
  new HeaderRule(),
  new LinkRule(),
  new ListRule(),
  new TextRule(),
]);

const math_ast = custom_parser.parse("foo $$a^n + b^n = c^n$$ bar") as markdown_node | math;

console.log(math_ast);
// {
//     type: "doc",
//     content: [
//         { type: "plain", content: "foo " },
//         { type: "math", content: "a^n + b^n = c^n" },
//         { type: "plain", content: " bar" }
//     ]
// }
```
