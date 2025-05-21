
import React from 'react';
import { useLocation } from 'react-router-dom';

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
  const itemsPerPage = 5; // Changed from 10 to 5 to show pagination effect more easily
  const engineerItemsPerPage = 6; // Number of engineers per page
  
  // Use custom hooks for state management
  const emailState = useEmailState(mailCases);
  const engineerState = useEngineerState();
  
  // Process data with improved pagination
  const caseData = processCaseData(
    mailCases,
    emailState.companyFilter,
    emailState.techFilter,
    emailState.currentPage,
    itemsPerPage
  );

  // Process engineer data with improved pagination
  const engineerData = processEngineerData(
    engineerState.engineerFilter,
    engineerState.engineerCompanyFilter,
    engineerState.engineerCurrentPage,
    engineerItemsPerPage
  );

  // Add debug logs for better troubleshooting
  React.useEffect(() => {
    console.log("EmailSenderContainer rendered:");
    console.log("- isOtherCompanyMode:", isOtherCompanyMode);
    console.log("- mailCases count:", mailCases.length);
    console.log("- Current page:", emailState.currentPage);
    console.log("- Total pages:", caseData.totalPages);
  }, [isOtherCompanyMode, mailCases.length, emailState.currentPage, caseData.totalPages]);

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
