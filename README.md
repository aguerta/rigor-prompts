# RIGOR — Research Audit Prompts

This is the open prompt library behind **RIGOR**, an AI research audit for the
social sciences. It stress-tests a paper the way a referee at a strong journal
would: it checks whether the claims are true, consistent, identified, and
supported, and it says plainly what it cannot verify.

The prompts are open so you can run an audit yourself, on your own Claude or
ChatGPT, for free. You paste the checklist for what you want reviewed together
with your paper, and the model audits it. You get the raw result in the chat.

## How to run one yourself

1. Pick the prompt for what you want checked (see the list below).
2. Open Claude or ChatGPT and paste the prompt, then attach or paste your paper.
3. Read the result. For a math-heavy paper, use the mathematics prompt; for an
   empirical one, econometrics or causal identification; for positioning, the
   literature and contribution prompt. `00_MASTER_ROUTER.md` explains how the
   pieces fit together.

That gives you the audit logic. What it does not give you is the orchestration
or the finished document.

## What the hosted version adds

The prompts alone are one pass in a chat window. The hosted product at
**rigor.qhawarina.pe** runs the same checks as a full pipeline and returns a
compiled PDF report:

- **Multiple rounds and self-verification.** It reads the paper several times,
  each searching for failure a different way, then verifies its own findings
  before showing them, and reports how far it got.
- **Coverage that follows the paper.** Proofs get the mathematics checks,
  regressions get the econometric ones, a bibliography gets the literature
  check, whether or not you asked.
- **A submission-readiness verdict, a findings ledger, and an implementation
  plan** for each finding, in a formatted report.
- **A run limit you set.** Specialized audits from $5 and general audits from
  $10 on your own Anthropic or OpenAI key, or a RIGOR-run audit with no API
  key at all. The audit spends only what it uses, never the limit.
- **A private companion.** Your paper goes only to the AI provider that runs
  the audit -- under your own account when you bring a key, under RIGOR's
  when you buy a RIGOR-run audit. The working copy lives on the server only
  for the length of the run and is deleted when the audit ends.

## What is here

Core protocols, numbered in the order they run (`00`–`27`): the master router,
the iterative convergence protocol, general and detailed review, mathematics,
statistics, econometrics, causal identification, identification and estimand,
inference, measurement, theory against evidence, empirical and theoretical
development, structure and prose, literature and contribution, reproducibility,
robustness, submission readiness, journal targeting, and the LaTeX report
standard.

`prompts/specialized/` holds method-specific checklists, one per design: RCTs,
difference in differences, regression discontinuity, instrumental variables,
selection on observables, synthetic control, panel fixed effects, time series,
structural models, partial identification, causal machine learning, game theory,
mechanism design, dynamic macro, and matching and market design, most with both
a consistency and a literature variant.

## A note on where these come from

These started from one researcher's own experience, the checks worth running on
a paper before sending it out, written down as method-specific lists and
extended against the standards that journals like AER, Econometrica and JPE hold
papers to. Those journals do not publish their referee reports, so nothing here
is built from a private archive of real reviews. It is the questions a careful
referee actually asks, set down so they get asked every time.

## License

See `LICENSE`.
