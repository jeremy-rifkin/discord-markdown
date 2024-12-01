import { describe, expect, it } from "vitest";

import { trim_trailing_newlines } from "../src/utils";

describe("Utilities tests", () => {
    it("should trim newlines properly", () => {
        expect.soft(trim_trailing_newlines("foo")).to.deep.equal("foo");
        expect.soft(trim_trailing_newlines("  foo  ")).to.deep.equal("  foo  ");
        expect.soft(trim_trailing_newlines("\nfoo\n")).to.deep.equal("\nfoo");
        expect.soft(trim_trailing_newlines("foo\n\n\n\n\n\n\n")).to.deep.equal("foo");
    });
});
