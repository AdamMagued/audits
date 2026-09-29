---
"@a11y-pulse/focus-appearance-audit": minor
"@a11y-pulse/tab-orchestrator": minor
---

Fail focus indicators that have insufficient contrast against their background.

`@a11y-pulse/focus-appearance-audit` adds a `checkContrast` option (defaulting to false) to verify that detected focus indicators have at least 3:1 contrast against their effective background, treating sub-threshold indicators as no indicator.

`@a11y-pulse/tab-orchestrator` extends `StyleSnapshot` with `effectiveBackground` and `parentBackground` captured by inspecting the painted background behind the element across ancestors and shadow roots.
