export interface MailCase {
  id: string;
  title: string;
  skills: string[];
  location: string;
  budget: string;
  status: string;
  source: string;
  company: string | null;
  receivedDate: string | null;
  sender: string | null;
  senderName: string | null;
  createdAt: string;
  keyTechnologies?: string;
  detailDescription?: string;
  experience?: string;
  workType?: string;
  duration?: string;
  japanese?: string;
  priority?: string;
  manager?: string | null;
  managerEmail?: string | null;
  startDate?: string | null;
  foreignerAccepted?: boolean;
  freelancerAccepted?: boolean;
  desiredBudget?: string;
  registrationType?: string;
  registeredAt?: string;
  processes?: string[];
  interviewCount?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "template1",
    name: "技術者募集のお知らせ",
    subject: "【〇〇株式会社】<%= selectedCasesLength %>件の案件に関する技術者募集のお知らせ",
    body: `
<%= selectedCases.map(item => item.title).join('\\n') %>

上記の案件にご興味をお持ちの技術者様がいらっしゃいましたら、
お気軽にご連絡ください。
    `
  },
  {
    id: "template2",
    name: "案件のご案内",
    subject: "【〇〇株式会社】<%= selectedCasesLength %>件の最新案件のご案内",
    body: `
<%= selectedCases.map(item => item.title).join('\\n') %>

詳細につきましては、お気軽にお問い合わせください。
    `
  },
  {
    id: "template3",
    name: "技術者募集",
    subject: "【〇〇株式会社】<%= selectedCasesLength %>件の案件に関する技術者募集",
    body: `
<%= selectedCases.map(item => item.title).join('\\n') %>

貴社の技術者の方々にご紹介いただければ幸いです。
    `
  }
];

// Sample engineers data for the utility functions
export const SAMPLE_ENGINEERS = [
  {
    id: "1",
    name: "山田 太郎",
    skills: ["Java", "Spring", "AWS"],
    experience: "10年",
    status: "対応可能",
    company: "フリーランス",
    companyType: "個人事業主"
  }
];

// Default email signature for email template
export const DEFAULT_SIGNATURE = `
--
株式会社ABC
東京都渋谷区神宮前0-0-0
TEL: 03-0000-0000
`;

export interface EmailSenderProps {
  mailCases: MailCase[];
}

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: string;
  company?: string;
  companyType?: string;
}
