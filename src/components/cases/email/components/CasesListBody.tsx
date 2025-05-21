
import React from 'react';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { CasesListRow } from './CasesListRow';
import { MailCase } from '../types';

interface CasesListBodyProps {
  flattenedSenders: {
    caseId: string;
    caseTitle: string;
    company: string;
    keyTechnologies: string;
    sender: string;
    email: string;
    position?: string;
    registrationType?: string;
    registeredAt?: string;
    originalCase: MailCase;
  }[];
  selectedCases: MailCase[];
  handleSelectCase: (id: string) => void;
  showCompanyInfo: boolean;
  onViewCase?: (caseItem: MailCase) => void;
}

export const CasesListBody: React.FC<CasesListBodyProps> = ({
  flattenedSenders,
  selectedCases,
  handleSelectCase,
  showCompanyInfo,
  onViewCase
}) => {
  // Check if a case is selected
  const isCaseSelected = (caseId: string) => {
    return selectedCases.some(c => c.id === caseId);
  };

  return (
    <TableBody>
      {flattenedSenders.length === 0 ? (
        <TableRow>
          <TableCell colSpan={showCompanyInfo ? 8 : 6} className="text-center text-muted-foreground japanese-text">
            表示できる案件がありません
          </TableCell>
        </TableRow>
      ) : (
        flattenedSenders.map((item, index) => (
          <CasesListRow
            key={`${item.caseId}-${item.sender}-${index}`}
            sender={item}
            isSelected={isCaseSelected(item.caseId)}
            handleSelectCase={handleSelectCase}
            showCompanyInfo={showCompanyInfo}
            onViewCase={onViewCase}
            index={index}
          />
        ))
      )}
    </TableBody>
  );
};
