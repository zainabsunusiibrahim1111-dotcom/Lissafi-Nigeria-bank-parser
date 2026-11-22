/**
 * Parse common transaction fields from notification text.
 *
 * Starter parser only. It is not a bank-certified integration and does not
 * authenticate messages or verify settlement. Validate outputs and add
 * tested bank-specific adapters before production use.
 */
const AMOUNT_PATTERNS = [
  /(?:NGN|N)\s?([\d,]+(?:\.\d{1,2})?)/i,
  /(?:debited|credited|received|paid|payment of)\s+(?:NGN|N)?\s?([\d,]+(?:\.\d{1,2})?)/i
];
const REFERENCE_PATTERNS = [
  /(?:ref(?:erence)?|session|transaction)\s*(?:no|number|id|:|#)?\s*[:#-]?\s*([A-Z0-9/-]{5,})/i
];
const BANK_NAMES = [
  "Access Bank", "GTBank", "Guaranty Trust Bank", "First Bank",
  "United Bank for Africa", "UBA", "Zenith Bank", "Fidelity Bank",
  "FCMB", "Stanbic IBTC", "Sterling Bank", "Wema Bank",
  "Kuda", "OPay", "Moniepoint", "PalmPay"
];
function findFirstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}
export function parseNairaAmount(text) {
  if (typeof text !== "string") throw new TypeError("text must be a string");
  const raw = findFirstMatch(text, AMOUNT_PATTERNS);
  if (!raw) return null;
  const amount = Number(raw.replaceAll(",", ""));
  return Number.isFinite(amount) ? amount : null;
}
export function parseReference(text) {
  if (typeof text !== "string") throw new TypeError("text must be a string");
  return findFirstMatch(text, REFERENCE_PATTERNS);
}
export function detectBankName(text) {
  if (typeof text !== "string") throw new TypeError("text must be a string");
  const lower = text.toLowerCase();
  return BANK_NAMES.find(name => lower.includes(name.toLowerCase())) ?? null;
}
export function parseTransactionNotification(text) {
  if (typeof text !== "string") throw new TypeError("text must be a string");
  const lower = text.toLowerCase();
  let direction = "unknown";
  if (/\b(credited|received|deposit)\b/.test(lower)) direction = "credit";
  if (/\b(debited|withdrawn|purchase|sent|transfer to)\b/.test(lower)) {
    direction = direction === "credit" ? "ambiguous" : "debit";
  }
  return {
    amountNaira: parseNairaAmount(text),
    direction,
    reference: parseReference(text),
    bank: detectBankName(text),
    rawText: text
  };
}
