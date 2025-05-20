
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MailCase } from '@/components/cases/email/types';
import { 
  Archive, 
  ArchiveX, 
  Filter, 
  Clock, 
  CircleX,
  Trash2
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Pagination from '@/components/ui/pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [showOnlyDeletable, setShowOnlyDeletable] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const itemsPerPage = 10;
  
  // Check if we're in the own company view
  const isOwnCompany = companyType === 'own';
  
  // Helper function to determine if a case is a candidate for deletion
  function isDeletableCandidate(item: MailCase): boolean {
    const currentDate = new Date();
    const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    // 1. Cases with a start date before this month
    if (item.startDate) {
      const startDate = new Date(item.startDate);
      if (startDate < firstDayOfCurrentMonth) {
        // Also check if status is "募集終了" or "期限切れ"
        if (item.status === '募集終了' || item.status === '期限切れ' || 
            item.status === 'closed' || item.status === 'expired') {
          return true;
        }
      }
    }
    
    return false;
  }

  // Check if a case is expired based on start date
  function isExpired(item: MailCase): boolean {
    if (item.startDate) {
      const startDate = new Date(item.startDate);
      const currentDate = new Date();
      const firstDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      
      return startDate < firstDayOfCurrentMonth;
    }
    return false;
  }
  
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
    
    // Only apply deletable candidates filter if the toggle is on
    const matchesDeletable = !showOnlyDeletable || isDeletableCandidate(item);
    
    return matchesCompanyType && matchesSearch && matchesStatus && matchesDeletable;
  });
  
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

  // Handle batch delete
  const handleDeleteClick = () => {
    if (selectedCases.length === 0) {
      toast({
        title: "選択エラー",
        description: "削除する案件を選択してください。",
        variant: "destructive"
      });
      return;
    }
    
    // Open the confirmation dialog
    setConfirmDeleteOpen(true);
  };

  // Handle confirmed delete
  const handleConfirmDelete = () => {
    // In a real application, you would make an API call here
    // For now, we'll just show a success toast
    toast({
      title: "削除成功",
      description: `${selectedCases.length}件の案件が削除されました。`,
    });
    
    // Reset selection after deleting
    setSelectedCases([]);
    setConfirmDeleteOpen(false);
  };
  
  // Determine if all cases on current page are selected
  const allSelected = paginatedCases.length > 0 && 
    paginatedCases.every(item => selectedCases.includes(item.id));

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-md bg-gradient-to-b from-white to-gray-50">
        <CardHeader className="pb-3 bg-slate-50 rounded-t-lg">
          <CardTitle className="text-xl font-semibold japanese-text flex items-center">
            <Archive className="h-5 w-5 mr-2 text-purple-500" />
            案件アーカイブ
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="w-full sm:w-64 space-y-1.5">
                <Label htmlFor="archive-search" className="text-sm font-medium japanese-text text-gray-700">検索</Label>
                <Input
                  id="archive-search"
                  placeholder="案件名、会社名で検索"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="japanese-text shadow-sm"
                />
              </div>
              
              <div className="w-full sm:w-48 space-y-1.5">
                <Label htmlFor="status-filter" className="text-sm font-medium japanese-text text-gray-700">ステータス</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status-filter" className="japanese-text shadow-sm">
                    <SelectValue placeholder="ステータス" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="japanese-text">すべて</SelectItem>
                    <SelectItem value="active" className="japanese-text">進行中</SelectItem>
                    <SelectItem value="募集終了" className="japanese-text">募集終了</SelectItem>
                    <SelectItem value="期限切れ" className="japanese-text">期限切れ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="show-deletable" 
                    checked={showOnlyDeletable}
                    onCheckedChange={(checked) => setShowOnlyDeletable(!!checked)}
                  />
                  <Label htmlFor="show-deletable" className="japanese-text text-gray-700">
                    削除対象のみ表示
                  </Label>
                </div>
              </div>
            </div>
            
            <Separator className="bg-gray-200" />
            
            {/* Action controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium japanese-text text-gray-700">
                  {selectedCases.length}件選択中 / 全{filteredCases.length}件
                </span>
                <Badge variant="outline" className="bg-purple-100 text-purple-800 text-xs">
                  {showOnlyDeletable ? "削除対象のみ" : "全案件"}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-3 items-center">
                <Select value={archiveReason} onValueChange={setArchiveReason}>
                  <SelectTrigger className="w-[180px] japanese-text shadow-sm bg-white">
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
                  className="japanese-text bg-purple-600 hover:bg-purple-700 transition-all shadow-sm"
                  onClick={handleBatchArchive}
                  disabled={selectedCases.length === 0}
                >
                  <ArchiveX className="h-4 w-4 mr-2" />
                  アーカイブ
                </Button>

                <Button 
                  variant="destructive" 
                  className="japanese-text transition-all shadow-sm"
                  onClick={handleDeleteClick}
                  disabled={selectedCases.length === 0}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  削除
                </Button>
              </div>
            </div>
            
            {/* Cases table */}
            <div className="border rounded-md overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox 
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                        aria-label="全て選択"
                        indeterminate={selectedCases.length > 0 && !allSelected}
                      />
                    </TableHead>
                    <TableHead className="japanese-text font-medium">案件名</TableHead>
                    {!isOwnCompany && (
                      <TableHead className="japanese-text font-medium">会社名</TableHead>
                    )}
                    <TableHead className="japanese-text font-medium">開始日</TableHead>
                    <TableHead className="japanese-text font-medium">作成日</TableHead>
                    <TableHead className="japanese-text font-medium">ステータス</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCases.length > 0 ? paginatedCases.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <Checkbox 
                          checked={selectedCases.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectCase(item.id, !!checked)}
                          aria-label={`案件 ${item.id} を選択`}
                        />
                      </TableCell>
                      <TableCell className="font-medium japanese-text">
                        {item.title || "無題案件"}
                      </TableCell>
                      {!isOwnCompany && (
                        <TableCell className="japanese-text">{item.company || "不明"}</TableCell>
                      )}
                      <TableCell className="japanese-text">
                        {item.startDate || "設定なし"}
                        {isExpired(item) && (
                          <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-800 border-amber-200">
                            <Clock className="h-3 w-3 mr-1" />
                            期限切れ
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="japanese-text">
                        {item.createdAt || "設定なし"}
                      </TableCell>
                      <TableCell>
                        {item.status === '募集終了' || item.status === 'closed' ? (
                          <Badge variant="secondary" className="bg-gray-200 text-gray-700 flex items-center">
                            <CircleX className="h-3 w-3 mr-1" />
                            <span className="japanese-text">募集終了</span>
                          </Badge>
                        ) : item.status === '期限切れ' || item.status === 'expired' ? (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="japanese-text">期限切れ</span>
                          </Badge>
                        ) : (
                          <Badge variant={item.status === 'active' ? 'default' : 'outline'}
                                className={item.status === 'active' ? 'bg-green-100 text-green-800' : ''}>
                            <span className="japanese-text">{item.status || "不明"}</span>
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={isOwnCompany ? 5 : 6} className="h-24 text-center">
                        表示する案件がありません
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="japanese-text text-xl">削除の確認</AlertDialogTitle>
            <AlertDialogDescription className="japanese-text">
              選択した{selectedCases.length}件の案件を削除します。<br />
              <span className="font-semibold text-red-600">この操作は元に戻せません。</span><br />
              削除を続行しますか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="japanese-text">キャンセル</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="japanese-text bg-red-600 hover:bg-red-700"
            >
              削除する
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
