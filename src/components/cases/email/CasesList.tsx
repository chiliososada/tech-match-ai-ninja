
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
  selectedCases: MailCase[]; 
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
  console.log('Selected cases:', selectedCases.map(c => c.id));

  // Flatten cases to show senders as the primary entity
  const flattenedSenders = React.useMemo(() => {
    const flattened: {
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
    }[] = [];
    
    paginatedCases.forEach(caseItem => {
      // If case has multiple senders, create an entry for each
      if (caseItem.senders && caseItem.senders.length > 0) {
        caseItem.senders.forEach(sender => {
          flattened.push({
            caseId: caseItem.id,
            caseTitle: caseItem.title,
            company: caseItem.company || '',
            keyTechnologies: caseItem.keyTechnologies || '',
            sender: sender.name,
            email: sender.email,
            position: sender.position,
            registrationType: caseItem.registrationType,
            registeredAt: caseItem.registeredAt,
            originalCase: caseItem
          });
        });
      } 
      // If case has a single sender
      else if (caseItem.sender) {
        flattened.push({
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company || '',
          keyTechnologies: caseItem.keyTechnologies || '',
          sender: caseItem.sender,
          email: caseItem.senderEmail || '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem
        });
      }
      // If case has no sender, still include it but with empty sender fields
      else {
        flattened.push({
          caseId: caseItem.id,
          caseTitle: caseItem.title,
          company: caseItem.company || '',
          keyTechnologies: caseItem.keyTechnologies || '',
          sender: '',
          email: '',
          registrationType: caseItem.registrationType,
          registeredAt: caseItem.registeredAt,
          originalCase: caseItem
        });
      }
    });
    
    return flattened;
  }, [paginatedCases]);

  // Check if a case is selected (not just the sender)
  const isCaseSelected = (caseId: string) => {
    return selectedCases.some(c => c.id === caseId);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectAll && flattenedSenders.length > 0} 
                onCheckedChange={handleSelectAll}
                disabled={flattenedSenders.length === 0}
              />
            </TableHead>
            <TableHead className="japanese-text">送信者</TableHead>
            <TableHead className="japanese-text">メールアドレス</TableHead>
            <TableHead className="japanese-text">案件名</TableHead>
            {showCompanyInfo && (
              <TableHead className="japanese-text">会社名</TableHead>
            )}
            <TableHead className="japanese-text">キー技術</TableHead>
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
          {flattenedSenders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showCompanyInfo ? 8 : 6} className="text-center text-muted-foreground japanese-text">
                表示できる案件がありません
              </TableCell>
            </TableRow>
          ) : (
            flattenedSenders.map((item, index) => (
              <TableRow key={`${item.caseId}-${item.sender}-${index}`}>
                <TableCell>
                  <Checkbox 
                    checked={isCaseSelected(item.caseId)}
                    onCheckedChange={() => handleSelectCase(item.caseId)}
                  />
                </TableCell>
                <TableCell className="font-medium japanese-text">
                  {item.sender || '送信者なし'}
                  {item.position && (
                    <span className="ml-1 text-xs text-muted-foreground">({item.position})</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.email || '-'}
                </TableCell>
                <TableCell className="japanese-text">{item.caseTitle}</TableCell>
                {showCompanyInfo && (
                  <TableCell className="japanese-text">{item.company}</TableCell>
                )}
                <TableCell className="japanese-text">{item.keyTechnologies}</TableCell>
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
                      if (onViewCase) onViewCase(item.originalCase);
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
