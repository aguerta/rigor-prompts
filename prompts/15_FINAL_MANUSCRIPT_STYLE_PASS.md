# FINAL MANUSCRIPT STYLE AND EXPOSITION PASS


# ACADEMIC AUDIT ENGINE — SHARED EXECUTION CONTRACT

This contract has priority over any weaker or conflicting workflow instruction below. Preserve the domain-specific tests in the underlying prompt.

## 0. Mandatory submission-readiness and journal-targeting front matter

Every user-facing audit report must begin with two sections before the module-specific diagnosis. These are mandatory even when the user selected only one specialized audit. Compute them once per manuscript revision and reuse them across reports; do not re-run the same web research unnecessarily within the same revision.

### A. Submission Readiness Gate

Choose exactly one status:

- **READY FOR SUBMISSION** - no unresolved FATAL or MAJOR scientific/technical blocker remains in the minimum readiness domains applicable to this paper type.
- **READY WITH MINOR REVISIONS** - no material redesign is needed, but a short bounded set of localized corrections should be completed before submission.
- **NOT READY FOR SUBMISSION** - at least one central validity, identification, inference, mathematical, theory-evidence, consistency, contribution, or presentation problem materially threatens submission. Say in the decisive reason whether the repair is a bounded revision or a redesign; that distinction belongs in the reason, not in the verdict.
- **READINESS NOT ASSESSED** - nothing blocking was established, AND the material or tool access available was insufficient to clear the paper. State exactly what remains unverified.

The four are not symmetric, and that is deliberate. ONE established FATAL or MAJOR finding is sufficient for NOT READY FOR SUBMISSION however little of the paper you were asked to read: finding a blocker settles the question. Finding none is NOT sufficient to clear a paper you only partly read - that is READINESS NOT ASSESSED. Never use READINESS NOT ASSESSED to report that the audit itself was short or interrupted; it is a statement about the manuscript, and whether the audit closed is recorded separately.

A READY verdict is stronger than a clean result in the selected module. Before issuing READY, perform the minimum cross-paper readiness checks appropriate to the paper type. For empirical papers this includes identification/estimand, econometric validity, inference, internal consistency, contribution/positioning, and headline presentation. For theoretical papers this includes mathematical validity, assumptions/domains, internal consistency, contribution/positioning, and headline presentation. For mixed/structural papers include both sets plus theory-to-evidence/model-to-data mapping.

State, in no more than one page:

- readiness verdict;
- decisive reason;
- remaining blockers, if any;
- minimum work needed to cross the submission threshold;
- whether the recommended journal search is for the manuscript **as currently written** or **conditional on the listed repairs**.

Do not call a paper READY merely because it is polished. Do not call it NOT READY merely because optional extensions remain.

### B. Journal Targeting Research

Immediately after the readiness verdict, perform the dedicated Journal Targeting Research protocol when web/external search is available. Journal information is time-sensitive: verify it at the time of the audit. If current web access is unavailable, write **JOURNAL TARGETING INCOMPLETE** rather than relying on memory.

The journal search must distinguish **intellectual fit** from prestige and must never recommend a journal solely because it is famous, highly ranked, or broad. Use the manuscript's question, field, method, contribution type, data/setting, and closest literature to identify targets.

For every recommended journal, separately verify: submission/processing fee; mandatory APC or optional open-access APC; publication/page/color charges; article type; initial-submission format; word/page limits when stated; anonymization/blinding requirements; abstract/keyword/classification requirements; data/code/replication rules; ethics/conflict/funding disclosures; preprint/working-paper policy when material; cover-letter or special-file requirements; whether unsolicited articles of this type are accepted; and the date verified. Never collapse these charges into one generic `fee` field. Never infer a zero fee from silence. Use **NOT VERIFIED** when necessary.

Rank journals by fit and explain the tradeoff. If the manuscript is not ready, make clear that the targets are conditional and do not recommend immediate submission.

## 1. Exhaustive, stateful review

Do not treat the audit as a one-pass reading. Maintain a persistent **Issue Ledger** and a **Coverage Ledger** throughout the task.

For every material manuscript object that falls inside the selected audit, record whether it has been inspected: claims, equations, definitions, propositions, proofs, tables, figures, notes, appendices, estimands, estimators, specifications, citations, and cross-references as applicable. Do not declare the audit complete while material objects remain unexamined.

## 2. Iterative adversarial passes

Use multiple passes with different failure-search strategies rather than repeatedly rereading in the same way:

1. Reconstruction pass — independently reconstruct the paper's central objects and logic.
2. Contradiction pass — compare claims across abstract, introduction, body, tables, figures, equations, appendix, and conclusion.
3. Falsification/counterexample pass — actively try to make universal or causal claims fail under admissible cases.
4. Dependency pass — trace upstream findings into downstream claims.
5. Boundary/edge-case pass — inspect domains, limits, missing support, sparse cells, few clusters, weak identification, or other domain-specific edges.
6. Fresh-reader pass — re-read without relying on the previous pass's narrative and search specifically for omissions.

A clean pass does not end the audit. Require the closure standard below.

## 3. Issue Ledger

Each finding must have a stable ID and retain history across rounds:

- ID
- audit module
- report section, taken verbatim from this module's AUDIT SECTIONS list when the
  module defines one, so the report can file the finding where a reader expects it
- first round found
- exact location(s): a section, page, equation, table, figure or line. A
  location of "throughout the manuscript" points at everything and therefore at
  nothing, and an author cannot act on it. If a pattern really does recur, give
  the three or four places where it is clearest and say it recurs.
- claim/object at risk
- severity, which measures how much of the paper stops standing, not how hard
  the repair is and not how certain you are

  FATAL     The central contribution, the central identification strategy, the
            main theorem, or the headline conclusion does not survive. Repairing
            it means changing the paper fundamentally.

  MAJOR     Essential to fix before publication, but the core can survive a
            material revision. The claim may well be true; as written it is not
            established.

  MODERATE  A substantive but localised error that must be corrected and does
            not change the central conclusions.

  MINOR     Presentation, wording, notation, a stale figure, a typo, an
            out-of-date cross-reference. No substantive effect on any claim or
            number.

  A presentational defect is MINOR however visible it is. A stale graph is
  MINOR, not MAJOR, unless the correct graph would change what a result shows,
  in which case the finding is about the result and belongs at the severity that
  result deserves. A finding that changes a secondary result while the central
  point stands is MAJOR or MODERATE, never FATAL. Never raise severity because a
  defect is embarrassing, and never lower it because the repair is expensive.

- verification, which is a separate axis from severity and states how far you
  established the finding: PROVED ERROR when you demonstrated it, STRONGLY
  SUPPORTED when the evidence is strong but not a demonstration, PLAUSIBLE when
  it is a well-founded concern, UNVERIFIED when you could not check it. Use
  PROOF INVALID when the manuscript's own proof does not establish its claim.

- the independent derivation or check you performed, written out so a reader can
  redo it. Show the expressions, not a description of them. If you assert that a
  stated identity, dimension count, rate or sign does not hold, exhibit it: give
  the quantities on both sides, instantiate them, and show where they part. A
  finding that says a claim "is incompatible with" something, without ever
  displaying the incompatibility, is an assertion the author has no way to check
  and every reason to dismiss.

- the manuscript's own words at issue, quoted exactly, as `quoted`. An author
  reading a finding should not have to hunt for the sentence it is about.
- `replacement`: what could stand in place of that sentence, statement,
  proposition or specification. Write it out. A finding that describes a repair
  leaves the author to invent it; a finding that shows the corrected statement
  can be acted on the same evening. Do not weaken a claim the work supports, and
  do not write a replacement you cannot defend on the evidence you have. Where a
  repair genuinely requires analysis you cannot do, say that instead of drafting
  a sentence that pretends otherwise.
- for a contradiction, `conflicting_values` as a list giving each value with
  where it appears, and `which_is_right` saying which holds or why neither does.
  Two numbers quoted side by side settle in one line what a paragraph of prose
  leaves ambiguous.
- consequences, as a list of the specific things that no longer follow
- counterexample, whenever the finding disputes a general or universal claim.
  A universal claim is refuted by one admissible case, so give the case: state
  the values, show why every hypothesis the manuscript invokes still holds, and
  show what fails. A criticism that could carry a counterexample and does not is
  an assertion, and a referee is entitled to disbelieve it.

  Choose the right instrument. A universal claim takes a counterexample. A
  computation, identity or dimension count takes a derivation. A claim that is
  merely unestablished takes neither: say what would establish it. Do not force
  a counterexample where the finding is that a proof is incomplete, and do not
  settle for prose where one line of algebra would settle the matter.
- why that counterexample is admissible under the manuscript's own assumptions
- why it contradicts the claim
- what the finding is conditional on, when it depends on another finding
- what the finding is distinct from, when a nearby finding could be confused with it
- downstream dependencies
- proposed minimum adequate remedy, when remedies are permitted
- attempted remedy history
- local verification result
- downstream verification result
- current status: OPEN / PROVISIONALLY CLOSED / CLOSED / REOPENED / UNVERIFIABLE

Never delete a finding because a later pass fails to mention it.

## What a finished finding looks like

This is the standard. Notice what it does: it quotes the manuscript, it writes
the mathematics as mathematics, it instantiates the disagreement rather than
asserting it, and it ends with a sentence the author can paste.

    id: M-04
    severity: MAJOR
    verification: PROOF INVALID
    locations: ["Theorem 7 and its proof, p. 22", "Definition 4, p. 9"]
    claim_at_risk: "The identified set is sharply bounded by two attained
      extremal assignments."
    quoted: "the identified set is sharply bounded by the two rearrangement
      extremizers"
    derivation_check: "Definition 4 admits every coupling $\pi$ with marginals
      $\mu$ and $
u$, so the feasible set is $\Pi(\mu,
u)$. The stationary
      economy of Section 5 adds the type restriction $\pi(A_i 	imes B_j) = 0$
      for $(i,j) \in R$, giving the smaller set $\Pi_R \subset \Pi(\mu,
u)$.
      Theorem 7 establishes attainment on $\Pi(\mu,
u)$ by citing Theorem 2,
      which is stated for $\Pi(\mu,
u)$ and not for $\Pi_R$. Attainment on a
      set does not imply attainment on a subset that excludes the maximiser."
    counterexample: "Take two types, $\mu = 
u = (1/2, 1/2)$, and a surplus
      matrix whose unique maximiser is the antidiagonal coupling. Let $R$
      contain exactly the antidiagonal cells. Then $\Pi_R$ is the singleton
      diagonal coupling, the supremum over $\Pi(\mu,
u)$ is not attained in
      $\Pi_R$, and the upper endpoint the manuscript reports is not in the
      identified set."
    why_admissible: "Every hypothesis the proof invokes holds: the marginals are
      fixed, the surplus is bounded, and $\Pi_R$ is closed and non-empty."
    why_it_contradicts: "The reported endpoint is attained only on the larger
      set, so the interval the manuscript calls sharp is not the identified set
      of the stationary economy."
    consequences: ["The sharpness claim in the abstract does not follow.",
      "Table 3's endpoints are computed on $\Pi(\mu,
u)$, not $\Pi_R$.",
      "Figure 5's endpoint markers inherit the same set."]
    replacement: "The identified set is contained in the interval between the
      two rearrangement extremizers; sharpness holds when the stationary
      restrictions leave both extremizers feasible, which Section 5 does not
      establish."

A finding about mathematics that contains no mathematics has not done the work.
If you cannot write the derivation, you have not checked the claim, and the
honest severity is lower with a verification of PLAUSIBLE rather than a
confident assertion in prose.

Record every paper you actually read or checked in a `works_consulted` list in
the session file, each with a `citation`, and where you have them a `doi`, a
`url`, a `why` saying what you consulted it for, and a `verification` of either
VERIFIED or NOT VERIFIED. Never invent a citation. Never guess an author, title,
journal, year, volume, issue, page range or DOI: if you could not confirm a
detail, write NOT VERIFIED rather than a plausible value. A reference you could
not confirm belongs on the list marked unconfirmed, because leaving it off is
indistinguishable from never having looked.

Write the report in the same plain prose you would demand of the manuscript.
State the finding instead of grading it: not that a discrepancy is striking, but
what it is and what stops following from it. Say what a thing does rather than
that it points at something, so "the estimates imply" and never "the estimates
underscore". Drop the connector that joins nothing (moreover, furthermore,
additionally, notably, importantly, indeed, ultimately) and the wind-up before
the sentence (it is important to note, it is worth noting, what matters is, in
other words, in order to, a number of). Use a full stop where you were reaching
for a rhetorical dash, and two sentences where you were reaching for a
semicolon. Do not narrate your own process: write the finding, not the story of
how you came to it.

This applies to what you write. A quotation from the manuscript is the author's
sentence and is copied exactly, including anything in it you would not have
written yourself, and a citation is left as the citation. A report that objects
to inflated language in a paper while being written the same way has no standing
to make the objection.

Record what you inspected, not only what you found. The session file takes a
`coverage_ledger`: a list of objects, each with an `id`, an `object_type`, a
`location` given as section and page, a `status` of REVIEWED, or
REVIEWED_WITH_FINDING when a finding came out of it, or UNVERIFIABLE when it
could not be checked from the material supplied, or NOT_REVIEWED, plus the
`rounds_checked` it was looked at in and a short `note`.

The objects are the things a reader of a review of this kind expects to have
been gone through one at a time. For a mathematical audit that is every
proposition, theorem, lemma, definition and numbered equation. For an
econometric audit it is every specification, every reported table and every
estimate the paper leans on. For a literature audit it is every entry in the
manuscript's own reference list and every in-text citation that carries a
claim. For a consistency audit it is every figure, table and cross-reference.

Enumerating them is what makes a clean verdict mean anything. A report that
names four problems and lists nothing inspected cannot tell the author whether
the rest was checked and found sound or was never opened, and those are
opposite messages. A count of findings is not a measure of coverage, and an
audit that skips this has not said what it did.

File every finding under one of the report sections this document lists for
your module. Write the section heading in a `section` field on the finding,
spelled exactly as it appears here. This is what lets the report say that a
section was checked and found clean: a section with no finding filed under it
is reported as clean, and a report whose findings are filed nowhere cannot
report anything as clean or as unchecked. It also stops the same defect being
filed twice under two headings. If a finding genuinely belongs to no listed
section, leave `section` empty rather than forcing it into the nearest one.

Give every location as the section and the page, with the object when there is
one: "Section 4.2, Proposition 3 (p. 17)", "Table 5, notes (p. 31)", "Abstract
(p. 1)". Never report a line number. The file you are reading is not the
document the author edits, and their line numbers do not agree, so a line
reference sends the author to the wrong place or to no place at all. If a page
number is genuinely unavailable in the material you were given, name the section
and the object and say that the page could not be determined.

Where a finding rests on a known result, name the work that establishes it in a
`related_literature` list on that finding. Each entry takes a `citation`, a
`what_it_establishes` saying what the cited work shows and why it bears on this
finding, and a `verification` of VERIFIED when you opened the source during this
audit or FROM KNOWLEDGE when you are citing a standard result without opening
it. This applies to any objection that appeals to something outside the
manuscript: that a two-way fixed-effects estimator can carry negative weights
under staggered adoption, that a bandwidth or a kernel choice has to be
defended, that continuity and compactness give existence but not uniqueness,
that a partial-identification claim needs its sharpness argument. An objection
with a source behind it can be checked and answered. One without it is an
opinion, and the author has no way to weigh it. Do not invent a citation, do not
attach a DOI or a volume you did not read, and do not cite a work for a result
it does not contain: a fabricated reference is worse than no reference, because
it will be checked.


When method adapters were available, record the routing in the session file as a
`routing` object with `paper_type`, `methods` as a list of the family keys you
loaded, and `routing_confidence`. A reader has to be able to check that the paper
was audited as what it actually is, and a wrong classification makes every
finding an answer to the wrong question.

Write mathematics as mathematics. Inline LaTeX between dollar signs is rendered
in the report, so state a derivative, a bound or a condition as the expression
itself rather than describing it in words. Standard symbols, Greek letters,
fractions, sums, integrals, limits and the usual relations are available. Do not
use macros beyond those: an expression containing anything unrecognised is
printed as plain text, which is safe but harder to read.

## 4. Root-cause and non-duplication rule

When one upstream error generates many downstream failures, record the root cause once and list affected dependents. Create a new finding only when a downstream object independently fails for another reason.

## 5. Claim-preservation before claim-narrowing — anti-watering-down rule

Do not treat weaker prose as the default fix for a substantive defect.

When remedies are permitted, evaluate them in this order:

A. Correct a local mistake while preserving the intended claim.
B. Repair the proof, estimator, inference, measurement, specification, or model with the smallest defensible substantive change.
C. Use an already-available output or simple recoding that directly resolves the problem.
D. Re-estimate, redesign, or add a targeted test when needed to preserve the claim.
E. Narrow or weaken the claim only when A–D cannot support it at reasonable cost or the object is genuinely unidentified/unsupported.

If E is chosen, label it **SCOPE REDUCTION** and state exactly what scientific content is lost. Never present scope reduction as equivalent to substantive repair.

Never solve a contradiction by deleting the more demanding statement unless the evidence actually requires that reduction.

## 6. Minimum-sufficient-remedy rule

Prefer the least costly remedy that fully resolves the identified problem. Do not recommend a larger redesign when a smaller correction establishes the same validity.

For each permitted remedy, rate:

- expected diagnostic value: LOW / MEDIUM / HIGH
- implementation burden: LOW / MEDIUM / HIGH
- centrality of affected claim: SECONDARY / IMPORTANT / CENTRAL
- probability the remedy changes the evaluation: LOW / MEDIUM / HIGH

Recommend work only when its expected information or credibility gain is proportionate to burden. Do not create a wish list.

## 7. Sequential decision rule

Do not recommend all possible work at once. Order work by dependency and decision value:

- Stage 1: decisive diagnostics that could invalidate or redirect later work.
- Stage 2: minimum core repairs conditional on Stage 1.
- Stage 3: value-adding extensions only after the core survives.

Explicitly mark tasks that become unnecessary under particular Stage-1 outcomes.

## 8. Verification after a correction

When the task permits editing or the user supplies a revised manuscript, every correction must pass:

1. local verification — the original finding is actually resolved;
2. dependency verification — affected downstream claims remain valid;
3. regression verification — the change did not create new inconsistencies elsewhere;
4. cross-module verification — when relevant, a mathematical fix must not create an econometric inconsistency, a prose fix must not change causal strength, etc.

A fix is only **PROVISIONALLY CLOSED** after local verification. It becomes **CLOSED** only after downstream and regression checks.

## 9. Closure standard

Do not stop merely because the latest pass found nothing new. Stop only when all of the following hold for the selected scope:

- no OPEN FATAL findings;
- no OPEN MAJOR findings;
- every MINOR finding is CLOSED, explicitly accepted, or clearly marked unresolved;
- every previously closed finding has survived a regression pass;
- the Coverage Ledger shows all material in-scope objects inspected;
- no silent SCOPE REDUCTION occurred;
- two consecutive verification passes using materially different search strategies find no new FATAL or MAJOR issue.

If the context window, tool access, or source quality prevents this standard, state **AUDIT INCOMPLETE** and identify exactly what remains uncovered. Never manufacture a clean status.

## 10. No praise / no filler

Write so a reader outside your subfield can follow it. Two things carry meaning
in a report like this: plain words and mathematics. Everything else is friction.

Expand every abbreviation the first time you use it, including the ones that
feel universal in your corner of the field. Do not coin new ones. If a phrase
needs a shorthand to be bearable, the sentence is too long. A reader who has to
hold six letter-codes in their head to follow a paragraph is not reading your
argument, they are decoding it.

Say the thing rather than naming the category it belongs to. "The estimator does
not identify the stated estimand" tells a reader something; "identification
concerns" does not.


Do not pad the report with compliments, generic advice, or sections populated only for completeness. Empty categories are valid.



## CLOSED-PAPER MODE OVERRIDE

The paper is substantively frozen. Report validity/consistency problems within this module's scope. Do not propose new analyses merely to improve the paper. When the correct fix is identifiable from supplied material, describe the **nature of the minimum fix** without silently rewriting the scientific claim. If fixing the issue would require new estimation, new data, or model redesign, state that fact and the precise object that cannot be validated; do not pretend a wording change solves it.

The iterative protocol applies to **verification**, not to specification search.




# DOMAIN-SPECIFIC AUDIT — PRESERVED AND INCORPORATED

# FINAL ECONOMICS MANUSCRIPT STYLE PASS — EDIT DIRECTLY

Edit the near-final manuscript **in place**.

This is a **final editorial, structural, exposition, and visual-style pass on a substantively finished economics paper**.

The empirical content is frozen.

The objective is to make the manuscript read and look like a polished economics working paper suitable for submission to a strong peer-reviewed economics journal.

This is **not** a referee report.

This is **not** a methodological redesign.

This is **not** an invitation to add analyses.

Make the edits directly.

---

# 0. PRIMARY OBJECTIVE

Improve the paper along six dimensions:

1. **Structure and information flow.**
2. **Economics-style exposition.**
3. **Conciseness and subsection discipline.**
4. **Correct interpretation of empirical magnitudes.**
5. **Professional tables and figures.**
6. **Removal of AI-style, rhetorical, coding, and drafting artifacts.**

The final manuscript should be:

* shorter;
* easier to scan;
* economically interpretable;
* visually consistent;
* technically precise;
* minimally repetitive;
* written in plain academic economics prose.

It should not sound like:

* an AI-generated summary;
* a referee response;
* a research memo;
* a dissertation chapter;
* a presentation script;
* documentation for replication code;
* a policy brief;
* promotional writing.

Do not make the prose ornamental.

Do not make it artificially dramatic.

Do not make it defensive.

Do not sacrifice necessary technical detail.

---

# 1. HARD SUBSTANTIVE CONSTRAINT

Do **not** change the substantive paper.

Unless explicitly authorized below for presentation purposes, do not change:

* estimates;
* standard errors;
* confidence intervals;
* sample definitions;
* treatment definitions;
* outcome definitions;
* estimands;
* identifying assumptions;
* equations;
* model parameters;
* calibration values;
* empirical specifications;
* table values;
* plotted values;
* causal interpretation;
* substantive qualifications;
* citation keys;
* existing labels;
* cross-reference targets.

Do not search for a more favorable specification.

Do not replace a preferred estimate with another estimate because it reads better.

Do not change the paper's conclusions.

If text and a current authoritative table or figure conflict, correct the **text**, not the empirical output, provided the intended specification is unambiguous.

If it is not unambiguous, leave it unchanged and report the inconsistency.

---

# 2. EMPIRICAL WORK IS FROZEN

Do not rerun:

* regressions;
* structural estimation;
* calibration;
* simulation;
* bootstrap procedures;
* matching;
* weighting;
* data cleaning;
* sample construction;
* treatment construction;
* robustness specifications;
* model fitting.

Do not modify empirical code in ways that could alter results.

## Exception: figure rendering only

You MAY edit and run a plotting script **only if**:

1. it reads already-final stored estimates, coefficients, confidence intervals, or plot-ready data;
2. it does not estimate or re-estimate anything;
3. it does not rebuild the analytical sample;
4. it does not transform the substantive estimand;
5. the numeric coordinates of the plotted estimates remain unchanged.

If plotting and estimation are mixed in the same script, do not rerun the estimation.

Separate the plotting layer from the estimation layer or work from frozen plot-ready outputs.

The only permitted changes to figures are presentation changes such as:

* dimensions;
* typography;
* line thickness;
* marker size;
* legend layout;
* axis formatting;
* spacing;
* background;
* output format;
* caption placement.

---

# 3. FIRST AUDIT THE PAPER'S ARCHITECTURE

Before line editing, inspect the complete main paper.

Identify:

* the question;
* identification/design;
* data;
* treatment or key explanatory variation;
* estimand;
* headline result;
* strongest identification evidence;
* important secondary findings;
* mechanisms;
* robustness;
* interpretation;
* limitations;
* appendix material.

Then simplify the architecture.

The reader should encounter the material approximately in this order when substantively appropriate:

1. Research question and motivation.
2. Relevant institutional or economic setting.
3. Data and construction of the key variables.
4. Empirical or theoretical strategy.
5. Main results.
6. Identification evidence and principal threats.
7. Mechanisms or important secondary evidence.
8. Robustness and sensitivity.
9. Conclusion.

Do not force this ordering when the paper's design genuinely requires another ordering.

The principle is:

> Main question → design → main answer → credibility → interpretation.

Do not bury the principal estimate behind implementation detail.

Do not place six robustness exercises before the reader understands the main result.

Do not conceal evidence that materially qualifies the headline result.

---

# 4. SUBSECTION DISCIPLINE

The current paper should have **few subsections**.

Actively merge unnecessary subsections.

A subsection is justified only when it contains a genuinely distinct analytical task that requires several paragraphs.

Do not create a subsection for:

* one regression;
* one robustness test;
* one figure;
* one dataset detail;
* one interpretation;
* one caveat;
* one short mechanism;
* one extension that takes one or two paragraphs.

As a default:

* use major sections for the major components of the paper;
* use **no more than one level of subsections in the main text**;
* keep most major sections to approximately **zero to three subsections**;
* prefer continuous prose when two neighboring subsections can be merged naturally.

Do not create subsubsections unless the existing technical structure makes them indispensable.

## Subsection names

Use short, descriptive, conventional titles.

Prefer:

* Data
* Institutional setting
* Empirical strategy
* Main results
* Identification
* Mechanisms
* Robustness
* Model
* Calibration
* Quantitative results

Avoid titles such as:

* Unpacking the mechanism
* Why this matters
* A tale of two effects
* Peering under the hood
* The anatomy of...
* Understanding the puzzle
* Beyond the baseline
* Putting the pieces together
* The broader picture
* A deeper look
* What drives the result?
* Revisiting the evidence
* Exploring the mechanism
* The road ahead

Subsection titles should describe **content**, not advertise it.

---

# 5. ABSTRACT — HARD MAXIMUM 150 WORDS

Rewrite the abstract after the rest of the manuscript has been cleaned.

**Hard maximum: 150 words.**

Prefer approximately **100–130 words** if all essential information fits.

One paragraph only.

No citations.

No footnotes.

No equations.

No mathematical notation unless absolutely unavoidable.

Prefer no symbols at all.

No section references.

No p-values.

No significance stars.

No literature review.

No robustness inventory.

No long institutional setup.

No generic opening such as:

> Understanding X is important for...

unless a single short motivation clause is genuinely needed.

## Abstract content

The abstract should answer, in this order:

1. **What question does the paper answer?**
2. **What data/design/model provides the answer?**
3. **What is the principal finding?**
4. **How large is it in economically interpretable units?**
5. **What is the principal interpretation or implication?**
6. **What qualification is necessary to prevent the headline statement from being misleading?**

Not every item needs a separate sentence.

Usually 4–6 sentences are enough.

## Preferred abstract structure

A good default is:

**Sentence 1:** question + setting.

**Sentence 2:** data/design/identifying variation.

**Sentence 3:** principal quantitative finding with an interpretable magnitude.

**Sentence 4:** one secondary result only if it changes interpretation.

**Sentence 5:** economic interpretation or contribution.

Include a qualification only when omitting it would materially misstate the result.

## Do not write

> We provide novel evidence...

> We make three contributions...

> Importantly, we find...

> Our comprehensive analysis shows...

> Using a rich dataset...

> The results are robust to a battery of...

> These findings underscore...

Simply state the question, design, result, and implication.

---

# 6. INTRODUCTION

The introduction is the highest-priority prose section.

It must allow an economist who reads only the introduction to understand:

* the question;
* why the question is economically relevant;
* what variation/data/model the paper uses;
* what the main identification problem is;
* what the main result is;
* how large the result is;
* what the paper contributes relative to the closest literature.

Do not make the reader wait several pages to discover what the paper does.

---

# 7. INTRODUCTION — RECOMMENDED FLOW

Do not impose an artificial paragraph count, but use approximately this architecture.

## Opening

Begin with the economic question, puzzle, institutional fact, or policy problem.

Move rapidly from broad motivation to the **specific question answered by the paper**.

Avoid grand claims about society, history, democracy, markets, technological change, inequality, globalization, or economic development unless directly necessary.

Do not open with a dictionary definition.

Do not begin with a long literature review.

Do not begin with several rhetorical questions.

Do not begin with an anecdote unless the anecdote is necessary to understand the empirical setting.

## Research question

State the question plainly and early.

Examples of the desired syntax:

> This paper studies whether...

> We estimate how...

> We examine whether...

> The paper asks how...

Do not obscure the research question behind terminology.

## Design

Explain the source of variation in ordinary economic language.

State:

* the unit of observation;
* relevant sample;
* treatment or exposure;
* comparison;
* timing;
* principal estimator or model;
* source of identifying variation.

Do not list every control.

Do not reproduce the methods section.

Explain **why the design can answer the question**.

## Main result

State the principal estimate early.

Interpret its magnitude.

Do not merely state its sign and statistical significance.

Bad:

> The coefficient is negative and statistically significant.

Bad:

> We estimate a coefficient of -0.015.

Preferred:

> Exposure reduces the outcome by 1.5 percentage points.

or, when the design is not causal:

> Exposure is associated with a 1.5 percentage-point lower outcome.

The correct wording depends on the estimand and units.

## Secondary evidence

Discuss only secondary findings needed to understand the central result.

Do not summarize every table.

Do not turn the introduction into a miniature results section.

## Contribution to literature

Position the paper relative to the **closest literature**, not every adjacent literature.

Usually one or two compact paragraphs are enough.

Explain:

1. what existing work already establishes;
2. what is still unresolved;
3. what this paper adds.

Do not write a bibliography in prose.

Do not give each literature its own subsection in the introduction.

Avoid:

> A first strand of literature...

> A second strand...

> A third strand...

unless the literatures are truly distinct and all necessary.

Prefer direct comparisons to the closest papers.

## Roadmap

A roadmap is allowed **only at the end of the introduction**.

Keep it short.

Do not describe every subsection.

One or two sentences are enough.

---

# 8. DO NOT REFER TO SECTIONS OUTSIDE THE ROADMAP

Outside the roadmap paragraph, remove routine prose such as:

> Section 3 presents...

> As discussed in Section 4...

> Section 5 shows...

> We return to this issue in Section 6...

Replace these with substantive transitions.

For example:

Bad:

> Section 4 examines heterogeneous effects.

Better:

> The estimates are larger in districts with...

Bad:

> As shown in Section 5, the mechanism results...

Better:

> The mechanism estimates are consistent with...

References to:

* tables;
* figures;
* equations;
* propositions;
* appendices

may remain when they genuinely help the reader locate evidence.

Do not mechanically remove cross-references required for understanding.

---

# 9. SYMBOLS AND NOTATION

## Abstract and introduction

Prefer **no mathematical notation** in the abstract.

Strongly minimize notation in the introduction.

Do not write an undefined symbol anywhere.

Never assume that a reader knows what:

* (D_i);
* (\alpha);
* (\beta);
* (\lambda);
* (Y_{it});
* (T_i);
* (Z_{it});
* ATT;
* LATE;
* MTE;
* (\Delta);

means merely because it appears later.

If notation is truly necessary, define it immediately at first appearance.

But in the introduction, prefer words.

Bad:

> We estimate (\beta<0).

Better:

> The estimates imply a decline in household income.

## Main text

Introduce every symbol before or at its first use.

Immediately after an important equation, explain in words:

* what the dependent object is;
* what variation identifies the parameter;
* what the economically relevant coefficient represents.

Do not let algebra replace economic explanation.

---

# 10. INTERPRET EVERY IMPORTANT COEFFICIENT

A coefficient should not be left uninterpreted when its economic magnitude is central.

Whenever discussing an important estimate:

1. state the direction;
2. translate it into the correct units;
3. state the relevant comparison;
4. optionally relate it to the baseline mean if this is informative and already supported by the manuscript.

Do not mechanically report raw coefficients.

## A. Outcome is a proportion coded 0–1

If:

[
\hat\beta=-0.015
]

write:

> The estimate implies a 1.5 percentage-point decline in [outcome].

Do **not** write:

> a 1.5 percent decline

unless you explicitly compute the percentage change relative to the baseline.

Percentage points and percent are not interchangeable.

---

## B. Log dependent variable, level treatment

If:

[
\log(Y)=...+\beta D
]

and (\beta=-0.015), a small-coefficient interpretation is:

> The estimate implies approximately 1.5 percent lower [outcome].

For a binary regressor, use the exact transformation

[
100[\exp(\beta)-1]
]

when the difference from the approximation is nontrivial or when the manuscript already uses the exact transformation.

Do not call a log-point coefficient a percentage-point change.

---

## C. Log-log model

If:

[
\log(Y)=...+\beta\log(X)
]

then (\beta) is an elasticity.

If (\beta=-0.015), write:

> A 1 percent increase in (X) is associated with approximately a 0.015 percent decline in (Y).

Do **not** interpret this as a 1.5 percent decline.

---

## D. Level outcome, log regressor

If:

[
Y=...+\beta\log(X)
]

then a 1 percent increase in (X) changes (Y) by approximately:

[
\beta/100
]

units.

Translate that into the natural units of (Y).

---

## E. Standardized outcome

If the dependent variable is standardized, write:

> The estimate corresponds to a 0.15-standard-deviation decline in the outcome.

Do not call this a 15 percent effect.

---

## F. Index outcome

State the index scale.

If standardized, say so.

If not standardized, interpret using the actual index units rather than pretending they are percentages.

---

## G. Monetary outcome

Use meaningful monetary units.

Prefer:

> annual household income falls by approximately $420

over:

> the coefficient is -420.3.

Use the currency and price year already established in the paper.

---

## H. Rates

Distinguish:

* percent;
* percentage points;
* basis points;
* events per 1,000;
* events per 100,000.

Never infer the unit from the coefficient alone.

---

# 11. CAUSAL LANGUAGE MUST MATCH THE DESIGN

Use causal verbs only when the manuscript's design supports the existing causal interpretation.

Causal:

> increases

> reduces

> raises

> lowers

> leads to

> causes

Noncausal/descriptive:

> is associated with

> predicts

> is correlated with

> is higher among

> coincides with

Do not weaken an already justified causal design merely for stylistic caution.

Do not strengthen a descriptive design merely because causal prose sounds cleaner.

Preserve the paper's existing causal strength.

---

# 12. NO P-VALUES IN RUNNING PROSE

Do not report numerical p-values in the narrative.

Remove prose such as:

> (p=0.032)

> (p<0.01)

> significant at the 5 percent level

when precision can be communicated more usefully through standard errors or confidence intervals already available.

Do not repeatedly classify results as:

* significant;
* insignificant;
* marginally significant;
* highly significant.

Lead with economic magnitude.

When statistical precision matters, state it compactly using the existing uncertainty measure.

Examples:

> The 95 percent confidence interval excludes zero.

> The estimate is imprecise and the confidence interval includes economically meaningful effects in both directions.

> The point estimate is close to zero, although the confidence interval does not rule out moderate effects.

Do not turn every estimate into a discussion of hypothesis testing.

Do not add new confidence intervals.

Do not calculate new inference unless it is already mechanically implied by stored final results and needed solely for an existing textual description.

If existing frozen tables contain p-values, do not alter empirical table cells merely to satisfy this prose rule. Do not add new p-values.

---

# 13. ECONOMIC MAGNITUDE BEFORE STATISTICAL SIGNIFICANCE

Do not write:

> We find a statistically significant negative coefficient.

Write:

> We estimate a 1.5 percentage-point decline in employment.

Then discuss precision if needed.

The reader should learn:

**how much**, not merely **whether zero is rejected**.

Do not use "significant" to mean "large", "important", or "economically meaningful."

---

# 14. RESULTS SECTION

The Results section should answer the research question in a clear hierarchy.

Use approximately:

1. Main estimate.
2. Dynamics or decomposition needed to understand it.
3. Credibility/identification evidence.
4. Important heterogeneity or mechanisms.
5. Secondary robustness.

Do not organize the Results section according to the chronological order in which analyses were run.

Do not narrate the research process.

Avoid:

> We first ran...

> We then tried...

> Next, we investigate...

> Motivated by this result, we estimated...

unless the sequence is logically essential.

Write the final intellectual argument, not the history of discovering it.

---

# 15. DISTINGUISH MAIN ESTIMATES FROM ROBUSTNESS

Make the hierarchy visible.

The reader should always know:

* what the preferred specification is;
* what the main estimand is;
* what evidence is confirmatory;
* what evidence is robustness;
* what is sensitivity;
* what is exploratory.

Do not write as though every specification has equal status.

Do not call robustness estimates additional main results.

Do not call a specification a robustness check if the paper relies on it for identification.

Do not call an exercise a validation test unless it actually validates the relevant object.

---

# 16. IDENTIFICATION DISCUSSION

State the identifying assumption clearly.

Explain the principal threat.

Present the strongest existing evidence bearing on that threat.

Then move on.

Do not surround every result with repeated identification disclaimers.

Do not write like a response to a hypothetical referee.

A material caveat should normally appear:

1. once where it matters most;
2. again only if a later claim would otherwise become misleading.

Treat semantically equivalent caveats as duplicates even if worded differently.

---

# 17. LITERATURE REVIEW STYLE

The literature discussion should position the paper rather than catalogue papers.

For each closest group of papers:

1. state what they establish;
2. state the dimension relevant to this paper;
3. state what remains different here.

Prefer:

> Existing studies estimate X using Y. This paper instead observes Z, which allows...

over:

> Smith (2018) studies X. Jones (2019) studies X. Brown (2020) also studies X.

Do not call every difference a "contribution."

Do not write:

> We contribute to three strands of literature.

unless that organization genuinely clarifies three distinct intellectual connections.

Do not inflate small differences into novelty claims.

---

# 18. CONTRIBUTION LANGUAGE

State contributions factually.

Avoid:

> novel

> groundbreaking

> first-ever

> powerful

> compelling

> important contribution

> unique contribution

> significant contribution

unless the statement is objectively necessary and defensible.

Prefer describing what the paper does that earlier work does not do.

The difference itself is the contribution.

---

# 19. CONCLUSION

The conclusion should be short.

Do not summarize every empirical section.

Do not list every robustness test.

Do not reproduce the introduction.

Do not add new empirical evidence.

Do not introduce a new literature review.

Do not introduce new notation.

Do not end with generic future-research boilerplate.

A useful structure is:

### Paragraph 1

Restate the economic question and answer it using the principal result and an interpretable magnitude.

### Paragraph 2

Explain the economic interpretation and what the result changes about how the question should be understood.

### Optional paragraph 3

State one central limitation or scope condition only if necessary for the overall conclusion, then give the broader implication.

Usually **2–4 paragraphs are enough**.

End on the substantive implication.

Do not end with:

> More research is needed.

> Future work should explore...

> These findings underscore the importance of...

> Only time will tell...

> This opens exciting avenues for future research.

unless there is a specific, economically meaningful unresolved question that follows directly from the evidence.

---

# 20. FIGURES — GENERAL PRINCIPLE

Figures should look like figures from a professional economics paper, not:

* a presentation;
* a dashboard;
* a blog post;
* a Python tutorial;
* Excel;
* a machine-learning notebook.

The default visual target is:

**clean, restrained, publication-quality economics graphics with a Stata-like empirical-paper aesthetic, implemented cleanly whether the source is Stata, R, Python, Julia, or another package.**

---

# 21. NEVER BAKE MULTI-PANEL FIGURES INTO ONE IMAGE

Do not use Python `subplot`, `subplots`, `gridspec`, Stata `graph combine`, or equivalent to create one permanent image containing multiple panels.

Every panel must be exported as its **own figure file**.

If several panels belong to one numbered figure, combine the separate files **only in LaTeX** using `subcaption` / `subfigure`.

For example:

```latex
\begin{figure}[!htbp]
    \centering

    \begin{subfigure}{0.48\textwidth}
        \centering
        \includegraphics[width=\linewidth]{figure_a.pdf}
        \caption{Outcome A}
    \end{subfigure}
    \hfill
    \begin{subfigure}{0.48\textwidth}
        \centering
        \includegraphics[width=\linewidth]{figure_b.pdf}
        \caption{Outcome B}
    \end{subfigure}

    \caption{Main Figure Title}
    \label{fig:main}
    \begin{minipage}{0.95\textwidth}
    \footnotesize
    \textit{Notes:} ...
    \end{minipage}
\end{figure}
```

Adapt this to the existing manuscript style.

Do not unnecessarily change existing figure labels.

## Important

"Do not combine figures" means:

* separate underlying graphic files;
* combination, if needed, occurs in `.tex`;
* each panel remains independently editable;
* each panel can be resized without raster degradation.

---

# 22. FIGURE TITLES AND CAPTIONS BELONG IN LATEX

Do not place the figure title inside Python/Stata/R output.

Do not render:

> Figure 3: Event Study

inside the image.

The plotting file should contain only what must be inside the plotting region:

* axes;
* tick labels;
* plotted data;
* reference lines;
* essential legend.

Put in `.tex`:

* figure number;
* overall title;
* panel titles when they can be handled as `\caption{}`;
* explanatory notes;
* sample information;
* inference description;
* methodological qualifications;
* sources.

This keeps typography consistent with the manuscript.

---

# 23. DO NOT PUT TECHNICAL NOTES INSIDE THE GRAPH

Remove graphical annotations such as:

> alpha = 0.05

> CI = 95%

> clustered SE

> N = 1,842

> bandwidth = 10

> FE included

> specification 4

> preferred model

> baseline

unless the text is indispensable to identifying a plotted series.

Put methodological information in the figure note below the figure.

For example:

> \textit{Notes:} Bars report 95 percent confidence intervals based on standard errors clustered by district.

Do not make the reader decode methodological metadata inside the plot.

---

# 24. FIGURE LEGENDS

Place legends **below the x-axis title / plotting area**, not inside the data region, whenever space permits.

Prefer horizontal legends.

Use more columns rather than more rows.

The default priority is:

1. one row;
2. if impossible, two compact rows;
3. never create a tall stacked legend unless there is no alternative.

If there are four series, generally prefer four columns.

If there are three series, generally prefer three columns.

Do not let legends obscure estimates or confidence intervals.

Do not repeat information in both the legend and panel title.

Keep legend labels short and substantive.

Bad:

> Coefficient estimate for treated units

Better:

> Estimate

Bad:

> Lower 95 percent confidence interval

Better handled as a band/whisker without a separate legend item when obvious.

---

# 25. FIGURE VISUAL STYLE

Unless the substantive figure requires otherwise:

* use a white background;
* no decorative background;
* no box around the full graph;
* no 3D effects;
* no shadows;
* no gradients;
* no unnecessary grid;
* no decorative colors;
* no giant markers;
* no excessively thick lines;
* no unnecessary decimal precision;
* no unnecessary text inside the plotting region.

Axes should be easy to read after the figure is placed in the PDF at its actual manuscript size.

Use a consistent font size across all figures.

Use consistent:

* line widths;
* marker sizes;
* confidence-interval appearance;
* legend fonts;
* axis fonts;
* margins;
* figure dimensions.

---

# 26. COLOR

Do not use color merely because the software defaults to color.

For one-series figures, use a restrained monochrome or near-monochrome presentation.

For multiple series, distinguish them using some combination of:

* line pattern;
* marker shape;
* restrained color.

The figure should remain understandable when printed in grayscale whenever feasible.

When color is substantively necessary, use a restrained colorblind-readable palette.

Do not use rainbow palettes.

Do not use bright presentation-style colors.

Maps and heat maps are exceptions when color encodes substantive values.

---

# 27. AXES

Use substantive axis titles.

Bad:

> coeff

> beta

> x

> y

> residualized outcome

when a normal-language label exists.

Prefer:

> Employment rate

> Distance from project (km)

> Years relative to treatment

> Change in log income

Include units where needed.

Do not overlabel ticks.

Do not use excessive decimal places.

Use economically meaningful tick spacing.

Do not truncate an axis in a way that creates a misleading visual comparison.

At the same time, do not mechanically force zero onto an axis when zero is irrelevant and doing so destroys the figure's informational content.

Use identical axis limits across panels when direct visual comparison requires them.

---

# 28. REFERENCE LINES

Use reference lines only when analytically meaningful.

Examples:

* zero-effect horizontal line;
* treatment date;
* eligibility cutoff;
* policy threshold.

Make them visually secondary to the estimates.

Do not add reference lines merely as decoration.

Explain non-obvious reference lines in the figure note.

---

# 29. EVENT-STUDY / COEFFICIENT-PLOT STYLE

For event studies and coefficient plots:

* point estimates should be visually primary;
* confidence intervals should be visible but secondary;
* include a horizontal zero line;
* indicate treatment timing clearly where appropriate;
* do not connect coefficients with a heavy line unless the connection helps interpretation;
* do not use bars when point estimates with confidence intervals communicate the result more clearly;
* identify omitted/reference periods in the note rather than with verbose plot annotations;
* use consistent x-axis spacing and labels.

Do not add significance stars to coefficient plots.

Do not color significant and insignificant coefficients differently.

---

# 30. HISTOGRAMS AND DISTRIBUTIONS

Use reasonable bins already implied by the analysis.

Do not change binning to make a pattern look stronger.

Avoid glossy density overlays unless they add information.

If comparing distributions, use formats that remain readable without transparency tricks.

---

# 31. PYTHON FIGURE OUTPUT

If figures are rendered in Python, use Matplotlib or an equivalently controllable plotting library in a restrained style.

Do not use default notebook aesthetics.

Do not use Seaborn themes merely for decoration.

Do not use a chart title inside Python.

Prefer vector export:

```python
plt.savefig(
    output_path,
    bbox_inches="tight",
    format="pdf"
)
```

Use SVG when required by the manuscript workflow.

Use PNG only when the graphic genuinely requires raster output.

Do not rasterize ordinary coefficient plots, line plots, or scatterplots unnecessarily.

Close figures explicitly after export.

Keep the plotting code deterministic.

---

# 32. STATA FIGURE OUTPUT

If existing figures are produced in Stata, preserve the empirical content and impose the same house style:

* clean background;
* readable axes;
* restrained markers;
* compact legend below the graph;
* no graph title inside the exported object;
* titles and notes handled in LaTeX where possible;
* vector export when possible.

Do not reproduce Stata's default aesthetic blindly.

The objective is a polished economics-paper figure, not proof that Stata was used.

---

# 33. FIGURE NOTES

Every nontrivial empirical figure should be understandable from:

1. title;
2. axes;
3. legend;
4. note.

The note should state only information needed to interpret the figure, such as:

* unit of observation;
* sample;
* treatment/reference category;
* confidence interval;
* clustering level;
* normalization;
* relevant fixed effects;
* weighting;
* unusual construction.

Do not turn the note into another methodology section.

Do not include implementation details such as script names or variable names.

---

# 34. FIGURE FILE CONSISTENCY

Standardize figure dimensions.

Comparable panels should have comparable physical dimensions.

Do not allow one figure to use tiny labels and another huge labels.

Check every final figure **inside the compiled PDF**, not merely as a standalone image.

A graph that looks good at 12 inches wide may be unreadable at manuscript width.

---

# 35. TABLE STYLE

Tables should look like economics-paper tables.

Use LaTeX-native formatting whenever feasible.

Prefer `booktabs`-style horizontal rules.

Do not use:

* vertical lines;
* cell shading;
* colored cells;
* Excel-style boxes around every cell;
* unnecessary bold;
* unnecessary italics;
* decorative formatting.

Keep tables portrait-oriented when possible.

Do not force a table to contain excessive columns merely to save pages.

---

# 36. TABLE CONTENT

Use human-readable variable and outcome names.

Replace reader-facing raw names such as:

> ln_income_v3

> treat_post

> outcome_std2

with substantive names.

Do not change underlying code or mathematical variable names when needed for replication.

Column headings should tell the reader what differs across specifications.

Do not label columns merely:

> (1), (2), (3), (4)

without making the specification differences understandable through headers, row indicators, or notes.

---

# 37. TABLE INFERENCE

Use standard errors in parentheses when that is the manuscript convention.

Do not add numerical p-values.

Do not add asterisks merely to decorate significance.

If significance stars already exist throughout a frozen table system, do not inconsistently alter isolated tables during this pass. Preserve the manuscript-wide convention unless a purely stylistic global change can be made safely without changing values or meaning.

Economic magnitudes should be explained in prose rather than left for stars to communicate.

---

# 38. TABLE NOTES

A table note should explain:

* dependent variable units when not obvious;
* treatment definition when needed;
* sample;
* fixed effects;
* standard-error clustering;
* weights;
* omitted/reference categories;
* transformations needed to understand coefficients.

Do not list obvious information already visible in the table.

Do not mention:

* code commands;
* package names;
* temporary specifications;
* script files;
* object names.

---

# 39. TABLE AND FIGURE PLACEMENT

Place tables and figures reasonably close to the discussion that uses them, subject to the current LaTeX workflow.

Do not refer to a figure many pages before the reader sees it if that can be avoided.

Do not dump all main figures at the very end of a working paper merely because a software default does so, unless the target format specifically requires it.

---

# 40. MAIN TEXT VS APPENDIX

The main text must contain what is needed to:

* understand the question;
* understand the design;
* evaluate the central identifying assumptions;
* see the principal results;
* understand any qualification that materially changes the conclusion.

Move secondary material to the appendix when it interrupts this sequence.

Typical appendix material:

* large specification grids;
* secondary robustness;
* extended variable construction;
* alternative samples;
* secondary heterogeneity;
* influence diagnostics;
* derivations not needed to understand the economic mechanism;
* auxiliary figures;
* full sensitivity exercises after the key implication has been stated in the text.

Do not exile an identification problem to the appendix simply to make the main text cleaner.

---

# 41. APPENDIX STYLE

The appendix should remain independently readable but does not need to repeat the paper.

Use descriptive appendix headings.

Avoid reintroducing the entire research question.

Refer back to definitions from the paper where appropriate.

Keep proofs complete when proofs are necessary.

Keep technical detail necessary for replication or verification.

Condense rhetorical interpretation.

---

# 42. PROSE — HOUSE STYLE

Use plain economics prose.

Prefer:

* short declarative sentences;
* concrete nouns;
* active verbs;
* explicit economic units;
* direct statements of results;
* one main claim per sentence;
* paragraphs organized around one analytical function.

Vary sentence length naturally.

Do not make every sentence short.

Do not make every paragraph the same length.

Avoid a mechanical rhythm.

---

# 43. PARAGRAPH DISCIPLINE

Each paragraph should have a purpose.

A paragraph should generally do one of the following:

* motivate;
* define;
* describe data;
* explain identification;
* report a result;
* interpret a result;
* compare with literature;
* state a limitation;
* transition.

Do not combine four unrelated functions in one paragraph.

Delete paragraph-ending sentences that merely restate what the paragraph just said.

Do not begin and end a paragraph with the same claim in different words.

---

# 44. TRANSITIONS

Prefer logical continuity over explicit transition phrases.

Do not begin paragraph after paragraph with:

> Moreover,

> Furthermore,

> Additionally,

> Importantly,

> Notably,

> Finally,

> Taken together,

The relationship between paragraphs should usually be evident from their substantive content.

---

# 45. REMOVE AI-STYLE EVALUATIVE WORDS

Delete or rewrite unnecessary uses and grammatical variants of:

### Evaluative adverbs

* strikingly
* remarkably
* surprisingly
* interestingly
* tellingly
* crucially

### Artificial emphasis

* clearly
* obviously
* evidently
* undeniably
* simply put

### Formulaic connectors

* moreover
* furthermore
* additionally
* notably
* importantly
* indeed
* ultimately

### Inflated degree words

* sharply
* starkly

### Evaluative adjectives

* meaningful
* substantive
* sharpest
* cleanest
* striking
* stark
* dramatic
* compelling
* profound
* considerable
* marked

Use these only if they have an actual technical meaning that cannot be expressed by the data.

### Inflated adjectives

* pivotal
* crucial
* nuanced
* multifaceted
* myriad

### Inflated nouns

* realm
* landscape
* tapestry
* testament

### Inflated verbs

* underscore
* highlight
* showcase
* delve
* leverage
* harness
* illuminate
* unpack
* navigate

Prefer the literal action.

Bad:

> The estimates underscore the importance of...

Better:

> The estimates imply...

---

# 46. REMOVE FORMULAIC CONSTRUCTIONS

Remove or rewrite unnecessary instances of:

* rather than;
* em dashes used rhetorically;
* semicolons when two sentences work;
* not only ... but also;
* not merely ... but;
* not simply ... but;
* not just ... but;
* not because ... but;
* X is not A, but B;
* It is not A. It is B.;
* What X does is Y;
* It is important to note;
* It is worth noting;
* It is crucial to;
* It is essential to;
* It should be noted;
* serves to;
* plays a key role;
* in order to;
* a number of;
* we can see;
* in other words;
* put differently;
* that is to say;
* at first glance;
* it turns out;
* the point is;
* the key point is;
* the key insight is;
* what matters is;
* the one that matters;
* precisely where;
* exactly where;
* simply does not.

Do not perform blind regex deletion if a phrase has legitimate technical meaning.

Rewrite for natural prose.

---

# 47. RHETORICAL TRIPLES

Inspect lists of three claims.

Keep them when there are genuinely three distinct substantive objects.

Rewrite them when they exist only to create rhetorical rhythm.

Bad:

> The reform reshaped incentives, transformed institutions, and redefined political competition.

if these are three loose descriptions of one fact.

Use the concrete claim instead.

---

# 48. RHETORICAL QUESTIONS

Remove rhetorical questions unless they materially improve exposition.

Bad:

> Why might this happen?

> What explains this pattern?

Prefer:

> Two mechanisms could generate this pattern.

Do not make the paper sound like a lecture.

---

# 49. EMPHASIS

Do not tell the reader that something is important when you can explain why.

Bad:

> This is an important result.

Better:

> The estimate implies that the aggregate null masks offsetting effects across sectors.

Let the substantive content carry the emphasis.

---

# 50. AVOID META-PROSE

Remove unnecessary phrases such as:

> This section presents...

> We now turn to...

> We next explore...

> The purpose of this exercise is to...

> The goal of this subsection is...

> Before proceeding...

> Having established...

> With this in mind...

Begin with the substantive sentence whenever possible.

---

# 51. AVOID RESEARCH-PROCESS NARRATION

Do not narrate how the analysis was discovered.

Remove:

> Initially, we considered...

> We then noticed...

> This motivated us to run...

> We subsequently tested...

unless chronology is substantively relevant.

Write the final argument.

---

# 52. DEDUPLICATION

Treat semantic repetition as duplication even when the wording differs.

Remove or merge:

* repeated motivation;
* repeated institutional facts;
* repeated treatment definitions;
* repeated sample descriptions;
* repeated explanations of the estimator;
* repeated coefficient interpretations;
* repeated mechanism stories;
* repeated limitations;
* repeated contribution statements;
* repeated robustness claims;
* repeated explanations of the same figure;
* repeated conclusion sentences.

Legitimate repetition may remain across:

* abstract;
* introduction;
* main results;
* conclusion;

because these must be readable independently.

But even there, do not copy the same sentence.

---

# 53. CAVEATS — CALIBRATED, NOT DEFENSIVE

Preserve every unique material limitation.

Do not repeat it throughout the paper.

A reader should know the paper's limitations without feeling that the manuscript is arguing with a referee.

Avoid:

result → caveat → caveat to caveat → reassurance → repeated result.

Prefer:

result → necessary qualification → interpretation.

If a limitation takes one accurate sentence, do not give it a full paragraph.

Do not add qualifications merely because more qualifications are theoretically possible.

---

# 54. NULL RESULTS

Do not interpret failure to reject zero as proof of exact zero.

Do not write:

> There is no effect.

unless the design and precision genuinely support that statement.

Prefer wording calibrated to the estimate and interval:

> The point estimate is close to zero.

or:

> We find little evidence of an effect, although the confidence interval permits...

when that qualification materially matters.

Do not turn every null into a power discussion.

---

# 55. MECHANISMS

Distinguish:

* evidence identifying a mechanism;
* evidence consistent with a mechanism;
* descriptive evidence;
* suggestive evidence.

Do not say:

> This confirms the mechanism.

when the exercise only produces a pattern consistent with it.

At the same time, do not repeat "the mechanism is not separately identified" in every paragraph.

State the qualification once where it matters.

---

# 56. CODING ARTIFACTS

Remove reader-facing references to:

* script names;
* `.do` files;
* `.py` files;
* notebooks;
* directories;
* Git commits;
* temporary datasets;
* internal object names;
* merge flags;
* raw administrative codes;
* package commands;
* debug output;
* variable suffixes;
* `final2`;
* `clean_v3`;
* `spec4`;
* machine paths.

Translate implementation into research language.

Bad:

> We run `reghdfe` with absorb(region year).

Better:

> The specification includes region and year fixed effects.

Bad:

> We keep observations with `_merge==3`.

Better:

> The analysis uses observations matched across both data sources.

Preserve software citations when required for a genuinely nonstandard method or replication requirement.

---

# 57. TERMINOLOGY CONSISTENCY

Choose one substantive term for each object and use it consistently.

Check:

* treatment;
* exposure;
* outcome;
* unit;
* sample;
* policy;
* event;
* model parameter;
* estimator;
* specification.

Do not call the same object:

> exposure

then:

> treatment intensity

then:

> policy shock

unless they are actually different concepts.

Do not simplify terminology so far that distinct estimands become conflated.

---

# 58. NUMERIC STYLE

Use consistent rounding.

Do not report more precision in prose than economically meaningful.

For most empirical coefficients, the prose need not reproduce all digits shown in tables.

Example:

Table:

> -0.01487

Prose:

> approximately 1.5 percent

when that is the correct transformation.

Do not round a small nonzero estimate into a misleading zero.

Do not alter the underlying table value.

Use leading zeros:

> 0.15

not:

> .15

---

# 59. NUMBERS IN PROSE

Whenever a number appears in substantive prose, ask:

1. What is its unit?
2. What comparison does it represent?
3. Does the reader need the raw coefficient or its economic interpretation?
4. Is the same number stated elsewhere unnecessarily?
5. Does it match the current authoritative table/figure?

Prefer interpreted magnitudes to uninterpreted regression output.

---

# 60. ESTIMATOR JARGON

Use technical estimator names when they matter for identification.

Do not use them as substitutes for explanation.

Bad:

> We use a stacked inverse-probability-weighted doubly robust estimator.

if the reader still does not know who is compared to whom.

First explain the comparison in economic terms.

Then give the estimator name if needed.

---

# 61. EQUATIONS

Do not modify equations during this editorial pass except to correct purely typographical problems that are unquestionably non-substantive.

Check prose around equations.

Before or after each central equation, the reader should understand:

* what the equation represents;
* what is observed;
* what is estimated;
* what parameter answers the research question;
* what variation identifies it.

Do not re-explain obvious algebra line by line.

---

# 62. FOOTNOTES

Footnotes should carry genuinely secondary information.

Move into footnotes when appropriate:

* exact confidence level;
* minor sample details;
* technical qualifications;
* alternative terminology;
* nonessential institutional detail.

Do not hide central identification assumptions in footnotes.

Do not use footnotes as storage for paragraphs that should have been deleted.

Keep them concise.

---

# 63. FIGURE INFERENCE INFORMATION GOES IN NOTES

Details such as:

> alpha = 0.05

should **not** appear inside the graphic.

Write instead in the LaTeX figure note:

> Error bars report 95 percent confidence intervals.

Likewise, put clustering, weighting, fixed effects, sample definitions, and normalization in the note when necessary.

The image itself should remain visually clean.

---

# 64. DO NOT OVER-SIGNPOST TABLES AND FIGURES

Avoid prose such as:

> Table 2 presents the main results. Column 1 presents X. Column 2 then adds Y. Column 3 further adds Z.

when the reader can see that from the table.

Instead explain what changes economically.

Example:

> The estimate is stable as location and baseline controls are added (Table 2).

Discuss individual columns only when the comparison between them is analytically important.

---

# 65. TITLES AND LABELS

Use short substantive figure and table titles.

Bad:

> Results from Our Main Preferred Empirical Specification

Better:

> Effects on Household Income

Bad:

> Exploring Heterogeneity in the Main Treatment Effect

Better:

> Effects by Baseline Income

Do not put the estimation method into every title if the note already explains it.

---

# 66. CONSISTENCY BETWEEN TEXT AND EXHIBITS

Verify reader-facing prose against every current:

* table;
* figure;
* caption;
* note;
* equation;
* appendix table;
* appendix figure.

Check:

* signs;
* magnitudes;
* units;
* horizons;
* sample sizes;
* years;
* confidence levels;
* treatment timing;
* omitted groups;
* clustering;
* weights;
* fixed effects;
* preferred specifications;
* parameter roles.

Never substitute a number from another column because it appears more current.

The source must correspond to the same:

* outcome;
* sample;
* specification;
* estimator;
* horizon;
* unit.

---

# 67. REMOVE STALE DRAFTING LANGUAGE

Delete:

* TBD;
* XX;
* CHECK;
* TODO;
* insert citation;
* draft note;
* coauthor note;
* future-tense promises for completed analyses;
* references to deleted tables;
* references to old specifications;
* obsolete terminology;
* references to analyses no longer in the paper.

Do not invent missing information.

Flag unresolved items.

---

# 68. REFERENCES

Do not modify citation keys.

Check that reader-facing attribution is accurate.

Do not cite papers for claims they do not support.

Do not overcite routine statements.

Do not create giant citation clusters merely to signal literature coverage.

When several citations make the same point, keep the relevant set without unnecessary duplication.

Do not delete a citation if doing so would remove necessary attribution.

---

# 69. DO NOT ADD NEW LITERATURE DURING THIS PASS

This is an editorial pass, not a literature-search task.

Do not browse for new papers unless explicitly instructed separately.

Do not broaden the literature review merely because another citation could be added.

---

# 70. LENGTH AND COMPRESSION

Shorten the paper through:

* deduplication;
* fewer subsections;
* shorter transitions;
* moving secondary material to appendix;
* removing implementation detail;
* eliminating repeated caveats;
* compressing literature review;
* avoiding table narration.

Do not shorten by deleting:

* essential identification discussion;
* unique limitations;
* definitions needed to understand the estimand;
* evidence necessary to evaluate the main claim.

---

# 71. TARGET READING EXPERIENCE

After editing, a reader should be able to answer within the first few pages:

* What is the question?
* Why is it economically interesting?
* What is the empirical or theoretical design?
* What variation identifies the answer?
* What is the main result?
* How large is it?
* What is the main qualification?
* What is new relative to the closest literature?

If these answers are difficult to extract, continue editing.

---

# 72. WORKFLOW

Follow this order.

## Pass 1 — Baseline

1. Confirm the current Git baseline or create an untouched backup.
2. Compile the existing manuscript.
3. Record any pre-existing compilation warnings relevant to editing.

## Pass 2 — Read before editing

Read:

* abstract;
* introduction;
* all main sections;
* conclusion;
* appendices;
* tables;
* figures;
* captions;
* notes;
* equations.

Do not begin rewriting the opening page before understanding the current final results.

## Pass 3 — Architecture

Audit:

* section order;
* subsection count;
* main-text/appendix allocation;
* result ordering.

Merge unnecessary subsections.

Use plain subsection names.

## Pass 4 — Abstract and introduction

Rewrite these for:

* question;
* design;
* magnitudes;
* contribution;
* concision.

Enforce the 150-word abstract limit.

Remove undefined notation.

Remove p-values.

## Pass 5 — Result interpretation

Inspect every important reported coefficient.

Verify its functional form and units.

Translate it into economically interpretable language.

Pay special attention to the distinction between:

* percent;
* percentage points;
* log points;
* elasticities;
* standard deviations;
* levels.

Never guess the interpretation.

## Pass 6 — Prose cleanup

Perform:

* deduplication;
* AI-style removal;
* rhetoric removal;
* meta-prose removal;
* coding-artifact removal;
* terminology consistency.

## Pass 7 — Figures

Audit every figure.

Where needed:

* separate combined graphical files into individual panels;
* use LaTeX `subcaption`;
* move titles to `.tex`;
* move methodological text to figure notes;
* place legends below the x-axis region;
* increase legend columns and reduce rows;
* standardize typography and dimensions;
* export vector graphics.

Do not alter plotted numerical content.

## Pass 8 — Tables

Standardize:

* titles;
* notes;
* human-readable labels;
* spacing;
* horizontal rules;
* formatting.

Do not alter empirical values.

## Pass 9 — Conclusion

Rewrite only after the rest of the manuscript has stabilized.

Make it short and substantive.

## Pass 10 — Consistency audit

Check every changed quantitative statement against the authoritative current exhibit.

## Pass 11 — Compile

Compile LaTeX.

Fix only errors caused by the editorial changes.

Inspect actual PDF pages containing:

* abstract;
* introduction;
* every table;
* every figure;
* conclusion.

Check visual balance and readability.

## Pass 12 — Diff audit

Run `git diff`.

Inspect every changed block.

Verify that no substantive empirical or theoretical object changed.

Compare where feasible:

* numeric tokens;
* mathematical expressions;
* citation keys;
* labels;
* figure/table inclusion paths;
* references.

---

# 73. HARD FINAL CHECKS

Before finishing, confirm all of the following.

### Abstract

* [ ] ≤150 words.
* [ ] One paragraph.
* [ ] No citations.
* [ ] No p-values.
* [ ] No undefined symbols.
* [ ] Main design stated.
* [ ] Headline magnitude interpreted.
* [ ] No robustness laundry list.

### Introduction

* [ ] Research question appears early.
* [ ] Main design is understandable.
* [ ] Main estimate is interpreted in economic units.
* [ ] No undefined notation.
* [ ] No numerical p-values.
* [ ] Closest literature is positioned concisely.
* [ ] Section references appear only in the final roadmap.
* [ ] Roadmap is short.

### Structure

* [ ] Unnecessary subsections merged.
* [ ] No unnecessary subsubsections.
* [ ] Subsection titles are short and descriptive.
* [ ] Main result appears before secondary robustness.

### Results

* [ ] Raw coefficients are interpreted where needed.
* [ ] Percent and percentage points are never confused.
* [ ] Log specifications are interpreted correctly.
* [ ] Causal wording matches identification.
* [ ] Main vs robustness specifications are clearly distinguished.

### Figures

* [ ] Each underlying panel is a separate file.
* [ ] Multi-panel assembly occurs in LaTeX using `subcaption`.
* [ ] No chart title baked into image.
* [ ] No `alpha=0.05` or methodological clutter inside plotting area.
* [ ] Legends appear below the x-axis region where feasible.
* [ ] Legends use more columns rather than more rows.
* [ ] Figures are readable at manuscript size.
* [ ] Ordinary charts use vector output.
* [ ] Plotted numeric values did not change.

### Tables

* [ ] No unnecessary vertical lines.
* [ ] No shading.
* [ ] Human-readable labels.
* [ ] Notes explain inference and sample where necessary.
* [ ] No raw implementation names.
* [ ] Values did not change.

### Prose

* [ ] AI-style evaluative language removed.
* [ ] Rhetorical constructions reduced.
* [ ] No repeated caveat paragraphs.
* [ ] No research-process narration.
* [ ] No coding artifacts.
* [ ] No promotional language.
* [ ] No decorative subsection names.

### Conclusion

* [ ] No table-by-table summary.
* [ ] No new result.
* [ ] Main answer stated plainly.
* [ ] Main magnitude included when useful.
* [ ] No generic future-research ending.
* [ ] Ends on substantive implication.

---

# 74. FINAL REPORT

After editing, report only:

1. **Files edited.**

2. **Architecture**

   * sections moved;
   * subsections merged;
   * subsections renamed;
   * material moved between main text and appendix.

3. **Abstract**

   * original word count;
   * final word count.

4. **Introduction**

   * major compression/reordering performed;
   * undefined notation removed;
   * coefficient interpretations added.

5. **Quantitative prose**

   * number of coefficient interpretations corrected;
   * list any percent/percentage-point/log interpretation errors corrected.

6. **Prose cleanup**

   * duplicate passages removed;
   * AI-style/rhetorical constructions rewritten;
   * coding artifacts removed.

7. **Figures**

   * figures restyled;
   * combined image files separated;
   * panels assembled with `subcaption`;
   * legends reformatted;
   * titles moved to `.tex`;
   * notes moved out of plotting area;
   * output formats changed.

8. **Tables**

   * presentation changes only.

9. **Stale statements**

   * location;
   * before;
   * after;
   * authoritative source.

10. **Unresolved inconsistencies**

    * leave unchanged;
    * identify precisely.

11. **Compilation result.**

12. Explicit confirmation:

> No empirical estimate, standard error, confidence interval, sample, specification, equation, calibration, estimand, plotted value, causal claim, citation key, or substantive conclusion was changed.

13. Explicit confirmation:

> No empirical analysis was re-estimated. Any code execution was restricted to presentation-only figure rendering from frozen final outputs.

Do not include praise.

Do not tell me the paper is strong.

Do not give new methodological recommendations.

Do not propose new analyses.

Do not write a narrative of what you did.

Make the changes, audit them, compile, and report the concrete edits.

# EXHIBIT SEQUENCING AND PAGE FLOW — HARD RULE

The manuscript must maintain a clear alternation between substantive prose and empirical exhibits.

A table or figure should appear as part of the argument being developed in the surrounding paragraphs, not as part of an uninterrupted block of heterogeneous exhibits.

## Allowed sequences

The following structures are acceptable:

> Paragraph → Figure → Paragraph → Table

> Paragraph → Table → Paragraph → Figure

> Paragraph → Table → Paragraph → Table

> Paragraph → Figure → Paragraph → Figure

When two exhibits of the **same type** are closely related and genuinely need to be viewed together, the following may also be acceptable:

> Paragraph → Table → Table → Paragraph

> Paragraph → Figure → Figure → Paragraph

This exception should be used only when the two tables or two figures form one coherent empirical unit.

## Forbidden sequences

Do **not** allow a figure and a table to appear consecutively without substantive prose between them.

Forbidden:

> Paragraph → Figure → Table → Paragraph

> Paragraph → Table → Figure → Paragraph

Also avoid longer heterogeneous exhibit blocks such as:

> Paragraph → Figure → Table → Figure → Paragraph

> Paragraph → Table → Figure → Table → Paragraph

> Paragraph → Figure → Table → Table → Paragraph

> Paragraph → Table → Figure → Figure → Paragraph

A figure and a table must **never be adjacent merely because LaTeX float placement happens to put them together**.

If a figure is followed by a table, insert or preserve the substantive paragraph that completes the discussion of the figure and motivates the table.

If a table is followed by a figure, insert or preserve the substantive paragraph that interprets the table and explains why the figure is the next piece of evidence.

Do not create filler prose solely to satisfy this rule. If there is no substantive transition between a table and a figure, reconsider their ordering or placement.

---

# THE PARAGRAPH BETWEEN DIFFERENT EXHIBIT TYPES MUST DO ANALYTICAL WORK

The paragraph separating a figure from a table, or a table from a figure, must contain substantive economics prose.

It should normally do at least one of the following:

* interpret the preceding exhibit;
* state the economically relevant magnitude;
* explain what the preceding exhibit establishes;
* identify what remains unresolved;
* motivate why the next exhibit is needed;
* move from the main estimate to a decomposition;
* move from dynamics to levels;
* move from graphical evidence to regression estimates;
* move from regression estimates to heterogeneity or mechanisms;
* explain how the next exhibit changes or refines the interpretation.

A sentence such as:

> Table 3 reports additional results.

does **not** count as a substantive separating paragraph.

Neither does:

> We next turn to Figure 4.

Do not add mechanical transition paragraphs.

The prose must advance the empirical argument.

---

# CAPTIONS AND NOTES DO NOT COUNT AS PARAGRAPHS

For purposes of this rule:

* a figure caption is not a paragraph;
* a table title is not a paragraph;
* figure notes are not a paragraph;
* table notes are not a paragraph;
* a subsection heading is not a paragraph;
* a page break is not a paragraph;
* `\FloatBarrier` is not a paragraph.

Therefore this is still forbidden:

> Paragraph
> Figure
> Figure notes
> Table title
> Table
> Paragraph

because the figure and table remain substantively adjacent.

---

# SAME-TYPE CONSECUTIVE EXHIBITS

Two consecutive tables or two consecutive figures are permitted when there is a clear reason for displaying them together.

Examples:

> Paragraph → Table 2 → Table 3 → Paragraph

may be appropriate when Table 2 reports the main estimates and Table 3 reports the corresponding decomposition using exactly the same sample and organization.

Likewise:

> Paragraph → Figure 2 → Figure 3 → Paragraph

may be appropriate when the figures show two closely related outcomes or two complementary views of the same empirical pattern.

However, do not create long exhibit dumps.

As a general rule, avoid more than **two consecutive standalone exhibits** without substantive prose.

If three or more exhibits appear consecutively, inspect whether:

1. some belong in the appendix;
2. some should be combined as panels of the same numbered figure or table when substantively appropriate;
3. prose should intervene because the empirical argument changes between exhibits.

Remember that figure panels must still be stored as separate graphic files and assembled in LaTeX with `subcaption`.

---

# EXHIBITS SHOULD FOLLOW THEIR DISCUSSION

Whenever feasible, use this rhythm:

> Claim / setup → Exhibit → Interpretation → Next claim / setup → Next exhibit

rather than:

> Claim → Exhibit → Exhibit → Exhibit → delayed interpretation.

Do not make the reader encounter an exhibit before understanding why it is being shown.

Do not defer the interpretation of several exhibits to a paragraph appearing pages later.

The first substantive paragraph after an exhibit should normally discuss that exhibit or use its evidence to advance the argument.

---

# LATEX FLOAT PLACEMENT

Inspect the **compiled PDF**, not only the `.tex` source.

A logically correct source order is insufficient if LaTeX rearranges floats into a forbidden visual sequence.

After compilation, inspect every main-text page containing tables or figures.

If LaTeX creates:

> Paragraph → Figure → Table → Paragraph

even though the source file contains prose between them, adjust float placement so that the compiled manuscript respects the sequencing rule.

Use standard LaTeX float controls conservatively, including where appropriate:

* `[!htbp]`;
* `\FloatBarrier`;
* modest relocation of the exhibit call within the `.tex` source.

Do not force floats so aggressively that they create:

* large blank spaces;
* nearly empty pages;
* figures detached from their discussion;
* tables several pages away from their first substantive reference.

The objective is readable page flow, not rigid float positioning.

---

# FINAL EXHIBIT-FLOW AUDIT

During the final PDF inspection, check the actual visual sequence of every table and figure.

Confirm:

* [ ] No Figure → Table adjacency without a substantive paragraph between them.
* [ ] No Table → Figure adjacency without a substantive paragraph between them.
* [ ] Consecutive figures occur only when they form one coherent empirical block.
* [ ] Consecutive tables occur only when they form one coherent empirical block.
* [ ] No long uninterrupted exhibit dumps.
* [ ] Every exhibit is introduced or motivated by nearby prose.
* [ ] Every important exhibit receives nearby substantive interpretation.
* [ ] Captions, notes, headings, and page breaks are not being treated as substitute prose.
* [ ] The compiled PDF, not merely the LaTeX source, satisfies these rules.

Use the paper's empirical argument to determine placement.

The desired visual rhythm is:

> **Prose → evidence → interpretation → prose → evidence**

not:

> **Prose → heterogeneous exhibit stack → prose.**





# REMOVE INTERNAL IMPLEMENTATION DETAILS FROM THE MANUSCRIPT — HARD RULE

The manuscript is an academic economics paper, not documentation for the replication package.

Actively search the **entire manuscript, including appendices, table notes, figure notes, captions, footnotes, and supplementary sections**, for material that exposes internal research implementation.

Remove it from the paper when it is not substantively necessary for understanding or reproducing the econometric method at the conceptual level.

The manuscript should explain:

* what is estimated;
* from which data;
* using which sample;
* with which estimator;
* under which assumptions;
* with which fixed effects, weights, clustering, or inference procedure when relevant.

It should **not** explain the internal file architecture used by the authors to obtain those results.

---

# INTERNAL FILES, SCRIPTS, AND OUTPUTS

Remove reader-facing references to internal filenames such as:

* `.py` files;
* `.do` files;
* `.R` files;
* `.jl` files;
* notebooks;
* shell scripts;
* `.csv` intermediate files;
* `.dta` intermediate files;
* `.tex` macro-output files;
* temporary output files;
* serialized model objects;
* directories;
* file paths.

Examples to remove:

> `hrs_final.py`

> `hrs_brr.py`

> `hrs_stress.py`

> `make_figures.py`

> `frozen_ladder.csv`

> `fig3_cells.csv`

> `results.tex`

> `code/analysis/`

> `output/final/`

Do not replace these with prettier filenames.

Remove the implementation reference altogether and state the underlying research procedure when that information matters.

---

# REPLICATION-PACKAGE DOCUMENTATION DOES NOT BELONG IN THE PAPER

Material whose purpose is to explain how to operate the replication package should be removed from the manuscript.

This includes:

* order of script execution;
* dependency chains among scripts;
* which file generates which table;
* which program writes which figure;
* which intermediate dataset feeds another script;
* names of stored plot-ready outputs;
* statements that a script "runs last";
* statements that scripts are independent;
* build instructions;
* compilation instructions;
* directory structure;
* Git information;
* checksums;
* machine-specific instructions;
* software environments;
* package installation instructions.

Such material belongs in:

* the replication README;
* replication documentation;
* a codebook;
* a data appendix distributed with the replication package;

not in the academic manuscript.

Do not create or modify those external replication documents during this editorial pass unless separately instructed.

---

# REMOVE REPRODUCIBILITY SECTIONS THAT ONLY DOCUMENT CODE PROVENANCE

Inspect any section or appendix titled:

* Reproducibility;
* Replication;
* Computational details;
* Code provenance;
* Data and code;
* Order of execution;
* Computational implementation;

or similar.

If its substantive content consists primarily of:

* script names;
* filenames;
* execution order;
* file provenance;
* software commands;
* output locations;

remove that section from the manuscript.

For example, a section of the form:

> Every empirical quantity is defined once in a macro file...

followed by a table mapping:

> Table 1 → `script_a.py` → `results.tex`

should **not remain in the paper**.

Likewise, remove prose such as:

> `make_figures.py` runs last because it reads `frozen_ladder.csv`.

This is replication-package documentation, not scholarly exposition.

---

# DO NOT REPLACE INTERNAL DOCUMENTATION WITH GENERIC REPRODUCIBILITY RHETORIC

Do not replace a deleted implementation appendix with filler such as:

> All analyses are fully reproducible.

> Our transparent workflow ensures reproducibility.

> We follow best practices for computational reproducibility.

If the paper does not need a reproducibility section, simply remove it.

If the journal requires a data/code availability statement, keep only the minimal required statement and follow the journal's format.

---

# SOFTWARE COMMANDS AND PACKAGE NAMES

Remove commands and function names from reader-facing prose when the underlying statistical procedure can be described directly.

Examples:

Bad:

> We estimate the specification using `reghdfe`.

Better:

> We estimate the specification with district and year fixed effects.

Bad:

> Standard errors are obtained with `vce(cluster district)`.

Better:

> Standard errors are clustered at the district level.

Bad:

> We use `xtreg, fe`.

Better:

> We estimate unit fixed-effects models.

Bad:

> We use `coefplot` to construct Figure 3.

Delete this entirely. The plotting software is irrelevant to the economic argument.

Bad:

> We use `collapse` to aggregate observations.

Better, if substantively relevant:

> We aggregate observations to the district-year level.

Bad:

> We use `egen` to construct the index.

Better:

> We construct the index as...

Describe the statistical or economic operation, not the command used to perform it.

---

# STATA, R, PYTHON, JULIA, MATLAB, AND OTHER SOFTWARE

Do not mention software merely because it was used.

Remove statements such as:

> The analysis was conducted in Stata.

> Figures were produced in Python.

> We use R for data cleaning.

> The structural model was coded in Julia.

unless:

1. the journal explicitly requires software disclosure;
2. a nonstandard package is scientifically necessary to identify the estimator;
3. reproducibility requires a formal citation to specialized software;
4. the software itself materially affects the methodology.

Ordinary use of Stata, Python, R, MATLAB, or Julia is implementation detail.

---

# INTERNAL VARIABLE NAMES

Search for raw variable names throughout the manuscript.

Remove reader-facing names such as:

* `female`;
* `gender`;
* `sexvar`;
* `age_yrs`;
* `srh`;
* `smoker`;
* `ln_income`;
* `treat_post`;
* `belief_low`;
* `belief_high`;
* `weight_final`;
* `cluster_id`;
* `wave`;
* administrative variable codes;
* survey question IDs;
* generated-variable names.

Replace them with the corresponding substantive concept.

Examples:

Bad:

> We condition on `female`.

Better:

> We condition on respondent sex.

Bad:

> The model includes `srh`.

Better:

> The model includes self-rated health.

Bad:

> We construct the outcome from `R1234`.

Better:

> We construct the outcome from respondents' reported probability...

Only retain an original survey variable name or administrative code when it is genuinely useful for replication, and preferably place it in a replication codebook rather than the manuscript.

---

# VARIABLE LABELS MUST MATCH THE ACTUAL CONCEPT

Do not mechanically reproduce labels inherited from software or raw datasets.

Use the scientifically correct substantive term.

For example, if the underlying variable records **respondent sex**, do not call it "Gender" merely because a raw variable, legacy label, plotting label, or internal code uses that word.

Use:

> Sex

or, when clearer:

> Respondent sex

If the underlying data actually measure gender rather than sex, use "gender."

Do **not** silently change the concept.

Check the variable definition or the manuscript's authoritative data description before standardizing terminology.

Apply the same principle to all variables:

* use the substantive construct;
* not the internal label;
* not the abbreviated code;
* not the software-generated name.

---

# INTERNAL SPECIFICATION NAMES

Remove internal names such as:

* baseline1;
* spec2;
* spec3b;
* preferred_v4;
* main_final;
* robustness2;
* modelA;
* modelB;
* treatment_alt;
* sample_clean;
* fullRE_test.

Replace them with substantive descriptions when necessary.

Bad:

> Spec 3B produces a similar estimate.

Better:

> The estimate is similar when age and health are added to the information set.

Bad:

> Model 4 is our preferred model.

Better:

> Our preferred specification conditions additionally on smoking status.

Do not force descriptive prose when the table already makes the specification clear.

---

# INTERNAL SAMPLE AND DATASET NAMES

Remove internal names for analytical datasets.

Bad:

> We use the `hrs_analysis_final` sample.

Better:

> The analysis sample contains respondents satisfying the eligibility criteria described above.

Bad:

> After merging with `hrs_clean_v2`, ...

Better:

> After linking respondents across the two data sources, ...

Do not tell the reader how the data object is named internally.

---

# RAW CATEGORY LABELS

Inspect category labels inherited directly from code.

Replace machine-facing or awkward labels with publication-quality language.

Examples:

Bad:

> `Male = 0`

> `Female = 1`

> `smoke_yes`

> `agebin_3`

> `health_4`

Better:

> Men / Women

> Smoker / Nonsmoker

> Age 65–74

> Fair or poor health

Use categories actually supported by the data.

Do not invent or reinterpret categories.

---

# FIGURE LEGENDS AND AXES MUST ALSO BE CLEANED

Internal terminology often survives inside figures even after the prose has been cleaned.

Inspect:

* legends;
* x-axis labels;
* y-axis labels;
* tick labels;
* panel names;
* annotations.

Remove labels such as:

> `female`

> `sex=1`

> `SRH`

> `smoke`

> `spec5`

> `RE_fail`

> `full_re`

> `atom`

when a clear substantive label is available.

Use publication-facing terminology.

For example:

Bad:

> * gender

if the underlying variable is respondent sex.

Better:

> * sex

Bad:

> * SRH

Better:

> * self-rated health

Bad:

> RE fail

Better:

> Not rationalizable

only if that wording accurately represents the object plotted.

Do not change the substantive definition while improving the label.

---

# TABLE ROWS AND COLUMN HEADINGS

Apply the same cleanup to tables.

No raw code-facing labels in publication tables.

Bad:

> female

> age2

> srh

> smoke

> full_re

> brr_se

Better:

> Sex

> Age

> Self-rated health

> Smoking status

> Full-information restriction

> BRR standard error

Use the terminology established by the paper.

---

# LATEX MACROS ARE INTERNAL TOO

It is acceptable for the `.tex` source to use macros internally.

For example:

```latex
\newcommand{\mainestimate}{0.065}
```

may remain in the source if it is part of the author's workflow.

But the prose should never describe this architecture.

Delete sentences such as:

> Every number in the paper is defined once in a macro file.

> Numerical quantities are called through named macros.

> Tables read directly from `results.tex`.

Those are implementation facts.

The compiled paper should contain only the scientific content.

---

# DO NOT REMOVE REAL METHODOLOGICAL INFORMATION

This rule does **not** mean removing technical detail that determines the estimand or inference.

Keep statements such as:

> We use balanced repeated replication with the survey-provided replicate weights.

> Standard errors account for clustering at the household level.

> We estimate the model using survey weights.

> The exact test accounts for interval-valued responses.

if these statements are methodologically relevant.

The distinction is:

**KEEP the statistical procedure.**

**REMOVE the software implementation of that procedure.**

For example:

Keep:

> We compute uncertainty using balanced repeated replication.

Remove:

> `hrs_brr.py` computes the BRR estimates.

Keep:

> Figure 3 reports cell-level rationalizability rates.

Remove:

> Figure 3 reads `fig3_cells.csv`.

Keep:

> Each figure panel is exported separately and assembled in LaTeX

only if this information is needed as an editorial instruction.

Do **not** state it in the final manuscript.

---

# SPECIAL RULE FOR APPENDICES

An appendix is not permission to expose internal implementation details.

The same publication standard applies to appendices.

Technical appendices may contain:

* derivations;
* proofs;
* detailed variable definitions;
* estimator formulas;
* additional diagnostics;
* robustness results;
* sampling procedures;
* survey design details.

They should not contain:

* script inventories;
* filenames;
* build order;
* code provenance tables;
* file dependencies;
* plotting instructions.

Move such information out of the manuscript rather than hiding it in an appendix.

---

# DELETE PROVENANCE TABLES BASED ON CODE FILES

A table whose rows are paper objects and whose entries are generating scripts or output filenames should be removed from the manuscript.

For example, delete tables structured as:

| Object   | Generating script and output |
| -------- | ---------------------------- |
| Table 1  | `analysis.py → results.tex`  |
| Figure 1 | `make_figures.py → fig1.pdf` |

Do not convert this into prose.

Do not retain it as an appendix table.

It belongs in the replication package documentation.

Preserve actual scientific provenance when relevant, such as:

* data source;
* survey;
* administrative registry;
* years;
* sample construction.

"Provenance" in the manuscript should mean **data provenance**, not internal code provenance.

---

# FINAL INTERNAL-ARTIFACT SEARCH

Before finishing, search the complete manuscript source for at least:

```text
.py
.do
.R
.jl
.m
.csv
.dta
.tex
.pkl
.json
reghdfe
areg
xtreg
regress
ivreg
ivreghdfe
esttab
estout
coefplot
matplotlib
pandas
numpy
statsmodels
ggplot
fixest
lfe
script
notebook
directory
folder
path
output
input
merge
_merge
spec1
spec2
final
clean
temp
tmp
```

Do not delete matches blindly.

Inspect each occurrence and remove or rewrite reader-facing implementation artifacts.

Also search for raw variable names and labels specific to the project.

---

# FINAL CHECKLIST — INTERNAL VS PUBLIC-FACING LANGUAGE

Confirm:

* [ ] No script names appear in the compiled manuscript.
* [ ] No internal filenames appear in the compiled manuscript.
* [ ] No directory or path names appear.
* [ ] No execution-order instructions appear.
* [ ] No code-provenance table remains.
* [ ] No plotting-program names appear without a methodological reason.
* [ ] No ordinary Stata/R/Python commands appear in prose.
* [ ] No raw variable names appear where substantive labels can be used.
* [ ] No internal specification names appear.
* [ ] No temporary dataset names appear.
* [ ] Figure legends contain publication-facing terminology.
* [ ] Table labels contain publication-facing terminology.
* [ ] "Sex" and "gender" are used according to what the underlying variable actually measures.
* [ ] Relevant estimators, weighting procedures, clustering, survey design, and inference methods remain described in substantive statistical language.
* [ ] Replication-package documentation has not been confused with manuscript content.

The governing rule is:

> **Describe the economics, data, estimand, and statistical procedure. Do not describe the authors' internal computational plumbing.**

# FIGURE STANDARD — ECONOMICS PAPER HOUSE STYLE

Apply one consistent visual standard to **every empirical figure in the manuscript and appendix**.

The target is not a presentation, dashboard, newspaper graphic, or generic Python visualization.

The target is a **clean publication-quality economics-paper figure**.

The visual principles are based on common economics publication practice and the guidance in:

* Schwabish (2014), *Journal of Economic Perspectives*, “An Economist’s Guide to Visualizing Data”;
* American Economic Association figure and table guidance;
* Quarterly Journal of Economics manuscript preparation guidance;
* J-PAL guidance for research data visualization.

The governing principles are:

> **Show the data. Reduce clutter. Make the empirical object visually dominant. Use color only when it encodes information. Make the figure interpretable in grayscale.**

Do not imitate the default appearance of Stata, Python, R, MATLAB, Excel, or any other software.

The software used to create the figure should not be visually identifiable from the final manuscript.

---

# 1. ONE VISUAL LANGUAGE FOR THE ENTIRE PAPER

All figures must belong to the same visual system.

Standardize across the manuscript:

* font family;
* font sizes;
* axis-title sizes;
* tick-label sizes;
* line widths;
* marker sizes;
* confidence-interval appearance;
* legend appearance;
* background;
* grid treatment;
* reference-line treatment;
* color mapping;
* figure dimensions;
* panel dimensions;
* margins.

Do not allow each script or graph type to invent its own aesthetic.

A coefficient plot, event study, descriptive trend, histogram, scatterplot, and mechanism figure should visibly belong to the same paper.

---

# 2. COLOR IS INFORMATION, NOT DECORATION

Do not assign different colors merely to make a graph look attractive.

Every use of color must encode a substantive distinction.

Examples of legitimate distinctions include:

* treatment versus comparison;
* observed versus counterfactual;
* different outcomes;
* different groups;
* different information sets;
* positive versus negative values;
* levels of an ordered quantity.

Do not use a new color for:

* every bar;
* every year;
* every coefficient;
* every category;

when those elements do not represent substantively different groups.

If one series is sufficient, use one series.

---

# 3. DEFAULT TO BLACK, GRAY, AND ONE ACCENT

For simple one-series figures, do **not** use a categorical color palette.

Default visual hierarchy:

### Main empirical estimate

Near-black:

`#222222`

### Secondary/non-focal elements

Medium gray:

`#7A7A7A`

### Background/context observations

Light gray:

`#C7C7C7`

### Reference lines

Very light gray:

`#BDBDBD`

Use color only when a substantive comparison requires it.

The main estimate should normally be the darkest visual object in the graph.

Gridlines, reference lines, confidence bands, and contextual observations must never be visually stronger than the estimate.

---

# 4. FIXED QUALITATIVE COLOR PALETTE

When genuinely distinct unordered groups require color, use a fixed ColorBrewer qualitative palette rather than software defaults.

Use the ColorBrewer **Dark2** family for lines, markers, and small graphical elements that require strong separation.

Canonical sequence:

1. Teal: `#1B9E77`
2. Orange: `#D95F02`
3. Purple: `#7570B3`
4. Magenta: `#E7298A`
5. Green: `#66A61E`
6. Mustard: `#E6AB02`
7. Brown: `#A6761D`
8. Gray: `#666666`

Do not automatically use all eight colors.

Normally use no more than **three or four distinct colors in one figure**.

If more than four categories are required, first ask whether:

* some categories can be grouped;
* the graph should use small multiples;
* direct labeling can replace a legend;
* some groups should be shown in gray;
* only focal groups need emphasis.

Do not create a rainbow effect.

---

# 5. MUTED FILLS

When filled areas, bars, densities, or large geometric objects require categorical color, prefer the more muted ColorBrewer **Set2** palette:

1. `#66C2A5`
2. `#FC8D62`
3. `#8DA0CB`
4. `#E78AC3`
5. `#A6D854`
6. `#FFD92F`
7. `#E5C494`
8. `#B3B3B3`

Again, do not use all colors merely because they are available.

Dark2 is generally preferable for:

* lines;
* point estimates;
* small markers.

Set2 is preferable for:

* large filled regions;
* grouped bars;
* large categorical areas.

Keep this distinction consistent throughout the manuscript.

---

# 6. DO NOT CHANGE THE MEANING OF A COLOR ACROSS FIGURES

Color semantics must be consistent.

If orange represents the treatment group in Figure 2, orange should not represent the control group in Figure 5.

If gray represents comparison or background units, preserve that meaning throughout the manuscript.

If one series is the paper’s central object, it should receive the same visual treatment whenever possible.

Create one centralized palette definition in the plotting code and reuse it everywhere.

Do not manually redefine colors independently inside each figure script.

---

# 7. REDUNDANT ENCODING — COLOR MUST NEVER BE THE ONLY SIGNAL

Every important distinction should remain understandable when the figure is printed in grayscale.

Where multiple series appear, combine color with at least one additional distinction when necessary:

* solid versus dashed line;
* circle versus square marker;
* filled versus hollow marker;
* direct labels;
* different line weights when appropriate.

Do not rely on red versus green alone.

Do not create a figure where two economically distinct series become indistinguishable after conversion to grayscale.

As part of the final figure audit, inspect every figure in grayscale.

---

# 8. SEQUENTIAL DATA

When color represents an **ordered magnitude** from low to high, do not use the qualitative palette.

Use a sequential ColorBrewer scale.

Default:

> **Blues**

Light values should correspond to lower values and darker values to higher values unless substantive convention requires the reverse.

Examples:

* exposure intensity;
* probability;
* concentration;
* density;
* frequency;
* magnitude of a nonnegative variable.

Do not assign arbitrary unrelated hues to ordered values.

The visual ordering must match the numerical ordering.

---

# 9. DIVERGING DATA

When values have a meaningful center and departures in opposite directions have different substantive meanings, use a diverging scale.

Examples:

* negative versus positive effects;
* changes relative to zero;
* deviations from a benchmark;
* gains versus losses.

Use a ColorBrewer diverging palette that remains interpretable under color-vision deficiency and grayscale testing.

The neutral value must receive the neutral midpoint of the palette.

Do not use a diverging palette merely because it looks attractive.

Do not use a diverging palette for a variable that runs simply from low to high.

---

# 10. NEVER USE RAINBOW / JET PALETTES

Do not use:

* rainbow;
* jet;
* spectral rainbow-like gradients;
* arbitrary hue wheels.

Do not encode a continuous numerical variable through a sequence of unrelated hues.

Use sequential or diverging palettes matched to the structure of the data.

---

# 11. WHITE BACKGROUND

Every standard statistical figure should use a white background.

No:

* Stata blue-gray background;
* gray plotting rectangle;
* colored plotting area;
* gradients;
* paper texture;
* shadows.

The background should disappear into the page.

The graph should look as if its data were drawn directly onto the manuscript.

---

# 12. NO OUTER GRAPH BOX

Do not draw a rectangular frame around the complete plotting area unless the geometry of the figure genuinely requires it.

Prefer:

* left axis;
* bottom axis;

or similarly restrained framing.

Remove decorative top and right borders when they add no information.

---

# 13. GRIDLINES

Default:

> **No gridlines.**

Add gridlines only when readers genuinely need them to recover approximate numerical values.

When used:

* use horizontal gridlines only unless vertical ones have substantive value;
* make them thin;
* make them very light gray;
* place them visually behind the data.

Never allow a zero gridline or regular gridline to be darker or thicker than the coefficient series.

A zero-effect reference line is analytically different from a decorative gridline and may be retained.

---

# 14. VISUAL HIERARCHY

The order of visual emphasis should normally be:

1. Main estimate or observed data.
2. Economically relevant comparison.
3. Confidence interval or uncertainty.
4. Reference line.
5. Axis.
6. Grid or contextual background.

The darkest and thickest graphical object should generally correspond to the empirical information the reader is supposed to inspect.

Do not make:

* axes;
* zero lines;
* gridlines;
* borders;

more salient than the data.

---

# 15. FIGURE TYPE MUST MATCH THE QUESTION

Do not use a graph type merely because it is convenient to code.

Use:

### Coefficient plots

for estimates across outcomes, specifications, groups, or horizons.

### Event-study plots

for dynamic treatment effects relative to treatment timing.

### Line plots

for genuine ordered/time relationships.

### Scatterplots

for relationships between two continuous variables.

### Histograms/density plots

for distributions.

### Horizontal bar charts

for comparisons among unordered categories when bars are appropriate.

### Maps

only when geography itself carries information.

Avoid pie charts.

Avoid donut charts.

Avoid 3D charts.

Avoid gauges.

Avoid dashboard-style graphics.

Avoid decorative infographics.

---

# 16. BAR CHARTS

Bars encode length and require a meaningful baseline.

Therefore bar charts should normally start at zero.

Do not truncate the axis of a bar chart to exaggerate differences.

Do not give every bar a different color when categories can be identified directly.

If category labels are long, use horizontal rather than vertical bars.

Do not rotate long category labels vertically simply to force them under columns.

---

# 17. LINE AND COEFFICIENT FIGURES DO NOT MECHANICALLY REQUIRE ZERO

Do not mechanically force zero onto the axis of every graph.

For coefficient plots, event studies, time series, and scatterplots, choose axis limits that display the economically relevant variation without creating a misleading impression.

The distinction is:

* bars generally require a zero baseline because length encodes magnitude;
* point and line plots may use a narrower range when clearly labeled and analytically appropriate.

Never manipulate the range to make an economically small change appear dramatic.

---

# 18. COEFFICIENT PLOTS — DEFAULT STYLE

For regression coefficient plots:

* point estimates are the primary visual object;
* display confidence intervals;
* use points and whiskers rather than bars;
* include a restrained zero reference line;
* do not add significance stars;
* do not color estimates according to whether `p < 0.05`;
* do not write numerical p-values beside estimates;
* do not use different colors for each coefficient without substantive reason.

Preferred visual hierarchy:

> dark point estimate → thinner confidence interval → light zero line.

When several families of estimates appear, distinguish families consistently using the fixed house palette.

---

# 19. EVENT STUDIES — DEFAULT STYLE

Event-study figures should have a common manuscript-wide design.

Use:

* point estimate at each event time;
* confidence interval;
* horizontal zero-effect line;
* vertical treatment-time reference when useful;
* clear omitted/reference period;
* readable event-time ticks.

Do not:

* use bars for every event-time coefficient;
* color significant coefficients differently;
* fill post-treatment periods with decorative background color;
* place significance stars;
* print p-values;
* connect points with an excessively thick line.

If coefficients are connected, use a thin restrained line.

The point estimates and confidence intervals remain primary.

State the omitted period and inference procedure in the LaTeX note, not inside the graph.

---

# 20. CONFIDENCE INTERVALS

Represent uncertainty directly when it is relevant.

Prefer:

* thin whiskers for coefficient plots;
* restrained confidence bands for smooth/time-series plots.

The confidence interval must be visible but visually secondary to the point estimate.

Do not use:

* giant caps;
* opaque dark confidence bands;
* significance coloring;
* stars as a substitute for uncertainty.

Use the same confidence level throughout comparable figures unless the manuscript has a substantive reason not to.

State the confidence level in the figure note rather than writing `alpha = 0.05` inside the plot.

---

# 21. CONFIDENCE BANDS

If using a confidence band:

* use the same hue as the focal series where appropriate;
* substantially reduce visual weight;
* use moderate transparency;
* keep the central estimate clearly visible.

Do not allow overlapping transparent bands to generate misleading new colors.

When several confidence bands overlap heavily, consider:

* whiskers;
* small multiples;
* separate panels;

instead.

---

# 22. MARKERS

Markers should be large enough to remain visible in the final compiled PDF but not so large that they dominate the confidence intervals.

Use a consistent set.

Recommended default hierarchy:

* circle: primary series;
* square: secondary series;
* triangle: third series;

only when marker differentiation is necessary.

Do not use a different marker for every observation.

Do not combine many decorative marker shapes.

---

# 23. LINE STYLES

Default:

* primary series: solid;
* secondary series: dashed;
* tertiary series: dotted or dash-dot only when required.

Do not use seven different line patterns in one graph.

When more than approximately four series are necessary, reconsider the visual design.

Prefer small multiples or direct labeling.

---

# 24. DIRECT LABELING

When practical, label important series directly near the data instead of forcing the reader repeatedly between the plot and a distant legend.

Direct labels are particularly useful for:

* a few time-series lines;
* selected groups among many background groups;
* endpoint comparisons.

However, do not clutter dense coefficient or event-study plots with text.

Use judgment.

---

# 25. LEGENDS

When a legend is necessary, place it outside the plotting data region.

For this manuscript, default to:

> **below the x-axis / x-axis title**

and centered relative to the graph.

Prefer a horizontal legend.

Use **more columns rather than more rows**.

Examples:

* 2 series → 2 columns;
* 3 series → 3 columns;
* 4 series → 4 columns when width permits;
* 5–6 series → consider whether the graph itself is too complex before creating a multi-row legend.

Avoid legends inside the data region.

Avoid boxed legends.

Avoid a legend title unless it adds essential information.

Do not repeat the figure title in the legend.

Keep labels concise and substantive.

---

# 26. LABELS MUST BE HUMAN-READABLE

Never expose raw code labels.

Bad:

> `full_re`

> `sex_1`

> `treat_post`

> `SRH`

> `spec4`

> `beta`

Use substantive labels.

For example:

> Full information

> Women

> Treated

> Self-rated health

Use “Sex” rather than “Gender” when the underlying variable measures respondent sex.

Do not silently change the scientific meaning of a variable merely to improve wording.

---

# 27. AXIS TITLES

Axis titles must state the substantive quantity.

Use units whenever necessary.

Good:

> Years relative to treatment

> Effect on employment (percentage points)

> Distance from project (km)

> Household income (log points)

> Probability

Bad:

> coefficient

> beta

> estimate

> x

> y

> var1

Avoid redundant phrases such as:

> Estimated coefficient

when the figure already clearly displays estimates.

---

# 28. TICK LABELS

Use economically meaningful precision.

Do not show:

> 0.000000

when:

> 0

is sufficient.

Maintain consistent decimal precision across comparable ticks.

Use leading zeros:

> 0.5

not:

> .5

Do not overcrowd an axis with ticks.

If every year is not necessary, do not print every year.

Do not rotate labels unless necessary.

Prefer horizontal labels.

---

# 29. TITLES DO NOT BELONG INSIDE THE GRAPHIC FILE

Do not generate the main figure title in:

* Python;
* Stata;
* R;
* Julia;
* MATLAB.

The graphic file should not contain:

> Figure 3. Main results

or:

> Main results

as a baked-in chart title.

Place the numbered figure title in LaTeX:

```latex
\caption{Main results}
```

Likewise, use LaTeX `subcaption` for panel titles whenever possible.

This ensures consistent manuscript typography.

---

# 30. FIGURE NOTES DO NOT BELONG INSIDE THE GRAPH

Do not write inside the image:

* `alpha = 0.05`;
* `95% CI`;
* `clustered SE`;
* sample size;
* estimator name;
* fixed effects;
* controls;
* bandwidth;
* preferred specification;
* source information;
* panel explanations.

Put those in the LaTeX figure note.

The plotting area should contain only information needed to interpret the data visually.

---

# 31. PANEL CONSTRUCTION

Never create multi-panel figures as one permanent combined graphic using:

* Python `subplot`;
* Matplotlib `subplots`;
* `GridSpec`;
* Stata `graph combine`;
* R patchwork/cowplot;
* equivalent image-level combination.

Each panel must exist as a separate vector graphic.

Combine panels only in LaTeX using `subcaption` / `subfigure`.

This allows:

* consistent sizing;
* independent panel editing;
* manuscript-native panel captions;
* cleaner typography.

Each graphic file should therefore represent **one panel only**.

---

# 32. PANEL CONSISTENCY

Panels belonging to the same numbered figure must use:

* identical font sizes;
* identical marker sizes;
* identical line weights;
* compatible dimensions;
* consistent legend treatment;
* consistent color semantics.

Use common axis limits when direct comparison across panels requires them.

Do not impose identical limits when the underlying quantities have genuinely incomparable scales.

---

# 33. VECTOR OUTPUT

Ordinary statistical graphics must be exported as vector graphics.

Preferred:

> PDF

Acceptable when required:

> EPS or SVG

Do not export ordinary:

* coefficient plots;
* event studies;
* line graphs;
* scatterplots;
* histograms;

as low-resolution PNG or JPEG.

Raster output is appropriate for genuine raster objects such as photographs or some maps.

---

# 34. FINAL-SIZE LEGIBILITY

Judge the graph **inside the compiled manuscript**, not in the plotting window.

A graph that is readable when opened fullscreen may become unreadable at 0.48 or 0.8 `\textwidth`.

After compilation, inspect:

* tick labels;
* axis labels;
* legend;
* marker size;
* confidence intervals;
* annotations.

Nothing essential should require zooming substantially beyond the normal PDF page view.

---

# 35. FONT

Use one sans-serif font family consistently inside all statistical graphics unless the manuscript already has a deliberate unified alternative.

Do not mix:

* Times in one figure;
* Arial in another;
* DejaVu in another;
* Stata default fonts elsewhere.

The exact font matters less than consistency and legibility.

Do not attempt to imitate the manuscript serif body font through awkward plotting-font substitutions if doing so reduces readability.

The graph should remain typographically neutral.

---

# 36. FONT SIZE

Use a manuscript-wide plotting size system.

Do not hard-code wildly different font sizes by figure.

At final manuscript size:

* axis labels must be comfortably readable;
* tick labels may be slightly smaller;
* legend labels approximately match tick-label size;
* annotations should never be smaller than reasonable footnote-size text.

Do not shrink text merely to fit too many categories.

If labels do not fit, redesign the figure.

---

# 37. NO DECORATIVE ANNOTATIONS

Do not add:

* arrows;
* callout bubbles;
* shaded boxes;
* giant labels;
* icons;
* emojis;
* decorative braces;

unless they communicate something substantively necessary.

Economics-paper graphics should generally let the data structure carry the explanation.

Use manuscript prose and captions for interpretation.

---

# 38. LABEL ONLY WHAT THE READER NEEDS

In a scatterplot with hundreds of observations, do not label every observation.

If the text discusses five particular observations:

* emphasize those observations;
* label those five;
* leave the remainder as context in light gray.

Do not create a haystack of overlapping text labels.

---

# 39. FOCAL VERSUS BACKGROUND OBSERVATIONS

When the figure contains many observations but only a subset matters for the argument:

* background observations: light gray;
* focal observations: dark or house accent color;
* focal labels: only where necessary.

Do not give equal visual emphasis to every observation if the argument itself does not give them equal importance.

---

# 40. SMALL MULTIPLES OVER SPAGHETTI

Avoid plotting many overlapping lines in a single figure.

If individual trends become difficult to follow:

* use small multiples;
* separate logically distinct groups;
* emphasize only the focal series and gray out the rest.

Do not solve an unreadable line plot merely by assigning more colors.

---

# 41. HISTOGRAMS AND DISTRIBUTIONS

For a single distribution:

* use one restrained fill;
* thin or no bar borders;
* no gradient;
* no unique color per bin.

For comparisons:

* avoid heavily overlapping opaque histograms;
* consider densities, outlines, small multiples, or carefully designed overlays.

Do not manipulate bins after looking at the result merely to sharpen a pattern.

Preserve the substantive binning used by the analysis.

---

# 42. SCATTERPLOTS

When observations overlap heavily:

* use small markers;
* moderate transparency;
* restrained background color.

Do not turn transparency into decorative texture.

If a regression or fitted line is displayed:

* observations should remain visible;
* fitted line should be visually distinct;
* uncertainty band should be secondary.

Do not plot a fitted relationship that is not part of the paper's actual analysis.

---

# 43. REFERENCE LINES

Use reference lines only when analytically meaningful.

Examples:

* zero treatment effect;
* treatment date;
* eligibility threshold;
* policy cutoff;
* theoretical benchmark.

Make them lighter and thinner than the main estimate.

If a reference line requires explanation, explain it in the figure note.

---

# 44. ZERO LINE

For coefficient plots and event studies, use a restrained zero-effect horizontal reference line.

Default appearance:

* neutral gray;
* thin;
* visually behind estimates.

Never make the zero line the darkest line in the graph.

---

# 45. NO SIGNIFICANCE-BASED VISUAL CODING

Never use:

* red for insignificant;
* green for significant;
* filled markers for significant and hollow markers for insignificant;
* stars next to graphical coefficients;
* separate color palettes based on p-value thresholds.

The figure should display:

> estimate + uncertainty

and let the reader assess precision.

---

# 46. NO SOFTWARE DEFAULT THEMES

Do not accept default:

* Stata `s2color`;
* Matplotlib default;
* seaborn default;
* ggplot2 default gray theme;
* Excel default charts;

as publication styling.

Explicitly define the manuscript's figure style.

A figure should not reveal which software generated it.

---

# 47. PYTHON

If rendering in Python:

* use Matplotlib or an equivalently controllable library;
* explicitly define the house palette;
* use a white background;
* remove unnecessary spines;
* control all typography explicitly;
* export vector PDF;
* do not use `plt.title()` for manuscript figure titles;
* do not use a decorative style sheet;
* do not use Seaborn merely to obtain a prettier default.

The output should reproduce this manuscript standard, not Python conventions.

---

# 48. STATA

If rendering in Stata:

* override the default background;
* remove unnecessary graph-region fills;
* use the same house palette;
* use the same legend placement;
* use the same typography and line hierarchy;
* do not place `title()` in the exported graphic when LaTeX supplies the title;
* export vector output when feasible.

The objective is not to make the figures “look like Stata.”

The objective is to make Stata conform to the manuscript's house style.

---

# 49. R

If rendering in R:

* do not retain the default gray `ggplot2` panel;
* use a clean white/minimal foundation;
* define scales explicitly;
* apply the same fixed house palette;
* remove unnecessary panel gridlines;
* export vector PDF;
* keep titles in LaTeX.

Do not let package defaults determine the visual identity of the paper.

---

# 50. MAPS AND HEAT MAPS

Maps are an exception to the sparse-color default because color often encodes the variable itself.

For ordered quantities:

> use sequential scales.

For deviations around a meaningful zero/benchmark:

> use diverging scales.

For discrete unordered categories:

> use a qualitative colorblind-safe palette.

Do not use rainbow maps.

Clearly distinguish:

* missing data;
* zero;
* untreated;
* outside sample;

when these are substantively different states.

Do not assign missing data a color that could be mistaken for the lowest observed value.

---

# 51. COLORBLIND AND GRAYSCALE CHECK — HARD REQUIREMENT

Every figure using more than one color must pass both tests:

### Test 1 — Color-vision deficiency

Verify that economically distinct groups remain distinguishable under common forms of red-green color-vision deficiency.

### Test 2 — Grayscale

Convert or preview the figure in grayscale.

The substantive comparison must remain interpretable.

If the figure fails either test:

* change line styles;
* change marker shapes;
* use direct labels;
* change palette;
* use small multiples.

Do not rely on the reader's ability to perceive hue differences.

---

# 52. MAXIMUM COLOR COUNT

As a default:

> no more than four focal colors in a conventional statistical figure.

If the design apparently requires five or more:

1. determine whether some series can be gray;
2. determine whether categories can be grouped;
3. consider small multiples;
4. consider direct labels;
5. consider separate figures.

Do not solve complexity by adding colors.

---

# 53. GRAY IS A DATA-VISUALIZATION TOOL

Use gray deliberately for context.

Gray can represent:

* comparison observations;
* background units;
* non-focal specifications;
* auxiliary categories;
* historical values;
* confidence intervals;
* benchmarks.

This allows the focal estimate to carry visual weight without requiring saturated colors.

Do not use light gray for information that must be read precisely.

---

# 54. DO NOT USE COLOR TO EXPRESS VALUE JUDGMENTS

Do not automatically code:

* positive = green;
* negative = red;
* good = green;
* bad = red.

Use semantic red/green only when those meanings are substantively established and accessibility remains intact.

For ordinary estimated positive and negative coefficients, a neutral diverging scale or common estimate color is preferable.

---

# 55. CONSISTENCY BEATS NOVELTY

Do not redesign each figure independently to make it visually distinctive.

If two figures contain the same kind of object, style them the same way.

For example, all event studies should use the same:

* point style;
* confidence interval;
* zero line;
* treatment line;
* typography;
* margins.

All coefficient plots should similarly share one design.

A reader should learn the visual grammar once.

---

# 56. FIGURE/TABLE CHOICE

Use a table when the reader needs:

* exact numerical values;
* several detailed comparisons;
* specification information.

Use a figure when the reader needs to see:

* shape;
* dynamics;
* distribution;
* magnitude patterns;
* heterogeneity;
* relationships.

Do not reproduce the exact same information in both a table and figure unless the dual presentation serves a clear analytical purpose.

---

# 57. FIGURES MUST BE SELF-CONTAINED

A reader who sees the figure first should be able to understand:

* what is plotted;
* the units;
* which groups are compared;
* what uncertainty is shown;
* what the reference category is when relevant.

Use:

* clear axes;
* clear legend/direct labels;
* concise LaTeX caption;
* concise LaTeX note.

Do not require the reader to decode raw variable names or return to the estimation code.

---

# 58. DO NOT OVERLOAD FIGURE NOTES

A figure note should contain the minimum methodological information required to interpret the exhibit.

Typical information:

* sample;
* estimator when not obvious;
* confidence level;
* clustering;
* omitted period;
* weighting;
* normalization;
* relevant definition.

Do not include:

* script names;
* variable names;
* software;
* plotting commands;
* file provenance.

---

# 59. COLOR PALETTE IMPLEMENTATION

Create the palette **once** in a shared plotting-style definition.

For example, conceptually define:

```text
MAIN        = #222222
SECONDARY   = #7A7A7A
CONTEXT     = #C7C7C7
REFERENCE   = #BDBDBD

QUAL_1      = #1B9E77
QUAL_2      = #D95F02
QUAL_3      = #7570B3
QUAL_4      = #E7298A
```

Additional Dark2 colors should be used only when genuinely necessary.

Do not repeat ad hoc hex values throughout separate scripts.

This centralized palette definition is an internal implementation device and must **not** be discussed in the manuscript.

---

# 60. FIGURE SEQUENCING WITHIN THE PAPER

Figures remain subject to the manuscript's exhibit-flow rule.

Allowed:

> Paragraph → Figure → Paragraph → Table

> Paragraph → Table → Paragraph → Figure

> Paragraph → Figure → Paragraph → Figure

> Paragraph → Table → Paragraph → Table

Closely related same-type exhibits may occasionally appear consecutively:

> Figure → Figure

or:

> Table → Table

when they form one coherent empirical block.

Never allow:

> Paragraph → Figure → Table → Paragraph

or:

> Paragraph → Table → Figure → Paragraph

without substantive prose between the different exhibit types.

Inspect the **compiled PDF**, not merely the source order.

---

# 61. FINAL FIGURE AUDIT

Inspect every figure individually and in the compiled manuscript.

For each figure confirm:

* [ ] White background.
* [ ] No unnecessary outer box.
* [ ] No decorative grid.
* [ ] Data are visually darker than auxiliary elements.
* [ ] Main estimate is immediately identifiable.
* [ ] No software-default palette remains.
* [ ] No rainbow/jet palette.
* [ ] Color has substantive meaning.
* [ ] No unnecessary color per category/bar.
* [ ] House palette used consistently.
* [ ] Same substantive group has the same color across figures.
* [ ] No more than approximately four focal colors unless genuinely necessary.
* [ ] Figure remains interpretable in grayscale.
* [ ] Figure remains interpretable under common color-vision deficiency simulation.
* [ ] Important distinctions do not depend solely on color.
* [ ] Axis labels use substantive terminology and units.
* [ ] No raw variable names.
* [ ] No internal specification names.
* [ ] No p-values.
* [ ] No significance stars.
* [ ] No significance-based coloring.
* [ ] Confidence intervals are visible but secondary.
* [ ] Zero/reference lines are restrained.
* [ ] Legend is outside the data region where feasible.
* [ ] Legend is below the x-axis region by default.
* [ ] Legend uses more columns rather than more rows.
* [ ] No chart title is baked into the graphical file.
* [ ] Notes and methodological metadata are in LaTeX.
* [ ] Panels are separate vector files.
* [ ] Multi-panel figures are assembled using `subcaption`.
* [ ] Vector PDF used for ordinary statistical graphics.
* [ ] Figure remains readable at actual manuscript size.
* [ ] Comparable figures use consistent dimensions and typography.
* [ ] No plotted values changed during restyling.

The governing test is:

> **If the figure is converted to grayscale, reduced to its final manuscript size, and stripped of decorative color, does the empirical result remain immediately understandable?**

If not, redesign the presentation without changing the data.
