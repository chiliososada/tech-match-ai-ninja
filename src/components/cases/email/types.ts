
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

export interface EmailSenderProps {
  mailCases: MailCase[];
}
