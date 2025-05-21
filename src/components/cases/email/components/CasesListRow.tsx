
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { format } from 'date-fns';
import { MailCase } from '../types';

interface CasesListRowProps {
  sender: {
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
  };
  isSelected: boolean;
  handleSelectCase: (id: string) => void;
  showCompanyInfo: boolean;
  onViewCase?: (caseItem: MailCase) => void;
  index: number;
}

export const CasesListRow: React.FC<CasesListRowProps> = ({
  sender,
  isSelected,
  handleSelectCase,
  showCompanyInfo,
  onViewCase,
  index
}) => {
  // Handle direct selection of a single case by ID
  const handleSelect = () => {
    handleSelectCase(sender.caseId);
  };

  return (
    <TableRow key={`${sender.caseId}-${sender.sender}-${index}`}>
      <TableCell>
        <Checkbox 
          checked={isSelected}
          onCheckedChange={handleSelect}
        />
      </TableCell>
      <TableCell className="font-medium japanese-text">
        {sender.sender || '送信者なし'}
        {sender.position && (
          <span className="ml-1 text-xs text-muted-foreground">({sender.position})</span>
        )}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {sender.email || '-'}
      </TableCell>
      <TableCell className="japanese-text">{sender.caseTitle}</TableCell>
      {showCompanyInfo && (
        <TableCell className="japanese-text">{sender.company}</TableCell>
      )}
      <TableCell className="japanese-text">{sender.keyTechnologies}</TableCell>
      {showCompanyInfo && (
        <TableCell className="japanese-text">
          <div className={`px-2 py-0.5 rounded text-xs inline-flex 
            ${sender.registrationType === "自動（メール）" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
            {sender.registrationType || "手動"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {sender.registeredAt && format(new Date(sender.registeredAt), 'yyyy-MM-dd HH:mm')}
          </div>
        </TableCell>
      )}
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            if (onViewCase) onViewCase(sender.originalCase);
          }}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">詳細を見る</span>
        </Button>
      </TableCell>
    </TableRow>
  );
};
