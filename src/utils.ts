import { strict as assert } from "assert";

export function unwrap<T>(x: T): T & NonNullable<unknown> {
    assert(x !== null && x !== undefined);
    return x;
}

export function trim_trailing_newlines(str: string) {
    const end_of_trailing_newlines_index = str.split("").reverse().join("").search(/[^\n]/);
    if (end_of_trailing_newlines_index === -1) {
        return "";
    }
    return str.slice(0, str.length - end_of_trailing_newlines_index);
}
