
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedMatchingResult } from './types';
import { toast } from 'sonner';
import { Send, Pencil, Eye, EyeOff } from 'lucide-react';

// Define email templates
const EMAIL_TEMPLATES = [
  {
    id: 'template-intro',
    name: '案件紹介テンプレート',
    subject: '【案件紹介】{{caseName}} - {{caseCompany}}',
    body: `{{recipientName}} 様\n\n株式会社〇〇の〇〇でございます。\n\nこの度は、以下の案件をご紹介させていただきます。\n\n■案件名: {{caseName}}\n■クライアント: {{caseCompany}}\n■スキル: {{caseSkills}}\n\n{{caseDescription}}\n\nご興味がございましたら、ご連絡いただければ幸いです。\n\nよろしくお願い申し上げます。`
  },
  {
    id: 'template-candidate',
    name: '人材紹介テンプレート',
    subject: '【人材紹介】{{candidateName}} - {{candidateSkills}}',
    body: `{{recipientName}} 様\n\n株式会社〇〇の〇〇でございます。\n\nこの度は、以下の人材をご紹介させていただきます。\n\n■名前: {{candidateName}}\n■スキル: {{candidateSkills}}\n■経験: {{candidateExperience}}\n\n上記案件に最適なマッチングと判断いたしました。ご検討いただけますと幸いです。\n\nよろしくお願い申し上げます。`
  }
];

interface SendMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: EnhancedMatchingResult | null;
}

export const SendMessageDialog: React.FC<SendMessageDialogProps> = ({
  isOpen,
  onClose,
  matchData,
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('compose');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [signature, setSignature] = useState('');
  const [draftSignature, setDraftSignature] = useState('');
  const [showSignature, setShowSignature] = useState(true);
  const [emailAddress, setEmailAddress] = useState('example@company.jp');

  if (!matchData) return null;

  const recipientCompany = matchData.caseCompany || '未設定';
  
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    if (templateId === 'no-template') {
      return;
    }
    
    const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    // Replace placeholders in template
    let newSubject = template.subject;
    let newBody = template.body;
    
    // Replace case placeholders
    newSubject = newSubject.replace(/{{caseName}}/g, matchData.caseName || '');
    newSubject = newSubject.replace(/{{caseCompany}}/g, matchData.caseCompany || '');
    
    newBody = newBody.replace(/{{recipientName}}/g, matchData.caseCompany || '担当者');
    newBody = newBody.replace(/{{caseName}}/g, matchData.caseName || '');
    newBody = newBody.replace(/{{caseCompany}}/g, matchData.caseCompany || '');
    newBody = newBody.replace(/{{caseSkills}}/g, 'Java, Spring, React, TypeScript');
    newBody = newBody.replace(/{{caseDescription}}/g, '金融系システムの開発案件です。React, TypeScriptを使用した画面開発が主な業務となります。');
    
    // Replace candidate placeholders
    newBody = newBody.replace(/{{candidateName}}/g, matchData.candidateName || '');
    newBody = newBody.replace(/{{candidateSkills}}/g, 'Java, Spring, React, TypeScript');
    newBody = newBody.replace(/{{candidateExperience}}/g, '5年');
    
    setSubject(newSubject);
    setMessage(newBody);
  };

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast("エラー", {
        description: "件名とメッセージを入力してください",
        style: { backgroundColor: 'hsl(var(--destructive))' },
      });
      return;
    }

    setSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      toast("送信完了", {
        description: "メッセージが正常に送信されました",
      });
      onClose();
    }, 1000);
  };
  
  const handleSignatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftSignature(e.target.value);
  };
  
  const handleApplySignature = () => {
    setSignature(draftSignature);
    setShowSignature(true);
    toast("署名設定が完了しました", {
      description: "メール送信時に署名が適用されます",
    });
  };
  
  const toggleSignatureVisibility = () => {
    setShowSignature(!showSignature);
  };
  
  const getFullMessage = () => {
    if (!signature || !showSignature) return message;
    return message.trim() + '\n\n' + signature;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="japanese-text">
            メッセージ送信
          </DialogTitle>
          <DialogDescription className="japanese-text">
            {recipientCompany}に{matchData.caseName}について連絡します
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="compose" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="compose" className="japanese-text">メール作成</TabsTrigger>
            <TabsTrigger value="signature" className="japanese-text">署名設定</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="email-template" className="text-sm font-medium japanese-text">テンプレート選択</label>
              </div>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="テンプレートを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-template" className="japanese-text">テンプレートなし</SelectItem>
                  {EMAIL_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id} className="japanese-text">
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label htmlFor="recipient" className="text-sm font-medium japanese-text">送信先</label>
              <Input
                id="recipient"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="メールアドレスを入力してください"
                className="japanese-text"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="text-sm font-medium japanese-text">件名</label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="件名を入力してください"
                className="japanese-text"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="text-sm font-medium japanese-text">本文</label>
              <Textarea 
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="メッセージを入力してください"
                className="japanese-text min-h-[200px]"
              />
            </div>
            
            {/* Signature Preview */}
            {signature && (
              <div className="mt-4 pt-2 border-t border-dashed border-muted-foreground/30">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-muted-foreground japanese-text flex items-center gap-1">
                    <Pencil className="h-3 w-3" />
                    設定された署名
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs japanese-text flex items-center gap-1"
                    onClick={toggleSignatureVisibility}
                  >
                    {showSignature ? (
                      <>
                        <EyeOff className="h-3 w-3 mr-1" />
                        非表示
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1" />
                        表示
                      </>
                    )}
                  </Button>
                </div>
                {showSignature && (
                  <div className="bg-muted/30 rounded p-2 text-sm font-mono whitespace-pre-wrap text-muted-foreground">
                    {signature}
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="signature" className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="signature" className="text-sm font-medium japanese-text">署名</label>
              <Textarea 
                id="signature" 
                value={draftSignature} 
                onChange={handleSignatureChange} 
                className="min-h-[200px] japanese-text resize-y"
                placeholder="メール署名を入力してください。" 
              />
              <p className="text-xs text-muted-foreground japanese-text">
                全てのメールの送信時に追加されます。
              </p>
            </div>
            
            <Button 
              type="button" 
              onClick={handleApplySignature}
              className="w-full japanese-text"
            >
              署名を設定する
            </Button>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-end pt-4 border-t mt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            className="japanese-text"
          >
            キャンセル
          </Button>
          <Button 
            type="button" 
            onClick={handleSend}
            disabled={sending}
            className="japanese-text"
          >
            {sending ? (
              <>処理中...</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                送信する
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
