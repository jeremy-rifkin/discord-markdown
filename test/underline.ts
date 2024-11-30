import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
});
