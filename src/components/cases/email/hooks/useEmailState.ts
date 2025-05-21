
import { useState } from 'react';
import { MailCase, EMAIL_TEMPLATES } from '../types';

export const useEmailState = (mailCases: MailCase[]) => {
  // Limit data to 14 entries for email functionality
  const limitedMailCases = mailCases.slice(0, 14);

  // Select/filter state
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCases, setSelectedCases] = useState<MailCase[]>([]);
  const [companyFilter, setCompanyFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Email composition state
  const [selectedTemplate, setSelectedTemplate] = useState(EMAIL_TEMPLATES[0].id);
  const [subject, setSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [emailBody, setEmailBody] = useState(EMAIL_TEMPLATES[0].body);
  const [sending, setSending] = useState(false);
  const [signature, setSignature] = useState("山田 太郎\n株式会社テックサーチ\nTel: 03-0000-0000\nEmail: yamada@techsearch.co.jp");

  return {
    limitedMailCases,
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
    setSignature
  };
};
