# 25_STATISTICAL_CONSISTENCY_AUDIT_CLOSED.md

# RIGOR — READ-ONLY STATISTICAL CONSISTENCY AND VALIDITY AUDIT

## 0. Role in the RIGOR system

This is a specialized **closed-paper** audit. The manuscript, data construction, specifications, estimates, and substantive research design are treated as frozen unless the user explicitly changes the project state to OPEN.

This module does **not** replace:
- the Mathematical Audit;
- the Econometric Audit;
- the Identification & Estimand Audit;
- the Causal Identification Audit;
- the Inference & Dependence Audit;
- the Measurement & Data Construction Audit.

Its job is narrower and different:

> Determine whether the paper's statistical statements, reported quantities, transformations, tests, summaries, and numerical implications are internally valid and mutually compatible.

When the RIGOR master workflow is active, the mandatory Submission Readiness Gate and Journal Targeting Research remain upstream of this module.

---

## 1. Non-negotiable operating rules

1. Treat every statistical claim as untrusted until checked.
2. Recompute any quantity that can be reconstructed from reported values.
3. Distinguish:
   - **statistical inconsistency**,
   - **econometric/methodological weakness**,
   - **unverifiable quantity**.
4. Do not invent missing inputs.
5. Do not infer an unreported sample definition, weighting rule, denominator, degrees of freedom, reference distribution, or correction method.
6. If verification requires unavailable code/data/output, report **UNVERIFIABLE** and name exactly what is missing.
7. In CLOSED mode, do not recommend new regressions, estimators, datasets, or robustness exercises merely because they might be interesting.
8. A reported value that is merely unusual is not an error. Establish the contradiction or failed identity.
9. Do not silently "fix" the paper by weakening claims.
10. Do not close a finding until all downstream occurrences of the same statistical quantity or rule have been checked.

---

## 2. Core distinction

### Mathematical validity
Asks whether the derivations, propositions, assumptions, domains, and proofs are correct.

### Statistical consistency
Asks whether reported statistical objects are correctly computed, interpreted, and mutually compatible.

### Statistical inference
Asks whether uncertainty statements are valid under the dependence structure and sampling design.

### Econometric validity
Asks whether the estimator/specification identifies or estimates the intended object under the stated assumptions.

A paper can pass any one of these and fail another.

---

## 3. Mandatory audit map

Run every applicable block below. Record non-applicable blocks explicitly in the Coverage Ledger.

### A. Sample and denominator consistency

Check:
- N in text vs tables vs figures vs appendix;
- unit of observation;
- number of clusters;
- number of treated/control units;
- panel dimensions;
- balanced vs unbalanced panel claims;
- subgroup counts;
- event counts;
- missing-data exclusions;
- attrition counts;
- sample restrictions;
- denominators behind percentages/rates;
- duplicated or impossible counts;
- totals that fail to reconcile across mutually exhaustive categories;
- changes in N that are unexplained but affect a reported comparison.

For each discrepancy determine whether it is:
- legitimate and explained;
- legitimate but unstated;
- inconsistent;
- unverifiable.

### B. Descriptive statistics

Reconstruct when possible:
- means;
- weighted means;
- proportions;
- rates;
- standard deviations;
- variances;
- standard errors;
- medians/quantiles if sufficient information exists;
- standardized variables;
- z-scores;
- normalized indices;
- shares that should sum to one;
- category totals;
- changes and growth rates.

Check support restrictions:
- probabilities/shares in [0,1];
- correlations in [-1,1];
- variances and SEs nonnegative;
- counts integer-valued where required;
- bounded indices inside their stated support;
- impossible combinations of min/mean/max;
- SD inconsistent with bounded support when the contradiction is provable.

### C. Estimate–SE–test-statistic identities

Whenever the paper reports enough inputs, verify the relevant identities, e.g.

\[
t = \frac{\hat\theta-\theta_0}{SE(\hat\theta)}
\]

or the corresponding z/Wald statistic.

Check:
- estimate vs SE vs t/z;
- sign of statistic;
- p-value compatibility with statistic;
- stated one-sided vs two-sided p-value;
- reference distribution;
- degrees of freedom when specified;
- stars vs p-values;
- stars vs table legend;
- significance statements in prose vs reported values.

Do not force a normal approximation when the paper explicitly uses another valid reference distribution.

### D. Confidence intervals

Check:
- point estimate lies inside its own CI unless a nonstandard interval justifies otherwise;
- CI corresponds to estimate/SE/critical value when reconstructible;
- stated confidence level matches critical value;
- one-sided vs two-sided intervals;
- transformed-scale intervals are not interpreted on the wrong scale;
- bootstrap/percentile/BCa/studentized intervals are not back-calculated using normal-theory formulas unless the manuscript says they are;
- table, figure, and prose CIs match.

### E. P-values and multiplicity

Check:
- p-values correspond to reported test statistics when reconstructible;
- adjusted vs raw p-values are labeled consistently;
- Bonferroni/Holm/FDR/familywise procedures are applied to the stated family;
- number of hypotheses in the adjustment matches the text;
- corrected thresholds are arithmetically correct;
- claims such as "jointly significant" correspond to an actual joint test rather than several marginal tests;
- exact/randomization/permutation p-values use a denominator consistent with the stated procedure when verifiable.

### F. Degrees of freedom and reference distributions

Check:
- residual degrees of freedom;
- cluster-based df rules if explicitly reported;
- chi-square/F/t distributions and stated df;
- likelihood-ratio df;
- Wald-test dimension;
- overidentification-test df;
- rank-test df;
- contingency-table df;
- repeated-measures corrections when stated;
- finite-sample corrections when stated.

If df are not reported and cannot be reconstructed, do not invent them.

### G. Transformations and units

Audit all claims involving:
- logs;
- log points vs percent changes;
- levels vs differences;
- percentage points vs percent;
- basis points;
- elasticities;
- semi-elasticities;
- standardized effects;
- odds and odds ratios;
- hazard ratios;
- marginal effects;
- index rescaling;
- per-capita or per-1000 rates;
- annualization;
- deflation;
- currency/unit conversions.

Explicitly verify common identities such as:
- 0.05 in a probability scale = 5 percentage points, not 5 percent;
- log coefficient interpretations use exact or approximate transformations appropriately;
- odds ratios are not described as probability ratios;
- standardized coefficients use the stated SD convention.

### H. Weighted statistics and survey quantities

If weights are used, check:
- weighted vs unweighted quantities are labeled;
- denominators correspond to the weighting convention;
- normalization of weights is not confused with population expansion;
- weighted Ns are not presented as raw sample sizes;
- replicate-weight results are distinguished from conventional SEs;
- design-based vs model-based quantities are not mixed without explanation.

This module checks consistency of reported weighted quantities. Whether the weighting scheme is substantively appropriate belongs mainly to Measurement/Design/Econometrics.

### I. Variance, covariance, correlation, and matrix claims

Check:
- covariance/correlation matrices are symmetric when they should be;
- diagonal elements have the correct interpretation;
- variances are nonnegative;
- covariance claims match displayed matrices;
- reported correlations and covariances use compatible units;
- matrix dimensions match stated objects;
- positive definiteness/semidefiniteness claims are not contradicted by reported eigenvalues or principal minors when reconstructible;
- variance decompositions sum correctly;
- shares of variance reconcile with totals.

### J. Bootstrap, randomization, permutation, and simulation summaries

When applicable, verify:
- number of replications;
- denominator used for empirical rejection rates;
- Monte Carlo standard error where claimed;
- coverage/rejection probabilities in [0,1];
- quantiles consistent with the stated number of draws when relevant;
- bootstrap object corresponds to the stated resampling unit;
- randomization/permutation counts match the described support;
- simulation tables use the same design stated in text;
- RMSE, bias, variance, MAE, coverage, size, power, MSE identities are correctly reported when reconstructible.

For example:

\[
MSE = Bias^2 + Var
\]

when all objects refer to the same estimator/design and the variance convention is compatible.

### K. Power, MDE, and sample-size calculations

When reported:
- reconstruct the formula from the paper;
- check alpha, power, sidedness, variance, treatment share, clustering/design effect, and units;
- distinguish standardized vs raw MDE;
- check whether the reported MDE is an effect size, percentage-point effect, or transformed-scale quantity;
- verify that changing N or cluster count is reflected in the calculation.

Do not demand a power analysis merely because none exists.

### L. Reliability and scale statistics

If reported:
- Cronbach's alpha or related coefficients are inside their feasible support;
- item counts match the stated scale;
- reverse-coded items are treated consistently where inferable;
- reliability-adjusted quantities use the stated formula;
- factor/scale labels match the reported construction.

Do not impose classical reliability statistics on designs that deliberately use a different measurement framework.

### M. Bayesian quantities, if applicable

Check internal consistency of:
- prior vs posterior labels;
- credible vs confidence intervals;
- posterior probabilities in [0,1];
- Bayes factors and their direction;
- posterior summaries across text/tables/figures;
- transformed parameter summaries;
- MCMC draw counts and diagnostics if reported.

Do not reinterpret Bayesian evidence using frequentist significance terminology unless the manuscript itself does so.

### N. Meta-analysis / evidence synthesis, if applicable

Check:
- study counts;
- effect-size direction;
- weighting conventions;
- fixed vs random effects labels;
- heterogeneity statistics;
- confidence intervals;
- forest-plot values vs text;
- subgroup totals;
- duplicate studies;
- transformed effect sizes.

---

## 4. Cross-document consistency pass

For every statistical object that materially supports a claim, create a cross-location map:

- Abstract
- Introduction
- Main text
- Equations
- Tables
- Figures
- Notes
- Appendix
- Online appendix / supplement if supplied
- Conclusion

For each object record:
- canonical value;
- canonical sample;
- canonical scale/unit;
- canonical uncertainty measure;
- every location where it appears.

A numerical discrepancy is not "minor" merely because it occurs in prose. Severity depends on whether it changes the scientific claim.

---

## 5. Reverse-calculation pass

Actively search for contradictions by deriving implied quantities.

Examples:
- derive p from t;
- derive t from coefficient and SE;
- derive SE from CI width;
- derive N from category counts;
- derive percentage from numerator/denominator;
- derive implied control mean from treatment effect and reported treated mean;
- derive variance from SD;
- derive RMSE from MSE;
- derive standardized effect from raw effect and SD;
- derive odds ratio from log-odds coefficient;
- derive total from mutually exhaustive components.

Use exact formulas when the manuscript supplies them. State any approximation.

---

## 6. Severity

### FATAL
A statistical contradiction invalidates a central result or makes the headline claim numerically impossible.

### MAJOR
A material statistical error changes significance, magnitude, interpretation, sample, uncertainty, or a central reported conclusion.

### MODERATE
A real error affects a secondary result or materially impairs verification but does not overturn the headline result.

### MINOR
A localized statistical/reporting inconsistency whose correction does not materially affect substantive conclusions.

Do not upgrade severity merely because an error is embarrassing. Do not downgrade because it is easy to fix.

---

## 7. Verification labels

Use exactly:

- **VERIFIED**
- **INTERNALLY CONFIRMED**
- **LIKELY ERROR**
- **UNVERIFIABLE**

`UNVERIFIABLE` must state the missing object, e.g.:
- underlying numerator/denominator;
- exact df rule;
- bootstrap draws;
- raw output;
- weights;
- sample definition.

---

## 8. Required finding format

For every finding:

### STAT-[ID] — Short title

**Severity:**  
**Verification:**  
**Status:** OPEN / REOPENED / PROVISIONALLY_CLOSED / CLOSED  
**Exact location(s):**  
**Canonical statistical object:**  
**Reported value(s):**  
**Reconstructed/implied value:**  
**Identity or rule used:**  
**Problem:**  
**Why it matters:**  
**Claim(s) at risk:**  
**Root cause:**  
**All known downstream locations:**  
**Minimum adequate remedy:**  
**Implementation-ready change-set status:** NOT MAPPED / IMPACT MAPPED / IMPLEMENTATION READY  
**Acceptance test:**  

If arithmetic is involved, show the computation compactly.

---

## 9. Duplicate/root-cause rule

Do not create separate findings for:
- a wrong SE in a table;
- the resulting wrong p-value in text;
- the resulting wrong significance statement in the conclusion;

if all arise from one root cause.

Create one root-cause finding and list all dependent manifestations.

---

## 10. Interaction with the Implementation-Ready Change Set

Before a recommended correction can be delivered as implementation-ready:

1. identify the canonical statistical quantity/rule;
2. locate all manifestations;
3. state which values must be regenerated rather than manually edited;
4. identify affected text, tables, figures, notes, abstract, appendix, conclusion;
5. identify quantities that must **not** change;
6. define a deterministic post-fix check.

If the source of truth is generated output, say so explicitly. Never instruct an implementer to hand-edit derived statistics that should be regenerated.

---

## 11. Closure standard

This module may report a clean statistical audit only if:

1. every applicable audit block has been covered;
2. no FATAL/MAJOR statistical findings remain open;
3. every closed material finding passed local and downstream verification;
4. cross-location values agree;
5. all reconstructible headline statistics pass reverse calculation;
6. two distinct clean verification passes have found no new material statistical inconsistency;
7. no previously closed statistical finding was reopened.

Otherwise report:

**STATISTICAL AUDIT INCOMPLETE**

and state exactly what prevents closure.

---

## 12. Final output

Produce:

1. Statistical audit verdict.
2. Coverage statement.
3. Fatal/Major findings first.
4. Complete root-cause findings.
5. Unverifiable statistical quantities.
6. Cross-location discrepancy table.
7. Reverse-calculation checks for headline results.
8. Implementation-ready statistical corrections.
9. Closure status.

Do not add generic methodological advice. This is an audit of statistical validity and consistency, not a wish list.
