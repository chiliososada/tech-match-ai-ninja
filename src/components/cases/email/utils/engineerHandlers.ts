
import { MailCase } from "../types";

// Open engineer search dialog
export const openEngineerDialog = (
  setIsEngineerDialogOpen: (isOpen: boolean) => void,
  setEngineerCurrentPage: (page: number) => void,
  setEngineerFilter: (filter: string) => void,
  setEngineerCompanyFilter: (filter: string) => void
) => {
  // Reset dialog state
  setIsEngineerDialogOpen(true);
  setEngineerCurrentPage(1);
  setEngineerFilter("");
  setEngineerCompanyFilter("all");
};

// Toggle engineer selection
export const toggleEngineerSelection = (
  engineer: any,
  selectedEngineers: any[],
  setSelectedEngineers: (engineers: any[]) => void
) => {
  const isSelected = selectedEngineers.some(e => e.id === engineer.id);
  
  if (isSelected) {
    // Remove if already selected
    setSelectedEngineers(selectedEngineers.filter(e => e.id !== engineer.id));
  } else {
    // Add if not selected
    setSelectedEngineers([...selectedEngineers, engineer]);
  }
};

// Remove a selected engineer
export const removeSelectedEngineer = (
  engineerId: string,
  selectedEngineers: any[],
  setSelectedEngineers: (engineers: any[]) => void
) => {
  setSelectedEngineers(selectedEngineers.filter(engineer => engineer.id !== engineerId));
};

// Apply engineer info to email template
export const applyEngineerToTemplate = (
  selectedEngineers: any[],
  selectedCases: MailCase[],
  setSelectedTemplate: (template: string) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void
) => {
  if (selectedEngineers.length === 0 || selectedCases.length === 0) {
    return;
  }
  
  // 最初に選択された技術者の情報を取得
  const engineer = selectedEngineers[0];
  
  // 最初に選択された案件の情報を取得
  const caseData = selectedCases[0];
  
  // テンプレート1を選択
  setSelectedTemplate("template1");
  
  // テンプレート内の変数を置き換え
  setSubject(`【案件紹介】${caseData.title}のご提案`);
  
  // メール本文内のプレースホルダーを置き換え
  let emailBody = `お世話になっております。
株式会社テックマッチングの田中です。

先日は案件情報をご共有いただき、誠にありがとうございました。
ご連絡いただいた案件について、弊社の技術者をご紹介させていただきます。

【案件概要】
・案件名：${caseData.title || '{案件名}'}
・スキル要件：${caseData.skills?.join(', ') || '{スキル}'}
・単価：${caseData.budget || '{単価}'}

【技術者情報】
・氏名：${engineer.name || '{技術者名}'}
・スキル：${engineer.skills?.join(', ') || '{技術者スキル}'}
・経験年数：${engineer.experience || '{経験年数}'}
・稼働開始可能日：即日

詳細な経歴書を添付しておりますので、ご確認いただければ幸いです。
ご興味をお持ちいただけましたら、面談のセッティングをさせていただきます。

ご検討のほど、よろしくお願いいたします。

株式会社テックマッチング
営業部 田中太郎
TEL: 03-XXXX-XXXX
Email: tanaka@techmatch.co.jp`;

  setEmailBody(emailBody);
};
