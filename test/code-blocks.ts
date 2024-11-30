import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
                    content: "`",
                    language: null,
                    type: "code_block",
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
        expect.soft(parser.parse("``` ` ```")).to.deep.equal({
            content: [
                {
                    content: " ` ",
                    language: null,
                    type: "code_block",
                },
            ],
            type: "doc",
        });
    });
});
