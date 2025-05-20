
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Home } from 'lucide-react';
import { MailCase } from '../email/types';

// 案件のステータスに応じた色を返す関数
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "募集中":
      return "bg-green-100 text-green-800";
    case "募集完了":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface CaseListTableProps {
  paginatedCases: MailCase[];
  selectedCase: MailCase | null;
  onSelectCase: (caseItem: MailCase) => void;
}

export const CaseListTable: React.FC<CaseListTableProps> = ({ 
  paginatedCases, 
  selectedCase, 
  onSelectCase
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="japanese-text">案件名</TableHead>
            <TableHead className="japanese-text">開始日</TableHead>
            <TableHead className="japanese-text">勤務地</TableHead>
            <TableHead className="japanese-text">スキル</TableHead>
            <TableHead className="japanese-text">予算</TableHead>
            <TableHead className="japanese-text">外国人</TableHead>
            <TableHead className="japanese-text">ステータス</TableHead>
            <TableHead className="japanese-text">希望単価</TableHead>
            <TableHead className="japanese-text">個人事業者</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCases.map((item) => (
            <TableRow 
              key={item.id} 
              className={selectedCase?.id === item.id ? "bg-muted" : ""}
              onClick={() => onSelectCase(item)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell className="font-medium japanese-text">{item.title}</TableCell>
              <TableCell className="japanese-text text-sm">
                {item.startDate || '-'}
              </TableCell>
              <TableCell className="japanese-text text-sm">
                <div className="flex items-center">
                  {item.location.includes('リモート') ? <Home className="h-3 w-3 mr-1" /> : null}
                  {item.location}
                </div>
              </TableCell>
              <TableCell className="japanese-text text-sm">
                {item.skills.join(", ")}
              </TableCell>
              <TableCell className="japanese-text text-sm">{item.budget}</TableCell>
              <TableCell className="japanese-text text-sm text-center">
                {item.foreignerAccepted ? '◯' : '✕'}
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(item.status)}>
                  <span className="japanese-text">{item.status}</span>
                </Badge>
              </TableCell>
              <TableCell className="japanese-text text-sm">{item.desiredBudget || '-'}</TableCell>
              <TableCell className="japanese-text text-sm text-center">
                {item.freelancerAccepted ? '◯' : '✕'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
