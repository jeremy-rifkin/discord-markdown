import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
});
