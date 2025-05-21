
export interface MailCase {
  id: string;
  title?: string;
  company?: string;
  skills?: string[];
  senders?: {
    name?: string;
    email?: string;
    position?: string;
  }[];
  sender?: string;
  senderName?: string;
  senderEmail?: string;
  keyTechnologies?: string;
  registrationType?: string;
  registeredAt?: string;
  selectedRowId?: string;
  selectedSenderName?: string;
  selectedSenderEmail?: string;
  selectedSenderPosition?: string;
  startDate?: string; // Ensure startDate is part of the type definition
}

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  currentStatus?: string;
  company?: string;
}
