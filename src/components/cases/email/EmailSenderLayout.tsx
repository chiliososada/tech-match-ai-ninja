
import React from 'react';
import { EmailForm } from './EmailForm';
import { EngineerSelection } from './EngineerSelection';
import { EMAIL_TEMPLATES } from './types';

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
  isOtherCompanyMode
}) => {
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* メール設定部分 - 左カラム（2/3幅） */}
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
          selectedCasesCount={emailState.selectedCases.length}
          hideOptimizationSection={isOtherCompanyMode} // 他社モードの場合、最適化セクションを非表示
        />
      </div>

      {/* 技術者選択部分 - 右カラム（1/3幅） */}
      <div>
        <EngineerSelection 
          selectedEngineers={engineerState.selectedEngineers}
          openEngineerDialog={openEngineerDialog}
          removeSelectedEngineer={removeSelectedEngineer}
          applyEngineerToTemplate={applyEngineerToTemplate}
          selectedCasesLength={emailState.selectedCases.length}
        />
      </div>
    </div>
  );
};

export default EmailSenderLayout;
