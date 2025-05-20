
import { MailCase } from "../types";
import { toast } from "@/hooks/toast";

// Handle select all cases for email
export const handleSelectAll = (
  paginatedCases: MailCase[],
  selectAll: boolean,
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  if (selectAll) {
    setSelectedCases([]);
    setSelectAll(false);
  } else {
    setSelectedCases([...paginatedCases]);
    setSelectAll(true);
  }
};

// Handle selecting a single case
export const handleSelectCase = (
  id: string,
  selectedCases: MailCase[],
  paginatedCases: MailCase[],
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  const isSelected = selectedCases.some(caseItem => caseItem.id === id);
  
  if (isSelected) {
    // 削除
    setSelectedCases(selectedCases.filter(caseItem => caseItem.id !== id));
    setSelectAll(false);
  } else {
    // 追加
    const caseToAdd = paginatedCases.find(caseItem => caseItem.id === id);
    if (caseToAdd) {
      setSelectedCases([...selectedCases, caseToAdd]);
      
      // すべて選択されているかチェック
      if (selectedCases.length + 1 === paginatedCases.length) {
        setSelectAll(true);
      }
    }
  }
};

// Handle template selection change
export const handleTemplateChange = (
  templateId: string,
  setSelectedTemplate: (template: string) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void
) => {
  setSelectedTemplate(templateId);
  
  // テンプレートに基づいて件名と本文を設定
  switch (templateId) {
    case "template1":
      setSubject("【案件紹介】貴社の募集案件についてのご連絡");
      setEmailBody(`お世話になっております。
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
・稼働開始可能日：{稼働開始日}

詳細な経歴書を添付しておりますので、ご確認いただければ幸いです。
ご興味をお持ちいただけましたら、面談のセッティングをさせていただきます。

ご検討のほど、よろしくお願いいたします。

株式会社テックマッチング
営業部 田中太郎
TEL: 03-XXXX-XXXX
Email: tanaka@techmatch.co.jp`);
      break;
    case "template2":
      setSubject("【技術者紹介】新規技術者のご提案");
      setEmailBody(`お世話になっております。
株式会社テックマッチングの鈴木です。

貴社の募集案件に最適な技術者が新たに参画可能となりましたので、
ご提案させていただきます。

【技術者情報】
・氏名：{技術者名}
・スキル：{技術者スキル}
・経験年数：{経験年数}
・単価：{単価}
・稼働開始可能日：{稼働開始日}

【得意領域】
{技術者の得意領域や実績など}

ご興味をお持ちいただけましたら、詳細な経歴書をお送りいたします。
ご検討のほど、よろしくお願いいたします。

株式会社テックマッチング
営業部 鈴木一郎
TEL: 03-XXXX-YYYY
Email: suzuki@techmatch.co.jp`);
      break;
    case "template3":
      setSubject("【ご連絡】案件ご成約のお礼");
      setEmailBody(`お世話になっております。
株式会社テックマッチングの佐藤です。

先日は弊社の技術者をご採用いただき、誠にありがとうございました。
技術者も貴社での業務に大変意欲を持っております。

【決定案件情報】
・案件名：{案件名}
・技術者名：{技術者名}
・開始日：{開始日}
・契約期間：{契約期間}

今後とも良好な関係を続けられますよう、誠心誠意サポートして参ります。
何かございましたら、いつでもご連絡ください。

株式会社テックマッチング
営業部 佐藤花子
TEL: 03-XXXX-ZZZZ
Email: sato@techmatch.co.jp`);
      break;
    default:
      setSubject("");
      setEmailBody("");
  }
};

// Handle email enhancement with AI
export const handleEnhanceEmail = (
  currentEmailBody: string,
  setSending: (sending: boolean) => void,
  setEmailBody: (body: string) => void
) => {
  // AIによるメール内容の最適化をシミュレート
  setSending(true);
  
  setTimeout(() => {
    // 元のメール内容を整形する簡易的な処理
    const enhancedEmail = currentEmailBody
      .replace(/。/g, "。\n")
      .replace(/、/g, "、")
      .replace(/\n\n\n+/g, "\n\n");
      
    setEmailBody(enhancedEmail);
    setSending(false);
    
    // 最適化完了の通知
    toast({
      title: "メールの最適化が完了しました",
      description: "AIがメールの文章を改善しました"
    });
  }, 1500);
};

// Handle sending email - Updated the function signature to accept MailCase[] instead of any[]
export const handleSendEmail = (
  selectedCases: MailCase[],
  mailCases: MailCase[], // Changed from any[] to MailCase[]
  subject: string,
  emailBody: string,
  setSending: (sending: boolean) => void,
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void,
  setSelectedEngineers: (engineers: any[]) => void
) => {
  if (selectedCases.length === 0) {
    toast({
      title: "エラー",
      description: "送信する案件が選択されていません",
      variant: "destructive"
    });
    return;
  }
  
  if (!subject || !emailBody) {
    toast({
      title: "エラー",
      description: "件名または本文が入力されていません",
      variant: "destructive"
    });
    return;
  }
  
  // 送信中状態をセット
  setSending(true);
  
  // メール送信をシミュレート
  setTimeout(() => {
    // 送信完了後の状態リセット
    setSelectedCases([]);
    setSelectAll(false);
    setSubject("");
    setEmailBody("");
    setSelectedEngineers([]);
    setSending(false);
    
    // 送信成功の通知
    toast({
      title: "メール送信完了",
      description: `${selectedCases.length}件の案件担当者にメールを送信しました`
    });
  }, 2000);
};
