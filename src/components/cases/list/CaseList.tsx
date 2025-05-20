
import React, { useState, useEffect } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { format, addMonths, startOfMonth } from 'date-fns';

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
  
  // New state for date filter option
  const [dateFilterOption, setDateFilterOption] = useState<string>("none");
  
  // Handle date filter option change
  const handleDateFilterOptionChange = (value: string) => {
    setDateFilterOption(value);
    
    // Set appropriate date based on option
    const today = new Date();
    
    switch(value) {
      case "immediate":
        // Today
        setDateRange(format(today, 'yyyy-MM-dd'));
        break;
      case "thisMonth":
        // First day of current month
        setDateRange(format(startOfMonth(today), 'yyyy-MM-dd'));
        break;
      case "nextMonth":
        // First day of next month
        setDateRange(format(startOfMonth(addMonths(today, 1)), 'yyyy-MM-dd'));
        break;
      case "none":
      default:
        setDateRange("");
        break;
    }
  };
  
  // Reset date option when date is manually changed
  useEffect(() => {
    if (!dateRange) {
      setDateFilterOption("none");
    }
  }, [dateRange]);
  
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
            <Label htmlFor="status-filter" className="text-sm font-medium mb-1 japanese-text">募集状態</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status-filter" className="japanese-text border-muted focus:border-primary transition-colors">
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
        <div className="mt-4">
          <Label className="text-sm font-medium mb-2 japanese-text block">参画開始日</Label>
          <div className="flex flex-col space-y-4">
            <RadioGroup value={dateFilterOption} onValueChange={handleDateFilterOptionChange} className="flex flex-row space-x-4 items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate" className="japanese-text">即日</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="thisMonth" id="thisMonth" />
                <Label htmlFor="thisMonth" className="japanese-text">本月內</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nextMonth" id="nextMonth" />
                <Label htmlFor="nextMonth" className="japanese-text">来月開始可能</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="none" />
                <Label htmlFor="none" className="japanese-text">指定なし</Label>
              </div>
            </RadioGroup>
            
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  type="date"
                  value={dateRange}
                  onChange={(e) => {
                    setDateRange(e.target.value);
                    // If manually setting date, clear radio selection
                    if (e.target.value) {
                      setDateFilterOption("none");
                    }
                  }}
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
