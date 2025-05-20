
import { Engineer, EMAIL_TEMPLATES } from '../types';

// エンジニア検索ダイアログを開く
export const openEngineerDialog = (
  setIsEngineerDialogOpen: (open: boolean) => void,
  setEngineerCurrentPage: (page: number) => void,
  setEngineerFilter: (filter: string) => void,
  setEngineerCompanyFilter: (filter: string) => void
) => {
  setIsEngineerDialogOpen(true);
  setEngineerCurrentPage(1);
  setEngineerFilter("");
  // Reset company filter when opening dialog
  setEngineerCompanyFilter("all");
};

// エンジニアを選択する
export const toggleEngineerSelection = (
  engineer: Engineer,
  selectedEngineers: Engineer[],
  setSelectedEngineers: (engineers: Engineer[]) => void
) => {
  const isSelected = selectedEngineers.some(e => e.id === engineer.id);
  const newSelectedEngineers = isSelected 
    ? selectedEngineers.filter(e => e.id !== engineer.id)
    : [...selectedEngineers, engineer];
  
  setSelectedEngineers(newSelectedEngineers);
};

// 選択エンジニアの削除
export const removeSelectedEngineer = (
  engineerId: string,
  selectedEngineers: Engineer[],
  setSelectedEngineers: (engineers: Engineer[]) => void
) => {
  setSelectedEngineers(selectedEngineers.filter(e => e.id !== engineerId));
};

// 選択したエンジニアをテンプレートに反映
export const applyEngineerToTemplate = (
  selectedEngineers: Engineer[],
  selectedCases: string[],
  setSelectedTemplate: (template: string) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void
) => {
  if (selectedEngineers.length === 0 || selectedCases.length === 0) return;
  
  // エンジニア紹介テンプレートに切り替え
  setSelectedTemplate("engineer-intro");
  const template = EMAIL_TEMPLATES.find(t => t.id === "engineer-intro");
  
  if (template && selectedEngineers.length > 0) {
    const engineer = selectedEngineers[0];
    let newSubject = template.subject;
    let newBody = template.body
      .replace("[技術者名]", engineer.name)
      .replace("[スキルセット]", engineer.skills.join(", "))
      .replace("[経験年数]", engineer.experience);
    
    // 複数のエンジニアの場合、本文に追加情報を入れる
    if (selectedEngineers.length > 1) {
      newSubject = `【技術者紹介】案件へのマッチング候補（${selectedEngineers.length}名）`;
      newBody += "\n\n他にも以下の技術者がマッチングしております：\n";
      
      selectedEngineers.slice(1).forEach((eng, index) => {
        newBody += `\n${index + 2}. ${eng.name}（${eng.skills.join(", ")}、経験：${eng.experience}）`;
      });
    }
    
    setSubject(newSubject);
    setEmailBody(newBody);
  }
};
