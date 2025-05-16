
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, FileDown, Edit, Trash2, Search, Flag, Cake, User, Train } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Engineer, CategoryType, FiltersType } from './types';

interface CandidateListProps {
  engineers: Engineer[];
  categories: CategoryType[];
  onViewDetails: (engineer: Engineer) => void;
  onEditEngineer: (engineer: Engineer) => void;
  onDeleteEngineer: (id: string) => void;
  onDownloadResume?: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
  onEditRemarks?: (id: string, newRemarks: string) => void;
}

export const CandidateList: React.FC<CandidateListProps> = ({
  engineers,
  categories,
  onViewDetails,
  onEditEngineer,
  onDeleteEngineer,
  onDownloadResume,
  onStatusChange,
  onEditRemarks
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [filters, setFilters] = React.useState<FiltersType>({
    name: '',
    companyType: '',
    companyName: '',
    skills: '',
    experience: '',
    japaneseLevel: '',
    nationality: '',
    remarks: '',
    status: ''
  });
  const [filteredEngineers, setFilteredEngineers] = React.useState<Engineer[]>(engineers);
  const [sortField, setSortField] = React.useState<keyof Engineer | ''>('');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEngineers.length / itemsPerPage);
  
  // ページネーションで表示する技術者
  const paginatedEngineers = filteredEngineers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ソート機能
  const handleSort = (field: keyof Engineer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }

    const sorted = [...filteredEngineers].sort((a, b) => {
      if (!a[field] || !b[field]) return 0;
      
      let valueA = a[field];
      let valueB = b[field];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (sortDirection === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      }
      
      return 0;
    });
    
    setFilteredEngineers(sorted);
  };

  // ヘルパー関数：前のページへ移動
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ヘルパー関数：次のページへ移動
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // カテゴリー選択時の処理
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    
    let filtered = engineers;
    
    // カテゴリーでフィルタリング
    if (categoryId === 'self') {
      filtered = filtered.filter(engineer => engineer.companyType === '自社');
    } else if (categoryId === 'other') {
      filtered = filtered.filter(engineer => engineer.companyType === '他社');
    }
    
    // 既存の検索クエリや他のフィルターも適用
    if (searchQuery || filters.japaneseLevel || filters.nationality || filters.status) {
      filtered = applyFilters(filtered);
    }
    
    setFilteredEngineers(filtered);
  };
  
  // 既存のフィルター適用処理
  const applyFilters = (engineersList: Engineer[]) => {
    const query = searchQuery.toLowerCase();
    
    return engineersList.filter(engineer => {
      // 検索クエリでフィルター
      if (query) {
        const nameMatch = engineer.name.toLowerCase().includes(query);
        const skillsMatch = engineer.skills && engineer.skills.some((skill: string) => 
          skill.toLowerCase().includes(query)
        );
        const experienceMatch = engineer.experience.toLowerCase().includes(query);
        const remarksMatch = engineer.remarks.toLowerCase().includes(query);
        const companyNameMatch = engineer.companyName?.toLowerCase().includes(query);
        
        if (!(nameMatch || skillsMatch || experienceMatch || remarksMatch || companyNameMatch)) {
          return false;
        }
      }
      
      // 日本語レベルでフィルター
      if (filters.japaneseLevel && engineer.japaneseLevel !== filters.japaneseLevel) {
        return false;
      }
      
      // 国籍でフィルター (新規追加)
      if (filters.nationality && engineer.nationality !== filters.nationality) {
        return false;
      }
      
      // ステータスでフィルター(配列対応)
      if (filters.status && !engineer.status.includes(filters.status)) {
        return false;
      }
      
      // 他社の場合は所属会社でフィルター
      if (engineer.companyType === '他社' && filters.companyName && !(engineer.companyName?.includes(filters.companyName))) {
        return false;
      }
      
      return true;
    });
  };
  
  // 検索時にページをリセット
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredEngineers]);
  
  // 検索クエリが変更されたときに検索を実行
  React.useEffect(() => {
    handleSearch();
  }, [searchQuery, filters.japaneseLevel, filters.nationality, filters.status, filters.companyName, engineers]);
  
  // 検索を実行
  const handleSearch = () => {
    let filtered = engineers;
    
    // カテゴリーでフィルタリング
    if (selectedCategory === 'self') {
      filtered = filtered.filter(engineer => engineer.companyType === '自社');
    } else if (selectedCategory === 'other') {
      filtered = filtered.filter(engineer => engineer.companyType === '他社');
    }
    
    // その他のフィルターを適用
    filtered = applyFilters(filtered);
    
    setFilteredEngineers(filtered);
    
    if (filtered.length === 0 && (searchQuery || filters.japaneseLevel || filters.nationality || filters.status || filters.companyName)) {
      toast.info('該当する技術者が見つかりませんでした');
    }
  };
  
  // フィルター条件をリセット
  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      name: '',
      companyType: '',
      companyName: '',
      skills: '',
      experience: '',
      japaneseLevel: '',
      nationality: '',
      remarks: '',
      status: ''
    });
    
    // カテゴリーに基づいてエンジニアをフィルタリング
    if (selectedCategory === 'all') {
      setFilteredEngineers(engineers);
    } else if (selectedCategory === 'self') {
      setFilteredEngineers(engineers.filter(engineer => engineer.companyType === '自社'));
    } else if (selectedCategory === 'other') {
      setFilteredEngineers(engineers.filter(engineer => engineer.companyType === '他社'));
    }
  };

  // ステータス表示用のヘルパー関数
  const getStatusBadge = (status: string) => {
    switch(status) {
      case '提案中':
        return <Badge variant="default" className="bg-blue-500 text-white japanese-text text-xs mr-1">{status}</Badge>;
      case '事前面談':
        return <Badge variant="default" className="bg-orange-500 text-white japanese-text text-xs mr-1">{status}</Badge>;
      case '面談':
        return <Badge variant="default" className="bg-green-500 text-white japanese-text text-xs mr-1">{status}</Badge>;
      case '結果待ち':
        return <Badge variant="default" className="bg-purple-500 text-white japanese-text text-xs mr-1">{status}</Badge>;
      case '営業終了':
        return <Badge variant="default" className="bg-gray-500 text-white japanese-text text-xs mr-1">{status}</Badge>;
      default:
        return <Badge variant="outline" className="japanese-text text-xs mr-1">{status}</Badge>;
    }
  };

  // 備考編集用の仮関数
  const handleEditRemarksClick = (engineer: Engineer) => {
    const newRemarks = prompt('備考を入力してください', engineer.remarks);
    if (newRemarks !== null && onEditRemarks) {
      onEditRemarks(engineer.id, newRemarks);
    }
  };

  const showCompanyName = selectedCategory === 'other' || engineers.some(engineer => engineer.companyType === '他社');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="japanese-text">技術者一覧</CardTitle>
        <CardDescription className="japanese-text">
          登録済みの技術者一覧と詳細を表示します
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* カテゴリー選択 */}
        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="japanese-text"
              >
                {category.name}
              </Button>
            ))}
          </div>
        
          {/* 検索フィールドと絞り込みオプション */}
          <div className="space-y-4">
            {/* 検索フィールド */}
            <div>
              <div className="flex items-center border-b px-3 rounded-md border">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Input
                  placeholder="名前、スキル、経験などで検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="japanese-text w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            
            {/* 絞り込みオプション */}
            <div className="flex flex-wrap gap-3">
              {showCompanyName && (
                <div className="flex items-center gap-2">
                  <Label className="text-sm font-medium japanese-text whitespace-nowrap">所属会社:</Label>
                  <Select
                    value={filters.companyName}
                    onValueChange={(value) => setFilters({...filters, companyName: value})}
                  >
                    <SelectTrigger className="h-8 w-[200px] japanese-text">
                      <SelectValue placeholder="全て" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全て</SelectItem>
                      <SelectItem value="テックイノベーション株式会社">テックイノベーション株式会社</SelectItem>
                      <SelectItem value="フロントエンドパートナーズ株式会社">フロントエンドパートナーズ株式会社</SelectItem>
                      <SelectItem value="クラウドシステムズ株式会社">クラウドシステムズ株式会社</SelectItem>
                      <SelectItem value="ウェブソリューションズ株式会社">ウェブソリューションズ株式会社</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium japanese-text whitespace-nowrap">日本語レベル:</Label>
                <Select
                  value={filters.japaneseLevel}
                  onValueChange={(value) => setFilters({...filters, japaneseLevel: value})}
                >
                  <SelectTrigger className="h-8 w-[160px] japanese-text">
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    <SelectItem value="不問">不問</SelectItem>
                    <SelectItem value="日常会話レベル">日常会話レベル</SelectItem>
                    <SelectItem value="ビジネスレベル">ビジネスレベル</SelectItem>
                    <SelectItem value="ネイティブレベル">ネイティブレベル</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium japanese-text whitespace-nowrap">国籍:</Label>
                <Select
                  value={filters.nationality}
                  onValueChange={(value) => setFilters({...filters, nationality: value})}
                >
                  <SelectTrigger className="h-8 w-[160px] japanese-text">
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    <SelectItem value="日本">日本</SelectItem>
                    <SelectItem value="中国">中国</SelectItem>
                    <SelectItem value="インド">インド</SelectItem>
                    <SelectItem value="ベトナム">ベトナム</SelectItem>
                    <SelectItem value="その他">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium japanese-text whitespace-nowrap">ステータス:</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters({...filters, status: value})}
                >
                  <SelectTrigger className="h-8 w-[120px] japanese-text">
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    <SelectItem value="提案中">提案中</SelectItem>
                    <SelectItem value="事前面談">事前面談</SelectItem>
                    <SelectItem value="面談">面談</SelectItem>
                    <SelectItem value="結果待ち">結果待ち</SelectItem>
                    <SelectItem value="営業終了">営業終了</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(searchQuery || filters.japaneseLevel || filters.nationality || filters.status || filters.companyName) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters} 
                  className="h-8 px-2 text-xs japanese-text"
                >
                  リセット
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="japanese-text cursor-pointer" onClick={() => handleSort('name')}>
                  名前 {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="japanese-text">国籍</TableHead>
                <TableHead className="japanese-text">年齢</TableHead>
                <TableHead className="japanese-text">性別</TableHead>
                {showCompanyName && (
                  <TableHead className="japanese-text">所属会社</TableHead>
                )}
                <TableHead className="japanese-text cursor-pointer" onClick={() => handleSort('skills')}>
                  スキル {sortField === 'skills' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="japanese-text cursor-pointer" onClick={() => handleSort('experience')}>
                  経験年数 {sortField === 'experience' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="japanese-text">最寄駅</TableHead>
                <TableHead className="japanese-text">備考</TableHead>
                <TableHead className="japanese-text">ステータス</TableHead>
                <TableHead className="japanese-text cursor-pointer" onClick={() => handleSort('registeredAt')}>
                  登録日 {sortField === 'registeredAt' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead className="japanese-text">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEngineers.length > 0 ? (
                paginatedEngineers.map((engineer) => (
                  <TableRow key={engineer.id}>
                    <TableCell className="font-medium japanese-text">{engineer.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Flag className="h-4 w-4 mr-2" />
                        <span className="japanese-text text-sm">{engineer.nationality || '未設定'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Cake className="h-4 w-4 mr-2" />
                        <span className="japanese-text text-sm">{engineer.age || '未設定'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <span className="japanese-text text-sm">{engineer.gender || '未設定'}</span>
                      </div>
                    </TableCell>
                    {showCompanyName && (
                      <TableCell className="japanese-text text-sm">{engineer.companyName}</TableCell>
                    )}
                    <TableCell className="japanese-text text-sm truncate">
                      {engineer.skills && engineer.skills.join(", ")}
                    </TableCell>
                    <TableCell className="japanese-text text-sm">{engineer.experience}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Train className="h-4 w-4 mr-2" />
                        <span className="japanese-text text-sm">{engineer.nearestStation || '未設定'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="japanese-text text-sm truncate">
                      <div className="flex items-center">
                        <span className="truncate">{engineer.remarks}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEditRemarksClick(engineer)}
                          title="備考を編集"
                          className="ml-1 h-6 w-6 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="japanese-text text-sm">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(engineer.status) ? 
                          engineer.status.map((status, idx) => (
                            <React.Fragment key={idx}>
                              {getStatusBadge(status)}
                            </React.Fragment>
                          )) : 
                          getStatusBadge(engineer.status)
                        }
                      </div>
                    </TableCell>
                    <TableCell className="japanese-text text-sm">{engineer.registeredAt}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onViewDetails(engineer)}
                          title="詳細を表示"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onDownloadResume && onDownloadResume(engineer.id)}
                          title="履歴書をダウンロード"
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onEditEngineer(engineer)}
                          title="編集"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => onDeleteEngineer(engineer.id)}
                          title="削除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={showCompanyName ? 12 : 11} className="h-24 text-center">
                    データが見つかりません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={goToPrevPage}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink 
                        isActive={currentPage === pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={goToNextPage}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
