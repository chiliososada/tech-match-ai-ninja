
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
  const firstCase = data.selectedCases[0] || {};
  const firstEngineer = data.selectedEngineers[0] || {};
  
  // Create placeholder data
  const placeholderData = {
    title: firstCase.title || '',
    sender: firstCase.sender || firstCase.selectedSenderName || '',
    description: firstCase.description || firstCase.detailDescription || '',
    company: firstCase.company || '',
    companyContact: 'AI採用担当',
    engineerName: firstEngineer.name || '',
    engineerYears: firstEngineer.experience || '',
    engineerSkills: firstEngineer.skills ? firstEngineer.skills.join('、') : ''
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
