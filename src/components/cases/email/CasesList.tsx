
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  generatePaginationRange 
} from '@/components/ui/pagination';

interface CasesListProps {
  paginatedCases: any[];
  selectedCases: string[];
  handleSelectCase: (id: string) => void;
  selectAll: boolean;
  handleSelectAll: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export const CasesList: React.FC<CasesListProps> = ({
  paginatedCases,
  selectedCases,
  handleSelectCase,
  selectAll,
  handleSelectAll,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectAll} 
                  onCheckedChange={handleSelectAll}
                  aria-label="全選択"
                />
              </TableHead>
              <TableHead className="japanese-text">送信者</TableHead>
              <TableHead className="japanese-text">担当者名</TableHead>
              <TableHead className="japanese-text">会社</TableHead>
              <TableHead className="japanese-text">案件名</TableHead>
              <TableHead className="japanese-text">技術キーワード</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCases.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedCases.includes(item.id)}
                    onCheckedChange={() => handleSelectCase(item.id)}
                    aria-label={`${item.sender}を選択`}
                  />
                </TableCell>
                <TableCell className="font-medium">{item.sender}</TableCell>
                <TableCell className="japanese-text">{item.senderName || "-"}</TableCell>
                <TableCell className="japanese-text">{item.company || "-"}</TableCell>
                <TableCell className="japanese-text">{item.title}</TableCell>
                <TableCell className="japanese-text">{item.keyTechnologies || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {generatePaginationRange(currentPage, totalPages).map((item, index) => {
                if (item === 'ellipsis') {
                  return (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                
                return (
                  <PaginationItem key={item}>
                    <PaginationLink 
                      isActive={currentPage === item}
                      onClick={() => setCurrentPage(item)}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};
