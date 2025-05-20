
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Calendar } from 'lucide-react';
import { CaseListTable } from './CaseListTable';
import { CaseDetail } from './CaseDetail';
import { Pagination } from '@/components/ui/pagination';
import { MailCase } from '../email/types';
import { toast } from '@/hooks/toast';

interface CaseListProps {
  filteredCases: MailCase[];
  selectedCase: MailCase | null;
  setSelectedCase: (caseItem: MailCase) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateRange: string;
  setDateRange: (date: string) => void;
  resetDateFilters: () => void;
  casesCurrentPage: number;
  setCasesCurrentPage: (page: number) => void;
  totalCasesPages: number;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  editingCaseData: MailCase | null;
  setEditingCaseData: (caseItem: MailCase | null) => void;
  handleEditChange: (field: string, value: any) => void;
  handleSaveEdit: () => void;
}

export const CaseList: React.FC<CaseListProps> = ({
  filteredCases,
  selectedCase,
  setSelectedCase,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  resetDateFilters,
  casesCurrentPage,
  setCasesCurrentPage,
  totalCasesPages,
  editMode,
  setEditMode,
  editingCaseData,
  setEditingCaseData,
  handleEditChange,
  handleSaveEdit
}) => {
  const itemsPerPage = 10;
  
  // Paginated cases based on current page
  const paginatedCases = filteredCases.slice(
    (casesCurrentPage - 1) * itemsPerPage,
    casesCurrentPage * itemsPerPage
  );

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4 bg-muted/5 border-b">
        <CardTitle className="japanese-text flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-primary" />
          案件一覧
        </CardTitle>
        <CardDescription className="japanese-text">
          登録済みの案件一覧と詳細を表示します
        </CardDescription>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="案件名で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="japanese-text pl-9 border-muted focus:border-primary transition-colors"
              />
            </div>
          </div>
          <div className="w-full sm:w-40">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="japanese-text border-muted focus:border-primary transition-colors">
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="japanese-text">すべて</SelectItem>
                <SelectItem value="募集中" className="japanese-text">募集中</SelectItem>
                <SelectItem value="募集完了" className="japanese-text">募集完了</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="date"
                  placeholder="作成日（入力日）"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="pl-9 border-muted focus:border-primary transition-colors"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetDateFilters}
                className="japanese-text border-muted hover:bg-muted/20 transition-colors"
              >
                <Filter className="h-4 w-4 mr-1" />
                リセット
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 案件一覧テーブル（左側 - 1/2幅） */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-md h-full flex flex-col">
              <CaseListTable 
                paginatedCases={paginatedCases} 
                selectedCase={selectedCase} 
                onSelectCase={setSelectedCase} 
              />
              
              {/* 案件一覧のページネーション */}
              <div className="mt-4 flex justify-center">
                <Pagination 
                  currentPage={casesCurrentPage} 
                  totalPages={totalCasesPages} 
                  onPageChange={setCasesCurrentPage} 
                />
              </div>
            </div>
          </div>
          
          {/* 案件詳細表示部分（右側 - 1/2幅） */}
          <div className="lg:w-1/2">
            <CaseDetail 
              selectedCase={selectedCase}
              editMode={editMode}
              setEditMode={setEditMode}
              editingCaseData={editingCaseData}
              handleEditChange={handleEditChange}
              handleSaveEdit={handleSaveEdit}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
