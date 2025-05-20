
import React from 'react';
import { MailCase } from './types';
import { 
  handleSelectAll, 
  handleSelectCase, 
  handleTemplateChange, 
  handleEnhanceEmail, 
  handleSendEmail 
} from './utils/emailHandlers';
import { 
  openEngineerDialog, 
  toggleEngineerSelection, 
  removeSelectedEngineer, 
  applyEngineerToTemplate 
} from './utils/engineerHandlers';

interface EmailHandlerBindingsProps {
  mailCases: MailCase[];
  caseData: {
    paginatedCases: MailCase[];
  };
  emailState: {
    selectAll: boolean;
    selectedCases: MailCase[];
    selectedTemplate: string;
    subject: string;
    emailBody: string;
    sending: boolean;
    setSelectedTemplate: (template: string) => void;
    setSubject: (subject: string) => void;
    setEmailBody: (body: string) => void;
    setSending: (sending: boolean) => void;
    setSelectedCases: (cases: MailCase[]) => void;
    setSelectAll: (value: boolean) => void;
  };
  engineerState: {
    selectedEngineers: any[];
    setSelectedEngineers: (engineers: any[]) => void;
    setIsEngineerDialogOpen: (isOpen: boolean) => void;
    setEngineerCurrentPage: (page: number) => void;
    setEngineerFilter: (filter: string) => void;
    setEngineerCompanyFilter: (filter: string) => void;
  };
}

export const useEmailHandlerBindings = ({
  mailCases,
  caseData,
  emailState,
  engineerState
}: EmailHandlerBindingsProps) => {
  
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

  return {
    casesHandleSelectAll,
    casesHandleSelectCase,
    templateHandleChange,
    emailHandleEnhance,
    emailHandleSend,
    engineerHandleOpen,
    engineerHandleToggle,
    engineerHandleRemove,
    engineerHandleApply
  };
};
