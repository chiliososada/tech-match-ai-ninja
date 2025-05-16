
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, FileDown, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface Engineer {
  id: string;
  name: string;
  skills?: string[];
  japaneseLevel: string;
  experience: string;
  availability: string;
  status: string;
  desiredConditions: string;
  companyType: string;
  companyName?: string;
  source: string;
  recommendation?: string;
  email?: string;
  phone?: string;
  registeredAt: string;
  updatedAt: string;
}

interface CategoryType {
  id: string;
  name: string;
}

interface FiltersType {
  name: string;
  companyType: string;
  companyName: string;
  skills: string;
  experience: string;
  japaneseLevel: string;
  desiredConditions: string;
  status: string;
}

interface CandidateListProps {
  engineers: Engineer[];
  categories: CategoryType[];
  onViewDetails: (engineer: Engineer) => void;
  onEditEngineer: (engineer: Engineer) => void;
  onDeleteEngineer: (id: string) => void;
  onDownloadResume?: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void; // Added this line to match the props being passed
}

export const CandidateList: React.FC<CandidateListProps> = ({
  engineers,
  categories,
  onViewDetails,
  onEditEngineer,
  onDeleteEngineer,
  onDownloadResume,
  onStatusChange // Make sure to include the new prop here as well
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
    desiredConditions: '',
    status: ''
  });
  const [filteredEngineers, setFilteredEngineers] = React.useState<Engineer[]>(engineers);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEngineers.length / itemsPerPage);
  
  // ページネーションで表示する技術者
  const paginatedEngineers = filteredEngineers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    if (searchQuery || filters.companyType || filters.japaneseLevel || filters.status) {
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
        const conditionsMatch = engineer.desiredConditions.toLowerCase().includes(query);
        const companyNameMatch = engineer.companyName?.toLowerCase().includes(query);
        
        if (!(nameMatch || skillsMatch || experienceMatch || conditionsMatch || companyNameMatch)) {
          return false;
        }
      }
      
      // 区分でフィルター
      if (filters.companyType && engineer.companyType !== filters.companyType) {
        return false;
      }
      
      // 所属会社でフィルター
      if (filters.companyName && !(engineer.companyName?.includes(filters.companyName))) {
        return false;
      }
      
      // 日本語レベルでフィルター
      if (filters.japaneseLevel && engineer.japaneseLevel !== filters.japaneseLevel) {
        return false;
      }
      
      // ステータスでフィルター
      if (filters.status && engineer.status !== filters.status) {
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
  }, [searchQuery, filters.companyType, filters.companyName, filters.japaneseLevel, filters.status, engineers]);
  
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
    
    if (filtered.length === 0 && (searchQuery || filters.companyType || filters.companyName || filters.japaneseLevel || filters.status)) {
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
      desiredConditions: '',
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
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium japanese-text whitespace-nowrap">区分:</Label>
                <Select
                  value={filters.companyType}
                  onValueChange={(value) => setFilters({...filters, companyType: value})}
                >
                  <SelectTrigger className="h-8 w-[120px] japanese-text">
                    <SelectValue placeholder="全て" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全て</SelectItem>
                    <SelectItem value="自社">自社</SelectItem>
                    <SelectItem value="他社">他社</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                    <SelectItem value="案件探し中">案件探し中</SelectItem>
                    <SelectItem value="提案中">提案中</SelectItem>
                    <SelectItem value="稼働中">稼働中</SelectItem>
                    <SelectItem value="非稼働">非稼働</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(searchQuery || filters.companyType || filters.companyName || filters.japaneseLevel || filters.status) && (
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
                <TableHead className="japanese-text">名前</TableHead>
                <TableHead className="japanese-text">区分</TableHead>
                <TableHead className="japanese-text">所属会社</TableHead>
                <TableHead className="japanese-text">スキル</TableHead>
                <TableHead className="japanese-text">経験年数</TableHead>
                <TableHead className="japanese-text">希望条件</TableHead>
                <TableHead className="japanese-text">ステータス</TableHead>
                <TableHead className="japanese-text">登録日</TableHead>
                <TableHead className="japanese-text">更新日</TableHead>
                <TableHead className="japanese-text">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEngineers.length > 0 ? (
                paginatedEngineers.map((engineer) => (
                  <TableRow key={engineer.id}>
                    <TableCell className="font-medium japanese-text">{engineer.name}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={engineer.companyType === "自社" ? "default" : "secondary"} 
                        className="japanese-text text-xs"
                      >
                        {engineer.companyType}
                        {engineer.source === "メール" && " (メール)"}
                      </Badge>
                    </TableCell>
                    <TableCell className="japanese-text text-sm">{engineer.companyName}</TableCell>
                    <TableCell className="japanese-text text-sm truncate">
                      {engineer.skills && engineer.skills.join(", ")}
                    </TableCell>
                    <TableCell className="japanese-text text-sm">{engineer.experience}</TableCell>
                    <TableCell className="japanese-text text-sm truncate">{engineer.desiredConditions}</TableCell>
                    <TableCell className="japanese-text text-sm">{engineer.status}</TableCell>
                    <TableCell className="japanese-text text-sm">{engineer.registeredAt}</TableCell>
                    <TableCell className="japanese-text text-sm">{engineer.updatedAt}</TableCell>
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
                          onClick={() => onDownloadResume(engineer.id)}
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
                  <TableCell colSpan={10} className="h-24 text-center">
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
