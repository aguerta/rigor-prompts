# RIGOR — SPECIALIZED CONSISTENCY AUDIT: PANEL FE / LONGITUDINAL OBSERVATIONAL

Use when FE are the main identification device rather than an explicit DiD/IV/RDD design.

Reconstruct:
- unit/time dimensions;
- within variation;
- FE;
- treatment/predictor;
- lag structure;
- outcome;
- target coefficient.

Audit:
1. what FE actually remove;
2. time-varying confounding;
3. simultaneity;
4. reverse causality;
5. strict/sequential exogeneity;
6. lagged dependent variable bias;
7. measurement error under within transformation;
8. weak within variation;
9. unit trends;
10. clustering/serial correlation;
11. multiway dependence;
12. singleton/high-dimensional FE issues.

Mathematical overlay:
- within transformation;
- rank after residualization;
- distributed-lag sums;
- long-run multipliers;
- dynamic panel assumptions.

Claim consequences:
FE by themselves do not create a causal design.

Output:
WITHIN-VARIATION MAP
EXOGENEITY VERDICT
DEPENDENCE VERDICT
DYNAMIC-BIAS CHECK
CLAIM CONSEQUENCE
IMPLEMENTATION PLAN
