
import { Engineer, MailCase, EMAIL_TEMPLATES } from '../types';
import { toast } from '@/hooks/use-toast';

// Handle selectAll checkbox change
export const handleSelectAll = (
  paginatedCases: MailCase[], 
  selectAll: boolean,
  setSelectedCases: (cases: string[]) => void,
  setSelectAll: (select: boolean) => void
) => {
  if (selectAll) {
    setSelectedCases([]);
  } else {
    setSelectedCases(paginatedCases.map(item => item.id));
  }
  setSelectAll(!selectAll);
};

// Handle individual case checkbox change
export const handleSelectCase = (
  id: string,
  selectedCases: string[],
  paginatedCases: MailCase[],
  setSelectedCases: (cases: string[]) => void,
  setSelectAll: (select: boolean) => void
) => {
  const newSelectedCases = selectedCases.includes(id) 
    ? selectedCases.filter(caseId => caseId !== id) 
    : [...selectedCases, id];
  
  setSelectedCases(newSelectedCases);
  
  // Update selectAll state
  if (newSelectedCases.length === paginatedCases.length && paginatedCases.length > 0) {
    setSelectAll(true);
  } else {
    setSelectAll(false);
  }
};

// Handle template selection
export const handleTemplateChange = (
  templateId: string,
  setSelectedTemplate: (template: string) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void
) => {
  setSelectedTemplate(templateId);
  if (templateId !== "custom") {
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setEmailBody(template.body);
    }
  }
};

// Apply AI enhancement to email content
export const handleEnhanceEmail = (
  emailBody: string,
  setSending: (sending: boolean) => void,
  setEmailBody: (body: string) => void
) => {
  if (!emailBody.trim()) {
    toast({
      title: "エラー",
      description: "メール本文を入力してください",
      variant: "destructive"
    });
    return;
  }
  
  // In a real app, this would call an AI service
  // For now, we'll simulate enhanced content
  setSending(true);
  setTimeout(() => {
    const enhancedBody = `${emailBody.trim()}
    
${emailBody.includes('よろしくお願いいたします') ? '' : '\nご検討のほど、よろしくお願いいたします。'}`;
    setEmailBody(enhancedBody);
    setSending(false);
    toast({
      title: "成功",
      description: "メール内容が改善されました",
    });
  }, 1500);
};

// Handle send email
export const handleSendEmail = (
  selectedCases: string[],
  mailCases: MailCase[],
  subject: string,
  emailBody: string,
  setSending: (sending: boolean) => void,
  setSelectedCases: (cases: string[]) => void,
  setSelectAll: (select: boolean) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void,
  setSelectedEngineers: (engineers: Engineer[]) => void
) => {
  if (selectedCases.length === 0) {
    toast({
      title: "エラー",
      description: "送信先を選択してください",
      variant: "destructive"
    });
    return;
  }
  
  if (!subject.trim()) {
    toast({
      title: "エラー",
      description: "件名を入力してください",
      variant: "destructive"
    });
    return;
  }
  
  if (!emailBody.trim()) {
    toast({
      title: "エラー",
      description: "本文を入力してください",
      variant: "destructive"
    });
    return;
  }

  // Simulate sending email
  setSending(true);
  
  setTimeout(() => {
    const selectedEmails = mailCases
      .filter(item => selectedCases.includes(item.id))
      .map(item => item.sender);
    
    toast({
      title: "成功",
      description: `${selectedEmails.length}件のメールが正常に送信されました`,
    });
    
    setSending(false);
    setSelectedCases([]);
    setSelectAll(false);
    setSubject('');
    setEmailBody('');
    setSelectedEngineers([]);
  }, 2000);
};
