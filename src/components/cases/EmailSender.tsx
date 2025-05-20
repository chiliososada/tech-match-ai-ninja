
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

import { CasesList } from './email/CasesList';
import { EmailSenderLayout } from './email/EmailSenderLayout';
import { FilterBar } from './email/FilterBar';
import { EngineerSearchDialog } from './email/EngineerSearchDialog';
import { EMAIL_TEMPLATES, MailCase } from './email/types';

// Import utility functions
import { handleSelectAll, handleSelectCase, handleTemplateChange, handleEnhanceEmail, handleSendEmail } from './email/utils/emailHandlers';
import { openEngineerDialog, toggleEngineerSelection, removeSelectedEngineer, applyEngineerToTemplate } from './email/utils/engineerHandlers';

interface EmailSenderComponentProps {
  mailCases: MailCase[];
  isOtherCompanyMode: boolean;
  caseData: any;
  engineerData: any;
  emailState: any;
  engineerState: any;
}

export function EmailSender({ 
  mailCases, 
  isOtherCompanyMode,
  caseData,
  engineerData,
  emailState,
  engineerState
}: EmailSenderComponentProps) {
  // Handlers with proper state binding
  const casesHandleSelectAll = () => handleSelectAll(
    caseData.paginatedCases,
    emailState.selectAll,
    emailState.setSelectedCases,
    emailState.setSelectAll
  );

  const casesHandleSelectCase = (id: string) => handleSelectCase(
    id,
    emailState.selectedCases,
    caseData.paginatedCases,
    emailState.setSelectedCases,
    emailState.setSelectAll
  );

  const templateHandleChange = (templateId: string) => handleTemplateChange(
    templateId,
    emailState.setSelectedTemplate,
    emailState.setSubject,
    emailState.setEmailBody
  );

  const emailHandleEnhance = () => handleEnhanceEmail(
    emailState.emailBody,
    emailState.setSending,
    emailState.setEmailBody
  );

  const emailHandleSend = () => handleSendEmail(
    emailState.selectedCases,
    mailCases,
    emailState.subject,
    emailState.emailBody,
    emailState.setSending,
    emailState.setSelectedCases,
    emailState.setSelectAll,
    emailState.setSubject,
    emailState.setEmailBody,
    engineerState.setSelectedEngineers
  );

  const engineerHandleOpen = () => openEngineerDialog(
    engineerState.setIsEngineerDialogOpen,
    engineerState.setEngineerCurrentPage,
    engineerState.setEngineerFilter,
    engineerState.setEngineerCompanyFilter
  );

  const engineerHandleToggle = (engineer: any) => toggleEngineerSelection(
    engineer,
    engineerState.selectedEngineers,
    engineerState.setSelectedEngineers
  );

  const engineerHandleRemove = (engineerId: string) => removeSelectedEngineer(
    engineerId,
    engineerState.selectedEngineers,
    engineerState.setSelectedEngineers
  );

  const engineerHandleApply = () => applyEngineerToTemplate(
    engineerState.selectedEngineers,
    emailState.selectedCases,
    emailState.setSelectedTemplate,
    emailState.setSubject,
    emailState.setEmailBody
  );

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
            handleSelectCase={casesHandleSelectCase}
            selectAll={emailState.selectAll}
            handleSelectAll={casesHandleSelectAll}
            currentPage={emailState.currentPage}
            setCurrentPage={emailState.setCurrentPage}
            totalPages={caseData.totalPages}
            showCompanyInfo={isOtherCompanyMode} // 他社モードの場合のみ会社情報を表示
          />
          
          <EmailSenderLayout
            emailState={emailState}
            engineerState={engineerState}
            handleTemplateChange={templateHandleChange}
            handleEnhanceEmail={emailHandleEnhance}
            handleSendEmail={emailHandleSend}
            openEngineerDialog={engineerHandleOpen}
            removeSelectedEngineer={engineerHandleRemove}
            applyEngineerToTemplate={engineerHandleApply}
            isOtherCompanyMode={isOtherCompanyMode}
          />
        </CardContent>
      </Card>

      {/* 技術者検索ダイアログ */}
      <EngineerSearchDialog 
        isOpen={engineerState.isEngineerDialogOpen}
        setIsOpen={engineerState.setIsEngineerDialogOpen}
        paginatedEngineers={engineerData.paginatedEngineers}
        selectedEngineers={engineerState.selectedEngineers}
        toggleEngineerSelection={engineerHandleToggle}
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
    </div>
  );
}

export default EmailSender;
