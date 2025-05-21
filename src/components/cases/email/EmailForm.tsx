import React, { useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EmailTemplate } from './types';
import { MailCheck, Send, Sparkles, MailPlus } from 'lucide-react';
import { updateSignatureInBody } from './utils/signature/signatureHandlers';

interface EmailFormProps {
  emailTemplates: EmailTemplate[];
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
  handleTestEmail?: () => void; // New optional prop for test email functionality
  sending: boolean;
  selectedCasesCount: number;
  hideOptimizationSection?: boolean;
}

export function EmailForm({
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
  handleTestEmail,
  sending,
  selectedCasesCount,
  hideOptimizationSection = false
}: EmailFormProps) {
  // Ensure selectedTemplate is never undefined or null
  const safeSelectedTemplate = selectedTemplate || "";
  
  // Using a ref to track if this is the first render
  const isFirstRender = React.useRef(true);
  
  // Effect to append signature to email body when signature changes
  // But skip the first render to prevent automatically adding signature when component loads
  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Use the utility function to update the signature
    const updatedBody = updateSignatureInBody(emailBody, signature);
    if (updatedBody !== emailBody) {
      setEmailBody(updatedBody);
    }
  }, [signature]);

  // Handle signature changes
  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSignature = e.target.value;
    setSignature(newSignature);
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 border-primary/10 overflow-hidden">
      <div className="bg-gradient-to-r from-custom-blue-600/80 to-custom-blue-400/70 h-1"></div>
      <CardHeader className="pb-4 bg-gradient-to-b from-muted/30 to-transparent">
        <CardTitle className="flex items-center space-x-2 japanese-text">
          <MailPlus className="h-5 w-5 text-custom-blue-600" />
          <span>メール作成</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="compose" className="japanese-text">メール作成</TabsTrigger>
            <TabsTrigger value="signature" className="japanese-text">署名設定</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="email-template" className="japanese-text">テンプレート選択</Label>
              </div>
              <Select value={safeSelectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="テンプレートを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-template">テンプレートなし</SelectItem>
                  {emailTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id || `template-${template.id}`}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-subject" className="japanese-text">件名</Label>
              <Input 
                id="email-subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                className="japanese-text"
                placeholder="メールの件名を入力してください" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-body" className="japanese-text">本文</Label>
              <Textarea 
                id="email-body" 
                value={emailBody} 
                onChange={(e) => setEmailBody(e.target.value)} 
                className="min-h-[200px] japanese-text resize-y"
                placeholder="メール本文を入力してください" 
              />
            </div>

            {!hideOptimizationSection && (
              <div className="pt-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleEnhanceEmail}
                  disabled={sending || !emailBody.trim()}
                  className="w-full bg-gradient-to-r from-custom-blue-600 to-custom-blue-500 hover:from-custom-blue-700 hover:to-custom-blue-600 text-white japanese-text"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {sending ? 'AIによる最適化中...' : 'AIでメール本文を最適化'}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="signature" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signature" className="japanese-text">署名</Label>
              <Textarea 
                id="signature" 
                value={signature} 
                onChange={handleSignatureChange} 
                className="min-h-[200px] japanese-text resize-y"
                placeholder="メール署名を入力してください。すべてのメールの末尾に追加されます。" 
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 px-6 pb-6 bg-gradient-to-t from-muted/10 to-transparent">
        <Button
          type="button"
          variant="outline"
          onClick={handleTestEmail}
          disabled={sending || !subject.trim() || !emailBody.trim()}
          className="w-full sm:w-auto japanese-text hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
        >
          <MailCheck className="h-4 w-4 mr-2" />
          テストメール送信
        </Button>
        <Button
          type="button"
          onClick={handleSendEmail}
          disabled={sending || selectedCasesCount === 0}
          className="w-full sm:w-auto japanese-text bg-gradient-to-r from-custom-blue-600 to-custom-blue-500 hover:from-custom-blue-700 hover:to-custom-blue-600 text-white"
        >
          <Send className="h-4 w-4 mr-2" />
          {sending ? '送信中...' : selectedCasesCount > 0 ? `${selectedCasesCount}名にメール送信` : 'メール送信'}
        </Button>
      </CardFooter>
    </Card>
  );
}
