
import React from 'react';
import { EngineerSearchDialog } from './email/search/EngineerSearchDialog';
import { MailCase } from './email/types';
import { EmailSenderContent } from './email/EmailSenderContent';
import { useEmailHandlerBindings } from './email/EmailHandlerBindings';

export interface EmailSenderComponentProps {
  mailCases: MailCase[];
  isOtherCompanyMode: boolean;
  caseData: {
    paginatedCases: MailCase[];
    totalPages: number;
    companyList: any[];
  };
  engineerData: {
    paginatedEngineers: any[];
    totalEngineerPages: number;
    filteredEngineers: any[];
  };
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
    setSelectedCases: (cases: MailCase[]) => void;
    setSelectAll: (value: boolean) => void;
  };
  engineerState: {
    selectedEngineers: any[];
    setSelectedEngineers: (engineers: any[]) => void;
    isEngineerDialogOpen: boolean;
    setIsEngineerDialogOpen: (isOpen: boolean) => void;
    engineerFilter: string;
    setEngineerFilter: (filter: string) => void;
    engineerCompanyFilter: string;
    setEngineerCompanyFilter: (filter: string) => void;
    engineerCurrentPage: number;
    setEngineerCurrentPage: (page: number) => void;
  };
}

export function EmailSender({ 
  mailCases, 
  isOtherCompanyMode,
  caseData,
  engineerData,
  emailState,
  engineerState
}: EmailSenderComponentProps) {
  // Use custom hook for handlers
  const handlers = useEmailHandlerBindings({
    mailCases,
    caseData,
    emailState,
    engineerState
  });

  return (
    <>
      <EmailSenderContent
        isOtherCompanyMode={isOtherCompanyMode}
        emailState={emailState}
        engineerState={engineerState}
        caseData={caseData}
        handlers={handlers}
      />

      {/* 技术者検索ダイアログ */}
      <EngineerSearchDialog 
        isOpen={engineerState.isEngineerDialogOpen}
        setIsOpen={engineerState.setIsEngineerDialogOpen}
        paginatedEngineers={engineerData.paginatedEngineers}
        selectedEngineers={engineerState.selectedEngineers}
        toggleEngineerSelection={handlers.engineerHandleToggle}
        engineerFilter={engineerState.engineerFilter}
        setEngineerFilter={engineerState.setEngineerFilter}
        engineerCurrentPage={engineerState.engineerCurrentPage}
        setEngineerCurrentPage={engineerState.setEngineerCurrentPage}
        totalEngineerPages={engineerData.totalEngineerPages}
        filteredEngineersLength={engineerData.filteredEngineers.length}
        engineerCompanyFilter={engineerState.engineerCompanyFilter}
        setEngineerCompanyFilter={engineerState.setEngineerCompanyFilter}
        showCompanyType={isOtherCompanyMode} // 他社モードの場合のみ会社區分を表示
      />
    </>
  );
}

export default EmailSender;
