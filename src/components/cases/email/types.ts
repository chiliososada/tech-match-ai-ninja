
export interface EmailSenderProps {
  mailCases: MailCase[];
}

export interface MailCase {
  id: string;
  title: string;
  company?: string;
  keyTechnologies?: string;
  sender: string;
  registrationType?: string;
  registeredAt?: string;
}

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: string;
  companyType?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

// Sample data
export const DEFAULT_SIGNATURE = `
--
株式会社テックリクルーター
営業部 山田太郎
TEL: 03-1234-5678
Email: yamada@techrecruiter.co.jp
`;

// Email templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "greeting",
    name: "初回挨拶",
    subject: "【ご挨拶】技術者派遣のご案内",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

貴社のプロジェクトに最適な技術者をご紹介できればと思い、ご連絡いたしました。
弊社では、[技術領域]に精通したエンジニアを多数抱えており、短期・中期・長期のプロジェクトに対応可能です。

現在、特に以下のスキルを持つエンジニアが稼働可能となっております：
- Java, Spring Boot（経験5年以上）
- React, TypeScript（経験3年以上）
- AWS, Docker, Kubernetes（経験4年以上）

ご興味がございましたら、ぜひ一度お話させていただければ幸いです。
お忙しいところ恐縮ですが、ご検討のほど、よろしくお願い申し上げます。`
  },
  {
    id: "follow-up",
    name: "案件フォローアップ",
    subject: "【フォローアップ】先日ご連絡した件について",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

先日は貴社の案件情報をご共有いただき、誠にありがとうございました。
頂いた案件情報に基づき、条件に合致する技術者を選定いたしましたので、ご報告させていただきます。

・[案件名]案件について
・スキル要件：[スキル]
・稼働可能時期：即日〜

技術者のプロフィールを添付いたしますので、ご確認いただければ幸いです。
ご不明な点やご質問がございましたら、お気軽にお問い合わせください。`
  },
  {
    id: "engineer-intro",
    name: "技術者紹介",
    subject: "【技術者紹介】案件へのマッチング候補",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

先日ご連絡いただいた案件について、条件に合致する技術者を見つけましたのでご紹介させていただきます。

【技術者情報】
・名前：[技術者名]
・スキル：[スキルセット]
・経験年数：[経験年数]
・稼働可能時期：即日〜

技術者のより詳細なプロフィールを添付いたしますので、ご確認いただければ幸いです。
もしご興味がございましたら、面談の日程を調整させていただきます。

ご検討のほど、よろしくお願い申し上げます。`
  },
  {
    id: "custom",
    name: "カスタム",
    subject: "",
    body: ""
  }
];

// Sample engineers data
export const SAMPLE_ENGINEERS: Engineer[] = [
  {
    id: "e1",
    name: "鈴木 一郎",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: "7年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "e2",
    name: "佐藤 次郎",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "e3",
    name: "田中 三郎",
    skills: ["Python", "Django", "AWS"],
    experience: "3年",
    status: "稼働中",
    companyType: "他社"
  },
  {
    id: "e4",
    name: "高橋 四郎",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "6年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "e5",
    name: "渡辺 五郎",
    skills: ["C#", ".NET", "Azure"],
    experience: "8年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "e6",
    name: "伊藤 六郎",
    skills: ["Golang", "Docker", "Kubernetes"],
    experience: "4年",
    status: "稼働中",
    companyType: "自社"
  },
  {
    id: "e7",
    name: "山本 七郎",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    experience: "3年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "e8",
    name: "中村 八郎",
    skills: ["Swift", "iOS", "React Native"],
    experience: "5年",
    status: "稼働中",
    companyType: "自社"
  },
  {
    id: "e9",
    name: "小林 九郎",
    skills: ["Angular", "TypeScript", "MongoDB"],
    experience: "4年",
    status: "稼働可能",
    companyType: "他社"
  },
  {
    id: "e10",
    name: "加藤 十郎",
    skills: ["Ruby", "Rails", "PostgreSQL"],
    experience: "6年",
    status: "稼働可能",
    companyType: "自社"
  },
  {
    id: "e11",
    name: "吉田 十一郎",
    skills: ["Java", "Android", "Kotlin"],
    experience: "7年",
    status: "稼働中",
    companyType: "他社"
  },
  {
    id: "e12",
    name: "山田 十二郎",
    skills: ["React", "Redux", "GraphQL"],
    experience: "4年",
    status: "稼働可能",
    companyType: "自社"
  }
];
