# 27_IMPLEMENTATION_READY_CHANGESET.md

# RIGOR — IMPLEMENTATION-READY CHANGE SET AND IMPACT-SWEEP PROTOCOL

## 0. Purpose

This protocol converts RIGOR findings into a repair specification that an author, Codex, Claude Code, research assistant, or other implementation agent can execute without having to rediscover predictable downstream consequences.

It addresses a specific failure mode:

> An audit identifies issue X, the implementer fixes the most obvious occurrence, and later audits discover stale definitions, dependent lemmas, old estimates, outdated prose, tables, appendices, or conclusions that were predictable consequences of the same root cause.

RIGOR must minimize these **change-set misses**.

This protocol is mandatory for every actionable FATAL, MAJOR, MODERATE, and MINOR finding before the final report is delivered.

---

## 1. Fundamental distinction

\[
\text{Issue completeness} \neq \text{Implementation completeness}
\]

An audit can correctly diagnose a root cause and still provide an incomplete repair.

A finding is not implementation-ready merely because it contains:
- a location;
- a suggested fix;
- a severity;
- a rationale.

It becomes implementation-ready only after RIGOR maps the **change surface** created by the remedy.

---

## 2. New finding lifecycle

Use the existing audit status (OPEN / REOPENED / PROVISIONALLY_CLOSED / CLOSED) together with a separate implementation state:

1. **DIAGNOSED**  
   Root problem identified.

2. **IMPACT_MAPPED**  
   Direct and reasonably detectable downstream consequences have been searched.

3. **IMPLEMENTATION_READY**  
   Canonical fix, dependencies, affected locations, invariants, regeneration rules, and acceptance tests are specified.

4. **IMPLEMENTED_UNVERIFIED**  
   Author/agent reports the changes were made, but RIGOR has not verified the revised manuscript.

5. **VERIFIED_ON_REVISION**  
   Local, downstream, and regression checks pass.

A final report may describe an actionable remedy as definitive only if its implementation state is at least **IMPLEMENTATION_READY**.

---

## 3. Root-cause first

For every finding, identify:

- root cause;
- visible symptom(s);
- dependent claims;
- dependent definitions/notation;
- dependent equations/proofs;
- dependent estimates/statistics;
- dependent tables/figures;
- dependent interpretation.

Do not create multiple independent patches for symptoms if a single upstream correction governs them.

Example:

Wrong cluster definition
→ wrong SEs
→ wrong p-values
→ wrong significance stars
→ wrong prose
→ possibly wrong abstract/conclusion.

This is one repair tree, not six unrelated edits.

---

## 4. Mandatory Change Impact Sweep

Before finalizing a remedy, search every applicable location class.

### A. Global manuscript locations
- title;
- abstract;
- introduction;
- contribution statement;
- literature positioning;
- conceptual framework;
- methods;
- theory;
- equations;
- definitions;
- propositions/theorems/lemmas/corollaries;
- proofs;
- empirical specification;
- tables;
- figures;
- captions;
- table/figure notes;
- results prose;
- mechanisms;
- robustness/falsification;
- discussion;
- conclusion;
- appendices;
- online appendices/supplements;
- notation list;
- references/cross-references.

### B. Source/code locations, if supplied and in scope
- source `.tex/.md/.docx` sections;
- analysis scripts;
- data-construction scripts;
- plotting scripts;
- table-generation scripts;
- macro/value files;
- simulation code;
- configuration/specification files;
- replication README;
- generated-output provenance.

Do not require source/code that the user did not supply. Mark uninspectable implementation surfaces as UNVERIFIABLE.

---

## 5. Search by semantics, not only exact string

A downstream consequence may not reuse the same words.

For every finding, construct a **search bundle**:

### Exact tokens
- symbol names;
- equation labels;
- theorem labels;
- variable names;
- estimator names;
- table/figure numbers;
- key numeric values;
- macro names.

### Semantic variants
- synonyms;
- old terminology;
- prose descriptions of the same object;
- abbreviated names;
- transformed values;
- verbal interpretations.

### Dependency references
- "by Proposition X";
- "using Equation Y";
- "as defined above";
- "our preferred specification";
- "the baseline estimate";
- "the main result";
- "the same sample".

When tools are available, use grep/ripgrep/search/find plus semantic inspection. Do not rely on one literal search.

---

## 6. Required implementation package

Every actionable finding must contain:

### [ID] — IMPLEMENTATION PACKAGE

**Root problem**  
One concise statement of the actual defect.

**Canonical resolution**  
The single source-of-truth correction that governs downstream edits.

**Primary edit(s)**  
Exact location(s) where the canonical correction must be made first.

**Dependency tree**  
What objects depend on the primary edit.

**Affected locations — mandatory**  
Enumerate every currently detectable affected location, grouped by:
- theory/math;
- empirical/statistical;
- text/interpretation;
- tables/figures;
- appendix/supplement;
- code/output, if supplied.

If there are too many instances to list manually, provide a reproducible search rule and the expected match class.

**Search before editing**  
Exact tokens/phrases/labels/numbers to locate.

**Search after editing**  
Stale patterns that must return zero unexplained matches.

**Things that must NOT change**  
State invariants:
- substantive claim to preserve;
- estimand;
- parameter definition;
- sample;
- sign convention;
- normalization;
- table structure;
- theorem scope;
- data source;
- other unaffected quantities.

**Regenerate, do not hand-edit**  
List outputs that must be regenerated from their source of truth.

**Conditional branches**  
If implementation results can differ, state what to do under each result.

**Acceptance tests**  
Deterministic checks that establish local and downstream success.

**Regression tests**  
Checks that previously correct parts remain correct.

**Scope-loss test**  
Confirm that the repair did not narrow the claim unless explicitly authorized by the anti-watering-down protocol.

---

## 7. Special protocol for mathematical/theoretical changes

If a definition, assumption, theorem, proposition, lemma, notation convention, or proof step changes:

1. identify every theorem/proposition that cites or depends on it;
2. inspect every proof using the object;
3. inspect comparative statics and corollaries;
4. inspect remarks/examples interpreting it;
5. inspect notation definitions;
6. inspect abstract/introduction/conclusion claims derived from it;
7. inspect appendix proofs;
8. inspect equation cross-references;
9. compile and check references if source is available.

The implementation instruction must include language of the form:

> If you make this change, also inspect [dependent objects/locations] because they use the old definition/assumption/result.

Never provide only "change Definition X" when dependent results are detectable.

---

## 8. Special protocol for empirical/statistical changes

If an estimate, sample, specification, inference rule, weight, treatment definition, outcome construction, or clustering rule changes:

Identify all objects that may need regeneration:

- coefficient;
- SE;
- test statistic;
- p-value;
- CI;
- stars;
- N;
- number of clusters;
- test df;
- joint tests;
- table rows/columns;
- figure points/bands;
- appendix results;
- robustness references;
- abstract numbers;
- introduction numbers;
- results prose;
- discussion;
- conclusion;
- headline claim.

Never instruct an implementer to manually replace derived numbers if they should be regenerated from code/output.

Required decision branch example:

```
If corrected inference preserves the original conclusion:
    preserve the substantive claim and update uncertainty everywhere.
If corrected inference changes the conclusion:
    invoke the claim-preservation ladder before narrowing language.
```

---

## 9. Special protocol for prose/structure changes

Even nontechnical edits can create stale cross-references or duplicate claims.

If moving/deleting/reframing material:
- inspect section references;
- table/figure introductions;
- appendix pointers;
- definition order;
- acronym first use;
- claim repetition;
- abstract/conclusion consistency;
- literature contribution language.

Do not allow a prose fix to change substantive scope accidentally.

---

## 10. Pre-delivery change-set audit

Before the PDF is produced, run an independent pass with this adversarial question:

> Assume a competent implementation agent performs exactly the listed changes and nothing else. What reasonably detectable stale consequence of the diagnosed root cause would remain?

Search specifically for:
- old wording;
- old notation;
- old numeric values;
- old sample counts;
- old significance statements;
- old theorem scope;
- old cross-references;
- old figure/table captions;
- old appendix claims.

If any predictable residue remains, the change set is **NOT IMPLEMENTATION READY**.

---

## 11. Change-set completeness score

For internal QA, each actionable finding must satisfy:

- root cause identified: YES/NO
- canonical fix identified: YES/NO
- primary location identified: YES/NO
- downstream impact sweep completed: YES/NO
- all detectable affected locations listed/searchable: YES/NO
- dependencies ordered: YES/NO
- invariants stated: YES/NO
- regeneration rules stated: YES/NO/NA
- acceptance test stated: YES/NO
- regression test stated: YES/NO
- scope-preservation checked: YES/NO

`IMPLEMENTATION_READY` requires every applicable item = YES.

---

## 12. Patch ordering

Order repairs by dependency, not by page number or severity alone.

Preferred order:

1. upstream definitions/data constructions/design choices;
2. estimands/specifications;
3. proofs/estimation/inference;
4. generated tables/figures/statistics;
5. interpretation;
6. abstract/introduction/conclusion;
7. formatting/cross-references.

Within the same dependency layer, prioritize FATAL → MAJOR → MODERATE → MINOR.

This reduces the chance that a downstream edit is immediately invalidated by a later upstream correction.

---

## 13. Conflict detection across findings

Before delivery, compare change sets.

Flag when:
- two remedies edit the same object differently;
- one fix invalidates another;
- one finding assumes a definition another finding changes;
- two findings are actually one root cause;
- the order of implementation matters;
- a low-severity cosmetic fix should wait for a major upstream correction.

Create a **Patch Dependency Graph**.

No final implementation package may contain unresolved remedy conflicts.

---

## 14. Closed-paper discipline

For CLOSED papers:
- specify corrections;
- preserve data/specifications/results unless correcting an actual error requires regeneration;
- do not convert the change set into an open-ended research agenda;
- distinguish correction from optional improvement;
- do not add analyses solely for interest.

If the only valid correction changes a frozen substantive result, report that explicitly rather than hiding it.

---

## 15. Open-paper discipline

For OPEN papers, implementation packages may include:
- re-estimation;
- new diagnostics;
- robustness;
- redesign;
- new data;

but only after the RIGOR cost-benefit gate.

Every costly task must state:
- claim at risk;
- diagnostic value;
- burden;
- decision rule;
- what becomes unnecessary depending on the result.

Implementation completeness does not mean "do everything"; it means "fully specify everything RIGOR has actually decided is worth doing."

---

## 16. Change-set miss

On re-audit, if RIGOR discovers a defect that is a reasonably detectable downstream consequence of a previous root cause, label:

**CHANGESET MISS**

Record:
- parent finding ID;
- missed location;
- why it should have been found;
- search strategy that failed;
- new search rule/test to add.

This is a product-quality failure, not merely a new manuscript finding.

Use CHANGESET MISS cases as benchmark/eval fixtures so the same class of residue is less likely to recur.

---

## 17. Re-audit protocol

When a revised manuscript is uploaded:

1. keep the same RIGOR audit ID;
2. increment iteration number;
3. carry all findings forward;
4. re-check previously closed findings against the new version;
5. run every acceptance test from the prior change set;
6. run global stale-pattern searches;
7. inspect downstream locations;
8. inspect for new defects introduced by fixes;
9. mark CHANGESET MISS where applicable;
10. only then move findings toward CLOSED.

A statement from the implementation agent that "all changes were made" is not evidence of closure.

---

## 18. Final report section

Every RIGOR report with actionable findings must contain:

# COMPLETE IMPLEMENTATION PLAN

## Patch order
Ordered dependency-aware list.

## Implementation checklist

```
[ ] MAT-001 — 6 affected locations — IMPLEMENTATION READY
[ ] STAT-004 — regenerate 3 tables + 2 prose locations — IMPLEMENTATION READY
[ ] CONS-007 — 4 stale cross-references — IMPLEMENTATION READY
...
```

## Detailed implementation packages
One per root-cause finding.

## Global post-fix checks
Search/compile/reproduce/recalculate checks that apply after all patches.

## Expected closure criteria
What the revised paper must satisfy on the next RIGOR iteration.

---

## 19. Mandatory wording principle

Every remedy should answer not only:

> What should I change?

but also:

> **If you make this change, what else must you inspect because it depends on the thing being changed?**

This principle is mandatory.

---

## 20. Final standard

RIGOR should aim for:

\[
\text{Diagnosis}
+
\text{Impact map}
+
\text{Patch specification}
+
\text{Acceptance tests}
+
\text{Regression tests}
\]

A report that supplies only diagnosis + first obvious edit is incomplete.
