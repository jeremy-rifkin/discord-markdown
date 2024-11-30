import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
    it("should handle plain text", () => {
        expect.soft(parser.parse("foo bar")).to.deep.equal({
            content: [
                {
                    content: "foo bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle bold", () => {
        expect.soft(parser.parse("foo **bar**")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo **bar** baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ** bar ** baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: " bar ",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle underline", () => {
        expect.soft(parser.parse("foo __bar__")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "underline",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo __bar__ baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "underline",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo __ bar __ baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: " bar ",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "underline",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle strikethrough", () => {
        expect.soft(parser.parse("foo ~~bar~~")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "strikethrough",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ~~bar~~ baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "strikethrough",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ~~ bar ~~ baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: " bar ",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "strikethrough",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle spoiler", () => {
        expect.soft(parser.parse("foo ||bar||")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "spoiler",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ||bar|| baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "spoiler",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo || bar || baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: " bar ",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "spoiler",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle italics", () => {
        expect.soft(parser.parse("foo *bar*")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*bar\\*")).to.deep.equal({
            content: [
                {
                    content: "*bar*",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo _bar_")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo *bar* baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo *bar* baz *boz*")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
                {
                    content: " baz ",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "boz",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo * bar * baz")).to.deep.equal({
            content: [
                {
                    content: "foo * bar * baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle escapes", () => {
        expect.soft(parser.parse("foo \\*bar\\*")).to.deep.equal({
            content: [
                {
                    content: "foo *bar*",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo \\**bar\\**")).to.deep.equal({
            content: [
                {
                    content: "foo *",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar*",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
    });
    it("should handle newlines", () => {
        expect.soft(parser.parse("foo\nbar")).to.deep.equal({
            content: [
                {
                    content: "foo\nbar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo\\\nbar")).to.deep.equal({
            content: [
                {
                    content: "foo\\\nbar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("**foo\nbar**")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\nbar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
    });
    it("should handle combined text formatters", () => {
        expect.soft(parser.parse("***foo***")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "italics",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("***__foo__***")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: {
                                                content: [
                                                    {
                                                        content: "foo",
                                                        type: "plain",
                                                    },
                                                ],
                                                type: "doc",
                                            },
                                            type: "underline",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "italics",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
    });
    it("should handle text formatting edge cases", () => {
        expect.soft(parser.parse("**foo***")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo*",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("**foo*")).to.deep.equal({
            content: [
                {
                    content: "*",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("**foo__bar**baz__")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo__bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
                {
                    content: "baz__",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("** **")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: " ",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("**")).to.deep.equal({
            content: [
                {
                    content: "**",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("***")).to.deep.equal({
            content: [
                {
                    content: "***",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("****")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "**",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*****")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "*",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        // TODO: Double check
        expect.soft(parser.parse("******")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "**",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        // TODO: Double check
        expect.soft(parser.parse("*******")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "***",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("||")).to.deep.equal({
            content: [
                {
                    content: "||",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("|||")).to.deep.equal({
            content: [
                {
                    content: "|||",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("||||")).to.deep.equal({
            content: [
                {
                    content: "||||",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("||||||")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "|",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "spoiler",
                },
                {
                    content: "|",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("~~~~")).to.deep.equal({
            content: [
                {
                    content: "~~~~",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("~~~~~")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "~",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "strikethrough",
                },
            ],
            type: "doc",
        });
    });
    it("should handle inline_code", () => {
        expect.soft(parser.parse("foo `bar` baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo `bar` baz `biz`")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz ",
                    type: "plain",
                },
                {
                    content: "biz",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`` baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`` baz ``biz``")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz ",
                    type: "plain",
                },
                {
                    content: "biz",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo `bar\nbaz` boz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar\nbaz",
                    type: "inline_code",
                },
                {
                    content: " boz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`baz`` boz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar`baz",
                    type: "inline_code",
                },
                {
                    content: " boz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`baz`` boz ``bar`baz``")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar`baz",
                    type: "inline_code",
                },
                {
                    content: " boz ",
                    type: "plain",
                },
                {
                    content: "bar`baz",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
    });
    it("should handle code blocks", () => {
        expect.soft(parser.parse("```foo```")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    language: null,
                    type: "code_block",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("``` foo ```")).to.deep.equal({
            content: [
                {
                    content: " foo ",
                    language: null,
                    type: "code_block",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("```foo bar```")).to.deep.equal({
            content: [
                {
                    content: "foo bar",
                    language: null,
                    type: "code_block",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("```cpp\nfoo```")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    language: "cpp",
                    type: "code_block",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("```cpp\nfoo\n```")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    language: "cpp",
                    type: "code_block",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("```cpp foo\nbar```")).to.deep.equal({
            content: [
                {
                    content: "cpp foo\nbar",
                    language: null,
                    type: "code_block",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo```cpp\nbar```")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    type: "plain",
                },
                {
                    content: "bar",
                    language: "cpp",
                    type: "code_block",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo```cpp\nbar```bar")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    type: "plain",
                },
                {
                    content: "bar",
                    language: "cpp",
                    type: "code_block",
                },
                {
                    content: "bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo```cpp\nbar``` bar")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    type: "plain",
                },
                {
                    content: "bar",
                    language: "cpp",
                    type: "code_block",
                },
                {
                    content: " bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo```cpp\nbar```\nbar")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    type: "plain",
                },
                {
                    content: "bar",
                    language: "cpp",
                    type: "code_block",
                },
                {
                    content: "\nbar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("```cpp\n```")).to.deep.equal({
            content: [
                {
                    content: "cpp",
                    language: null,
                    type: "code_block",
                },
            ],
            type: "doc",
        });
    });
    it("should handle formatters running into code blocks", () => {
        expect.soft(parser.parse("*foo```bar*baz```")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo```bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
                {
                    content: "baz```",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo```bar*baz```biz*")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    type: "plain",
                },
                {
                    content: "bar*baz",
                    language: null,
                    type: "code_block",
                },
                {
                    content: "biz*",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle code block edge cases", () => {
        expect.soft(parser.parse("`")).to.deep.equal({
            content: [
                {
                    content: "`",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("``")).to.deep.equal({
            content: [
                {
                    content: "``",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("```")).to.deep.equal({
            content: [
                {
                    content: "```",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("````")).to.deep.equal({
            content: [
                {
                    content: "````",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("`````")).to.deep.equal({
            content: [
                {
                    content: "`````",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("``````")).to.deep.equal({
            content: [
                {
                    content: "``````",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("```````")).to.deep.equal({
            content: [
                {
                    content: "```````",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("``` ``")).to.deep.equal({
            content: [
                {
                    content: "` ",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("``` ```")).to.deep.equal({
            content: [
                {
                    content: " ",
                    language: null,
                    type: "code_block",
                },
            ],
            type: "doc",
        });
    });
    it("should handle blockquotes", () => {
        expect.soft(parser.parse("> foo bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("> foo\nbar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
                {
                    content: "bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("> foo\n> bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo > bar")).to.deep.equal({
            content: [
                {
                    content: "foo > bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse(">foo")).to.deep.equal({
            content: [
                {
                    content: ">foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse(">  foo")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: " foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo\n  > foo")).to.deep.equal({
            content: [
                {
                    content: "foo\n  ", // TODO: Reconsider
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo\n> bar")).to.deep.equal({
            content: [
                {
                    content: "foo\n",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("> > foo")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "> foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
            ],
            type: "doc",
        });
    });
    it("should handle mixing blockquotes and other crap", () => {
        expect.soft(parser.parse("*> foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "blockquote",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("** > foo **")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo ",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "blockquote",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("> `foo\nbar`")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "`foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
                {
                    content: "bar`",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("> ```foo\nbar```")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "```foo\n", // TODO: Get rid of the trailing \n here
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "blockquote",
                },
                {
                    content: "bar```",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*test\n>foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n>foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*test\n> foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n",
                                type: "plain",
                            },
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "blockquote",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("`test\n> foo`")).to.deep.equal({
            content: [
                {
                    content: "test\n> foo",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("**test\n> foo**bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n",
                                type: "plain",
                            },
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "blockquote",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
                {
                    content: "bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle subtext", () => {
        expect.soft(parser.parse("-# foo bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-# foo\nbar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
                {
                    content: "bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-# foo\n-# bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo -# bar")).to.deep.equal({
            content: [
                {
                    content: "foo -# bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-#foo")).to.deep.equal({
            content: [
                {
                    content: "-#foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-#  foo")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo\n  -# foo")).to.deep.equal({
            content: [
                {
                    content: "foo\n  ", // TODO: Reconsider
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo\n-# bar")).to.deep.equal({
            content: [
                {
                    content: "foo\n",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-#")).to.deep.equal({
            content: [
                {
                    content: "-#",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-# -# foo")).to.deep.equal({
            content: [
                {
                    content: "-# -# foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-#  -# foo")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "subtext",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
            ],
            type: "doc",
        });
    });
    it("should handle mixing subtext and other crap", () => {
        expect.soft(parser.parse("*-# foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "subtext",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        // TODO: FIXME
        // expect.soft(parser.parse("** -# foo **")).to.deep.equal({
        //     content: [
        //         {
        //             content: {
        //                 content: [
        //                     {
        //                         content: " -# foo ",
        //                         type: "plain",
        //                     },
        //                 ],
        //                 type: "doc",
        //             },
        //             type: "bold",
        //
        //         },
        //     ],
        //     type: "doc",
        // });
        expect.soft(parser.parse("-# `foo\nbar`")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "`foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
                {
                    content: "bar`",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-# ```foo\nbar```")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "```foo\n", // TODO: Get rid of the trailing \n here
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "subtext",
                },
                {
                    content: "bar```",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*test\n-#foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n-#foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*test\n-# foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n",
                                type: "plain",
                            },
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "subtext",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("`test\n-# foo`")).to.deep.equal({
            content: [
                {
                    content: "test\n-# foo",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("**test\n-# foo**bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n",
                                type: "plain",
                            },
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "subtext",
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
                {
                    content: "bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle headers", () => {
        expect.soft(parser.parse("# foo bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("## foo bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 2,
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("### foo bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 3,
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("#### foo bar")).to.deep.equal({
            content: [
                {
                    content: "#### foo bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("# foo\nbar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
                {
                    content: "bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("# foo\n# bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo # bar")).to.deep.equal({
            content: [
                {
                    content: "foo # bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("#foo")).to.deep.equal({
            content: [
                {
                    content: "#foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("#  foo")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo\n  # foo")).to.deep.equal({
            content: [
                {
                    content: "foo\n  ", // TODO: Reconsider
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo\n# bar")).to.deep.equal({
            content: [
                {
                    content: "foo\n",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("#")).to.deep.equal({
            content: [
                {
                    content: "#",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("# # foo")).to.deep.equal({
            content: [
                {
                    content: "# # foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("#  # foo")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "header",
                                level: 1,
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
            ],
            type: "doc",
        });
    });
    it("should handle mixing headers and other crap", () => {
        expect.soft(parser.parse("*# foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "header",
                                level: 1,
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        // TODO: FIXME
        // expect.soft(parser.parse("** # foo **")).to.deep.equal({
        //     content: [
        //         {
        //             content: {
        //                 content: [
        //                     {
        //                         content: " # foo ",
        //                         type: "plain",
        //                     },
        //                 ],
        //                 type: "doc",
        //             },
        //             type: "bold",
        //
        //         },
        //     ],
        //     type: "doc",
        // });
        expect.soft(parser.parse("# `foo\nbar`")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "`foo\n",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
                {
                    content: "bar`",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("# ```foo\nbar```")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "```foo\n", // TODO: Get rid of the trailing \n here
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "header",
                    level: 1,
                },
                {
                    content: "bar```",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*test\n#foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n#foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("*test\n# foo*")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n",
                                type: "plain",
                            },
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "header",
                                level: 1,
                            },
                        ],
                        type: "doc",
                    },
                    type: "italics",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("`test\n# foo`")).to.deep.equal({
            content: [
                {
                    content: "test\n# foo",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("**test\n# foo**bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "test\n",
                                type: "plain",
                            },
                            {
                                content: {
                                    content: [
                                        {
                                            content: "foo",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "header",
                                level: 1,
                            },
                        ],
                        type: "doc",
                    },
                    type: "bold",
                },
                {
                    content: "bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
    it("should handle headers", () => {
        expect.soft(parser.parse("foo [ asfd ](asdf)")).to.deep.equal({
            content: [
                {
                    content: "foo [ asfd ](asdf)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("bar[foo](https://google.com)barz")).to.deep.equal({
            content: [
                {
                    content: "bar",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    target: "https://google.com",
                    type: "masked_link",
                },
                {
                    content: "barz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("bar[foo\\]bar](https://google.com/\\)bar)barz")).to.deep.equal({
            content: [
                {
                    content: "bar",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: "foo]bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    target: "https://google.com/\\)bar",
                    type: "masked_link",
                },
                {
                    content: "barz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("bar[ foobar ]( https://google.com/bar )barz")).to.deep.equal({
            content: [
                {
                    content: "bar",
                    type: "plain",
                },
                {
                    content: {
                        content: [
                            {
                                content: " foobar ",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    target: " https://google.com/bar ",
                    type: "masked_link",
                },
                {
                    content: "barz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("bar[foobar](ftp://google.com/bar)barz")).to.deep.equal({
            content: [
                {
                    content: "bar[foobar](ftp://google.com/bar)barz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo**bar**](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo",
                                type: "plain",
                            },
                            {
                                content: {
                                    content: [
                                        {
                                            content: "bar",
                                            type: "plain",
                                        },
                                    ],
                                    type: "doc",
                                },
                                type: "bold",
                            },
                        ],
                        type: "doc",
                    },
                    target: "https://google.com",
                    type: "masked_link",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo](https://\ngoogle.com)")).to.deep.equal({
            content: [
                {
                    content: "[foo](https://\ngoogle.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo\nbar](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\nbar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    target: "https://google.com",
                    type: "masked_link",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo] (https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[foo] (https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        // TODO
        // expect.soft(parser.parse("[foo[foo](https://google.com)](https://google.com)")).to.deep.equal(0);
    });
    it("should handle lists", () => {
        expect.soft(parser.parse("- foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("-foo")).to.deep.equal({
            content: [
                {
                    content: "-foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo - bar")).to.deep.equal({
            content: [
                {
                    content: "foo - bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("1. foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: 1,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("2. foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: 2,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("1. 2. 3. foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    items: [
                                        {
                                            content: [
                                                {
                                                    items: [
                                                        {
                                                            content: [
                                                                {
                                                                    content: "foo",
                                                                    type: "plain",
                                                                },
                                                            ],
                                                            type: "doc",
                                                        },
                                                    ],
                                                    start_number: 3,
                                                    type: "list",
                                                },
                                            ],
                                            type: "doc",
                                        },
                                    ],
                                    start_number: 2,
                                    type: "list",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: 1,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n- bar")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\n",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                        {
                            content: [
                                {
                                    content: "bar",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n1. bar")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\n",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                        {
                            content: [
                                {
                                    content: "bar",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("   -   foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo",
                                    type: "plain",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- - - - foo")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    items: [
                                        {
                                            content: [
                                                {
                                                    items: [
                                                        {
                                                            content: [
                                                                {
                                                                    items: [
                                                                        {
                                                                            content: [
                                                                                {
                                                                                    content: "foo",
                                                                                    type: "plain",
                                                                                },
                                                                            ],
                                                                            type: "doc",
                                                                        },
                                                                    ],
                                                                    start_number: null,
                                                                    type: "list",
                                                                },
                                                            ],
                                                            type: "doc",
                                                        },
                                                    ],
                                                    start_number: null,
                                                    type: "list",
                                                },
                                            ],
                                            type: "doc",
                                        },
                                    ],
                                    start_number: null,
                                    type: "list",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("- foo\n  - bar")).to.deep.equal({
            content: [
                {
                    items: [
                        {
                            content: [
                                {
                                    content: "foo\n  ", // TODO: Spaces here...
                                    type: "plain",
                                },
                                {
                                    items: [
                                        {
                                            content: [
                                                {
                                                    content: "bar",
                                                    type: "plain",
                                                },
                                            ],
                                            type: "doc",
                                        },
                                    ],
                                    start_number: null,
                                    type: "list",
                                },
                            ],
                            type: "doc",
                        },
                    ],
                    start_number: null,
                    type: "list",
                },
            ],
            type: "doc",
        });
    });
});

// ```test```> foo
// `test
// `> foo

// __foo
// # bar__ baz
