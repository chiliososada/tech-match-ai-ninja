
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
  const itemsPerPage = 5; // Changed from 10 to 5 to show fewer items per page
  const engineerItemsPerPage = 6; // Number of engineers per page
  
  // Use custom hooks for state management
  const emailState = useEmailState(mailCases);
  const engineerState = useEngineerState();
  
  // Use only the limited set of mail cases
  const limitedData = emailState.limitedMailCases || mailCases.slice(0, 14);
  
  // Add multiple senders to some cases for demonstration and add detail descriptions
  const enhancedMailCases = React.useMemo(() => {
    // Process the mail cases to organize by company and sender
    const processedCases = limitedData.map(caseItem => {
      // Generate a detailed description based on case ID to ensure consistency
      const detailDescription = `【案件概要】
${caseItem.title}は、${caseItem.location}での${caseItem.skills.join('、')}を活用した案件です。

【業務内容】
- ${caseItem.skills[0]}を使用したアプリケーション開発
- 既存システムの保守・運用
- 技術設計書の作成
${caseItem.id.includes('2') ? '- チームリーダーとしてのタスク管理' : '- 開発チームとの連携'}

【求めるスキル】
- ${caseItem.skills.join('の経験\n- ')}の経験
- チームでの開発経験
- コミュニケーション能力

【環境】
開発環境：${caseItem.skills[0]}、${caseItem.skills.length > 1 ? caseItem.skills[1] : 'JavaScript'}
${caseItem.id.includes('3') ? 'リモートワーク可（週3日程度出社）' : '原則常駐（リモート応相談）'}`;

      // Always ensure we have a valid company name - this is crucial for avoiding Select.Item errors
      const safeCompany = caseItem.company && typeof caseItem.company === 'string' && caseItem.company.trim() !== '' 
        ? caseItem.company 
        : "未分類会社";

      // Add multiple senders to some cases based on their ID to ensure consistency
      if (caseItem.id.includes('1') || caseItem.id.includes('3') || caseItem.id.includes('5')) {
        return {
          ...caseItem,
          company: safeCompany,
          detailDescription,
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
          company: safeCompany,
          detailDescription,
          senders: [
            {
              name: caseItem.sender,
              email: caseItem.senderEmail || `${caseItem.sender.replace(/\s+/g, '').toLowerCase()}@example.com`
            }
          ]
        };
      }
      return {
        ...caseItem,
        company: safeCompany,
        detailDescription
      };
    });

    return processedCases;
  }, [limitedData]);
  
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
    console.log("- Total mailCases count:", mailCases.length);
    console.log("- Limited mailCases count:", enhancedMailCases.length);
    console.log("- Current page:", emailState.currentPage);
    console.log("- Total pages:", caseData.totalPages);
    
    // Debug company list
    console.log("- Company list:", caseData.companyList);
    
    // Validate all company names to make sure they're all valid strings
    const companyListValid = caseData.companyList.every(company => 
      company !== null && 
      company !== undefined && 
      company !== "" &&
      typeof company === 'string'
    );
    
    console.log("- All company names valid:", companyListValid);
    
    if (!companyListValid) {
      console.warn("WARNING: Some company names are null, undefined, empty string, or not a string!");
      console.warn("Invalid companies:", caseData.companyList.filter(c => !c || c === "" || typeof c !== 'string'));
    }
  }, [isOtherCompanyMode, mailCases.length, enhancedMailCases.length, emailState.currentPage, caseData.totalPages, caseData.companyList]);

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
