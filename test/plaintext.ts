import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
    it("should handle plain text", () => {
        expect.soft(parser.parse("foo bar")).to.deep.equal({
            content: [
                {
                    content: "foo bar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("\n\n\n\n\n\n\n\n")).to.deep.equal({
            content: [
                {
                    content: "\n\n\n\n\n\n\n\n",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
});
