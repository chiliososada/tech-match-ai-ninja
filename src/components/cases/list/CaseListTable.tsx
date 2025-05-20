
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Home, Calendar, Briefcase, Code, CircleDollarSign } from 'lucide-react';
import { MailCase } from '../email/types';
import { getStatusBadgeColor } from '../utils/statusUtils';

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
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="japanese-text font-medium">案件名</TableHead>
            <TableHead className="japanese-text font-medium">開始日</TableHead>
            <TableHead className="japanese-text font-medium">勤務地</TableHead>
            <TableHead className="japanese-text font-medium">スキル</TableHead>
            <TableHead className="japanese-text font-medium">予算</TableHead>
            <TableHead className="japanese-text font-medium">外国人</TableHead>
            <TableHead className="japanese-text font-medium">ステータス</TableHead>
            <TableHead className="japanese-text font-medium">希望単価</TableHead>
            <TableHead className="japanese-text font-medium">個人事業者</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCases.map((item) => (
            <TableRow 
              key={item.id} 
              className={`${selectedCase?.id === item.id ? "bg-primary/5 border-l-4 border-l-primary" : ""} hover:bg-muted/20 transition-colors`}
              onClick={() => onSelectCase(item)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell className="font-medium japanese-text">{item.title}</TableCell>
              <TableCell className="japanese-text text-sm">
                {item.startDate ? (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{item.startDate}</span>
                  </div>
                ) : '-'}
              </TableCell>
              <TableCell className="japanese-text text-sm">
                <div className="flex items-center space-x-1">
                  {item.location.includes('リモート') ? <Home className="h-3.5 w-3.5 text-blue-500" /> : <Briefcase className="h-3.5 w-3.5 text-gray-500" />}
                  <span>{item.location}</span>
                </div>
              </TableCell>
              <TableCell className="japanese-text text-sm">
                <div className="flex flex-wrap gap-1 max-w-[150px]">
                  {item.skills.slice(0, 2).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="bg-blue-50 text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {item.skills.length > 2 && (
                    <Badge variant="outline" className="bg-gray-100 text-xs">
                      +{item.skills.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="japanese-text text-sm">
                <div className="flex items-center space-x-1">
                  <CircleDollarSign className="h-3.5 w-3.5 text-green-600" />
                  <span>{item.budget}</span>
                </div>
              </TableCell>
              <TableCell className="japanese-text text-sm text-center">
                <Badge variant={item.foreignerAccepted ? "outline" : "destructive"} className={`px-1.5 min-w-[24px] ${item.foreignerAccepted ? 'bg-green-100 text-green-800 border-green-200' : ''}`}>
                  {item.foreignerAccepted ? '◯' : '✕'}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(item.status)}>
                  <span className="japanese-text">{item.status}</span>
                </Badge>
              </TableCell>
              <TableCell className="japanese-text text-sm">
                {item.desiredBudget ? (
                  <div className="flex items-center space-x-1">
                    <CircleDollarSign className="h-3.5 w-3.5 text-purple-600" />
                    <span>{item.desiredBudget}</span>
                  </div>
                ) : '-'}
              </TableCell>
              <TableCell className="japanese-text text-sm text-center">
                <Badge variant={item.freelancerAccepted ? "outline" : "destructive"} className={`px-1.5 min-w-[24px] ${item.freelancerAccepted ? 'bg-green-100 text-green-800 border-green-200' : ''}`}>
                  {item.freelancerAccepted ? '◯' : '✕'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
