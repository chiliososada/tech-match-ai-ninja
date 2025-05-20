
export interface MailCase {
  id: string;
  title: string;
  skills: string[];
  location: string;
  budget: string;
  status: string;
  source: "mail" | "manual" | string;
  company: string | null;
  receivedDate: string | null;
  sender: string | null;
  senderName: string | null;
  createdAt: string;
  keyTechnologies?: string;
  startDate?: string | null;
  experience?: string;
  workType?: string;
  duration?: string;
  japanese?: string;
  priority?: string;
  manager?: string | null;
  managerEmail?: string | null;
  detailDescription?: string;
  foreignerAccepted?: boolean;
  freelancerAccepted?: boolean;
  desiredBudget?: string;
  registrationType?: "自動（メール）" | "手動" | string;
  registeredAt?: string;
  processes?: string[];
  interviewCount?: string;
}
