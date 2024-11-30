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
        expect.soft(parser.parse("a\n\n\n\n\n\n\n\na")).to.deep.equal({
            content: [
                {
                    content: "a\n\n\n\n\n\n\n\na",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("   foo  ")).to.deep.equal({
            content: [
                {
                    content: "foo",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo  \n  \nbar\n")).to.deep.equal({
            content: [
                {
                    content: "foo\n\nbar",
                    type: "plain",
                },
            ],
            type: "doc",
        });
    });
});
