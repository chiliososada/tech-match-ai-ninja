
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { EmailTemplate } from './types';
import { Send, Copy } from 'lucide-react';

interface EmailFormProps {
  emailTemplates: EmailTemplate[];
  selectedTemplate: string;
  handleTemplateChange: (template: string) => void;
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="japanese-text text-lg font-medium">メール内容の設定</Label>
        
        <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
          <SelectTrigger className="w-[180px] japanese-text">
            <SelectValue placeholder="テンプレート選択" />
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
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="subject" className="japanese-text">件名</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="japanese-text"
            placeholder="メールの件名を入力"
          />
        </div>
        
        <div>
          <Label htmlFor="body" className="japanese-text">本文</Label>
          <Textarea
            id="body"
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            className="japanese-text min-h-[200px]"
            placeholder="メールの本文を入力"
          />
        </div>
        
        <div>
          <Label htmlFor="signature" className="japanese-text">署名</Label>
          <Textarea
            id="signature"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="japanese-text min-h-[100px]"
            placeholder="メールの署名を入力"
          />
        </div>
        
        {!hideOptimizationSection && (
          <Card className="p-4 bg-muted/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-sm font-medium japanese-text">メール内容の最適化</h3>
                <p className="text-xs text-muted-foreground japanese-text">
                  AIを使用してより効果的なメール文章に改善できます
                </p>
              </div>
              <Button 
                onClick={handleEnhanceEmail} 
                disabled={sending}
                variant="outline" 
                className="japanese-text"
              >
                {sending ? <Spinner className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                内容を最適化
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button 
          onClick={handleSendEmail}
          disabled={sending || selectedCasesCount === 0}
          className="min-w-[150px] japanese-text"
        >
          {sending ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              送信中...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              {selectedCasesCount > 0 
                ? `${selectedCasesCount}件のメールを送信` 
                : 'メールを送信'}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
