
import { MailCase, EmailTemplate, EMAIL_TEMPLATES } from '../types';
import { toast } from 'sonner';

// 案件一覧の全選択処理 - Fixed to work with the flattened sender rows
export const handleSelectAll = (
  paginatedCases: MailCase[],
  selectAll: boolean,
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  const newSelectAll = !selectAll;
  setSelectAll(newSelectAll);
  
  if (newSelectAll) {
    // Create proper selected cases with rowId from all visible cases
    // This ensures each visible row gets selected, not just one row per case
    const selectedCasesWithRowIds = paginatedCases.reduce((acc: MailCase[], caseItem: MailCase) => {
      // If the case has senders array
      if (caseItem.senders && caseItem.senders.length > 0) {
        // Create a selected case object for each sender
        return [...acc, ...caseItem.senders.map((sender, index) => {
          const rowId = `${caseItem.id}-${sender.email}-${index}`;
          return {
            ...caseItem,
            selectedRowId: rowId,
            selectedSenderName: sender.name,
            selectedSenderEmail: sender.email
          };
        })];
      } 
      // For cases without senders array but with sender property
      else if (caseItem.sender) {
        const rowId = `${caseItem.id}-${caseItem.senderEmail || 'default'}-0`;
        return [...acc, {
          ...caseItem,
          selectedRowId: rowId,
          selectedSenderName: caseItem.sender,
          selectedSenderEmail: caseItem.senderEmail
        }];
      }
      // For cases without any sender info
      else {
        return [...acc, {
          ...caseItem,
          selectedRowId: `${caseItem.id}-default-0`,
          selectedSenderName: '',
          selectedSenderEmail: ''
        }];
      }
    }, []);
    
    console.log('Selected all cases with rowIds:', selectedCasesWithRowIds);
    setSelectedCases(selectedCasesWithRowIds);
  } else {
    setSelectedCases([]);
  }
};

// 案件個別の選択処理 - 個別ケースのみ選択するように修正
export const handleSelectCase = (
  id: string,
  rowId: string,
  selectedCases: MailCase[],
  paginatedCases: MailCase[],
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  // 対象のケースを取得
  const caseItem = paginatedCases.find(item => item.id === id);
  if (!caseItem) return;
  
  // Extract sender information from the rowId
  const rowParts = rowId.split('-');
  let senderName = '';
  let senderEmail = '';
  
  // Find the specific sender info based on rowId
  if (caseItem.senders && caseItem.senders.length > 0) {
    const senderIndex = parseInt(rowParts[2], 10);
    if (!isNaN(senderIndex) && senderIndex < caseItem.senders.length) {
      senderName = caseItem.senders[senderIndex].name;
      senderEmail = caseItem.senders[senderIndex].email;
    }
  } else if (caseItem.sender) {
    senderName = caseItem.sender;
    senderEmail = caseItem.senderEmail || '';
  }
  
  // すでに選択されているか確認 - by rowId
  const isSelected = selectedCases.some(item => 
    item.id === id && item.selectedRowId === rowId
  );
  
  let newSelectedCases: MailCase[];
  
  if (isSelected) {
    // 選択解除 - この特定の行のみを削除
    newSelectedCases = selectedCases.filter(item => 
      !(item.id === id && item.selectedRowId === rowId)
    );
  } else {
    // 追加選択 - 選択した案件のみを追加、rowIdも保存
    const newCase = {
      ...caseItem,
      selectedRowId: rowId,
      selectedSenderName: senderName,
      selectedSenderEmail: senderEmail
    };
    newSelectedCases = [...selectedCases, newCase];
  }
  
  setSelectedCases(newSelectedCases);
  
  // 全部選択されているかチェック
  const allSelected = paginatedCases.length > 0 && 
    paginatedCases.every(item => newSelectedCases.some(selected => selected.id === item.id));
  
  setSelectAll(allSelected);
};

// テンプレート変更時の処理
export const handleTemplateChange = (
  templateId: string,
  setSelectedTemplate: (template: string) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void
) => {
  setSelectedTemplate(templateId);
  
  // テンプレートに応じた件名と本文を設定
  const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
  
  if (template) {
    console.log("Applying template:", template.name);
    
    // 状態更新を確実にするために少し長めの遅延を設定
    setTimeout(() => {
      setSubject(template.subject || "");
      setEmailBody(template.body || "");
      console.log("Template applied:", template.subject, template.body);
    }, 50);
  } else {
    console.log("Template not found for ID:", templateId);
  }
};

// AIによるメール最適化処理
export const handleEnhanceEmail = (
  emailBody: string,
  setSending: (sending: boolean) => void,
  setEmailBody: (body: string) => void
) => {
  if (!emailBody.trim()) {
    toast.error("メール本文を入力してください");
    return;
  }
  
  // 送信中状態にする
  setSending(true);
  
  // AIによる最適化をシミュレーション（実際にはAPIを呼び出す）
  setTimeout(() => {
    const enhancedBody = improveEmailText(emailBody);
    setEmailBody(enhancedBody);
    setSending(false);
    toast.success("メール本文をAIで最適化しました");
  }, 1500);
};

// メール送信処理
export const handleSendEmail = (
  selectedCases: MailCase[],
  allCases: MailCase[],
  subject: string,
  emailBody: string,
  setSending: (sending: boolean) => void,
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void,
  setSelectedEngineers: (engineers: any[]) => void,
) => {
  if (selectedCases.length === 0) {
    toast.error("送信する案件を選択してください");
    return;
  }
  
  if (!subject.trim()) {
    toast.error("件名を入力してください");
    return;
  }
  
  if (!emailBody.trim()) {
    toast.error("メール本文を入力してください");
    return;
  }
  
  // 送信中状態にする
  setSending(true);
  
  // 送信処理をシミュレーション（実際にはAPIを呼び出す）
  setTimeout(() => {
    setSending(false);
    
    // 送信成功メッセージ
    toast.success(`${selectedCases.length}件の案件情報を送信しました`);
    
    // 状態をリセット
    setSelectedCases([]);
    setSelectAll(false);
    setSubject("");
    setEmailBody("");
    setSelectedEngineers([]);
  }, 2000);
};

// AIによるテキスト改善のサンプル実装
function improveEmailText(text: string): string {
  // 実際のアプリケーションではAIサービスを呼び出す
  // このサンプルでは簡単な変換を行う
  
  // 文末に敬語がない場合は追加
  if (!text.includes('よろしくお願いいたします')) {
    text += "\n\nご検討のほど、よろしくお願いいたします。";
  }
  
  // 冒頭に挨拶がない場合は追加
  if (!text.trim().startsWith('お世話になっております')) {
    text = "お世話になっております。\n\n" + text;
  }
  
  return text;
}
