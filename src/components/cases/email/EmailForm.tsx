
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Send, Wand2 } from 'lucide-react';
import { EmailTemplate } from './types';

interface EmailFormProps {
  emailTemplates: EmailTemplate[];
  selectedTemplate: string;
  handleTemplateChange: (templateId: string) => void;
  subject: string;
  setSubject: (subject: string) => void;
  emailBody: string;
  setEmailBody: (body: string) => void;
  ccEmails: string;
  setCcEmails: (emails: string) => void;
  signature: string;
  setSignature: (signature: string) => void;
  handleEnhanceEmail: () => void;
  handleSendEmail: () => void;
  sending: boolean;
  selectedCasesCount: number;
  hideOptimizationSection?: boolean;
}

export const EmailForm: React.FC<EmailFormProps> = ({
  emailTemplates,
  selectedTemplate,
  handleTemplateChange,
  subject,
  setSubject,
  emailBody,
  setEmailBody,
  ccEmails,
  setCcEmails,
  signature,
  setSignature,
  handleEnhanceEmail,
  handleSendEmail,
  sending,
  selectedCasesCount,
  hideOptimizationSection = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4 border rounded-md p-4 bg-white shadow-sm">
        <div>
          <Label htmlFor="template" className="japanese-text text-sm font-medium">メールテンプレート</Label>
          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger id="template" className="mt-1 japanese-text bg-white">
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
        
        <div>
          <Label htmlFor="email-subject" className="japanese-text text-sm font-medium">件名</Label>
          <Input
            id="email-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 japanese-text bg-white"
          />
        </div>

        {/* CC機能を追加 */}
        <div>
          <Label htmlFor="cc-emails" className="japanese-text text-sm font-medium">CC (カンマで区切って複数指定可能)</Label>
          <Input
            id="cc-emails"
            value={ccEmails}
            onChange={(e) => setCcEmails(e.target.value)}
            placeholder="例: example1@mail.com, example2@mail.com"
            className="mt-1 japanese-text bg-white"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-body" className="japanese-text text-sm font-medium">本文</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleEnhanceEmail}
              disabled={sending || !emailBody.trim()}
              className="japanese-text"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              AIでテキスト最適化
            </Button>
          </div>
          <Textarea
            id="email-body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            rows={10}
            className="mt-1 japanese-text resize-y"
          />
        </div>
        
        <div>
          <Label htmlFor="signature" className="japanese-text text-sm font-medium">署名</Label>
          <Textarea
            id="signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            rows={3}
            className="mt-1 japanese-text resize-y"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSendEmail} 
            disabled={sending || selectedCasesCount === 0} 
            className="japanese-text"
          >
            {sending ? '送信中...' : (
              <>
                <Send className="mr-2 h-4 w-4" />
                送信
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
