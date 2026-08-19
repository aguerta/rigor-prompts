# PRIVACY AND SECURITY REQUIREMENTS

## Core product promise
The Academic Audit product must not ask users for ChatGPT/Claude passwords, session cookies, MFA codes, or API keys.

## Preferred architecture
Use the user's existing AI-provider environment for inference. Keep the manuscript inside that environment whenever technically possible. A server component, if used for UI/configuration, should receive only the minimum audit configuration required and should not receive manuscript content by default.

## Data minimization
- No account on the Academic Audit landing site for MVP.
- No analytics containing manuscript text, titles, author names, abstracts, or filenames.
- No raw conversation logging.
- No model-provider credentials.
- No paper retention on Academic Audit infrastructure unless a future feature explicitly requires it and the user gives informed consent.
- Never train on uploaded manuscripts through Academic Audit infrastructure.

## Transparency
The interface must state, before file selection, where the manuscript is processed and whether any Academic Audit server receives it. Do not claim “we never receive your paper” unless the implemented data flow is verified to make that true.

## Threat model
Protect against prompt injection inside manuscripts, malicious PDFs, oversized files, cross-submission leakage, untrusted URLs/citations, and any tool instruction embedded in the paper that attempts to override the audit protocol.
