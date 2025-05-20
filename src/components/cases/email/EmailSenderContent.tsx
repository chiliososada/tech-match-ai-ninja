
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

import { CasesList } from './CasesList';
import { EmailSenderLayout } from './EmailSenderLayout';
import { FilterBar } from './FilterBar';
import { MailCase } from './types';

interface EmailSenderContentProps {
  isOtherCompanyMode: boolean;
  emailState: {
    selectAll: boolean;
    selectedCases: MailCase[];
    companyFilter: string;
    setCompanyFilter: (value: string) => void;
    techFilter: string;
    setTechFilter: (value: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
    subject: string;
    setSubject: (subject: string) => void;
    emailBody: string;
    setEmailBody: (body: string) => void;
    sending: boolean;
    setSending: (sending: boolean) => void;
  };
  engineerState: {
    selectedEngineers: any[];
  };
  caseData: {
    paginatedCases: MailCase[];
    totalPages: number;
    companyList: string[];
  };
  handlers: {
    casesHandleSelectAll: () => void;
    casesHandleSelectCase: (id: string) => void;
    templateHandleChange: (templateId: string) => void;
    emailHandleEnhance: () => void;
    emailHandleSend: () => void;
    engineerHandleOpen: () => void;
    engineerHandleRemove: (engineerId: string) => void;
    engineerHandleApply: () => void;
  };
}

export const EmailSenderContent: React.FC<EmailSenderContentProps> = ({
  isOtherCompanyMode,
  emailState,
  engineerState,
  caseData,
  handlers
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">一括メール送信</CardTitle>
          <CardDescription className="japanese-text">
            メール案件の送信者に一括でメールを送信します
          </CardDescription>
          <FilterBar 
            companyFilter={emailState.companyFilter}
            setCompanyFilter={emailState.setCompanyFilter}
            techFilter={emailState.techFilter}
            setTechFilter={emailState.setTechFilter}
            companyList={caseData.companyList}
          />
        </CardHeader>
        <CardContent>
          {/* 案件一覧 - 他社モードの場合は会社名と登録方法も表示 */}
          <CasesList
            paginatedCases={caseData.paginatedCases}
            selectedCases={emailState.selectedCases}
            handleSelectCase={handlers.casesHandleSelectCase}
            selectAll={emailState.selectAll}
            handleSelectAll={handlers.casesHandleSelectAll}
            currentPage={emailState.currentPage}
            setCurrentPage={emailState.setCurrentPage}
            totalPages={caseData.totalPages}
            showCompanyInfo={isOtherCompanyMode} // 他社モードの場合のみ会社情報を表示
          />
          
          <EmailSenderLayout
            emailState={emailState}
            engineerState={engineerState}
            handleTemplateChange={handlers.templateHandleChange}
            handleEnhanceEmail={handlers.emailHandleEnhance}
            handleSendEmail={handlers.emailHandleSend}
            openEngineerDialog={handlers.engineerHandleOpen}
            removeSelectedEngineer={handlers.engineerHandleRemove}
            applyEngineerToTemplate={handlers.engineerHandleApply}
            isOtherCompanyMode={isOtherCompanyMode}
          />
        </CardContent>
      </Card>
    </div>
  );
};
