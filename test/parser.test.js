import test from "node:test";
import assert from "node:assert/strict";
import {
  parseNairaAmount,
  parseReference,
  detectBankName,
  parseTransactionNotification
} from "../src/index.js";

test("parses a naira amount", () => {
  assert.equal(parseNairaAmount("You have been credited with NGN 25,500.00"), 25500);
});
test("returns null when amount is absent", () => {
  assert.equal(parseNairaAmount("Transaction successful"), null);
});
test("extracts a transaction reference", () => {
  assert.equal(parseReference("Transfer successful. Ref: ABCD123456"), "ABCD123456");
});
test("detects a supported bank name", () => {
  assert.equal(detectBankName("Alert from Zenith Bank"), "Zenith Bank");
});
test("returns a structured notification", () => {
  const result = parseTransactionNotification("GTBank: You have been credited NGN 2,000. Ref: TXN123456");
  assert.equal(result.amountNaira, 2000);
  assert.equal(result.direction, "credit");
  assert.equal(result.bank, "GTBank");
});
