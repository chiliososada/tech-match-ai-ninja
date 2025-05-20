
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Send } from 'lucide-react';
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
    <Tabs defaultValue="compose">
      <TabsList className="mb-4">
        <TabsTrigger value="compose" className="japanese-text">メール作成</TabsTrigger>
        <TabsTrigger value="signature" className="japanese-text">署名編集</TabsTrigger>
      </TabsList>
      
      <TabsContent value="compose">
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-4 p-0">
            <div>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="テンプレートを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom" className="japanese-text">カスタム</SelectItem>
                  {emailTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id} className="japanese-text">
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Input 
              placeholder="件名" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="japanese-text"
            />
            
            <div className="space-y-2">
              <Textarea 
                placeholder="本文を入力してください" 
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[200px] japanese-text"
              />
              
              {!hideOptimizationSection && (
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="text-sm font-medium mb-2 japanese-text">メール取得の最適化</h4>
                  <Button 
                    size="sm"
                    variant="outline" 
                    className="w-full japanese-text flex items-center justify-center"
                    onClick={handleEnhanceEmail}
                    disabled={sending || !emailBody.trim()}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    メール内容をAIで改善する
                  </Button>
                </div>
              )}
              
              <div className="text-sm text-muted-foreground japanese-text">
                * 送信時に署名が自動的に追加されます
              </div>
            </div>
            
            <Button 
              onClick={handleSendEmail}
              disabled={sending || selectedCasesCount === 0 || !subject.trim() || !emailBody.trim()}
              className="w-full japanese-text"
            >
              <Send className="mr-2 h-4 w-4" />
              {selectedCasesCount === 0 ? '送信先を選択してください' : `${selectedCasesCount}件のメールを送信`}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="signature">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="space-y-4">
              <h3 className="text-lg font-medium japanese-text">メール署名の編集</h3>
              <Textarea 
                value={signature} 
                onChange={(e) => setSignature(e.target.value)}
                className="min-h-[150px] japanese-text"
              />
              <div className="text-sm text-muted-foreground japanese-text">
                この署名は送信するすべてのメールに自動的に追加されます
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
