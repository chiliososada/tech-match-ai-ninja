
import { useState, useEffect, useCallback } from 'react';
import { MailCase } from '../types';

export const useEmailState = (mailCases: MailCase[]) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCases, setSelectedCases] = useState<MailCase[]>([]);
  const [companyFilter, setCompanyFilter] = useState('all');
  const [techFilter, setTechFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('default'); // Changed from empty string to 'default'
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [signature, setSignature] = useState(`

--
テックリクルーターAI
担当：AI採用部
Tel: 03-1234-5678
Email: contact@techrecruiter.ai
`);
  const [sending, setSending] = useState(false);
  
  // For demonstration, we'll limit the number of cases displayed
  const [limitedMailCases, setLimitedMailCases] = useState<MailCase[] | null>(null);

  // Effect to initialize limited data for demonstration
  useEffect(() => {
    if (mailCases.length > 0) {
      setLimitedMailCases(mailCases.slice(0, 14));
    }
  }, [mailCases]);

  // Effect to reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [companyFilter, techFilter]);

  // Effect to deselect all when changing pages or filters
  useEffect(() => {
    setSelectAll(false);
  }, [currentPage, companyFilter, techFilter]);

  // Handle unselect case with specific rowId
  const handleUnselectCase = useCallback((caseId: string, rowId: string) => {
    setSelectedCases(prevSelected => 
      prevSelected.filter(c => !(c.id === caseId && c.selectedRowId === rowId))
    );
  }, []);

  return {
    selectAll,
    setSelectAll,
    selectedCases,
    setSelectedCases,
    companyFilter,
    setCompanyFilter,
    techFilter,
    setTechFilter,
    currentPage,
    setCurrentPage,
    selectedTemplate,
    setSelectedTemplate,
    subject,
    setSubject,
    emailBody,
    setEmailBody,
    sending,
    setSending,
    signature,
    setSignature,
    limitedMailCases,
    handleUnselectCase
  };
};
