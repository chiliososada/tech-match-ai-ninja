
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Trash2,
  Info,
  Search as SearchIcon,
  CheckCircle
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';
import { MailCase } from '../email/types';
import { toast } from '@/hooks/toast';

interface CaseArchiveTabProps {
  cases: MailCase[];
  companyType: 'own' | 'other';
}

export const CaseArchiveTab: React.FC<CaseArchiveTabProps> = ({ cases, companyType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOnlyDeletable, setShowOnlyDeletable] = useState(false);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  // Show the info tooltip by default
  const [showInfoTooltip, setShowInfoTooltip] = useState(true);
  
  // Reset selection when filter changes
  useEffect(() => {
    setSelectedCases([]);
  }, [searchTerm, statusFilter, showOnlyDeletable]);

  // Get the reference date for May 2025
  const getMay2025Date = () => {
    return new Date(2025, 4, 1); // May is month 4 (0-indexed)
  };
  
  // Check if case is considered "期限切れ" (expired)
  // "期限切れ" means the start date is before May 2025
  const isExpired = (item: MailCase) => {
    const may2025 = getMay2025Date();
    
    if (item.startDate) {
      const startDate = new Date(item.startDate);
      if (startDate < may2025) {
        // For the purpose of visually marking it as expired
        return true;
      }
    }
    
    return false;
  };
  
  // A case is deletable if:
  // 1. Its start date is before May 2025 OR
  // 2. Its status is "募集終了"
  const isDeletableCandidate = (item: MailCase) => {
    const may2025 = getMay2025Date();
    
    // Changed logic to OR instead of AND
    if (item.startDate) {
      const startDate = new Date(item.startDate);
      // Start date is before May 2025
      if (startDate < may2025) {
        return true;
      }
    }
    
    // Status is "募集終了"
    if (item.status === '募集終了') {
      return true;
    }
    
    return false;
  }
  
  // Filter cases based on company type and user filters
  const filteredCases = cases.filter(item => {
    // Filter by company type using the companyType prop instead of item properties
    // For 'own' company type, filter by cases that don't have a specified company or match certain criteria
    // For 'other' company type, filter by cases that have a company specified
    const matchesCompanyType = companyType === 'own' 
      ? !item.company || item.company === '自社' 
      : item.company && item.company !== '自社';
    
    // Search term filter (search in title and company)
    const matchesSearch = searchTerm === '' || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Status filter - only "募集中" and "募集終了" are valid statuses
    let matchesStatus = true;
    if (statusFilter === "active") {
      // Show only active cases (募集中)
      matchesStatus = item.status === '募集中';
    } else if (statusFilter !== "all") {
      // Filter by specific status
      matchesStatus = item.status === statusFilter;
    }
    
    // Only apply deletable candidates filter if the toggle is on
    const matchesDeletable = !showOnlyDeletable || isDeletableCandidate(item);
    
    return matchesCompanyType && matchesSearch && matchesStatus && matchesDeletable;
  });
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectedCases.length === filteredCases.length) {
      setSelectedCases([]); // Deselect all
    } else {
      setSelectedCases(filteredCases.map(item => item.id)); // Select all
    }
  };
  
  // Handle single selection
  const handleSelectCase = (id: string) => {
    if (selectedCases.includes(id)) {
      setSelectedCases(selectedCases.filter(caseId => caseId !== id));
    } else {
      setSelectedCases([...selectedCases, id]);
    }
  };
  
  // Handle delete selected
  const handleDeleteSelected = () => {
    // In a real app, this would call an API to delete the selected cases
    console.log('Deleting cases:', selectedCases);
    
    // Mock delete by removing from local state
    // In a real app, you'd call an API and then refresh the data
    
    // Show toast notification
    toast({
      title: "削除完了",
      description: `${selectedCases.length}件の案件を削除しました`,
      variant: "default",
    });
    
    // Reset selected cases
    setSelectedCases([]);
    setConfirmDelete(false);
  };
  
  // Get count of cases that can be deleted
  const deletableCasesCount = cases.filter(item => isDeletableCandidate(item)).length;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-1.5">
        <CardTitle className="japanese-text flex items-center">
          <Trash2 className="h-5 w-5 mr-2 text-muted-foreground" />
          案件アーカイブ管理
        </CardTitle>
        <CardDescription className="japanese-text">
          古い案件や完了した案件の削除や管理ができます
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5">
        {/* Improved Search and Filter Section */}
        <div className="bg-muted/10 p-4 rounded-lg border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="japanese-text font-medium text-base flex items-center">
              <SearchIcon className="h-4 w-4 mr-1.5 text-muted-foreground" />
              検索・絞り込み
            </h3>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowInfoTooltip(!showInfoTooltip)}
                className="h-8 w-8 p-0"
              >
                <Info className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          
          <Separator className="my-2" />
          
          {/* Show the deletion criteria info by default */}
          {showInfoTooltip && (
            <div className="mb-3">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertTitle className="japanese-text font-medium">削除対象の条件</AlertTitle>
                <AlertDescription className="japanese-text text-sm">
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>参画開始日が2025年5月より前の案件</li>
                    <li>ステータスが「募集終了」の案件</li>
                  </ul>
                  <p className="mt-2">上記の条件のいずれかを満たす案件が削除対象として表示されます。</p>
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="space-y-1.5">
                <Label htmlFor="search" className="text-sm japanese-text">案件名・会社名</Label>
                <div className="relative">
                  <SearchIcon className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                  <Input 
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="検索" 
                    className="pl-8 japanese-text"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-1.5">
                <Label htmlFor="status" className="text-sm japanese-text">ステータス</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status" className="japanese-text">
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="japanese-text">全て</SelectItem>
                    <SelectItem value="active" className="japanese-text">募集中</SelectItem>
                    <SelectItem value="募集終了" className="japanese-text">募集終了</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="space-y-1.5">
                <Label className="text-sm japanese-text opacity-0">フィルター</Label>
                <div className="flex items-center space-x-2 bg-muted/15 rounded-md p-2">
                  <Checkbox 
                    id="deletableOnly" 
                    checked={showOnlyDeletable}
                    onCheckedChange={(checked) => setShowOnlyDeletable(!!checked)}
                  />
                  <Label 
                    htmlFor="deletableOnly" 
                    className="japanese-text text-sm cursor-pointer flex-1"
                  >
                    削除対象のみ表示 ({deletableCasesCount})
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Cases Table */}
        <div className="rounded-md border shadow-sm overflow-hidden">
          <div className="bg-white rounded-md overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-muted/10 border-b">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="selectAll" 
                  checked={selectedCases.length > 0 && selectedCases.length === filteredCases.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="selectAll" className="japanese-text text-sm cursor-pointer">全て選択</Label>
              </div>
              
              <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    disabled={selectedCases.length === 0}
                    className="japanese-text"
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    選択した案件を削除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="japanese-text">案件削除の確認</AlertDialogTitle>
                    <AlertDialogDescription className="japanese-text">
                      選択した{selectedCases.length}件の案件を削除します。この操作は元に戻せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="japanese-text">キャンセル</AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteSelected}
                      className="japanese-text"
                    >
                      削除する
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <Table>
              <TableHeader className="bg-muted/5">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="japanese-text">案件名</TableHead>
                  <TableHead className="japanese-text">会社名</TableHead>
                  <TableHead className="japanese-text">参画開始日</TableHead>
                  <TableHead className="japanese-text">ステータス</TableHead>
                  <TableHead className="japanese-text">作成日</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center japanese-text">
                      条件に一致する案件はありません
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCases.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedCases.includes(item.id)}
                          onCheckedChange={() => handleSelectCase(item.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium japanese-text">{item.title}</TableCell>
                      <TableCell className="japanese-text">{item.company || "-"}</TableCell>
                      <TableCell className="japanese-text">
                        {item.startDate}
                        {isExpired(item) && (
                          <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-800 border-amber-200">
                            期限切れ
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.status === '募集終了' ? (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            <span className="japanese-text">募集終了</span>
                          </Badge>
                        ) : (
                          <Badge variant="outline"
                                className="bg-green-100 text-green-800 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span className="japanese-text">募集中</span>
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="japanese-text text-sm text-muted-foreground">
                        {item.createdAt ? format(new Date(item.createdAt), 'yyyy-MM-dd') : '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
