
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CaseUploadForm } from '@/components/cases/CaseUploadForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Mail, FileText, BarChart2, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// サンプルデータ
const caseData = [
  {
    id: "1",
    title: "Java開発エンジニア",
    skills: ["Java", "Spring Boot", "SQL"],
    location: "東京（リモート可）",
    budget: "60~80万円",
    status: "募集中",
    source: "mail",
    company: "テクノソリューション株式会社",
    receivedDate: "2025-05-10T09:30:00",
    sender: "tanaka@technosolution.co.jp",
  },
  {
    id: "2",
    title: "フロントエンドエンジニア",
    skills: ["React", "TypeScript", "Next.js"],
    location: "大阪",
    budget: "55~70万円",
    status: "募集中",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
  },
  {
    id: "3",
    title: "インフラエンジニア",
    skills: ["AWS", "Docker", "Kubernetes"],
    location: "名古屋",
    budget: "65~90万円",
    status: "選考中",
    source: "mail",
    company: "クラウドテック株式会社",
    receivedDate: "2025-05-08T14:15:00",
    sender: "suzuki@cloudtech.jp",
  },
  {
    id: "4",
    title: "QAエンジニア",
    skills: ["テスト自動化", "Selenium"],
    location: "リモート",
    budget: "50~65万円",
    status: "提案済",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
  },
  {
    id: "5",
    title: "PHP開発エンジニア",
    skills: ["PHP", "Laravel", "MySQL"],
    location: "東京",
    budget: "55~75万円",
    status: "募集中",
    source: "mail",
    company: "ウェブシステム株式会社",
    receivedDate: "2025-05-12T11:20:00",
    sender: "yamada@websystem.co.jp",
  },
];

// 案件のステータスに応じた色を返す関数
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "募集中":
      return "bg-green-100 text-green-800";
    case "選考中":
      return "bg-amber-100 text-amber-800";
    case "提案済":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// 案件のソースに応じたアイコンを返す関数
const getSourceIcon = (source: string) => {
  return source === "mail" ? (
    <Mail className="h-4 w-4 mr-1 text-blue-600" />
  ) : (
    <FileText className="h-4 w-4 mr-1 text-purple-600" />
  );
};

// メール案件の統計関数
const getEmailStats = () => {
  const mailCases = caseData.filter(item => item.source === "mail");
  
  // 会社ごとの案件数
  const companyCounts = mailCases.reduce((acc, cur) => {
    const company = cur.company || "不明";
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 送信者ごとの案件数
  const senderCounts = mailCases.reduce((acc, cur) => {
    const sender = cur.sender || "不明";
    acc[sender] = (acc[sender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 日付ごとの案件数
  const dateCounts = mailCases.reduce((acc, cur) => {
    if (cur.receivedDate) {
      const date = new Date(cur.receivedDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: mailCases.length,
    companies: companyCounts,
    senders: senderCounts,
    dates: dateCounts
  };
};

export function Cases() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // フィルタリングされた案件を取得
  const filteredCases = caseData.filter(item => {
    const matchesFilter = filter === "all" || item.source === filter;
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });
  
  // メール案件の統計情報
  const emailStats = getEmailStats();

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">案件管理</h2>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list" className="japanese-text">案件一覧</TabsTrigger>
            <TabsTrigger value="upload" className="japanese-text">案件アップロード</TabsTrigger>
            <TabsTrigger value="stats" className="japanese-text">メール案件統計</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">案件一覧</CardTitle>
                <CardDescription className="japanese-text">
                  登録済みの案件一覧と詳細を表示します
                </CardDescription>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder="案件名または会社名で検索"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="japanese-text"
                    />
                  </div>
                  <div className="w-full sm:w-40">
                    <Select value={filter} onValueChange={setFilter}>
                      <SelectTrigger className="japanese-text">
                        <SelectValue placeholder="ソース" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="japanese-text">すべて</SelectItem>
                        <SelectItem value="mail" className="japanese-text">メール</SelectItem>
                        <SelectItem value="manual" className="japanese-text">手動入力</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="japanese-text">ソース</TableHead>
                        <TableHead className="japanese-text">案件名</TableHead>
                        <TableHead className="japanese-text">スキル</TableHead>
                        <TableHead className="japanese-text">勤務地</TableHead>
                        <TableHead className="japanese-text">単価</TableHead>
                        <TableHead className="japanese-text">会社</TableHead>
                        <TableHead className="japanese-text">ステータス</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCases.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center">
                              {getSourceIcon(item.source)}
                              <span className="text-xs japanese-text">
                                {item.source === "mail" ? "メール" : "手動"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium japanese-text">{item.title}</TableCell>
                          <TableCell className="japanese-text text-sm">
                            {item.skills.join(", ")}
                          </TableCell>
                          <TableCell className="japanese-text text-sm">{item.location}</TableCell>
                          <TableCell className="japanese-text text-sm">{item.budget}</TableCell>
                          <TableCell className="japanese-text text-sm">
                            {item.company || "-"}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(item.status)}>
                              <span className="japanese-text">{item.status}</span>
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">新規案件の追加</CardTitle>
                <CardDescription className="japanese-text">
                  案件情報をアップロードまたは手動で入力して、システムに追加します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CaseUploadForm />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">案件情報の構造化</CardTitle>
                <CardDescription className="japanese-text">
                  AIにより案件情報が以下のように自動的に構造化されます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm whitespace-pre-wrap">
{`{
  "title": "Java開発エンジニア",
  "skills": ["Java", "Spring Boot", "SQL"],
  "experience": "5年以上",
  "location": "東京都",
  "workType": "リモート可（週3出社）",
  "duration": "6ヶ月〜",
  "budget": "60万円〜80万円",
  "japanese": "ビジネスレベル",
  "priority": "高",
  "description": "金融系システムの新規開発プロジェクト..."
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
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
                        全案件の {Math.round((emailStats.total / caseData.length) * 100)}%
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
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="japanese-text">送信者</TableHead>
                          <TableHead className="japanese-text">会社</TableHead>
                          <TableHead className="japanese-text text-right">案件数</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(emailStats.senders).map(([sender, count]) => {
                          // 送信者のドメインから会社名を取得
                          const domain = sender.split('@')[1];
                          const company = caseData.find(item => item.sender === sender)?.company || "-";
                          
                          return (
                            <TableRow key={sender}>
                              <TableCell className="font-medium">{sender}</TableCell>
                              <TableCell className="japanese-text">{company}</TableCell>
                              <TableCell className="text-right">{count}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">メール取得の最適化</CardTitle>
                <CardDescription className="japanese-text">
                  メール案件の取得精度と効率を向上させるための設定
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 japanese-text">優先キーワード設定</h4>
                    <Input 
                      placeholder="Java, エンジニア, 募集, 案件など（カンマ区切り）" 
                      className="japanese-text"
                    />
                    <p className="text-xs text-muted-foreground mt-1 japanese-text">
                      これらのキーワードを含むメールを優先的に処理します
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 japanese-text">優先送信者設定</h4>
                    <Input 
                      placeholder="tanaka@example.com, @techcompany.co.jp" 
                      className="japanese-text"
                    />
                    <p className="text-xs text-muted-foreground mt-1 japanese-text">
                      特定の送信者やドメインからのメールを優先的に処理します
                    </p>
                  </div>
                  
                  <Button className="mt-2 japanese-text">設定を保存</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Cases;
