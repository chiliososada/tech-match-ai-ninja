
export interface EmailSenderProps {
  mailCases: MailCase[];
}

export interface MailCase {
  id: string;
  title: string;
  company?: string | null;
  keyTechnologies?: string | null;
  sender?: string | null;
  registrationType?: string;
  registeredAt?: string;
}

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: string;
  companyType: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export const DEFAULT_SIGNATURE = `
株式会社〇〇
営業部
山田 太郎
電話：03-XXXX-XXXX
メール：yamada@example.com
`;

export const EMAIL_TEMPLATES = [
  {
    id: 'template1',
    name: '案件紹介テンプレート',
    subject: '【案件紹介】{案件名} - {会社名}',
    body: 'お世話になっております。\n\n下記の案件についてご案内いたします。\n\n【案件名】{案件名}\n【会社名】{会社名}\n【必須スキル】{技術キーワード}\n\n詳細についてはご連絡ください。',
  },
  {
    id: 'template2',
    name: '技術者紹介テンプレート',
    subject: '【技術者紹介】{技術者名} - {スキル}',
    body: 'お世話になっております。\n\n下記の技術者をご紹介いたします。\n\n【名前】{技術者名}\n【スキル】{スキル}\n【経験】{経験年数}年\n\n詳細についてはご連絡ください。',
  },
  {
    id: 'template3',
    name: '面談依頼テンプレート',
    subject: '【面談依頼】{案件名}',
    body: 'お世話になっております。\n\n{案件名}について面談を調整させていただきたいです。\n\n候補日時：\n・XX月XX日 10:00～\n・XX月XX日 15:00～\n\nご都合の良い日時をお知らせください。',
  },
  {
    id: 'engineer-intro',
    name: '技術者紹介テンプレート',
    subject: '【技術者紹介】[技術者名] - [スキルセット]',
    body: 'お世話になっております。\n\n下記の技術者をご紹介いたします。\n\n【名前】[技術者名]\n【スキル】[スキルセット]\n【経験】[経験年数]\n\n詳細についてはご連絡ください。',
  }
];

// Sample engineers data for testing
export const SAMPLE_ENGINEERS: Engineer[] = [
  {
    id: "eng1",
    name: "佐藤 一郎",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "eng2",
    name: "鈴木 次郎",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: "8年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "eng3",
    name: "高橋 三郎",
    skills: ["Python", "Django", "Docker"],
    experience: "3年",
    status: "予約済み",
    companyType: "自社"
  },
  {
    id: "eng4",
    name: "田中 四郎",
    skills: ["Vue.js", "PHP", "Laravel"],
    experience: "4年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "eng5",
    name: "伊藤 五郎",
    skills: ["Angular", "C#", ".NET"],
    experience: "7年",
    status: "予約済み",
    companyType: "他社"
  },
  {
    id: "eng6",
    name: "渡辺 六郎",
    skills: ["Go", "Kubernetes", "Microservices"],
    experience: "6年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "eng7",
    name: "山本 七郎",
    skills: ["Ruby on Rails", "MySQL", "Redis"],
    experience: "4年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "eng8",
    name: "中村 八郎",
    skills: ["React Native", "iOS", "Android"],
    experience: "3年",
    status: "稼働可能",
    companyType: "他社"
  }
];
