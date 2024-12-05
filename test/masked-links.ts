import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
    it("should handle masked links", () => {
        expect.soft(parser.parse("[foo](https://google.com)")).to.deep.equal({
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
                    target: "https://google.com",
                    type: "masked_link",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo](https://google.com/foo?bar=bar)")).to.deep.equal({
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
                    target: "https://google.com/foo?bar=bar",
                    type: "masked_link",
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
        expect.soft(parser.parse("[  **foo**baz  ](  https://google.com  )")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "  ",
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
                                type: "bold",
                            },
                            {
                                content: "baz  ",
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
        expect.soft(parser.parse("[foo](\nhttps://google.com\n)")).to.deep.equal({
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
                    target: "https://google.com",
                    type: "masked_link",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo](<https://google.com>)")).to.deep.equal({
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
                    target: "https://google.com",
                    type: "masked_link",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo](<https://google.com)")).to.deep.equal({
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
                    target: "https://google.com",
                    type: "masked_link",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo](https://google.com>)")).to.deep.equal({
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
                    target: "https://google.com",
                    type: "masked_link",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[[foo]](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "[foo]",
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
        expect.soft(parser.parse("foo [ foo ](bar)")).to.deep.equal({
            content: [
                {
                    content: "foo [ foo ](bar)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo]()")).to.deep.equal({
            content: [
                {
                    content: "[foo]()",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo](https://google . com)")).to.deep.equal({
            content: [
                {
                    content: "[foo](https://google . com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[google.com](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "google.com",
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
        expect.soft(parser.parse("[https://google.com](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[https://google.com](https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[https://](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "https://",
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
        expect.soft(parser.parse("[https://google](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[https://google](https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo\\](https://google.com/\\)")).to.deep.equal({
            content: [
                {
                    content: "[foo](https://google.com/)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        // weirdly this is allowed
        expect.soft(parser.parse("[[](https://google)](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "[](https://google)",
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
        expect.soft(parser.parse("[[  ]( https://google )](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "[  ]( https://google )",
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
        // expect.soft(parser.parse("[foo[]foo[](https://google.com)](https://google.com)")).to.deep.equal(0);
        expect.soft(parser.parse("[foo[]foo[foo](https://google.com)](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[foo[]foo[foo](https://google.com)](https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo[]fo**o[foo](https://google.com)](https://google.com)bar**")).to.deep.equal({
            content: [
                {
                    content: "[foo[]fo**o[foo](https://google.com)](https://google.com)bar**",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo[]fo**o**[foo](https://google.com)](https://google.com)bar")).to.deep.equal({
            content: [
                {
                    content: "[foo[]fo**o**[foo](https://google.com)](https://google.com)bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        // TODO: FIXME this comes down to the \](?=[^\[]*\]) part of the simple-markdown link regex
        // expect.soft(parser.parse("[foo(foo](https://google.com/))](https://google.com/)")).to.deep.equal(0);
        // TODO: link: ](baz
        // [foo[bar]]][](baz](https://google.com/)
        // link: ]baz
        // []baz](https://google.com/)
        expect.soft(parser.parse("[]baz](https://google.com/)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "]baz",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    target: "https://google.com/",
                    type: "masked_link",
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
                                content: "foo\\]bar",
                                type: "plain",
                            },
                        ],
                        type: "doc",
                    },
                    target: "https://google.com/)bar",
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
                    target: "https://google.com/bar",
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
        expect.soft(parser.parse("[foo[foo](https://google.com)](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[foo[foo](https://google.com)](https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo\n# bar\n-# bar\n> bar\n- bar\nbaz](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "foo\n# bar\n-# bar\n> bar\n- bar\nbaz",
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
        expect.soft(parser.parse("[```foo```](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[```foo```](https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[```bar``` **bar**](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[```bar``` **bar**](https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[foo\n```\nbar\n```\nbaz](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: "[foo\n```\nbar\n```\nbaz](https://google.com)",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("[bar```**foo**](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "bar```",
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
        expect.soft(parser.parse("[`bar`](https://google.com)")).to.deep.equal({
            content: [
                {
                    content: {
                        content: [
                            {
                                content: "bar",
                                type: "inline_code",
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
    });
});
