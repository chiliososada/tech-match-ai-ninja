
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';

import { EmailSenderProps } from './email/types';
import { EmailSender } from './EmailSender';

// Import custom hooks
import { useEmailState } from './email/hooks/useEmailState';
import { useEngineerState } from './email/hooks/useEngineerState';

// Import utility functions
import { processCaseData, processEngineerData } from './email/utils/dataProcessing';

export function EmailSenderContainer({ mailCases }: EmailSenderProps) {
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

  return (
    <EmailSender 
      mailCases={mailCases}
      isOtherCompanyMode={isOtherCompanyMode}
      caseData={caseData}
      engineerData={engineerData}
      emailState={emailState}
      engineerState={engineerState}
    />
  );
}

export default EmailSenderContainer;
