
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MailCase } from '@/components/cases/email/types';
import { Calendar, Archive, Filter, ArchiveX } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/toast';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/ui/pagination';

interface CaseArchiveTabProps {
  cases: MailCase[];
  companyType: string;
}

export function CaseArchiveTab({ cases, companyType }: CaseArchiveTabProps) {
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [archiveReason, setArchiveReason] = useState<string>('expired');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOnlyArchivable, setShowOnlyArchivable] = useState(false);
  const itemsPerPage = 10;
  
  // Filter cases based on company type and user filters
  const filteredCases = cases.filter(item => {
    // Filter by company type using some mock logic
    const matchesCompanyType = companyType === 'own' 
      ? parseInt(item.id) % 2 === 1  // odd IDs for 自社
      : parseInt(item.id) % 2 === 0;  // even IDs for 他社
    
    // Search filter
    const matchesSearch = searchTerm === "" || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    // Only apply archive candidate filter if the toggle is on
    const matchesArchivable = !showOnlyArchivable || isArchiveCandidate(item);
    
    return matchesCompanyType && matchesSearch && matchesStatus && matchesArchivable;
  });
  
  // Helper function to determine if a case is a candidate for archiving
  function isArchiveCandidate(item: MailCase): boolean {
    // Example logic - customize according to your business rules:
    
    // 1. Cases with a start date that is older than 3 months
    if (item.startDate) {
      const startDate = new Date(item.startDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      if (startDate < threeMonthsAgo) return true;
    }
    
    // 2. Cases marked as closed
    if (item.status === 'closed' || item.status === '終了') return true;
    
    // 3. Cases that haven't been updated in a long time (e.g., 3 months)
    if (item.createdAt) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      const createdDate = new Date(item.createdAt);
      if (createdDate < threeMonthsAgo) return true;
    }
    
    return false;
  }
  
  // Paginated cases
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  
  // Handle select all cases on current page
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedCases.map(item => item.id);
      setSelectedCases(prev => {
        const newSelection = [...prev];
        pageIds.forEach(id => {
          if (!newSelection.includes(id)) newSelection.push(id);
        });
        return newSelection;
      });
    } else {
      // Remove only the ids that are on the current page
      const pageIds = paginatedCases.map(item => item.id);
      setSelectedCases(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };
  
  // Handle individual case select
  const handleSelectCase = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCases(prev => [...prev, id]);
    } else {
      setSelectedCases(prev => prev.filter(itemId => itemId !== id));
    }
  };
  
  // Handle batch archive
  const handleBatchArchive = () => {
    if (selectedCases.length === 0) {
      toast({
        title: "選択エラー",
        description: "アーカイブする案件を選択してください。",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, you would make an API call here
    // For now, we'll just show a success toast
    const reasonText = archiveReason === 'expired' ? '期限切れ' : 
                       archiveReason === 'completed' ? '募集終了' : 'その他';
    
    toast({
      title: "アーカイブ成功",
      description: `${selectedCases.length}件の案件が${reasonText}としてアーカイブされました。`,
    });
    
    // Reset selection after archiving
    setSelectedCases([]);
  };
  
  // Determine if all cases on current page are selected
  const allSelected = paginatedCases.length > 0 && 
    paginatedCases.every(item => selectedCases.includes(item.id));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold japanese-text flex items-center">
            <Archive className="h-5 w-5 mr-2 text-muted-foreground" />
            案件アーカイブ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <div className="w-full sm:w-64 space-y-1.5">
                <Label htmlFor="archive-search" className="text-sm font-medium japanese-text">検索</Label>
                <Input
                  id="archive-search"
                  placeholder="案件名、会社名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="japanese-text"
                />
              </div>
              
              <div className="w-full sm:w-48 space-y-1.5">
                <Label htmlFor="status-filter" className="text-sm font-medium japanese-text">ステータス</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="japanese-text">
                    <SelectValue placeholder="ステータス" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="japanese-text">すべて</SelectItem>
                    <SelectItem value="active" className="japanese-text">進行中</SelectItem>
                    <SelectItem value="closed" className="japanese-text">終了</SelectItem>
                    <SelectItem value="pending" className="japanese-text">保留</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-archivable" 
                    checked={showOnlyArchivable}
                    onCheckedChange={(checked) => setShowOnlyArchivable(!!checked)}
                  />
                  <Label htmlFor="show-archivable" className="japanese-text">
                    アーカイブ対象のみ表示
                  </Label>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Archive controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium japanese-text">
                  {selectedCases.length}件選択中 / 全{filteredCases.length}件
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                <Select value={archiveReason} onValueChange={setArchiveReason}>
                  <SelectTrigger className="w-[180px] japanese-text">
                    <SelectValue placeholder="アーカイブ理由" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expired" className="japanese-text">期限切れ</SelectItem>
                    <SelectItem value="completed" className="japanese-text">募集終了</SelectItem>
                    <SelectItem value="other" className="japanese-text">その他</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="default" 
                  className="japanese-text"
                  onClick={handleBatchArchive}
                  disabled={selectedCases.length === 0}
                >
                  <ArchiveX className="h-4 w-4 mr-2" />
                  アーカイブ
                </Button>
              </div>
            </div>
            
            {/* Cases table */}
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="全て選択"
                        indeterminate={selectedCases.length > 0 && !allSelected}
                      />
                    </TableHead>
                    <TableHead>案件名</TableHead>
                    <TableHead>会社名</TableHead>
                    <TableHead>開始日</TableHead>
                    <TableHead>作成日</TableHead>
                    <TableHead>ステータス</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCases.length > 0 ? paginatedCases.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedCases.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectCase(item.id, !!checked)}
                          aria-label={`案件 ${item.id} を選択`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title || "無題案件"}
                      </TableCell>
                      <TableCell>{item.company || "不明"}</TableCell>
                      <TableCell>
                        {item.startDate || "設定なし"}
                      </TableCell>
                      <TableCell>
                        {item.createdAt || "設定なし"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'active' ? 'default' : 
                               item.status === 'closed' ? 'secondary' : 'outline'}>
                          {item.status || "不明"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        表示する案件がありません
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
