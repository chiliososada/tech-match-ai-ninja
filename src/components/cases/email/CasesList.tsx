
import React from 'react';
import { Table } from '@/components/ui/table';
import { MailCase } from './types';
import { CasesListHeader } from './components/CasesListHeader';
import { CasesListBody } from './components/CasesListBody';
import { CasesListPagination } from './components/CasesListPagination';
import { useSenderMapper } from './components/SenderMapper';

interface CasesListProps {
  paginatedCases: MailCase[];
  selectedCases: MailCase[]; 
  handleSelectCase: (id: string, rowId: string) => void; // Updated to include rowId
  selectAll: boolean;
  handleSelectAll: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  showCompanyInfo?: boolean;
  onViewCase?: (caseItem: MailCase) => void;
}

export const CasesList: React.FC<CasesListProps> = ({
  paginatedCases,
  selectedCases,
  handleSelectCase,
  selectAll,
  handleSelectAll,
  currentPage,
  setCurrentPage,
  totalPages,
  showCompanyInfo = false,
  onViewCase
}) => {
  // Function to handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when changing pages
  };

  // Use the custom hook to get flattened senders
  const { flattenedSenders } = useSenderMapper({ paginatedCases });

  // Add logging to help debug
  console.log('CasesList rendering with showCompanyInfo:', showCompanyInfo);
  console.log('Number of cases to display:', paginatedCases.length);
  console.log('Current page:', currentPage, 'Total pages:', totalPages);
  console.log('Selected cases:', selectedCases.map(c => ({ id: c.id, rowId: c.selectedRowId })));
  console.log('Flattened senders:', flattenedSenders);

  return (
    <div className="space-y-4">
      <Table>
        <CasesListHeader 
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          disabled={flattenedSenders.length === 0}
          showCompanyInfo={showCompanyInfo}
        />
        <CasesListBody 
          flattenedSenders={flattenedSenders}
          selectedCases={selectedCases}
          handleSelectCase={handleSelectCase}
          showCompanyInfo={showCompanyInfo}
          onViewCase={onViewCase}
        />
      </Table>
      
      <CasesListPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
