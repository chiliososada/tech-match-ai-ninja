
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Edit, Download, FileText, Star } from 'lucide-react';

// Sample data for engineers
const SAMPLE_ENGINEERS = [
  {
    id: "eng1",
    name: "田中 一郎",
    age: 32,
    skills: ["Java", "Spring", "AWS"],
    experience: "8年",
    status: "待機中",
    rate: "65〜75万円",
    location: "東京",
    rating: 4.5
  },
  {
    id: "eng2",
    name: "佐藤 二郎",
    age: 28,
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5年",
    status: "待機中",
    rate: "60〜70万円",
    location: "大阪",
    rating: 4.2
  },
  {
    id: "eng3",
    name: "鈴木 三郎",
    age: 35,
    skills: ["Python", "Django", "GCP"],
    experience: "10年",
    status: "案件中",
    rate: "70〜85万円",
    location: "福岡",
    rating: 4.8
  },
  {
    id: "eng4",
    name: "高橋 四郎",
    age: 27,
    skills: ["Vue.js", "JavaScript", "Firebase"],
    experience: "4年",
    status: "案件中",
    rate: "55〜65万円",
    location: "名古屋",
    rating: 3.9
  },
  {
    id: "eng5",
    name: "伊藤 五郎",
    age: 33,
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "7年",
    status: "待機中",
    rate: "60〜75万円",
    location: "東京",
    rating: 4.1
  },
  {
    id: "eng6",
    name: "渡辺 六郎",
    age: 29,
    skills: [".NET", "C#", "Azure"],
    experience: "6年",
    status: "案件中",
    rate: "65〜80万円",
    location: "大阪",
    rating: 4.3
  },
  {
    id: "eng7",
    name: "山本 七郎",
    age: 31,
    skills: ["iOS", "Swift", "Objective-C"],
    experience: "7年",
    status: "待機中",
    rate: "70〜85万円",
    location: "東京",
    rating: 4.7
  },
  {
    id: "eng8",
    name: "中村 八郎",
    age: 26,
    skills: ["Android", "Kotlin", "Java"],
    experience: "3年",
    status: "案件中",
    rate: "50〜65万円",
    location: "名古屋",
    rating: 3.8
  }
];

export function EngineersListTab() {
  const [nameFilter, setNameFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;
  
  // フィルタリングされたエンジニアを取得
  const filteredEngineers = SAMPLE_ENGINEERS.filter(engineer => {
    const matchesName = nameFilter === "" || 
                       engineer.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesSkill = skillFilter === "" || 
                       engineer.skills.some(skill => 
                         skill.toLowerCase().includes(skillFilter.toLowerCase()));
    const matchesStatus = statusFilter === "" || 
                         engineer.status === statusFilter;
    
    return matchesName && matchesSkill && matchesStatus;
  });
  
  // ページネーションで表示するエンジニア
  const paginatedEngineers = filteredEngineers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredEngineers.length / itemsPerPage);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="japanese-text">技术者一览</CardTitle>
        <CardDescription className="japanese-text">
          システムに登録されているすべての技術者の一覧です
        </CardDescription>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="名前で検索" 
              className="pl-8 japanese-text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="スキルで検索" 
              className="pl-8 japanese-text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
          </div>
          
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="japanese-text">
              <SelectValue placeholder="ステータス" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">全て</SelectItem>
              <SelectItem value="待機中">待機中</SelectItem>
              <SelectItem value="案件中">案件中</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="japanese-text">名前</TableHead>
                <TableHead className="japanese-text">年齢</TableHead>
                <TableHead className="japanese-text">スキル</TableHead>
                <TableHead className="japanese-text">経験</TableHead>
                <TableHead className="japanese-text">単価</TableHead>
                <TableHead className="japanese-text">場所</TableHead>
                <TableHead className="japanese-text">ステータス</TableHead>
                <TableHead className="japanese-text">評価</TableHead>
                <TableHead className="japanese-text w-[100px]">アクション</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEngineers.map((engineer) => (
                <TableRow key={engineer.id}>
                  <TableCell className="font-medium japanese-text">{engineer.name}</TableCell>
                  <TableCell>{engineer.age}歳</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {engineer.skills.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="outline" className="japanese-text text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="japanese-text">{engineer.experience}</TableCell>
                  <TableCell className="japanese-text">{engineer.rate}</TableCell>
                  <TableCell className="japanese-text">{engineer.location}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={engineer.status === "待機中" ? "secondary" : "outline"}
                      className="japanese-text"
                    >
                      {engineer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{engineer.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" title="詳細を見る">
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="編集する">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedEngineers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 japanese-text">
                    検索条件に一致する技術者が見つかりません
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
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
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
                  } else if (
                    pageNumber === currentPage - 2 || 
                    pageNumber === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <div className="japanese-text text-sm text-muted-foreground">
            {filteredEngineers.length}人の技術者が見つかりました
          </div>
          <Button variant="outline" className="japanese-text">
            <Download className="mr-2 h-4 w-4" />
            CSVでエクスポート
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EngineersListTab;
