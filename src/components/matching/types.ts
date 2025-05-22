
export interface EnhancedMatchingResult {
  id: number | string;
  caseName: string;
  candidateName: string;
  matchingRate: string;
  matchingReason: string;
  recommendationComment?: string;
  candidateCompany?: string;
  caseCompany?: string;
  memo?: string;
  candidateId?: number | string;
  caseId?: number | string;
}

export interface CaseDetailItem {
  id: number | string;
  title: string;
  client: string;
  skills?: string[];
  experience?: string;
  budget?: string;
  location?: string;
  workType?: string;
  priority?: string;
  description?: string;
  detailDescription?: string;
  companyType?: string;
}

export interface CandidateItem {
  id: number | string;
  name: string;
  skills: string | string[];
  companyType?: string;
  companyName?: string;
  nationality?: string;
  age?: string;
  gender?: string;
  experience?: string;
  japaneseLevel?: string;
  availability?: string;
  status?: string[];
}
