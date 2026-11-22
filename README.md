# Lissafi Nigeria Bank Parser

A small, provider-neutral JavaScript starter library for extracting common transaction fields from **synthetic Nigerian bank notification text**.

This repository is an independent open-source developer utility. It is not the Lissafi commercial application and does not contain Lissafi's private reconciliation engine.

## Status

Early prototype (0.1.0). Bank notification formats differ and can change. The included patterns are illustrative and are not complete or bank-certified coverage.

## Features

- Extracts a naira amount from common text patterns.
- Detects basic credit/debit language.
- Extracts a possible transaction reference.
- Recognises a small list of bank and payment-provider names.
- Includes synthetic examples and automated tests.

## Requirements

- Node.js 20 or later.

## Install and test

```bash
npm test
```

Use locally:

```js
import { parseTransactionNotification } from "./src/index.js";

const result = parseTransactionNotification(
  "GTBank: You have been credited NGN 25,500.00. Ref: DEMO123456."
);

console.log(result);
```

## Example output

```json
{
  "amountNaira": 25500,
  "direction": "credit",
  "reference": "DEMO123456",
  "bank": "GTBank",
  "rawText": "GTBank: You have been credited NGN 25,500.00. Ref: DEMO123456."
}
```

## Important limitations

- This project does not connect to banks, email accounts, SMS gateways or payment networks.
- It does not verify whether a transaction actually occurred.
- A parsed notification is not proof of payment.
- Formats and field meanings must be validated against authorised, consented test data.
- Ambiguous, incomplete or conflicting messages should be reviewed rather than automatically accepted.
- Never publish real customer messages, account numbers, phone numbers, credentials or other personal data.

## Roadmap

- Add bank-specific parsers with synthetic fixtures and tests.
- Add locale-safe date parsing.
- Add confidence indicators and explicit ambiguity handling.
- Add duplicate-fingerprint helpers that do not claim to verify settlement.
- Publish a documented release process.

## Contributing

Issues and pull requests are welcome. Use synthetic data only. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE).
