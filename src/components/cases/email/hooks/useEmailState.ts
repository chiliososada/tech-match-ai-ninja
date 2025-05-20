
import { useState } from 'react';
import { MailCase, Engineer, EMAIL_TEMPLATES, DEFAULT_SIGNATURE } from '../types';

export const useEmailState = (mailCases: MailCase[]) => {
  // Core email state
  const [selectedCases, setSelectedCases] = useState<MailCase[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sending, setSending] = useState(false);
  const [signature, setSignature] = useState(DEFAULT_SIGNATURE);
  const [selectedTemplate, setSelectedTemplate] = useState("custom");

  // Filtering and pagination state for cases
  const [currentPage, setCurrentPage] = useState(1);
  const [companyFilter, setCompanyFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("");
  
  return {
    // Core email state
    selectedCases,
    setSelectedCases,
    selectAll,
    setSelectAll,
    subject,
    setSubject,
    emailBody,
    setEmailBody,
    sending,
    setSending,
    signature,
    setSignature,
    selectedTemplate,
    setSelectedTemplate,
    
    // Filtering and pagination state
    currentPage,
    setCurrentPage,
    companyFilter,
    setCompanyFilter,
    techFilter,
    setTechFilter
  };
};
