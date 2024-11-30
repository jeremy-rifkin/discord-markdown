import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
        // TODO: FIXME
        // expect.soft(parser.parse("******")).to.deep.equal({
        //     content: [
        //         {
        //             content: {
        //                 content: [
        //                     {
        //                         content: "**",
        //                         type: "plain",
        //                     },
        //                 ],
        //                 type: "doc",
        //             },
        //             type: "bold",
        //         },
        //     ],
        //     type: "doc",
        // });
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
});
