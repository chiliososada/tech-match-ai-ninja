
import { MailCase } from './types';

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
  }
];
