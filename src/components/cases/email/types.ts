
export interface EmailTemplate {
  id: string;
  name: string;
  subject?: string;
  body?: string;
}

// メールテンプレート定義
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "introduce",
    name: "案件紹介",
    subject: "【案件情報】新規案件のご紹介",
    body: `お世話になっております。

新規案件情報のご案内をさせていただきます。
以下の案件について、ご検討いただける技術者様がいらっしゃいましたら、ぜひご連絡ください。

ご検討のほど、よろしくお願いいたします。`
  },
  {
    id: "followup",
    name: "フォローアップ",
    subject: "【確認】先日ご案内した案件について",
    body: `お世話になっております。

先日ご案内した案件についてフォローアップのご連絡をさせていただきます。
現在、案件元企業様より早急に人材を確保したいとのご要望をいただいております。

何かご質問等ございましたら、お気軽にお問い合わせください。
ご検討のほど、よろしくお願いいたします。`
  },
  {
    id: "thanks",
    name: "謝辞",
    subject: "【お礼】案件紹介のお礼",
    body: `お世話になっております。

この度は技術者様のご紹介をいただき、誠にありがとうございました。
おかげさまで、案件元企業様にもご満足いただけるマッチングができました。

今後とも良いお付き合いができますよう、よろしくお願いいたします。`
  }
];

export interface MailCase {
  id: string;
  title: string;
  company: string | null;
  registrationType: "direct" | "platform" | "自動（メール）" | "手動";
  contactEmail?: string;
  techStack?: string[];
  status: string;
  startDate: string | null;
  endDate?: string;
  createdAt: string;
  updatedAt?: string;
  source?: string;
  receivedDate?: string | null;
  sender?: string | null;
  senderName?: string | null;
  keyTechnologies?: string;
  skills: string[];
  location: string;
  budget: string;
  foreignerAccepted: boolean;
  freelancerAccepted: boolean;
  desiredBudget?: string | null;
  experience?: string;
  workType?: string;
  duration?: string;
  japanese?: string;
  priority?: string;
  manager?: string | null;
  managerEmail?: string | null;
  processes?: string[];
  interviewCount?: string;
  detailDescription?: string | null;
  registeredAt?: string;
}

// Engineer interface for the engineer selection functionality
export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: string;
  companyType: string;
}

// Sample engineer data for demonstration
export const SAMPLE_ENGINEERS: Engineer[] = [
  {
    id: "e1",
    name: "山田 太郎",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: "5年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "e2",
    name: "佐藤 次郎",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "3年",
    status: "稼働中",
    companyType: "自社"
  },
  {
    id: "e3",
    name: "鈴木 花子",
    skills: ["Python", "Django", "機械学習"],
    experience: "7年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "e4",
    name: "高橋 健太",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "4年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "e5",
    name: "伊藤 真理",
    skills: ["C#", ".NET", "Azure"],
    experience: "6年",
    status: "稼働中",
    companyType: "他社"
  },
  {
    id: "e6",
    name: "渡辺 一郎",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    experience: "3年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "e7",
    name: "小林 優子",
    skills: ["Ruby", "Rails", "PostgreSQL"],
    experience: "5年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "e8",
    name: "加藤 洋平",
    skills: ["Go", "Docker", "Kubernetes"],
    experience: "4年",
    status: "稼働中",
    companyType: "自社"
  }
];

export interface EmailSenderProps {
  mailCases: MailCase[];
}
