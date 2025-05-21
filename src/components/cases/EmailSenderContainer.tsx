
import React from 'react';
import { EmailSenderContent } from './email/EmailSenderContent';
import { useEmailState } from './email/hooks/useEmailState';
import { useEngineerState } from './email/hooks/useEngineerState';
import { createCaseSelectionHandlers } from './email/utils/selection/caseSelectionHandlers';
import { createTemplateHandlers } from './email/utils/template/templateHandlers';
import { createEmailSendingHandlers } from './email/utils/sending/emailSendingHandlers';
import { createEngineerHandlers } from './email/utils/engineerHandlers';
import { createSignatureHandlers } from './email/utils/signature/signatureHandlers';
import { filterPaginatedCases, getTotalPages } from './email/utils/dataProcessing';
import { toast } from 'sonner';
import { EngineerSelectionDialog } from './email/EngineerSelectionDialog'; // Import the new dialog

interface EmailSenderContainerProps {
  mailCases: any[];
}

export function EmailSenderContainer({ mailCases }: EmailSenderContainerProps) {
  // Use custom hooks
  const emailState = useEmailState();
  const engineerState = useEngineerState();
  
  // Get paginated cases based on filters and pagination
  const paginatedCases = filterPaginatedCases(
    mailCases,
    emailState.companyFilter,
    emailState.techFilter,
    emailState.currentPage
  );
  
  // Get total pages for pagination
  const totalPages = getTotalPages(
    mailCases,
    emailState.companyFilter,
    emailState.techFilter
  );
  
  // Get company list for filtering
  const companyList = [...new Set(mailCases.map(c => c.company))];
  
  // Create handlers for different actions
  const casesHandlers = createCaseSelectionHandlers({
    setSelectedCases: emailState.setSelectedCases,
    selectedCases: emailState.selectedCases,
    selectAll: emailState.selectAll,
    setSelectAll: emailState.setSelectAll
  });
  
  const templateHandlers = createTemplateHandlers({
    setSelectedTemplate: emailState.setSelectedTemplate,
    setSubject: emailState.setSubject,
    setEmailBody: emailState.setEmailBody,
    selectedEngineers: engineerState.selectedEngineers
  });
  
  const emailHandlers = createEmailSendingHandlers({
    selectedCases: emailState.selectedCases,
    subject: emailState.subject,
    emailBody: emailState.emailBody,
    signature: emailState.signature,
    setSending: emailState.setSending
  });
  
  const engineerHandlers = createEngineerHandlers(
    engineerState.openEngineerDialog,
    engineerState.removeEngineer,
    () => {
      if (engineerState.selectedEngineers.length === 0) {
        toast.error('技術者が選択されていません');
        return;
      }
      
      if (emailState.selectedCases.length === 0) {
        toast.error('案件が選択されていません');
        return;
      }
      
      // Logic to apply engineer info to template
      const engineerSkills = engineerState.selectedEngineers
        .map(eng => Array.isArray(eng.skills) ? eng.skills.join(', ') : eng.skills)
        .filter(Boolean)
        .join('\n- ');
      
      const engineerNames = engineerState.selectedEngineers
        .map(eng => eng.name)
        .join('、');
      
      const updatedBody = emailState.emailBody +
        `\n\n【ご提案する技術者】\n${engineerNames}\n\n【技術者のスキル】\n- ${engineerSkills}`;
      
      emailState.setEmailBody(updatedBody);
      toast.success('技術者情報をメール本文に反映しました');
    },
    engineerState.addEngineer // Pass the addEngineer function
  );
  
  const signatureHandlers = createSignatureHandlers({
    setSignature: emailState.setSignature,
    signature: emailState.signature
  });
  
  // Handle removing a case from the selected list
  const handleUnselectCase = (caseId: string, rowId: string) => {
    emailState.setSelectedCases(prev => 
      prev.filter(c => !(c.id === caseId && c.selectedRowId === rowId))
    );
  };
  
  // Get combined handlers
  const handlers = {
    casesHandleSelectAll: casesHandlers.handleSelectAll,
    casesHandleSelectCase: casesHandlers.handleSelectCase,
    templateHandleChange: templateHandlers.handleTemplateChange,
    emailHandleEnhance: emailHandlers.handleEnhanceEmail,
    emailHandleSend: emailHandlers.handleSendEmail,
    emailHandleTest: emailHandlers.handleTestEmail,
    engineerHandleOpen: engineerHandlers.openEngineerDialog,
    engineerHandleRemove: engineerHandlers.removeSelectedEngineer,
    engineerHandleApply: engineerHandlers.applyEngineerToTemplate,
    signatureHandleChange: signatureHandlers.handleSignatureChange,
    handleUnselectCase: handleUnselectCase
  };
  
  return (
    <>
      <EmailSenderContent
        isOtherCompanyMode={true}
        emailState={emailState}
        engineerState={engineerState}
        caseData={{
          paginatedCases,
          totalPages,
          companyList
        }}
        handlers={handlers}
      />
      
      {/* Add the EngineerSelectionDialog component */}
      <EngineerSelectionDialog
        isOpen={engineerState.isEngineerDialogOpen}
        onClose={engineerState.closeEngineerDialog}
        onSelect={engineerState.addEngineer}
      />
    </>
  );
}
