export type CandidateStatus = 'applied' | 'screening' | 'interview' | 'hired' | 'rejected';

export interface Job {
  _id: string;
  title: string;
  company: string;
  location?: string;
  createdAt?: string;
}

export interface Candidate {
  _id: string;
  name: string;
  email: string;
  contact: string;
  jobId?: { _id: string; title: string; company: string } | null;
  experience?: number;
  noticePeriod?: number;
  currentCTC?: string;
  expectedCTC?: string;
  skills?: string[];
  status: CandidateStatus;
  appliedDate?: string;
  resumeUrl?: string;
  resumeFileName?: string;
}

export interface CandidatesByJob {
  job: Job;
  candidates: Candidate[];
  count: number;
}
