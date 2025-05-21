
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailOptimizationCard } from '../tabs/EmailOptimizationCard';
import { EMAIL_TEMPLATES } from './types';
import { SendHorizontal } from 'lucide-react';

interface EmailFormProps {
  emailTemplates: typeof EMAIL_TEMPLATES;
  selectedTemplate: string;
  handleTemplateChange: (templateId: string) => void;
  subject: string;
  setSubject: (subject: string) => void;
  emailBody: string;
  setEmailBody: (body: string) => void;
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
  signature,
  setSignature,
  handleEnhanceEmail,
  handleSendEmail,
  sending,
  selectedCasesCount,
  hideOptimizationSection = false
}) => {
  return (
    <>
      <Card className="p-4 shadow-sm">
        <div className="space-y-4">
          <div>
            <Label htmlFor="template" className="japanese-text">メールテンプレート</Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="テンプレートを選択" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(emailTemplates).map(([id, template]) => (
                  <SelectItem key={id} value={id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subject" className="japanese-text">件名</Label>
            <Input 
              id="subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
              placeholder="メールの件名"
              className="japanese-text"
            />
          </div>

          <div>
            <Label htmlFor="body" className="japanese-text">本文</Label>
            <Textarea 
              id="body" 
              value={emailBody} 
              onChange={(e) => setEmailBody(e.target.value)}
              className="min-h-[200px] japanese-text"
              placeholder="メールの本文をここに入力してください"
            />
          </div>

          <div>
            <Label htmlFor="signature" className="japanese-text">署名</Label>
            <Textarea 
              id="signature" 
              value={signature} 
              onChange={(e) => setSignature(e.target.value)}
              className="min-h-[80px] japanese-text"
              placeholder="メールの署名をここに入力してください"
            />
          </div>

          {!hideOptimizationSection && (
            <EmailOptimizationCard 
              handleEnhanceEmail={handleEnhanceEmail}
            />
          )}

          <div className="pt-4">
            <Button 
              className="w-full japanese-text bg-primary" 
              onClick={handleSendEmail}
              disabled={sending || subject.trim() === '' || emailBody.trim() === '' || selectedCasesCount === 0}
            >
              {sending ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>送信中...
                </span>
              ) : (
                <span className="flex items-center">
                  <SendHorizontal className="mr-2 h-5 w-5" /> 
                  {selectedCasesCount}件のメールを送信 
                </span>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {!hideOptimizationSection && (
        <div className="mt-4 p-3 border border-amber-200 bg-amber-50 rounded-md">
          <p className="text-sm text-amber-800 japanese-text">
            AIによる自動最適化を使用して、メールの内容を改善できます。
            「メールを最適化」ボタンをクリックしてください。
          </p>
        </div>
      )}
    </>
  );
};

