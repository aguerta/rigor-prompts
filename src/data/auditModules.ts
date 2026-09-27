import { AuditModuleOption } from '../types';

export const AUDIT_MODULES: AuditModuleOption[] = [
  {
    id: 'submission_readiness',
    number: '20',
    name: 'Submission Readiness Gate & Referee Attack',
    category: 'gate',
    description: 'Mandatory first gate: Simulates hostile top-tier referee scrutiny to spot fatal design flaws and desk-reject risks.',
    requiredFor: ['empirical', 'theoretical', 'theory-empirical', 'structural-quantitative', 'qualitative-mixed'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '20_SUBMISSION_READINESS_REFEREE_ATTACK.md'
  },
  {
    id: 'consistency_audit',
    number: '04',
    name: 'Internal Consistency Audit',
    category: 'general',
    description: 'Audits mathematical definitions, notations, sample size counts across tables, cross-references, and theorem assertions.',
    requiredFor: ['empirical', 'theoretical', 'theory-empirical', 'structural-quantitative'],
    recommended: true,
    stateAvailability: 'CLOSED',
    promptFilename: '04_CONSISTENCY_AUDIT_CLOSED.md'
  },
  {
    id: 'mathematical_audit',
    number: '05',
    name: 'Mathematical Rigor & Proof Audit',
    category: 'theory',
    description: 'Step-by-step verification of lemmas, algebraic derivations, regularity conditions, boundary constraints, and proof completeness.',
    requiredFor: ['theoretical', 'theory-empirical', 'structural-quantitative'],
    recommended: true,
    stateAvailability: 'CLOSED',
    promptFilename: '05_MATHEMATICAL_AUDIT_CLOSED.md'
  },
  {
    id: 'econometric_audit',
    number: '06',
    name: 'Econometric Validity Audit',
    category: 'empirical',
    description: 'Estimator properties, standard error clustering, weighting schemes, degrees of freedom, and sample selection bias.',
    requiredFor: ['empirical', 'theory-empirical', 'structural-quantitative'],
    recommended: true,
    stateAvailability: 'CLOSED',
    promptFilename: '06_ECONOMETRIC_AUDIT_CLOSED.md'
  },
  {
    id: 'causal_identification',
    number: '07',
    name: 'Causal Identification & Exogeneity Audit',
    category: 'empirical',
    description: 'Rigorous inspection of identification arguments, confounding pathways, parallel trends, exclusion restrictions, and DAG logic.',
    requiredFor: ['empirical', 'theory-empirical'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '07_CAUSAL_IDENTIFICATION_AUDIT.md'
  },
  {
    id: 'estimand_identification',
    number: '08',
    name: 'Target Estimand & Parameter Alignment',
    category: 'empirical',
    description: 'Checks whether the estimated empirical coefficient corresponds to the economic parameter of interest (ATE, ATT, LATE, elasticity).',
    requiredFor: ['empirical', 'theory-empirical'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '08_IDENTIFICATION_ESTIMAND_AUDIT.md'
  },
  {
    id: 'inference_dependence',
    number: '09',
    name: 'Inference & Error Dependence Audit',
    category: 'empirical',
    description: 'Clustering levels, few-cluster corrections (wild cluster bootstrap), spatial correlation (Conley), serial dependence, and multiple hypothesis testing.',
    requiredFor: ['empirical', 'theory-empirical'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '09_INFERENCE_DEPENDENCE_AUDIT.md'
  },
  {
    id: 'measurement_data',
    number: '10',
    name: 'Measurement & Data Construction Audit',
    category: 'empirical',
    description: 'Variable operationalization, proxy errors, survey non-response, administrative data linking biases, and attrition.',
    requiredFor: ['empirical', 'theory-empirical'],
    recommended: false,
    stateAvailability: 'BOTH',
    promptFilename: '10_MEASUREMENT_DATA_CONSTRUCTION_AUDIT.md'
  },
  {
    id: 'theory_evidence',
    number: '11',
    name: 'Theory ↔ Evidence Bridge Audit',
    category: 'general',
    description: 'Verifies whether empirical specifications actually test the theoretical mechanisms or merely match signs and targeted moments.',
    requiredFor: ['theory-empirical', 'structural-quantitative'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '11_THEORY_EVIDENCE_AUDIT.md'
  },
  {
    id: 'robustness_falsification',
    number: '19',
    name: 'Robustness & Falsification Audit',
    category: 'empirical',
    description: 'Evaluates placebo tests, permutation tests, alternative definitions, sample restrictions, and specification curves.',
    requiredFor: ['empirical', 'theory-empirical'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '19_ROBUSTNESS_FALSIFICATION_AUDIT.md'
  },
  {
    id: 'structure_narrative',
    number: '14',
    name: 'Manuscript Structure & Contribution Spine',
    category: 'general',
    description: 'Scrutinizes the logical progression from introduction to conclusion, ensuring contributions are stated with exact precision.',
    requiredFor: ['empirical', 'theoretical', 'theory-empirical', 'structural-quantitative', 'qualitative-mixed'],
    recommended: false,
    stateAvailability: 'BOTH',
    promptFilename: '14_STRUCTURE_REVIEW.md'
  },
  {
    id: 'ai_prose_cleanup',
    number: '16',
    name: 'Academic Style & AI Prose Cleanup',
    category: 'general',
    description: 'Strips synthetic AI writing patterns, passive throat-clearing, redundant adverbials, and restores authentic scholarly tone.',
    requiredFor: ['empirical', 'theoretical', 'theory-empirical', 'structural-quantitative', 'qualitative-mixed'],
    recommended: false,
    stateAvailability: 'BOTH',
    promptFilename: '16_AI_PROSE_CLEANUP.md'
  },
  {
    id: 'literature_contribution',
    number: '17',
    name: 'Literature & Contribution Positioning',
    category: 'general',
    description: 'Audits claims of novelty against foundational and recent AER/QJE/JPE literature, identifying missing citations and uncredited priors.',
    requiredFor: ['empirical', 'theoretical', 'theory-empirical', 'structural-quantitative'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '17_LITERATURE_CONTRIBUTION_AUDIT.md'
  },
  {
    id: 'reproducibility',
    number: '18',
    name: 'Reproducibility & Code Audit',
    category: 'empirical',
    description: 'Audits replication packages, random seeds, raw data transformations, software versions, and runtime reproducibility.',
    requiredFor: ['empirical', 'structural-quantitative'],
    recommended: false,
    stateAvailability: 'BOTH',
    promptFilename: '18_REPRODUCIBILITY_REPLICATION_AUDIT.md'
  },
  {
    id: 'journal_targeting',
    number: '22',
    name: 'Journal Targeting & Editor Alignment',
    category: 'reporting',
    description: 'Assesses journal fit (AER, Econometrica, JPE, QJE, Review of Economic Studies, Field Top 5), editor specialization, and citation footprint.',
    requiredFor: ['empirical', 'theoretical', 'theory-empirical', 'structural-quantitative', 'qualitative-mixed'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '22_JOURNAL_TARGETING_RESEARCH.md'
  },
  {
    id: 'implementation_changeset',
    number: '27',
    name: 'Implementation-Ready Changeset',
    category: 'reporting',
    description: 'Translates audit findings into concrete, copy-pasteable textual revisions and mathematical replacements.',
    requiredFor: ['empirical', 'theoretical', 'theory-empirical', 'structural-quantitative', 'qualitative-mixed'],
    recommended: true,
    stateAvailability: 'BOTH',
    promptFilename: '27_IMPLEMENTATION_READY_CHANGESET.md'
  }
];
