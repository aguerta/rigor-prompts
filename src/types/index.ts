export type PaperType = 
  | 'empirical' 
  | 'theoretical' 
  | 'theory-empirical' 
  | 'structural-quantitative' 
  | 'qualitative-mixed';

export type ProjectState = 'CLOSED' | 'OPEN';

export type SeverityLevel = 'CRITICAL' | 'SUBSTANTIVE' | 'MINOR';

export interface MethodDesign {
  id: string;
  name: string;
  shortCode: string;
  domain: 'empirical' | 'theoretical' | 'both';
  description: string;
  keyAssumptions: string[];
  vulnerabilities: string[];
  consistencyPromptId: string;
  literaturePromptId?: string;
}

export interface AuditModuleOption {
  id: string;
  number: string;
  name: string;
  category: 'gate' | 'general' | 'theory' | 'empirical' | 'reporting' | 'specialized';
  description: string;
  requiredFor: PaperType[];
  recommended: boolean;
  stateAvailability: 'CLOSED' | 'OPEN' | 'BOTH';
  promptFilename: string;
}

export interface AuditIntakeForm {
  title: string;
  authors: string;
  paperType: PaperType;
  projectState: ProjectState;
  primaryMethod: string;
  abstract: string;
  manuscriptExcerpt: string;
  targetJournal: string;
  includeLiteratureVerification: boolean;
  includeReproducibility: boolean;
  selectedModules: string[];
  specificConcerns: string;
}

export interface AuditFinding {
  id: string;
  module: string;
  location: string;
  severity: SeverityLevel;
  title: string;
  summary: string;
  rootCause: string;
  symptom: string;
  evidence: string;
  remedy: string;
  implementationBurden: 'Low' | 'Medium' | 'High';
  centralityToContribution: 'Fatal' | 'High' | 'Moderate' | 'Secondary';
  status?: 'pending' | 'accepted' | 'contested';
}

export interface UploadedPdfInfo {
  fileName: string;
  fileSize: number;
  base64?: string;
  mimeType: string;
  previewText?: string;
  uploadedAt: string;
}

export interface TaxonomyAnalysisResult {
  title: string;
  authors: string;
  paperType: PaperType;
  projectState: ProjectState;
  primaryMethod: string;
  methodName?: string;
  abstract: string;
  manuscriptExcerpt: string;
  targetJournal: string;
  specificConcerns: string;
  suggestedModules: string[];
  taxonomyRationale?: string;
}

export interface AuditReportData {
  paperTitle: string;
  paperType: PaperType;
  projectState: ProjectState;
  verdict: 'READY' | 'CONDITIONAL_REVISION' | 'MAJOR_RESTRUCTURE' | 'NOT_READY_FATAL';
  verdictSummary: string;
  modulesExecuted: string[];
  findings: AuditFinding[];
  journalReadiness: {
    recommendedTiers: string[];
    potentialReferees: string[];
    immediateDeskRejectRisks: string[];
  };
}
