

export interface MailCase {
  id: string;
  title: string;
  company: string;
  description?: string;
  detailDescription?: string;
  skills: string[];
  location: string;
  registeredBy?: string;
  registrationType?: string;
  registeredAt?: string;
  sender?: string;
  senderEmail?: string;
  senders?: {
    name: string;
    email: string;
    position?: string;
  }[];
  selectedRowId?: string; // To track which specific row is selected
  
  // Additional properties that are used in the codebase but were missing in the type definition
  status?: string;
  budget?: string;
  source?: string;
  receivedDate?: string;
  senderName?: string;
  createdAt?: string;
  startDate?: string;
  keyTechnologies?: string;
  foreignerAccepted?: boolean;
  freelancerAccepted?: boolean;
  desiredBudget?: string;
  experience?: string;
  workType?: string;
  duration?: string;
  japanese?: string;
  priority?: string;
  manager?: string;
  managerEmail?: string;
  processes?: string[];
  interviewCount?: string;
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

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "template1",
    name: "初回連絡",
    subject: "【株式会社テックサーチ】案件のご紹介",
    body: `
  拝啓

  いつもお世話になっております。株式会社テックサーチの山田です。

  この度、貴社にご協力いただきたく、下記の案件をご紹介させていただきます。

  【案件概要】
  案件名：〇〇株式会社向けシステム開発
  業務内容：システム開発
  必須スキル：Java、Spring Framework
  勤務地：東京都
  期間：2024年4月1日～2024年9月30日

  詳細につきましては、別途お打ち合わせさせていただければと存じます。

  ご検討のほど、よろしくお願いいたします。

  敬具
    `
  },
  {
    id: "template2",
    name: "2回目以降の連絡",
    subject: "Re: 【株式会社テックサーチ】案件のご紹介",
    body: `
  拝啓

  いつもお世話になっております。株式会社テックサーチの山田です。

  以前ご紹介させていただきました案件について、進捗はいかがでしょうか。

  もしご興味がございましたら、詳細についてお打ち合わせさせていただければと存じます。

  ご検討のほど、よろしくお願いいたします。

  敬具
    `
  },
  {
    id: "template3",
    name: "その他",
    subject: "【株式会社テックサーチ】お問い合わせ",
    body: `
  拝啓

  いつもお世話になっております。株式会社テックサーチの山田です。

  この度、貴社にお問い合わせさせていただきたく、ご連絡いたしました。

  詳細につきましては、別途お打ち合わせさせていただければと存じます。

  ご検討のほど、よろしくお願いいたします。

  敬具
    `
  }
];

// Add Engineer interface
export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: string;
  companyType?: string; // 自社 or 他社
}

// Add sample engineers data
export const SAMPLE_ENGINEERS: Engineer[] = [
  {
    id: "eng1",
    name: "鈴木 一郎",
    skills: ["Java", "Spring Boot", "React"],
    experience: "10年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "eng2",
    name: "田中 二郎",
    skills: ["Python", "Django", "Vue.js"],
    experience: "5年",
    status: "稼働中",
    companyType: "自社"
  },
  {
    id: "eng3",
    name: "佐藤 三郎",
    skills: ["JavaScript", "TypeScript", "React", "Node.js"],
    experience: "7年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "eng4",
    name: "高橋 四郎",
    skills: ["C#", ".NET", "Azure"],
    experience: "8年",
    status: "稼働中",
    companyType: "自社"
  },
  {
    id: "eng5",
    name: "伊藤 五郎",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "6年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "eng6",
    name: "渡辺 六郎",
    skills: ["Ruby", "Ruby on Rails", "PostgreSQL"],
    experience: "4年",
    status: "稼働中",
    companyType: "他社"
  },
  {
    id: "eng7",
    name: "小林 七郎",
    skills: ["Go", "Docker", "Kubernetes"],
    experience: "3年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "eng8",
    name: "加藤 八郎",
    skills: ["Swift", "iOS", "Objective-C"],
    experience: "5年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "eng9",
    name: "山本 九郎",
    skills: ["Kotlin", "Android", "Firebase"],
    experience: "4年",
    status: "稼働中",
    companyType: "自社"
  },
  {
    id: "eng10",
    name: "中村 十郎",
    skills: ["AWS", "Terraform", "DevOps"],
    experience: "7年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "eng11",
    name: "斉藤 十一郎",
    skills: ["React Native", "GraphQL", "MongoDB"],
    experience: "5年",
    status: "稼働中",
    companyType: "他社"
  },
  {
    id: "eng12",
    name: "藤田 十二郎",
    skills: ["Angular", "NGRX", "TypeScript"],
    experience: "6年",
    status: "稼働可能",
    companyType: "他社"
  }
];

