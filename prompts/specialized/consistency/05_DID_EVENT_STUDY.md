# RIGOR — SPECIALIZED CONSISTENCY AUDIT: DIFFERENCE-IN-DIFFERENCES / EVENT STUDY

Reconstruct:
- treatment timing;
- cohorts;
- never-treated/not-yet-treated controls;
- estimand;
- estimator;
- event-time normalization;
- dynamic effects;
- weighting;
- clustering.

Audit:
1. exact parallel-trends assumption;
2. anticipation;
3. comparison groups;
4. staggered adoption;
5. already-treated controls;
6. treatment-effect heterogeneity;
7. TWFE interpretation;
8. cohort/time support;
9. event-time reference period;
10. pretrend magnitude and precision;
11. differential composition/attrition;
12. spillovers;
13. treatment reversals;
14. continuous treatment if applicable;
15. stacked-design duplication/weights;
16. clustering and serial correlation.

Hard rule:
Pre-treatment non-rejection does not prove parallel trends.
A pretrend issue does not mechanically imply one wording downgrade; interpret magnitude, precision, horizon, estimator dependence, and alternative valid designs.

Mathematical overlay:
- identify ATT(g,t) or relevant estimand;
- derive aggregation weights;
- verify event-time indexing;
- check support and empty cells;
- test heterogeneity counterexamples.

Claim consequences:
classify causal strength from direct causal to suggestive to associational depending on the verified identification result.

Output:
DID DESIGN MAP
COMPARISON MAP
PARALLEL-TRENDS VERDICT
TWFE/HETEROGENEITY VERDICT
INFERENCE VERDICT
CLAIM CONSEQUENCE
IMPLEMENTATION PLAN
