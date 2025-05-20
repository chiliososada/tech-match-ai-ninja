
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

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: "稼働可能" | "稼働中" | string;
  companyType: "自社" | "他社" | string;
  availability?: string;
  rate?: string;
  location?: string;
  japanese?: string;
  previousClients?: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export interface EmailSenderProps {
  mailCases: MailCase[];
}

// Sample engineers data for demonstration
export const SAMPLE_ENGINEERS: Engineer[] = [
  {
    id: "eng-1",
    name: "田中 太郎",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5年",
    status: "稼働可能",
    companyType: "自社",
    availability: "即日",
    rate: "80万〜100万",
    location: "東京",
    japanese: "ネイティブ"
  },
  {
    id: "eng-2",
    name: "鈴木 次郎",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: "7年",
    status: "稼働中",
    companyType: "自社",
    availability: "2ヶ月後",
    rate: "90万〜110万",
    location: "大阪",
    japanese: "ネイティブ"
  },
  {
    id: "eng-3",
    name: "佐藤 三郎",
    skills: ["Python", "Django", "MySQL"],
    experience: "3年",
    status: "稼働可能",
    companyType: "他社",
    availability: "即日",
    rate: "70万〜85万",
    location: "名古屋",
    japanese: "ネイティブ"
  },
  {
    id: "eng-4",
    name: "John Smith",
    skills: ["React", "Next.js", "GraphQL"],
    experience: "6年",
    status: "稼働可能",
    companyType: "他社",
    availability: "即日",
    rate: "85万〜105万",
    location: "東京",
    japanese: "ビジネスレベル"
  },
  {
    id: "eng-5",
    name: "高橋 五郎",
    skills: ["Vue.js", "Nuxt.js", "Firebase"],
    experience: "4年",
    status: "稼働中",
    companyType: "自社",
    availability: "1ヶ月後",
    rate: "75万〜90万",
    location: "福岡",
    japanese: "ネイティブ"
  },
  {
    id: "eng-6",
    name: "渡辺 六郎",
    skills: ["Angular", "TypeScript", "MongoDB"],
    experience: "5年",
    status: "稼働可能",
    companyType: "他社",
    availability: "即日",
    rate: "80万〜95万",
    location: "札幌",
    japanese: "ネイティブ"
  },
  {
    id: "eng-7",
    name: "Maria Garcia",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "3年",
    status: "稼働可能",
    companyType: "他社",
    availability: "2週間後",
    rate: "70万〜85万",
    location: "横浜",
    japanese: "日常会話レベル"
  },
  {
    id: "eng-8",
    name: "小林 八郎",
    skills: ["C#", ".NET", "Azure"],
    experience: "8年",
    status: "稼働中",
    companyType: "自社",
    availability: "3ヶ月後",
    rate: "95万〜115万",
    location: "東京",
    japanese: "ネイティブ"
  }
];

// Email templates for demonstration
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "custom",
    name: "カスタム",
    subject: "",
    body: ""
  },
  {
    id: "template1",
    name: "テンプレート1：技術者紹介",
    subject: "【案件紹介】技術者のご提案",
    body: `お世話になっております。
株式会社テックマッチングの田中です。

先日は案件情報をご共有いただき、誠にありがとうございました。
ご連絡いただいた案件について、弊社の技術者をご紹介させていただきます。

【案件概要】
・案件名：{案件名}
・スキル要件：{スキル}
・単価：{単価}

【技術者情報】
・氏名：{技術者名}
・スキル：{技術者スキル}
・経験年数：{経験年数}
・稼働開始可能日：即日

詳細な経歴書を添付しておりますので、ご確認いただければ幸いです。
ご興味をお持ちいただけましたら、面談のセッティングをさせていただきます。

ご検討のほど、よろしくお願いいたします。`
  },
  {
    id: "template2",
    name: "テンプレート2：案件問い合わせ",
    subject: "【問い合わせ】案件詳細について",
    body: `お世話になっております。
株式会社テックマッチングの田中です。

先日ご共有いただいた案件について、いくつか確認させていただきたい点がございます。

【確認事項】
1. 案件の開始時期は調整可能でしょうか？
2. リモートワークの可否について教えていただけますか？
3. 面談は何回程度を想定されていますか？

上記についてご回答いただけますと幸いです。
よろしくお願いいたします。`
  },
  {
    id: "template3",
    name: "テンプレート3：フォローアップ",
    subject: "【フォローアップ】先日のご提案について",
    body: `お世話になっております。
株式会社テックマッチングの田中です。

先日ご提案させていただいた技術者について、ご検討いただけましたでしょうか。
もし追加で必要な情報などございましたら、お気軽にお申し付けください。

引き続きよろしくお願いいたします。`
  }
];

// Default signature for emails
export const DEFAULT_SIGNATURE = `
株式会社テックマッチング
営業部 田中太郎
TEL: 03-XXXX-XXXX
Email: tanaka@techmatch.co.jp
`;
