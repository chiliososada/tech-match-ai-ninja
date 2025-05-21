
import { toast } from 'sonner';
import { MailCase, EmailTemplate, EMAIL_TEMPLATES } from '../types';

// Update template placeholders in text
export const replacePlaceholders = (text: string, data: Record<string, any>) => {
  let result = text;
  Object.keys(data).forEach(key => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    const value = data[key] !== undefined && data[key] !== null ? data[key] : '';
    result = result.replace(placeholder, value);
  });
  return result;
};

// Apply selected template to subject and body fields
export const applyTemplate = (templateId: string, data: { 
  selectedCases: MailCase[],
  selectedEngineers: any[]
}) => {
  // Ensure templateId is valid and not empty
  if (!templateId || templateId === 'no-template') {
    return { 
      subject: '',
      body: '' 
    };
  }

  // Find the template by ID
  const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
  
  if (!template) {
    console.warn(`Template with ID ${templateId} not found`);
    return { 
      subject: '',
      body: '' 
    };
  }

  // Get the first case and engineer for placeholder replacement
  const firstCase = data.selectedCases && data.selectedCases.length > 0 ? data.selectedCases[0] : null;
  const firstEngineer = data.selectedEngineers && data.selectedEngineers.length > 0 ? data.selectedEngineers[0] : null;
  
  // Create placeholder data with safe defaults
  const placeholderData = {
    title: firstCase?.title || '',
    sender: firstCase?.sender || firstCase?.selectedSenderName || '',
    description: firstCase?.description || firstCase?.detailDescription || '',
    company: firstCase?.company || '',
    companyContact: 'AI採用担当',
    engineerName: firstEngineer?.name || '',
    engineerYears: firstEngineer?.experience || '',
    engineerSkills: firstEngineer?.skills ? firstEngineer.skills.join('、') : ''
  };
  
  // Replace placeholders
  const subject = replacePlaceholders(template.subject, placeholderData);
  const body = replacePlaceholders(template.body, placeholderData);
  
  return { subject, body };
};

// Enhance email with AI (simulation)
export const enhanceEmail = async (
  emailBody: string, 
  callback: (enhancedBody: string) => void
) => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Just add some polishing to the email body as a simulation
  const enhancedBody = emailBody + `

---
このメールは自動生成されていません。
`;
  
  // Show success message
  toast.success('メール本文が最適化されました', {
    description: 'AIが文章を改善しました'
  });
  
  callback(enhancedBody);
};

// Send email (simulation)
export const sendEmail = async (
  subject: string, 
  emailBody: string, 
  signature: string, 
  selectedCases: MailCase[],
  callback: () => void
) => {
  // Simulate sending delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract recipients for display
  const recipients = selectedCases.map(c => {
    return c.selectedSenderName || c.sender || 'Unknown Recipient';
  });
  
  // Show success message
  toast.success(`${recipients.length}名にメールを送信しました`, {
    description: `件名: ${subject}`
  });
  
  callback();
};

// Send test email (simulation)
export const sendTestEmail = async (
  subject: string, 
  emailBody: string, 
  signature: string
) => {
  // Simulate sending delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Show success message
  toast.success('テストメールを送信しました', {
    description: '自分宛にテストメールが送信されました'
  });
};

// Add the missing exported functions with the exact names expected in EmailHandlerBindings.tsx

// Handle select all functionality
export const handleSelectAll = (
  paginatedCases: MailCase[],
  isSelectAll: boolean,
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  if (isSelectAll) {
    // Deselect all
    setSelectedCases([]);
    setSelectAll(false);
  } else {
    // Select all with proper rowId
    const casesWithRowId = paginatedCases.map(caseItem => {
      // Generate a unique row ID based on available sender information
      const rowId = `${caseItem.id}-${caseItem.senderEmail || 'default'}-0`;
      
      return {
        ...caseItem,
        selectedRowId: rowId
      };
    });
    
    setSelectedCases(casesWithRowId);
    setSelectAll(true);
  }
};

// Handle individual case selection
export const handleSelectCase = (
  id: string,
  rowId: string,
  selectedCases: MailCase[],
  paginatedCases: MailCase[],
  setSelectedCases: (cases: MailCase[]) => void,
  setSelectAll: (value: boolean) => void
) => {
  // Find the case to toggle
  const caseToToggle = paginatedCases.find(c => c.id === id);
  if (!caseToToggle) return;
  
  // Check if this case is already selected
  const isAlreadySelected = selectedCases.some(c => 
    c.id === id && c.selectedRowId === rowId
  );
  
  if (isAlreadySelected) {
    // Remove from selected
    const updatedCases = selectedCases.filter(c => 
      !(c.id === id && c.selectedRowId === rowId)
    );
    setSelectedCases(updatedCases);
    setSelectAll(false);
  } else {
    // Add to selected, with selected sender details and rowId
    const updatedCase = { 
      ...caseToToggle,
      selectedRowId: rowId
    };
    setSelectedCases([...selectedCases, updatedCase]);
    
    // Check if all are now selected
    if (selectedCases.length + 1 === paginatedCases.length) {
      setSelectAll(true);
    }
  }
};

// Handle template change
export const handleTemplateChange = (
  templateId: string,
  setSelectedTemplate: (template: string) => void,
  setSubject: (subject: string) => void,
  setEmailBody: (body: string) => void
) => {
  setSelectedTemplate(templateId);
  
  const { subject, body } = applyTemplate(templateId, {
    selectedCases: [],
    selectedEngineers: []
  });
  
  setSubject(subject);
  setEmailBody(body);
};

// Handle enhance email
export const handleEnhanceEmail = (
  emailBody: string,
  setSending: (sending: boolean) => void,
  setEmailBody: (body: string) => void
) => {
  setSending(true);
  
  enhanceEmail(emailBody, (enhancedBody) => {
    setEmailBody(enhancedBody);
    setSending(false);
  });
};

// Handle send email
export const handleSendEmail = (
  selectedCases: MailCase[],
  mailCases: MailCase[],
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
    toast.error('送信するメールが選択されていません');
    return;
  }
  
  if (!subject || !emailBody) {
    toast.error('件名または本文が入力されていません');
    return;
  }
  
  setSending(true);
  
  sendEmail(subject, emailBody, "", selectedCases, () => {
    // Reset state after sending
    setSelectedCases([]);
    setSelectAll(false);
    setSubject('');
    setEmailBody('');
    setSelectedEngineers([]);
    setSending(false);
  });
};

// Handle test email
export const handleTestEmail = (
  subject: string,
  emailBody: string,
  signature: string,
  setSending: (sending: boolean) => void
) => {
  if (!subject || !emailBody) {
    toast.error('件名または本文が入力されていません');
    return;
  }
  
  setSending(true);
  
  sendTestEmail(subject, emailBody, signature)
    .then(() => {
      setSending(false);
    });
};
