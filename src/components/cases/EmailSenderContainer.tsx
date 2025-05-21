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
  
  // Add multiple senders to some cases for demonstration
  const enhancedMailCases = React.useMemo(() => {
    return mailCases.map(caseItem => {
      // Add multiple senders to some cases based on their ID to ensure consistency
      if (caseItem.id.includes('1') || caseItem.id.includes('3') || caseItem.id.includes('5')) {
        return {
          ...caseItem,
          senders: [
            {
              name: caseItem.sender || '山田 太郎',
              email: caseItem.senderEmail || 'yamada@example.com',
              position: '営業担当'
            },
            {
              name: '佐藤 次郎',
              email: 'sato@example.com',
              position: '技術担当'
            }
          ]
        };
      }
      // For other cases, keep the existing sender info but convert to the new format
      else if (caseItem.sender) {
        return {
          ...caseItem,
          senders: [
            {
              name: caseItem.sender,
              email: caseItem.senderEmail || `${caseItem.sender.replace(/\s+/g, '').toLowerCase()}@example.com`
            }
          ]
        };
      }
      return caseItem;
    });
  }, [mailCases]);
  
  // Process data with improved pagination
  const caseData = processCaseData(
    enhancedMailCases,
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
      mailCases={enhancedMailCases}
      isOtherCompanyMode={isOtherCompanyMode}
      caseData={caseData}
      engineerData={engineerData}
      emailState={emailState}
      engineerState={engineerState}
    />
  );
}

export default EmailSenderContainer;
