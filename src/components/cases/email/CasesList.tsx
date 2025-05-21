
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
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

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

  // Add logging to help debug
  console.log('CasesList rendering with showCompanyInfo:', showCompanyInfo);
  console.log('Number of cases to display:', paginatedCases.length);
  console.log('Current page:', currentPage, 'Total pages:', totalPages);

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
            <TableHead className="japanese-text w-20">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCases.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showCompanyInfo ? 7 : 5} className="text-center text-muted-foreground japanese-text">
                表示できる案件がありません
              </TableCell>
            </TableRow>
          ) : (
            paginatedCases.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCases.some(caseItem => caseItem.id === item.id)}
                    onCheckedChange={() => handleSelectCase(item.id)}
                  />
                </TableCell>
                <TableCell className="font-medium japanese-text">{item.title}</TableCell>
                {showCompanyInfo && (
                  <TableCell className="japanese-text">{item.company}</TableCell>
                )}
                <TableCell className="japanese-text">{item.keyTechnologies}</TableCell>
                <TableCell className="japanese-text">
                  {/* Unified sender display format for both single and multiple senders */}
                  {item.senders && item.senders.length > 0 ? (
                    <div>
                      {item.senders.map((sender, index) => (
                        <div key={index} className="text-sm">
                          {sender.name} <span className="text-xs text-muted-foreground">{sender.email}</span>
                        </div>
                      ))}
                    </div>
                  ) : item.sender ? (
                    <div className="text-sm">
                      {item.sender} <span className="text-xs text-muted-foreground">{item.senderEmail || ''}</span>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">送信者なし</div>
                  )}
                </TableCell>
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
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewCase) onViewCase(item);
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">詳細を見る</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Enhanced pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};
