import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
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
});
