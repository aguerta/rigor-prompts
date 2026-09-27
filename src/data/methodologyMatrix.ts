import { MethodDesign } from '../types';

export const METHODOLOGY_DESIGNS: MethodDesign[] = [
  {
    id: 'did',
    name: 'Difference-in-Differences & Event Studies',
    shortCode: 'DiD / ES',
    domain: 'empirical',
    description: 'Staggered adoption, two-way fixed effects, pre-trend falsification, and treatment effect heterogeneity.',
    keyAssumptions: [
      'Parallel trends in absentia of treatment (counterfactual)',
      'No anticipation effects prior to intervention',
      'Homogeneous treatment effects or robust robust-to-heterogeneity estimators (e.g. Callaway-Sant\'Anna, Sun-Abraham, de Chaisemartin-D\'Haultfoeuille)',
      'Stable unit treatment value assumption (SUTVA / no spillovers)'
    ],
    vulnerabilities: [
      'Negative weighting of earlier-treated units in static TWFE',
      'Underpowered pre-trend tests masking parallel trend violations',
      'Composition changes across panels over time',
      'Clustering level mismatch (state vs county vs MSA)'
    ],
    consistencyPromptId: 'specialized/consistency/05_DID_EVENT_STUDY',
    literaturePromptId: 'specialized/literature/04_DID_LIT'
  },
  {
    id: 'iv',
    name: 'Instrumental Variables & LATE',
    shortCode: 'IV / LATE',
    domain: 'empirical',
    description: 'Two-stage least squares, weak instruments, local average treatment effects, and exclusion restrictions.',
    keyAssumptions: [
      'Instrument relevance (First stage Cov(Z, D) != 0, Montiel Olea-Pflueger F-stat)',
      'Instrument exogeneity / independence (Z _||_ (Y(0), Y(1)))',
      'Exclusion restriction (Z influences Y solely through D)',
      'Monotonicity / no defiers (for LATE interpretation)'
    ],
    vulnerabilities: [
      'Weak instrument bias towards OLS in finite samples',
      'Exclusion violations via unmeasured direct channels',
      'LATE local complier subpopulation misattributed to ATE',
      'Many instruments overfitting (Jackknife / LIML needed)'
    ],
    consistencyPromptId: 'specialized/consistency/07_IV_LATE',
    literaturePromptId: 'specialized/literature/06_IV_LIT'
  },
  {
    id: 'rdd',
    name: 'Regression Discontinuity & Kink Design',
    shortCode: 'RDD / RKD',
    domain: 'empirical',
    description: 'Sharp and fuzzy cutoffs, local polynomial bandwidth selection, manipulation testing, and boundary bias.',
    keyAssumptions: [
      'Continuity of potential outcomes at the threshold',
      'No precise manipulation/sorting of the running variable at cutoff (McCrary / Cattaneo test)',
      'Locally constant or smooth covariates across threshold',
      'Bandwidth optimality (Calonico-Cattaneo-Titiunik MSE/CER)'
    ],
    vulnerabilities: [
      'Heaping or rounding in running variable causing spurious jumps',
      'Boundary bias from high-order polynomials (Gelman-Imbens critique)',
      'Compound treatments (other policies sharing identical threshold)',
      'Sensitivity to bandwidth choice'
    ],
    consistencyPromptId: 'specialized/consistency/06_RDD_RKD',
    literaturePromptId: 'specialized/literature/05_RDD_LIT'
  },
  {
    id: 'rct',
    name: 'Randomized Controlled Trials',
    shortCode: 'RCT',
    domain: 'empirical',
    description: 'Field experiments, lab experiments, pre-registration adherence, attrition, and multiple testing.',
    keyAssumptions: [
      'Integrity of random assignment (baseline balance across covariates)',
      'No differential attrition between treatment and control',
      'Compliance verification (ITT vs TOT/IV)',
      'Pre-analysis plan (PAP) consistency without p-hacking'
    ],
    vulnerabilities: [
      'Selective attrition violating unconfoundedness',
      'Hawthorne or John Henry effects',
      'Spillover / displacement onto control units violating SUTVA',
      'Multiple hypothesis testing without FWER/FDR corrections'
    ],
    consistencyPromptId: 'specialized/consistency/04_RCT',
    literaturePromptId: 'specialized/literature/03_RCT_LIT'
  },
  {
    id: 'synthetic_control',
    name: 'Synthetic Control & Matrix Completion',
    shortCode: 'Synth / SCM',
    domain: 'empirical',
    description: 'Comparative case studies, donor pool selection, convex hull restrictions, and placebo in space/time.',
    keyAssumptions: [
      'Convex combination of unexposed donors approximates treated pre-intervention path',
      'No anticipation or spillover effects into donor pool',
      'No structural breaks affecting only a subset of donor units',
      'Interpolation within support (convex hull vs extrapolation)'
    ],
    vulnerabilities: [
      'Donor units contaminated by treatment spillovers',
      'Overfitting pre-treatment idiosyncrasies',
      'Weak in-time or in-space placebo significance tests',
      'Sensitivity to choice of matching predictors'
    ],
    consistencyPromptId: 'specialized/consistency/09_SYNTHETIC_CONTROL',
    literaturePromptId: 'specialized/literature/08_SYNTHETIC_CONTROL_LIT'
  },
  {
    id: 'panel_fe',
    name: 'Panel Data & Fixed Effects',
    shortCode: 'Panel FE',
    domain: 'empirical',
    description: 'Unit and time fixed effects, strict exogeneity, Nickell bias in dynamic panels, and cluster-robust inference.',
    keyAssumptions: [
      'Strict exogeneity E[e_it | X_i1, ..., X_iT, a_i] = 0',
      'Time-invariant unobserved heterogeneity absorbed by unit effects',
      'No feedback from current shocks to future covariates',
      'Sufficient degrees of freedom for high-dimensional FE'
    ],
    vulnerabilities: [
      'Nickell bias O(1/T) when lagged dependent variables are included with FE',
      'Cluster size asymmetry (few clusters yielding downward biased SEs)',
      'Measurement error attenuated by within-transformation',
      'Time-varying confounding correlated with treatment timing'
    ],
    consistencyPromptId: 'specialized/consistency/10_PANEL_FE',
    literaturePromptId: 'specialized/literature/09_PANEL_FE_LIT'
  },
  {
    id: 'selection_observables',
    name: 'Selection on Observables & Matching',
    shortCode: 'Matching / Propensity',
    domain: 'empirical',
    description: 'Propensity score matching, coarsened exact matching, overlap/common support, and Oster bounds.',
    keyAssumptions: [
      'Conditional Independence Assumption (CIA / unconfoundedness)',
      'Common support / overlap (0 < Pr(D=1|X) < 1)',
      'SUTVA (no interaction between units)',
      'Correct propensity score model or doubly robust estimation'
    ],
    vulnerabilities: [
      'Omitted variable bias from unobserved confounders (failure of CIA)',
      'Lack of overlap leading to extreme weights and variance explosion',
      'Failure to report Oster/Altonji sensitivity bounds',
      'Post-treatment conditioning (bad controls)'
    ],
    consistencyPromptId: 'specialized/consistency/08_SELECTION_OBSERVABLES',
    literaturePromptId: 'specialized/literature/07_SELECTION_OBSERVABLES_LIT'
  },
  {
    id: 'time_series',
    name: 'Time Series, VARs & Local Projections',
    shortCode: 'Time Series / VAR',
    domain: 'empirical',
    description: 'Impulse response functions, sign restrictions, structural shocks, stationarity, and lag order selection.',
    keyAssumptions: [
      'Stationarity / cointegration relationships correctly handled',
      'Orthogonality of structural innovations (Cholesky, proxy-SVAR, sign restrictions)',
      'Invertibility of the moving average representation',
      'Robustness of LP-IRFs to serial correlation (HAC/Newey-West)'
    ],
    vulnerabilities: [
      'Non-invertibility in SVARs making shocks unrecoverable',
      'Sign restriction identification sets including economically implausible equilibria',
      'Spurious regression from unit roots or deterministic trends',
      'Small-sample lag length distortions in impulse responses'
    ],
    consistencyPromptId: 'specialized/consistency/11_TIME_SERIES_VAR_LP',
    literaturePromptId: 'specialized/literature/10_TIME_SERIES_LIT'
  },
  {
    id: 'structural',
    name: 'Structural Estimation & Discrete Choice',
    shortCode: 'Structural IO/Labor',
    domain: 'both',
    description: 'GMM, simulated method of moments, maximum likelihood, BLP demand estimation, and counterfactual policy simulation.',
    keyAssumptions: [
      'Global parameter identification (Jacobian rank condition of moment conditions)',
      'Correct functional form and distributional assumptions of unobservables',
      'Equilibrium uniqueness or coherent equilibrium selection rule',
      'Computational convergence to global minimum without local trapping'
    ],
    vulnerabilities: [
      'Weak or unverified structural identification of deep preference parameters',
      'Unaccounted simulation error in MSM/SML standard errors',
      'Counterfactuals relying on out-of-support policy changes where Lucas critique applies',
      'Sensitivity to unmodelled outside options'
    ],
    consistencyPromptId: 'specialized/consistency/12_STRUCTURAL',
    literaturePromptId: 'specialized/literature/11_STRUCTURAL_LIT'
  },
  {
    id: 'partial_id',
    name: 'Partial Identification & Bounding',
    shortCode: 'Partial ID / Bounds',
    domain: 'empirical',
    description: 'Manski bounds, moment inequalities, set identification, and confidence intervals for identified sets.',
    keyAssumptions: [
      'Monotone instrumental variables or monotone treatment response bounds',
      'Valid moment inequality restrictions',
      'Coverage criteria: parameter coverage vs set coverage (Imbens-Manski, Chernozhukov-Hong-Tamer)'
    ],
    vulnerabilities: [
      'Identified set collapsing to uninformative empty set under misspecification',
      'Improperly projecting high-dimensional confidence sets into 1D marginals',
      'Conflating uniform coverage over parameters with pointwise coverage',
      'Failure to report informative sensitivity bounds'
    ],
    consistencyPromptId: 'specialized/consistency/13_PARTIAL_ID',
    literaturePromptId: 'specialized/literature/12_PARTIAL_ID_LIT'
  },
  {
    id: 'causal_ml',
    name: 'Causal Machine Learning & Double/Debiased ML',
    shortCode: 'Causal ML / DML',
    domain: 'empirical',
    description: 'Neyman orthogonality, cross-fitting, causal forests, heterogeneous treatment effects, and regularization bias.',
    keyAssumptions: [
      'Neyman-orthogonal score function insulating target parameter from nuisance regularization bias',
      'Sample splitting / K-fold cross-fitting to eliminate overfitting bias',
      'Rate conditions: nuisance parameter convergence rates n^(-1/4)',
      'Unconfoundedness in high dimensions'
    ],
    vulnerabilities: [
      'Violating cross-fitting by tuning hyperparameters on full sample',
      'Slow convergence rate of nuisance estimators violating n^(-1/4) asymptotic normality condition',
      'P-hacking over tree hyperparameters in generalized random forests',
      'Failure to account for clustering in cross-fitting splits'
    ],
    consistencyPromptId: 'specialized/consistency/14_CAUSAL_ML',
    literaturePromptId: 'specialized/literature/13_CAUSAL_ML_LIT'
  },
  {
    id: 'game_theory',
    name: 'Game Theory & Information Economics',
    shortCode: 'Game Theory',
    domain: 'theoretical',
    description: 'Subgame perfection, Bayesian Nash equilibrium, perfect Bayesian equilibrium, off-path beliefs, and signaling.',
    keyAssumptions: [
      'Common knowledge of rationality and payoff structure',
      'Consistency of off-path beliefs (Intuitive Criterion, D1, Cho-Kreps)',
      'Strategy spaces, action sets, and informational partitions precisely closed',
      'Equilibrium existence and characterization'
    ],
    vulnerabilities: [
      'Unspecified off-the-equilibrium-path beliefs sustaining non-credible threats',
      'Multiple equilibria without rigorous selection or robustness criteria',
      'Hidden assumptions on agent curvature or single-crossing conditions',
      'Discontinuity in payoff functions at boundary points'
    ],
    consistencyPromptId: 'specialized/consistency/15_GAME_THEORY',
    literaturePromptId: 'specialized/literature/14_GAME_THEORY_LIT'
  },
  {
    id: 'mechanism_design',
    name: 'Mechanism Design & Auctions',
    shortCode: 'Mechanism Design',
    domain: 'theoretical',
    description: 'Revelation principle, incentive compatibility (BIC/DIC), individual rationality, revenue equivalence, and budget balance.',
    keyAssumptions: [
      'Revelation principle applicability (direct mechanisms without loss of generality)',
      'Monotonicity of allocation rules and envelope condition integral representation',
      'Type distribution regularity (virtual valuation monotonicity / hazard rate)',
      'Feasibility and participation constraints'
    ],
    vulnerabilities: [
      'Failure of single-crossing property invalidating first-order approach',
      'Unverified second-order global optimality conditions (sufficiency of FOCs)',
      'Ex-post vs interim budget balance contradictions',
      'Collusion or resale undermining optimal mechanism properties'
    ],
    consistencyPromptId: 'specialized/consistency/16_MECHANISM_DESIGN',
    literaturePromptId: 'specialized/literature/15_MECHANISM_DESIGN_LIT'
  },
  {
    id: 'dynamic_macro',
    name: 'Dynamic Macro & General Equilibrium',
    shortCode: 'Macro DSGE / GE',
    domain: 'both',
    description: 'Blanchard-Kahn conditions, log-linearization, value function iteration, Euler equations, and transmission channels.',
    keyAssumptions: [
      'Transversality conditions / no-Ponzi game restrictions satisfied',
      'Blanchard-Kahn condition: number of unstable eigenvalues equals forward-looking variables',
      'Market clearing across all factor and goods markets',
      'Rational expectations and information consistency'
    ],
    vulnerabilities: [
      'Indeterminacy or explosive paths due to parameter regions violating Blanchard-Kahn',
      'Higher-order approximation inaccuracies near effective lower bound (ELB)',
      'Aggregation bias from heterogeneous agents to representative agent',
      'Ad-hoc parameter calibration lacking empirical micro-foundation'
    ],
    consistencyPromptId: 'specialized/consistency/17_DYNAMIC_MACRO_GE',
    literaturePromptId: 'specialized/literature/16_DYNAMIC_MACRO_LIT'
  },
  {
    id: 'decision_contract',
    name: 'Contract Theory & Principal-Agent Models',
    shortCode: 'Contract / Moral Hazard',
    domain: 'theoretical',
    description: 'First-order approach, monotone likelihood ratio property (MLRP), convex distribution function condition (CDFC), and limited liability.',
    keyAssumptions: [
      'MLRP ensuring optimal compensation is monotonic in output',
      'CDFC validating replacement of agent\'s optimization by first-order condition',
      'Agent participation / reservation utility binding',
      'Observability and verifiability of performance metrics'
    ],
    vulnerabilities: [
      'Using first-order approach when MLRP or CDFC fails (leading to suboptimal contracts)',
      'Multitasking distortions ignoring unmeasured effort dimensions (Holmstrom-Milgrom)',
      'Renegotiation proofness omitted',
      'Neglecting non-negativity or limited liability boundary constraints'
    ],
    consistencyPromptId: 'specialized/consistency/18_DECISION_INFO_CONTRACT',
    literaturePromptId: 'specialized/literature/17_DECISION_CONTRACT_LIT'
  },
  {
    id: 'matching_market',
    name: 'Matching & Market Design',
    shortCode: 'Matching / School Choice',
    domain: 'theoretical',
    description: 'Deferred acceptance, top trading cycles, stability, strategy-proofness, and affirmative action quotas.',
    keyAssumptions: [
      'Strict or weak preference profiles',
      'Stability (no blocking pairs) and Pareto efficiency',
      'Strategy-proofness for proposing side (Gale-Shapley)',
      'Substitutability condition on choice functions'
    ],
    vulnerabilities: [
      'Ties in preferences broken arbitrarily distorting fairness or efficiency',
      'Substitutability violations when contracts or peer effects exist',
      'Manipulability by coalitional deviations or capacity withholding',
      'Incentives for gaming when market thickness is low'
    ],
    consistencyPromptId: 'specialized/consistency/19_MATCHING_MARKET_DESIGN',
    literaturePromptId: 'specialized/literature/18_MATCHING_MARKET_LIT'
  }
];
