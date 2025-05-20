
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, BarChart2, Clock, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { MailCase } from '../email/types';

interface EmailStatsTabProps {
  filteredMailCases: MailCase[];
  paginatedMailCases: MailCase[];
  companyFilter: string;
  setCompanyFilter: (filter: string) => void;
  techKeyword: string;
  setTechKeyword: (keyword: string) => void;
  emailDateFrom: string;
  setEmailDateFrom: (date: string) => void;
  emailDateTo: string;
  setEmailDateTo: (date: string) => void;
  resetDateFilters: () => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  emailStats: {
    total: number;
    companies: Record<string, number>;
    senders: Record<string, number>;
    dates: Record<string, number>;
  };
  companyList: (string | null)[];
}

export const EmailStatsTab: React.FC<EmailStatsTabProps> = ({
  filteredMailCases,
  paginatedMailCases,
  companyFilter,
  setCompanyFilter,
  techKeyword,
  setTechKeyword,
  emailDateFrom,
  setEmailDateFrom,
  emailDateTo,
  setEmailDateTo,
  resetDateFilters,
  currentPage,
  setCurrentPage,
  totalPages,
  emailStats,
  companyList
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="japanese-text">メール案件の統計情報</CardTitle>
        <CardDescription className="japanese-text">
          メールから取得された案件情報の分析と統計データ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium japanese-text">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  メール案件総数
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{emailStats.total}</div>
              <p className="text-xs text-muted-foreground mt-2 japanese-text">
                全体の統計情報
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium japanese-text">
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2 text-indigo-600" />
                  会社別案件数
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[150px] overflow-auto">
              <div className="mb-2">
                <Select value={companyFilter} onValueChange={setCompanyFilter}>
                  <SelectTrigger className="japanese-text text-sm">
                    <SelectValue placeholder="会社でフィルター" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="japanese-text">すべての会社</SelectItem>
                    {companyList.map((company) => (
                      <SelectItem key={company as string} value={company as string} className="japanese-text">
                        {company as string}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ul className="space-y-2">
                {Object.entries(emailStats.companies).map(([company, count]) => (
                  <li key={company} className="flex justify-between items-center">
                    <span className="text-sm truncate japanese-text">{company}</span>
                    <Badge variant="outline">{count}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-medium japanese-text">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-600" />
                  日付別案件数
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[150px] overflow-auto">
              <ul className="space-y-2">
                {Object.entries(emailStats.dates).map(([date, count]) => (
                  <li key={date} className="flex justify-between items-center">
                    <span className="text-sm japanese-text">{date}</span>
                    <Badge variant="outline">{count}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 japanese-text">メール送信者分析</h3>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-4">
            <div className="flex-1">
              <Select value={companyFilter} onValueChange={setCompanyFilter}>
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="会社でフィルター" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="japanese-text">すべての会社</SelectItem>
                  {companyList.map((company) => (
                    <SelectItem key={company as string} value={company as string} className="japanese-text">
                      {company as string}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-40">
              <Input
                placeholder="技術キーワード"
                value={techKeyword}
                onChange={(e) => setTechKeyword(e.target.value)}
                className="japanese-text"
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    type="date"
                    placeholder="開始日"
                    value={emailDateFrom}
                    onChange={(e) => setEmailDateFrom(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <span className="text-center">〜</span>
                <div className="relative flex-1">
                  <Input
                    type="date"
                    placeholder="終了日"
                    value={emailDateTo}
                    onChange={(e) => setEmailDateTo(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={resetDateFilters}
                  className="japanese-text"
                >
                  <Filter className="h-4 w-4 mr-1" />
                  リセット
                </Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="japanese-text">送信者</TableHead>
                  <TableHead className="japanese-text">担当者名</TableHead>
                  <TableHead className="japanese-text">会社</TableHead>
                  <TableHead className="japanese-text">技術キーワード</TableHead>
                  <TableHead className="japanese-text">受信日時</TableHead>
                  <TableHead className="japanese-text text-right">案件数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMailCases.map((item) => {
                  const senderCount = filteredMailCases.filter(c => c.sender === item.sender).length;
                  
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.sender}</TableCell>
                      <TableCell className="japanese-text">{item.senderName || "-"}</TableCell>
                      <TableCell className="japanese-text">{item.company || "-"}</TableCell>
                      <TableCell className="japanese-text">{item.keyTechnologies || "-"}</TableCell>
                      <TableCell className="japanese-text">
                        {item.receivedDate ? new Date(item.receivedDate).toLocaleString() : "-"}
                      </TableCell>
                      <TableCell className="text-right">{senderCount}</TableCell>
                    </TableRow>
                  );
                })}
                {filteredMailCases.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 japanese-text">
                      該当する案件がありません
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
