
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { 
  Pagination
} from '@/components/ui/pagination';
import { MailCase } from './types';

interface CasesListProps {
  paginatedCases: MailCase[];
  selectedCases: MailCase[]; // Changed from string[] to MailCase[]
  handleSelectCase: (id: string) => void;
  selectAll: boolean;
  handleSelectAll: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  showCompanyInfo?: boolean;
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
  showCompanyInfo = false
}) => {
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectAll && paginatedCases.length > 0} 
                onCheckedChange={handleSelectAll}
                disabled={paginatedCases.length === 0}
              />
            </TableHead>
            <TableHead className="japanese-text">案件名</TableHead>
            {showCompanyInfo && (
              <TableHead className="japanese-text">会社名</TableHead>
            )}
            <TableHead className="japanese-text">キー技術</TableHead>
            <TableHead className="japanese-text">送信者</TableHead>
            {showCompanyInfo && (
              <TableHead className="japanese-text">
                <div>登録方式</div>
                <div className="text-xs text-muted-foreground">登録時間</div>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showCompanyInfo ? 6 : 4} className="text-center text-muted-foreground japanese-text">
                表示できる案件がありません
              </TableCell>
            </TableRow>
          ) : (
            paginatedCases.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCases.some(caseItem => caseItem.id === item.id)} // Updated to check using object comparison
                    onCheckedChange={() => handleSelectCase(item.id)}
                  />
                </TableCell>
                <TableCell className="font-medium japanese-text">{item.title}</TableCell>
                {showCompanyInfo && (
                  <TableCell className="japanese-text">{item.company}</TableCell>
                )}
                <TableCell className="japanese-text">{item.keyTechnologies}</TableCell>
                <TableCell className="japanese-text">{item.sender}</TableCell>
                {showCompanyInfo && (
                  <TableCell className="japanese-text">
                    <div className={`px-2 py-0.5 rounded text-xs inline-flex 
                      ${item.registrationType === "自動（メール）" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                      {item.registrationType || "手動"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.registeredAt && format(new Date(item.registeredAt), 'yyyy-MM-dd HH:mm')}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};
