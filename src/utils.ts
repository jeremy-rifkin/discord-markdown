import { strict as assert } from "assert";

export function unwrap<T>(x: T): T & NonNullable<unknown> {
    assert(x !== null && x !== undefined);
    return x;
}
