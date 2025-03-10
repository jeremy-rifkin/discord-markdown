import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
                                content: "foo",
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
                                content: "foo",
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
                    content: "foo\n  -# foo",
                    type: "plain",
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
        expect.soft(parser.parse("** -# foo **")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: " -# foo ",
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
        expect.soft(parser.parse("-# `foo\nbar`")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "`foo",
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
                                content: "```foo",
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
        expect.soft(parser.parse("#   -# foo")).to.deep.equal({
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
                    level: 1,
                    type: "header",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse(">   -# bar")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "  -# bar",
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
});
