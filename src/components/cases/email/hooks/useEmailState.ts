
import { useState } from 'react';
import { MailCase } from '../types';

export const useEmailState = (mailCases: MailCase[]) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCases, setSelectedCases] = useState<MailCase[]>([]);
  const [companyFilter, setCompanyFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [ccEmails, setCcEmails] = useState("");
  const [sending, setSending] = useState(false);
  
  const defaultSignature = `
------------------------------------
株式会社テックサーチ
採用担当: 山田 太郎
メール: yamada@techsearch.co.jp
電話: 03-1234-5678
------------------------------------`;

  const [signature, setSignature] = useState(defaultSignature);

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
    ccEmails,
    setCcEmails,
    sending,
    setSending,
    signature,
    setSignature
  };
};
