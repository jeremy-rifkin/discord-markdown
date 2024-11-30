import { describe, expect, it } from "vitest";

import { MarkdownParser } from "../src/markdown";

describe("Markdown tests", () => {
    const parser = new MarkdownParser();
    it("should handle inline_code", () => {
        expect.soft(parser.parse("foo `bar` baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo `bar` baz `biz`")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz ",
                    type: "plain",
                },
                {
                    content: "biz",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`` baz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`` baz ``biz``")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar",
                    type: "inline_code",
                },
                {
                    content: " baz ",
                    type: "plain",
                },
                {
                    content: "biz",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo `bar\nbaz` boz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar\nbaz",
                    type: "inline_code",
                },
                {
                    content: " boz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`baz`` boz")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar`baz",
                    type: "inline_code",
                },
                {
                    content: " boz",
                    type: "plain",
                },
            ],
            type: "doc",
        });
        expect.soft(parser.parse("foo ``bar`baz`` boz ``bar`baz``")).to.deep.equal({
            content: [
                {
                    content: "foo ",
                    type: "plain",
                },
                {
                    content: "bar`baz",
                    type: "inline_code",
                },
                {
                    content: " boz ",
                    type: "plain",
                },
                {
                    content: "bar`baz",
                    type: "inline_code",
                },
            ],
            type: "doc",
        });
    });
});
