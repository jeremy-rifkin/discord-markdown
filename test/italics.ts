import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
});
