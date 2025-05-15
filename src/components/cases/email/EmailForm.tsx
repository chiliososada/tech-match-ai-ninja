
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Send } from 'lucide-react';
import { EmailTemplate } from './types';

interface EmailFormProps {
  emailTemplates: EmailTemplate[];
  selectedTemplate: string;
  handleTemplateChange: (value: string) => void;
  subject: string;
  setSubject: (value: string) => void;
  emailBody: string;
  setEmailBody: (value: string) => void;
  signature: string;
  setSignature: (value: string) => void;
  handleEnhanceEmail: () => void;
  handleSendEmail: () => void;
  sending: boolean;
  selectedCasesCount: number;
}

export const EmailForm: React.FC<EmailFormProps> = ({
  emailTemplates,
  selectedTemplate,
  handleTemplateChange,
  subject,
  setSubject,
  emailBody,
  setEmailBody,
  signature,
  setSignature,
  handleEnhanceEmail,
  handleSendEmail,
  sending,
  selectedCasesCount
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-template" className="japanese-text">メールテンプレート</Label>
        <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
          <SelectTrigger className="japanese-text">
            <SelectValue placeholder="テンプレートを選択" />
          </SelectTrigger>
          <SelectContent>
            {emailTemplates.map((template) => (
              <SelectItem key={template.id} value={template.id} className="japanese-text">
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="subject" className="japanese-text">件名</Label>
        <Input 
          id="subject"
          placeholder="メールの件名"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="japanese-text"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="body" className="japanese-text">本文</Label>
        <Textarea 
          id="body"
          placeholder="メールの本文"
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          rows={8}
          className="japanese-text"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signature" className="japanese-text">署名</Label>
        <Textarea 
          id="signature"
          placeholder="メールの署名"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          rows={4}
          className="japanese-text"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <Button 
          variant="outline"
          onClick={handleEnhanceEmail}
          disabled={sending || !emailBody.trim()}
          className="japanese-text"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          <span className="japanese-text">AIで改善</span>
        </Button>
        
        <Button 
          disabled={sending || selectedCasesCount === 0} 
          onClick={handleSendEmail}
          className="japanese-text"
        >
          {sending ? (
            <span className="japanese-text">送信中...</span>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              <span className="japanese-text">
                {selectedCasesCount}件のメールを送信
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
