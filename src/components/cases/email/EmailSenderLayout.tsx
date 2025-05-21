
import React from 'react';
import { EmailForm } from './EmailForm';
import { EngineerSelection } from './EngineerSelection';
import { EMAIL_TEMPLATES } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EmailSenderLayoutProps {
  emailState: {
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
    subject: string;
    setSubject: (subject: string) => void;
    emailBody: string;
    setEmailBody: (body: string) => void;
    sending: boolean;
    selectedCases: any[];
    signature: string;
    setSignature: (signature: string) => void;
  };
  engineerState: {
    selectedEngineers: any[];
  };
  handleTemplateChange: (templateId: string) => void;
  handleEnhanceEmail: () => void;
  handleSendEmail: () => void;
  openEngineerDialog: () => void;
  removeSelectedEngineer: (engineerId: string) => void;
  applyEngineerToTemplate: () => void;
  isOtherCompanyMode: boolean;
  handleUnselectCase: (caseId: string) => void;
}

export const EmailSenderLayout: React.FC<EmailSenderLayoutProps> = ({
  emailState,
  engineerState,
  handleTemplateChange,
  handleEnhanceEmail,
  handleSendEmail,
  openEngineerDialog,
  removeSelectedEngineer,
  applyEngineerToTemplate,
  isOtherCompanyMode,
  handleUnselectCase
}) => {
  // Group selected cases by company for better organization
  const selectedSendersByCompany = React.useMemo(() => {
    const groupedSenders: { [company: string]: { 
      name: string;
      email: string;
      caseId: string;
      caseTitle: string;
      rowId?: string; // Add rowId for more precise identification
    }[] } = {};
    
    emailState.selectedCases.forEach(caseItem => {
      const company = caseItem.company || '未指定の会社';
      
      if (!groupedSenders[company]) {
        groupedSenders[company] = [];
      }
      
      // If case has multiple senders but a specific one was selected (via rowId)
      if (caseItem.selectedRowId) {
        // Get the sender info from the rowId
        const rowParts = caseItem.selectedRowId.split('-');
        const senderName = rowParts[1];
        
        if (caseItem.senders && caseItem.senders.length > 0) {
          // Find the matching sender
          const sender = caseItem.senders.find(s => s.name === senderName);
          if (sender) {
            groupedSenders[company].push({
              name: sender.name,
              email: sender.email,
              caseId: caseItem.id,
              caseTitle: caseItem.title,
              rowId: caseItem.selectedRowId
            });
          }
        } 
        // If using legacy format but has selectedRowId
        else if (caseItem.sender) {
          groupedSenders[company].push({
            name: caseItem.sender,
            email: caseItem.senderEmail || '',
            caseId: caseItem.id,
            caseTitle: caseItem.title,
            rowId: caseItem.selectedRowId
          });
        }
      }
      // Legacy case without rowId (backwards compatibility)
      else if (caseItem.sender) {
        groupedSenders[company].push({
          name: caseItem.sender,
          email: caseItem.senderEmail || '',
          caseId: caseItem.id,
          caseTitle: caseItem.title
        });
      }
    });
    
    return groupedSenders;
  }, [emailState.selectedCases]);
  
  // Total count of selected senders
  const totalSelectedSenders = React.useMemo(() => {
    let count = 0;
    Object.values(selectedSendersByCompany).forEach(senders => {
      count += senders.length;
    });
    return count;
  }, [selectedSendersByCompany]);

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 左カラム - 選択した送信者一覧 */}
      <div className="h-full">
        <Card className="h-full flex flex-col border-primary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium japanese-text flex justify-between items-center">
              <span>選択した送信者</span>
              <Badge variant="secondary" className="ml-2">{totalSelectedSenders}人</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2 flex-1 flex flex-col overflow-hidden">
            {totalSelectedSenders === 0 ? (
              <div className="text-sm text-muted-foreground japanese-text py-4 text-center border border-dashed rounded-md h-full flex items-center justify-center">
                送信者が選択されていません
              </div>
            ) : (
              <ScrollArea className="flex-1 pr-4" style={{ height: '500px', maxHeight: 'calc(100vh - 400px)' }}>
                {Object.entries(selectedSendersByCompany).map(([company, senders]) => (
                  <div key={company} className="mb-4">
                    <h4 className="font-semibold text-sm bg-muted px-2 py-1 rounded mb-2 japanese-text">
                      {company} <Badge variant="outline" className="ml-1">{senders.length}人</Badge>
                    </h4>
                    <div className="space-y-2">
                      {senders.map((sender, idx) => (
                        <div key={`${sender.caseId}-${idx}`} className="flex items-center justify-between bg-muted/30 rounded-md p-2 text-sm">
                          <div className="flex-1">
                            <div className="font-medium">{sender.name}</div>
                            <div className="text-xs text-muted-foreground">{sender.email}</div>
                            <div className="text-xs japanese-text mt-1 text-primary/80">{sender.caseTitle}</div>
                          </div>
                          <Button
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => handleUnselectCase(sender.caseId)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">選択解除</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      {/* メール設定部分 - 中央カラム */}
      <div className="lg:col-span-2">
        <EmailForm
          emailTemplates={EMAIL_TEMPLATES}
          selectedTemplate={emailState.selectedTemplate}
          handleTemplateChange={handleTemplateChange}
          subject={emailState.subject}
          setSubject={emailState.setSubject}
          emailBody={emailState.emailBody}
          setEmailBody={emailState.setEmailBody}
          signature={emailState.signature}
          setSignature={emailState.setSignature}
          handleEnhanceEmail={handleEnhanceEmail}
          handleSendEmail={handleSendEmail}
          sending={emailState.sending}
          selectedCasesCount={totalSelectedSenders}
          hideOptimizationSection={isOtherCompanyMode}
        />

        {/* 技術者選択部分 - メールフォームの下に移動 */}
        <div className="mt-6">
          <EngineerSelection 
            selectedEngineers={engineerState.selectedEngineers}
            openEngineerDialog={openEngineerDialog}
            removeSelectedEngineer={removeSelectedEngineer}
            applyEngineerToTemplate={applyEngineerToTemplate}
            selectedCasesLength={totalSelectedSenders}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailSenderLayout;
