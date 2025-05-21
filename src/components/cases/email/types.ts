
export interface MailCase {
  id: string;
  title: string;
  description?: string;
  detailDescription?: string;
  company: string;
  location: string;
  skills: string[];
  sender?: string;
  senderEmail?: string;
  senders?: Array<{
    name: string;
    email: string;
    position?: string;
  }>;
  startDate?: string;
  salary?: string;
  selectedSenderName?: string;
  selectedSenderEmail?: string;
  selectedRowId?: string;
  // Added properties for type compatibility
  budget?: string;
  status?: string;
  source?: string;
  createdAt?: string;
  receivedDate?: string;
  senderName?: string;
  keyTechnologies?: string;
  registrationType?: string;
  manager?: string;
  managerEmail?: string;
  experience?: string;
  workType?: string;
  duration?: string;
  japanese?: string;
  priority?: string;
  foreignerAccepted?: boolean;
  freelancerAccepted?: boolean;
  desiredBudget?: string;
  interviewCount?: string;
  processes?: string[];
  registeredAt?: string; // Added registeredAt property
}

export interface EmailTemplate {
  id: string; // Make sure this is always a non-empty string
  name: string;
  subject: string;
  body: string;
}

// Add the EmailSenderProps interface that was missing
export interface EmailSenderProps {
  mailCases: MailCase[];
}

// Update Engineer type to make it compatible with candidates/types.ts
// Making all fields optional that are required in candidates/types.ts
export interface Engineer {
  id: string;
  name: string;
  skills?: string[] | string;
  japaneseLevel?: string;
  experience?: string;
  availability?: string;
  status?: string[] | string; 
  remarks?: string;
  companyType?: string;
  companyName?: string;
  source?: string;
  registeredAt?: string;
  updatedAt?: string;
  nationality?: string;
  age?: string;
  gender?: string;
  nearestStation?: string;
  email?: string;
  avatar?: string;
  company?: string;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "default",
    name: "デフォルトテンプレート",
    subject: "【案件のご紹介】{{title}} | テックリクルーターAI",
    body: `{{sender}}様

お世話になっております。テックリクルーターAIの{{companyContact}}です。

貴社で募集されている「{{title}}」案件について、
弊社の技術者がマッチすると考えご連絡させていただきました。

【案件概要】
{{description}}

弊社では、上記スキルに合致する技術者を複数名抱えております。
ご興味をお持ちいただけましたら、ぜひ詳細をご連絡ください。

よろしくお願いいたします。`
  },
  {
    id: "follow-up",
    name: "フォローアップ",
    subject: "【フォローアップ】{{title}} | テックリクルーターAI",
    body: `{{sender}}様

お世話になっております。テックリクルーターAIの{{companyContact}}です。

先日ご連絡差し上げました「{{title}}」案件について、
ご検討いただけましたでしょうか。

弊社の技術者はスケジュール調整が可能ですので、
もしご興味があればぜひご連絡ください。

よろしくお願いいたします。`
  },
  {
    id: "introduction",
    name: "技術者紹介",
    subject: "【技術者紹介】{{engineerName}}のご紹介 | テックリクルーターAI",
    body: `{{sender}}様

お世話になっております。テックリクルーターAIの{{companyContact}}です。

貴社で募集されている「{{title}}」案件に最適な
技術者をご紹介させていただきます。

【技術者情報】
氏名：{{engineerName}}
経験年数：{{engineerYears}}年
主要スキル：{{engineerSkills}}

上記技術者は、貴社の案件要件に高いマッチ度を持っております。
ご興味をお持ちいただけましたら、面談の日程調整をさせていただきます。

よろしくお願いいたします。`
  }
];

export interface EngineerData {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  company: string;
  position: string;
  availability: string;
  email: string;
}

export const SAMPLE_ENGINEERS: EngineerData[] = [
  {
    id: "eng1",
    name: "山田 太郎",
    skills: ["React", "TypeScript", "Node.js"],
    experience: 5,
    company: "自社",
    position: "フロントエンドエンジニア",
    availability: "即日",
    email: "yamada@example.com"
  },
  {
    id: "eng2",
    name: "佐藤 次郎",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: 7,
    company: "自社",
    position: "バックエンドエンジニア",
    availability: "2週間後",
    email: "sato@example.com"
  },
  {
    id: "eng3",
    name: "田中 花子",
    skills: ["Python", "Django", "React"],
    experience: 4,
    company: "自社",
    position: "フルスタックエンジニア",
    availability: "調整可",
    email: "tanaka@example.com"
  },
  {
    id: "eng4",
    name: "鈴木 健太",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: 6,
    company: "他社",
    position: "バックエンドエンジニア",
    availability: "即日",
    email: "suzuki@example.com"
  },
  {
    id: "eng5",
    name: "伊藤 誠",
    skills: ["Vue.js", "Nuxt.js", "Firebase"],
    experience: 3,
    company: "他社",
    position: "フロントエンドエンジニア",
    availability: "1ヶ月後",
    email: "ito@example.com"
  },
  {
    id: "eng6",
    name: "渡辺 明",
    skills: ["C#", ".NET", "Azure"],
    experience: 8,
    company: "他社",
    position: "シニアエンジニア",
    availability: "調整可",
    email: "watanabe@example.com"
  }
];
