# RIGOR — SPECIALIZED CONSISTENCY AUDIT: CAUSAL ML / HETEROGENEITY / DML

Reconstruct:
- prediction vs causal task;
- treatment;
- outcome;
- nuisances;
- score;
- splitting/cross-fitting;
- target estimand;
- heterogeneity object.

Audit:
1. causal design independent of ML;
2. overlap;
3. orthogonal score;
4. cross-fitting;
5. leakage;
6. clustered folds;
7. repeated units;
8. tuning;
9. CATE validation;
10. subgroup discovery;
11. post-selection inference;
12. policy-value estimation;
13. multiple search;
14. benchmark.

Mathematical overlay:
- target moment;
- orthogonality;
- nuisance rates if claimed;
- sample split indexing;
- policy objective.

Claim consequences:
Prediction is not causality.
A causal forest cannot repair invalid treatment assignment.

Output:
ML TASK MAP
LEAKAGE VERDICT
CAUSAL-ID VERDICT
HETEROGENEITY VALIDATION
INFERENCE VERDICT
CLAIM CONSEQUENCE
IMPLEMENTATION PLAN
