import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
                    content: "foo\n",
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
});
