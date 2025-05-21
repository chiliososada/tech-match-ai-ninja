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
  selectedRowId?: string; // Add this property to track which specific row is selected
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
