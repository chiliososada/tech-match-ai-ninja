
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocation } from 'react-router-dom';

import { EmailSenderProps, EMAIL_TEMPLATES } from './email/types';
import { CasesList } from './email/CasesList';
import { EmailForm } from './email/EmailForm';
import { EngineerSelection } from './email/EngineerSelection';
import { EngineerSearchDialog } from './email/EngineerSearchDialog';

// Import custom hooks
import { useEmailState } from './email/hooks/useEmailState';
import { useEngineerState } from './email/hooks/useEngineerState';

// Import utility functions
import { handleSelectAll, handleSelectCase, handleTemplateChange, handleEnhanceEmail, handleSendEmail } from './email/utils/emailHandlers';
import { openEngineerDialog, toggleEngineerSelection, removeSelectedEngineer, applyEngineerToTemplate } from './email/utils/engineerHandlers';
import { processCaseData, processEngineerData } from './email/utils/dataProcessing';

export function EmailSender({ mailCases }: EmailSenderProps) {
  const location = useLocation();
  const isOtherCompanyMode = location.pathname.includes('/company/other');
  const itemsPerPage = 10;
  const engineerItemsPerPage = 6;
  
  // Use custom hooks for state management
  const emailState = useEmailState(mailCases);
  const engineerState = useEngineerState();
  
  // Process data
  const caseData = processCaseData(
    mailCases,
    emailState.companyFilter,
    emailState.techFilter,
    emailState.currentPage,
    itemsPerPage
  );

  const engineerData = processEngineerData(
    engineerState.engineerFilter,
    engineerState.engineerCompanyFilter,
    engineerState.engineerCurrentPage,
    engineerItemsPerPage
  );

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
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Select value={emailState.companyFilter} onValueChange={emailState.setCompanyFilter}>
              <SelectTrigger className="japanese-text w-full sm:w-[200px]">
                <SelectValue placeholder="会社でフィルター" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="japanese-text">すべての会社</SelectItem>
                {caseData.companyList.map((company) => (
                  <SelectItem key={company as string} value={company as string} className="japanese-text">
                    {company as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input 
              placeholder="技術キーワードでフィルター" 
              value={emailState.techFilter}
              onChange={(e) => emailState.setTechFilter(e.target.value)}
              className="japanese-text"
            />
          </div>
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
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* メール設定部分 - 左カラム（2/3幅） */}
            <div className="lg:col-span-2">
              <EmailForm
                emailTemplates={EMAIL_TEMPLATES}
                selectedTemplate={emailState.selectedTemplate}
                handleTemplateChange={templateHandleChange}
                subject={emailState.subject}
                setSubject={emailState.setSubject}
                emailBody={emailState.emailBody}
                setEmailBody={emailState.setEmailBody}
                signature={emailState.signature}
                setSignature={emailState.setSignature}
                handleEnhanceEmail={emailHandleEnhance}
                handleSendEmail={emailHandleSend}
                sending={emailState.sending}
                selectedCasesCount={emailState.selectedCases.length}
                hideOptimizationSection={isOtherCompanyMode} // 他社モードの場合、最適化セクションを非表示
              />
            </div>

            {/* 技術者選択部分 - 右カラム（1/3幅） */}
            <div>
              <EngineerSelection 
                selectedEngineers={engineerState.selectedEngineers}
                openEngineerDialog={engineerHandleOpen}
                removeSelectedEngineer={engineerHandleRemove}
                applyEngineerToTemplate={engineerHandleApply}
                selectedCasesLength={emailState.selectedCases.length}
              />
            </div>
          </div>
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
