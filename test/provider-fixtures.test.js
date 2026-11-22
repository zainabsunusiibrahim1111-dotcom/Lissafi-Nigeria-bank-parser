import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseTransactionNotification } from "../src/index.js";

const fixtures = JSON.parse(
  readFileSync(new URL("../examples/provider-fixtures.json", import.meta.url), "utf8")
);

for (const fixture of fixtures) {
  test(`parses the synthetic ${fixture.provider} fixture`, () => {
    const actual = parseTransactionNotification(fixture.text);
    assert.equal(actual.amountNaira, fixture.expected.amountNaira);
    assert.equal(actual.direction, fixture.expected.direction);
    assert.equal(actual.bank, fixture.expected.bank);
    assert.equal(actual.reference, fixture.expected.reference);
  });
}
