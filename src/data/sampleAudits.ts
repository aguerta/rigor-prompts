import { AuditReportData } from '../types';

export const SAMPLE_AUDIT_REPORTS: Record<string, AuditReportData> = {
  did_labor: {
    paperTitle: 'Minimum Wage Dynamics and Local Labor Market Reallocation: Evidence from Staggered County Policies',
    paperType: 'empirical',
    projectState: 'CLOSED',
    verdict: 'CONDITIONAL_REVISION',
    verdictSummary: 'The manuscript presents a compelling empirical setting with high-quality administrative microdata. However, the core headline estimate relies on two-way fixed effects (TWFE) with staggered policy adoption, where negative weighting and dynamic treatment heterogeneity introduce bias. Once re-estimated using Callaway-Sant\'Anna or Sun-Abraham, and adjusting standard errors for cross-border commuting spatial correlation, the central finding likely survives with reduced effect magnitude.',
    modulesExecuted: [
      '20 Submission Readiness Gate',
      '04 Internal Consistency Audit',
      '06 Econometric Validity Audit',
      '07 Causal Identification Audit',
      '09 Inference & Dependence Audit',
      'Specialized: DiD & Event Study (05)',
      'Specialized: DiD Literature (04)',
      '22 Journal Targeting Research'
    ],
    findings: [
      {
        id: 'FINDING-DID-01',
        module: 'Econometric Validity (DiD)',
        location: 'Section 4.2, Eq. (3), Table 2 (Columns 1-4)',
        severity: 'CRITICAL',
        title: 'Negative Weighting and Forbidden Comparisons in Static TWFE Specification',
        summary: 'Equation (3) estimates a standard two-way fixed effects regression with county and year fixed effects where policies roll out across 48 treatment cohorts between 2008 and 2019. In the presence of treatment effect dynamics, early-treated counties act as controls for later-treated units with negative weights (Goodman-Bacon 2021; de Chaisemartin & D\'Haultfoeuille 2020).',
        rootCause: 'Relying on standard OLS TWFE coefficient without decomposing Bacon weights or presenting robust heterogeneity-robust event study estimators.',
        symptom: 'Reported beta of -0.042 (SE 0.012) is contaminated by already-treated units serving as effective counterfactuals.',
        evidence: 'Table 2 presents beta = -0.042 as the headline average treatment effect on the treated. No decomposition of negative weights is provided in the appendix.',
        remedy: 'Replace Eq. (3) with the Callaway and Sant\'Anna (2021) doubly robust estimator using not-yet-treated or never-treated comparison groups. Display group-time average treatment effects ATT(g,t) aggregated to event time.',
        implementationBurden: 'Medium',
        centralityToContribution: 'Fatal',
        status: 'pending'
      },
      {
        id: 'FINDING-INF-02',
        module: 'Inference & Dependence',
        location: 'Section 5.1, Table 3, Footnote 14',
        severity: 'SUBSTANTIVE',
        title: 'Clustering at County Level Ignores Commuting Zone Spatial Dependence',
        summary: 'Standard errors are clustered at the county level (N = 312 clusters). However, workers cross county borders within integrated commuting zones, creating cross-cluster spatial error correlation.',
        rootCause: 'Clustering level was chosen based on the unit of policy variation rather than the geographic boundary of market equilibrium.',
        symptom: 'County-level clustering severely understates standard errors in dense metropolitan regions.',
        evidence: 'Table 3 shows t-statistic = 2.45 when clustered by county. Two-way clustering or Commuting Zone clustering raises SEs by ~38%, moving p-value from 0.014 to 0.071.',
        remedy: 'Re-cluster standard errors at the Commuting Zone (CZ) level (N = 74) and report wild cluster bootstrap p-values (Cameron, Gelbach & Miller 2008).',
        implementationBurden: 'Low',
        centralityToContribution: 'High',
        status: 'pending'
      },
      {
        id: 'FINDING-LIT-03',
        module: 'Literature & Contribution',
        location: 'Section 2 (Related Literature), Page 5',
        severity: 'MINOR',
        title: 'Incomplete Positioning Relative to Cengiz et al. (2019) Bunching Methodology',
        summary: 'The paper claims to be "the first to examine employment reallocation within 3-digit NAICS industries at the sub-state boundary". Cengiz, Dube, Lindner and Zipperer (QJE 2019) examine state-level sub-minimum wage job transitions.',
        rootCause: 'Narrowly qualifying the contribution on boundary granularity rather than articulating the distinct economic mechanism.',
        symptom: 'Referee will perceive overclaiming of novelty.',
        evidence: 'Page 5, Paragraph 2 states: "Prior literature has not evaluated inter-industry labor reallocation following minimum wage adjustments."',
        remedy: 'Clarify that while Cengiz et al. (2019) track total job counts above and below the wage threshold, this paper observes individual worker tenure and transitions across establishments.',
        implementationBurden: 'Low',
        centralityToContribution: 'Moderate',
        status: 'pending'
      }
    ],
    journalReadiness: {
      recommendedTiers: [
        'American Economic Journal: Applied Economics (Strong fit after Callaway-Sant\'Anna revision)',
        'Journal of Labor Economics (High probability of acceptance)',
        'Journal of Human Resources'
      ],
      potentialReferees: [
        'Empirical labor economists familiar with recent DiD econometrics',
        'Specialists in spatial labor market equilibrium and commuting zones'
      ],
      immediateDeskRejectRisks: [
        'AER/QJE desk-rejection if standard two-way fixed effects is maintained as the primary estimator without modern heterogeneity-robust methods.'
      ]
    }
  },
  mechanism_auctions: {
    paperTitle: 'Optimal Multi-Unit Procurement with Correlated Signals and Endogenous Entry',
    paperType: 'theoretical',
    projectState: 'CLOSED',
    verdict: 'NOT_READY_FATAL',
    verdictSummary: 'The main economic proposition (Proposition 2) claims that a modified second-price sealed-bid auction with entry subsidies achieves ex-post budget balance and truthful bidding in dominant strategies. However, in the proof of Lemma 3, the envelope theorem is invoked without verifying the single-crossing condition across multidimensional types, rendering the monotonicity of the allocation rule unproven.',
    modulesExecuted: [
      '20 Submission Readiness Gate',
      '04 Internal Consistency Audit',
      '05 Mathematical Rigor & Proof Audit',
      'Specialized: Mechanism Design (16)',
      'Specialized: Game Theory (15)',
      '22 Journal Targeting Research'
    ],
    findings: [
      {
        id: 'FINDING-MATH-01',
        module: 'Mathematical Rigor & Proofs',
        location: 'Appendix A, Proof of Lemma 3 (pp. 28-29), Equation (A.7)',
        severity: 'CRITICAL',
        title: 'Unverified Single-Crossing Property in Multidimensional Type Allocation',
        summary: 'Lemma 3 claims that the allocation rule q_i(theta_i, theta_-i) is monotonically increasing in theta_i. The proof relies on taking first-order conditions with respect to the cost parameter, assuming that cross-derivatives d^2 U / d theta d x >= 0 hold globally. Under the multidimensional signal structure introduced in Section 3, single-crossing fails when entry costs correlate positively with production costs.',
        rootCause: 'Extending standard 1-dimensional Myerson (1981) regularity conditions to a multi-dimensional setting without establishing boundary monotonicity.',
        symptom: 'The direct revelation mechanism violates incentive compatibility for high-cost entrants; truthful bidding is not a Bayesian Nash equilibrium.',
        evidence: 'Eq. (A.7) asserts d q_i / d theta_i > 0 without restricting the covariance matrix Sigma of signals and entry endowments.',
        remedy: 'Impose explicit restriction on signal correlation (e.g. affiliation condition or additive separability between entry cost and marginal cost). If unrestricted correlation is essential, restate Theorem 1 as an approximation or bound.',
        implementationBurden: 'High',
        centralityToContribution: 'Fatal',
        status: 'pending'
      },
      {
        id: 'FINDING-NOTATION-02',
        module: 'Internal Consistency',
        location: 'Section 3.1 vs Section 4.3, Definition of Reservation Value',
        severity: 'MINOR',
        title: 'Inconsistent Definition of Outside Option Payoff',
        summary: 'In Section 3.1, the outside option payoff is normalized to u_0 = 0. In Section 4.3 (Equation 12), the participation constraint requires E[u_i] >= w_bar, where w_bar is defined as an endogenous outside wage.',
        rootCause: 'Drafting drift between earlier and later sections of the manuscript.',
        symptom: 'Confusing reading of individual rationality constraints.',
        evidence: 'Equation (2) states IR as U_i(theta_i) >= 0; Equation (12) states U_i(theta_i) >= w_bar without reconciliation.',
        remedy: 'Standardize notation in Section 3: define U_i(theta_i) >= w_bar throughout, noting that w_bar = 0 is a special case.',
        implementationBurden: 'Low',
        centralityToContribution: 'Secondary',
        status: 'pending'
      }
    ],
    journalReadiness: {
      recommendedTiers: [
        'Theoretical Economics / Journal of Economic Theory (After fixing Lemma 3)',
        'Games and Economic Behavior'
      ],
      potentialReferees: [
        'Microeconomic theorists specializing in auction theory and multidimensional mechanism design'
      ],
      immediateDeskRejectRisks: [
        'Immediate reject at Econometrica / AER / JET due to mathematical flaw in Lemma 3 proof.'
      ]
    }
  },
  structural_macro: {
    paperTitle: 'Household Heterogeneity, Mortgage Refinancing Friabilities, and the Transmission of Monetary Policy',
    paperType: 'structural-quantitative',
    projectState: 'OPEN',
    verdict: 'CONDITIONAL_REVISION',
    verdictSummary: 'The structural HANK model provides an elegant mechanism explaining monetary policy passthrough lags through fixed-rate mortgage refinancing inertia. The theoretical derivations are consistent, but the quantitative calibration of mortgage refinancing costs relies on pre-2008 data, which overstates frictions in the post-2015 fintech era.',
    modulesExecuted: [
      '20 Submission Readiness Gate',
      '05 Mathematical Rigor & Proof Audit',
      '11 Theory ↔ Evidence Bridge Audit',
      'Specialized: Dynamic Macro GE (17)',
      '13 Theoretical Development Audit Open',
      '22 Journal Targeting Research'
    ],
    findings: [
      {
        id: 'FINDING-MACRO-01',
        module: 'Theory ↔ Evidence Bridge',
        location: 'Section 5.3, Table 4 (Calibrated Parameters)',
        severity: 'SUBSTANTIVE',
        title: 'Mortgage Refinancing Transaction Costs Calibrated to Pre-Fintech Distribution',
        summary: 'The menu cost of refinancing psi is calibrated to $3,200 based on Andersen et al. (2020) Danish administrative data from 2005-2011. In the US mortgage market post-2015, automated underwriting and digitized appraisal reduced effective non-pecuniary costs, altering the S-s refinancing bands.',
        rootCause: 'Targeting historical moments that do not reflect modern financial plumbing.',
        symptom: 'Simulated monetary transmission lag of 6 quarters is sensitive to psi.',
        evidence: 'Sensitivity analysis in Table C.2 shows that halving psi reduces the peak consumption response lag from 6 quarters to 2 quarters.',
        remedy: 'Estimate psi using recent Home Mortgage Disclosure Act (HMDA) and Fannie/Freddie loan-level data (2015-2022). Include a state-dependent refinancing cost distribution.',
        implementationBurden: 'Medium',
        centralityToContribution: 'High',
        status: 'pending'
      },
      {
        id: 'FINDING-SOLV-02',
        module: 'Dynamic Macro & Computations',
        location: 'Appendix C.1, Algorithm 2',
        severity: 'SUBSTANTIVE',
        title: 'Unverified Convergence Criterion in Continuous-Time Partial Differential Equation Solver',
        summary: 'The continuous-time HJB equation is solved using finite difference methods (Achdou et al. 2022). The tolerance parameter epsilon = 10^-5 is applied to value functions, but distribution convergence (Kolmogorov Forward Equation) is not explicitly bounded.',
        rootCause: 'Stopping rule checked only the Hamilton-Jacobi-Bellman step, not the stationarity of the joint wealth-mortgage distribution.',
        symptom: 'Potential aggregate wealth drift in steady state simulations.',
        evidence: 'Appendix C.1 states "Iteration stops when ||V^{k+1} - V^k|| < 1e-5". No condition is stated for ||g^{k+1} - g^k||.',
        remedy: 'Add joint stopping criterion requiring both value function residual < 1e-6 and aggregate asset conservation error < 1e-7.',
        implementationBurden: 'Low',
        centralityToContribution: 'Moderate',
        status: 'pending'
      }
    ],
    journalReadiness: {
      recommendedTiers: [
        'Journal of Monetary Economics (Strong candidate)',
        'American Economic Journal: Macroeconomics',
        'Review of Economic Dynamics'
      ],
      potentialReferees: [
        'Macroeconomists working on HANK models with illiquid housing and refinancing'
      ],
      immediateDeskRejectRisks: [
        'Pushback from referees demanding contemporary HMDA empirical validation of refinancing inertia.'
      ]
    }
  }
};
