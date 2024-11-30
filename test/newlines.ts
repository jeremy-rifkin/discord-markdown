import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
});
