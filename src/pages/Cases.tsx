import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CaseUploadForm } from '@/components/cases/CaseUploadForm';
import { StructuredCaseForm } from '@/components/cases/StructuredCaseForm';
import { EmailSender } from '@/components/cases/EmailSender';
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
import { Mail, FileText, BarChart2, Clock, Calendar, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from "@/hooks/toast";

// 案件のサンプルデータ（案件詳細を追加）
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
    senderName: "田中 一郎",
    createdAt: "2025-05-10",
    keyTechnologies: "Java, SpringBoot, AWS",
    // 案件詳細情報を追加
    detailDescription: `
金融系システムの新規開発プロジェクトにおけるJavaエンジニアの募集案件です。

【業務内容】
- 既存金融システムのリプレイスプロジェクト
- 要件定義からテストまでの一連の開発作業
- チームでの協業によるアジャイル開発

【必要スキル・経験】
- Java開発の経験3年以上
- Spring Bootを用いた開発経験
- データベース（Oracle、PostgreSQL等）の設計・実装経験
- Git等のバージョン管理システムの使用経験

【歓迎スキル】
- クラウド環境（特にAWS）での開発経験
- マイクロサービスアーキテクチャの経験
- CI/CDパイプラインの構築・運用経験

【プロジェクト概要】
- プロジェクト期間：2025年7月〜2026年3月（予定）
- 開発環境：Java 17, Spring Boot 3.x, PostgreSQL, AWS
- チーム構成：PM 1名、PL 1名、エンジニア 5名

【その他条件】
- 週3回のオンサイト勤務（場所：東京都千代田区）
- リモートワーク併用可能
- 稼働時間：140〜180時間/月
- 単価：スキル・経験に応じて60〜80万円
- 面談：2回（オンライン可）

【案件の魅力】
最新の技術スタックを使った大規模リプレイスプロジェクトで、��術的な成長が見込めます。また、アジャイル開発を取り入れており、短いサイクルでの成果を実感できる環境です。チームメンバーも経験豊富なエンジニアが多く、知識の共有が活発に行われています。
    `,
    experience: "3年以上",
    workType: "週3回オンサイト/リモート併用可",
    duration: "2025年7月〜2026年3月（予定）",
    japanese: "ビジネスレベル",
    priority: "高",
    manager: "佐藤 太郎",
    managerEmail: "sato@technosolution.co.jp",
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
    senderName: null,
    createdAt: "2025-05-10",
    keyTechnologies: "React, TypeScript, Next.js",
    // 案件詳細情報を追加
    detailDescription: `
ECサイトのフロントエンド開発を担当するエンジニアを募集しています。

【業務内容】
- ECサイトのフロントエンド開発
- 既存機能の改善・新機能の追加
- パフォーマンスチューニング
- コードレビュー

【必要スキル・経験】
- React、TypeScriptでの開発経験2年以上
- GitHubを用いたバージョン管理の経験
- レスポンシブデザインの実装経験

【歓迎スキル】
- Next.jsでの開発経験
- GraphQLの使用経験
- CIツールの使用経験
- パフォーマンス最適化の経験

【開発環境】
- 言語：TypeScript
- フレームワーク：React、Next.js
- 状態管理：Redux Toolkit
- スタイリング：Tailwind CSS
- その他：Storybook、Jest

【その他条件】
- 稼働時間：160〜180時間/月
- 単価：55〜70万円（スキル見合い）
- 勤務地：大阪市内（リモート勤務は要相談）
- 面談回数：1〜2回
`,
    experience: "2年以上",
    workType: "オンサイト（リモート勤務は要相談）",
    duration: "3ヶ月〜（延長の可能性あり）",
    japanese: "不問",
    priority: "中",
    manager: null,
    managerEmail: null,
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
    senderName: "鈴木 次郎",
    createdAt: "2025-05-08",
    keyTechnologies: "AWS, Docker, Kubernetes"
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
    senderName: null,
    createdAt: "2025-05-07",
    keyTechnologies: "Selenium, Jenkins, Python"
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
    senderName: "山田 三郎",
    createdAt: "2025-05-12",
    keyTechnologies: "PHP, Laravel, MySQL"
  },
  {
    id: "6",
    title: "Android開発エンジニア",
    skills: ["Kotlin", "Java", "Android SDK"],
    location: "福岡",
    budget: "60~75万円",
    status: "募集中",
    source: "mail",
    company: "モバイルソリューション株式会社",
    receivedDate: "2025-05-11T10:15:00",
    sender: "watanabe@mobile-solution.jp",
    senderName: "渡辺 ���郎",
    createdAt: "2025-05-11",
    keyTechnologies: "Kotlin, Android, Firebase"
  },
  {
    id: "7",
    title: "データサイエンスト",
    skills: ["Python", "R", "機械学習"],
    location: "東京",
    budget: "70~90万円",
    status: "募集中",
    source: "mail",
    company: "AIソリューション株式会社",
    receivedDate: "2025-05-09T15:45:00",
    sender: "saito@ai-solution.co.jp",
    senderName: "斉藤 五郎",
    createdAt: "2025-05-09",
    keyTechnologies: "Python, R, TensorFlow"
  },
  {
    id: "8",
    title: "セキュリティエンジニア",
    skills: ["ネットワークセキュリティ", "CISSP"],
    location: "大阪",
    budget: "65~85万円",
    status: "選考中",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
    senderName: null,
    createdAt: "2025-05-08",
    keyTechnologies: "CISSP, Firewall, SIEM"
  },
  {
    id: "9",
    title: "UI/UXデザイナー",
    skills: ["Figma", "Adobe XD", "Sketch"],
    location: "東京",
    budget: "55~70万円",
    status: "提案済",
    source: "mail",
    company: "デザインスタジオ株式会社",
    receivedDate: "2025-05-07T09:10:00",
    sender: "tanaka@design-studio.jp",
    senderName: "田中 六郎",
    createdAt: "2025-05-07",
    keyTechnologies: "Figma, Adobe XD, Sketch"
  },
  {
    id: "10",
    title: "DevOpsエンジニア",
    skills: ["Jenkins", "AWS", "Terraform"],
    location: "名古屋",
    budget: "65~85万円",
    status: "募集中",
    source: "mail",
    company: "クラウドマネジメント株式会社",
    receivedDate: "2025-05-06T13:25:00",
    sender: "nakamura@cloud-mgmt.co.jp",
    senderName: "中村 七郎",
    createdAt: "2025-05-06",
    keyTechnologies: "Jenkins, AWS, Terraform"
  },
  {
    id: "11",
    title: "Goバックエンド開発者",
    skills: ["Go", "PostgreSQL", "gRPC"],
    location: "リモート",
    budget: "70~90万円",
    status: "募集中",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
    senderName: null,
    createdAt: "2025-05-05",
    keyTechnologies: "Go, PostgreSQL, gRPC"
  },
  {
    id: "12",
    title: "Rubyエンジニア",
    skills: ["Ruby", "Rails", "PostgreSQL"],
    location: "福岡",
    budget: "55~75万円",
    status: "選考中",
    source: "mail",
    company: "ウェブアプリケーション株式会社",
    receivedDate: "2025-05-04T11:05:00",
    sender: "kobayashi@webapps.co.jp",
    senderName: "小林 八郎",
    createdAt: "2025-05-04",
    keyTechnologies: "Ruby, Rails, PostgreSQL"
  }
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

export function Cases() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [techKeyword, setTechKeyword] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [casesCurrentPage, setCasesCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [companyFilter, setCompanyFilter] = useState("all");
  
  // 新しい日付範囲フィルター
  const [emailDateFrom, setEmailDateFrom] = useState("");
  const [emailDateTo, setEmailDateTo] = useState("");
  
  // 選択された案件のステート
  const [selectedCase, setSelectedCase] = useState<(typeof caseData)[0] | null>(null);
  
  // 会社のリストを取得
  const companyList = Array.from(new Set(caseData.filter(item => item.company).map(item => item.company)));
  
  // フィルタリングさ��た案件を取得
  const filteredCases = caseData.filter(item => {
    const matchesSource = filter === "all" || item.source === filter;
    
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTech = techKeyword === "" ||
      item.skills.some(skill => skill.toLowerCase().includes(techKeyword.toLowerCase())) ||
      (item.keyTechnologies && item.keyTechnologies.toLowerCase().includes(techKeyword.toLowerCase()));
    
    const matchesDate = dateRange === "" || item.createdAt === dateRange;

    const matchesCompany = companyFilter === "all" || item.company === companyFilter;
    
    return matchesSource && matchesSearch && matchesTech && matchesDate && matchesCompany;
  });

  // 案件一覧のページネーション
  const paginatedCases = filteredCases.slice(
    (casesCurrentPage - 1) * itemsPerPage,
    casesCurrentPage * itemsPerPage
  );
  const totalCasesPages = Math.ceil(filteredCases.length / itemsPerPage);

  // ケース選択ハンドラー
  const handleCaseSelect = (caseItem: (typeof caseData)[0]) => {
    setSelectedCase(caseItem);
  };

  // メール案件のフィルタリング（日付フィルターを追加）
  const filteredMailCases = caseData.filter(item => {
    if (item.source !== "mail") return false;
    
    // 会社フィルター
    const matchesCompany = companyFilter === "all" || item.company === companyFilter;
    
    // 技術キーワードフィルター
    const matchesTech = techKeyword === "" ||
      (item.keyTechnologies && item.keyTechnologies.toLowerCase().includes(techKeyword.toLowerCase()));
    
    // 日付範囲フィルター
    let matchesDateRange = true;
    if (emailDateFrom || emailDateTo) {
      if (item.receivedDate) {
        const itemDate = new Date(item.receivedDate).toISOString().split('T')[0];
        if (emailDateFrom && itemDate < emailDateFrom) {
          matchesDateRange = false;
        }
        if (emailDateTo && itemDate > emailDateTo) {
          matchesDateRange = false;
        }
      } else {
        // 日付がない項目は日付フィルターを使用時に除外
        if (emailDateFrom || emailDateTo) {
          matchesDateRange = false;
        }
      }
    }
    
    return matchesCompany && matchesTech && matchesDateRange;
  });
  
  // ページネーション用のメール案件取得
  const paginatedMailCases = filteredMailCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredMailCases.length / itemsPerPage);
  
  // メール案件の統計関数
  const getEmailStats = () => {
    // 会社ごとの案件数
    const companyCounts = filteredMailCases.reduce((acc, cur) => {
      const company = cur.company || "不明";
      acc[company] = (acc[company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // 送信者ごとの案件数
    const senderCounts = filteredMailCases.reduce((acc, cur) => {
      const sender = cur.sender || "不明";
      acc[sender] = (acc[sender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // 日付ごとの案件数
    const dateCounts = filteredMailCases.reduce((acc, cur) => {
      if (cur.receivedDate) {
        const date = new Date(cur.receivedDate).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    return {
      total: filteredMailCases.length,
      companies: companyCounts,
      senders: senderCounts,
      dates: dateCounts
    };
  };

  const emailStats = getEmailStats();
  
  // 日付フィルターをリセットする関数
  const resetDateFilters = () => {
    setEmailDateFrom("");
    setEmailDateTo("");
    toast({
      title: "フィルターをリセットしました",
      description: "日付フィルターがクリアされました",
    });
  };

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
            <TabsTrigger value="send" className="japanese-text">一括送信</TabsTrigger>
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
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        placeholder="案件名または会社名で検索"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="japanese-text pl-9"
                      />
                    </div>
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
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4">
                  <div className="flex-1">
                    <Input
                      placeholder="技術キーワードで検索（例：Java, React）"
                      value={techKeyword}
                      onChange={(e) => setTechKeyword(e.target.value)}
                      className="japanese-text"
                    />
                  </div>
                  <div className="w-full sm:w-40">
                    <div className="relative">
                      <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        type="date"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="japanese-text pl-9"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* 案件一覧テーブル（左側） */}
                  <div className="lg:w-1/2">
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
                            <TableHead className="japanese-text">作成日</TableHead>
                            <TableHead className="japanese-text">ステータス</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedCases.map((item) => (
                            <TableRow 
                              key={item.id} 
                              className={selectedCase?.id === item.id ? "bg-muted" : ""}
                              onClick={() => handleCaseSelect(item)}
                              style={{ cursor: 'pointer' }}
                            >
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
                              <TableCell className="japanese-text text-sm">{item.createdAt}</TableCell>
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
                  
                    {/* 案件一覧のページネーション */}
                    <div className="mt-4 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCasesCurrentPage(prev => Math.max(prev - 1, 1))}
                              className={casesCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: totalCasesPages }).map((_, index) => {
                            const pageNumber = index + 1;
                            if (
                              pageNumber === 1 || 
                              pageNumber === totalCasesPages || 
                              (pageNumber >= casesCurrentPage - 1 && pageNumber <= casesCurrentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={pageNumber}>
                                  <PaginationLink 
                                    isActive={casesCurrentPage === pageNumber}
                                    onClick={() => setCasesCurrentPage(pageNumber)}
                                  >
                                    {pageNumber}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (
                              pageNumber === casesCurrentPage - 2 || 
                              pageNumber === casesCurrentPage + 2
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
                              onClick={() => setCasesCurrentPage(prev => Math.min(prev + 1, totalCasesPages))}
                              className={casesCurrentPage === totalCasesPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  </div>
                  
                  {/* 案件詳細表示部分（右側） */}
                  <div className="lg:w-1/2">
                    {selectedCase ? (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl japanese-text">{selectedCase.title}</CardTitle>
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusBadgeColor(selectedCase.status)}>
                              <span className="japanese-text">{selectedCase.status}</span>
                            </Badge>
                            <span className="text-sm text-muted-foreground japanese-text">作成日: {selectedCase.createdAt}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">会社名</h4>
                              <p className="text-sm japanese-text">{selectedCase.company || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">担当者</h4>
                              <p className="text-sm japanese-text">{selectedCase.manager || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">連絡先</h4>
                              <p className="text-sm japanese-text">{selectedCase.managerEmail || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">必要経験</h4>
                              <p className="text-sm japanese-text">{selectedCase.experience || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">勤務形態</h4>
                              <p className="text-sm japanese-text">{selectedCase.workType || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">期間</h4>
                              <p className="text-sm japanese-text">{selectedCase.duration || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">日本語レベル</h4>
                              <p className="text-sm japanese-text">{selectedCase.japanese || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">優先度</h4>
                              <p className="text-sm japanese-text">{selectedCase.priority || "未設定"}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">勤務地</h4>
                              <p className="text-sm japanese-text">{selectedCase.location}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-1 japanese-text">単価</h4>
                              <p className="text-sm japanese-text">{selectedCase.budget}</p>
                            </div>
                            <div className="col-span-2">
                              <h4 className="text-sm font-medium mb-1 japanese-text">スキル</h4>
                              <div className="flex flex-wrap gap-1">
                                {selectedCase.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="japanese-text">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2 japanese-text">案件詳細</h4>
                            <div className="bg-muted/50 rounded-md p-3 text-sm whitespace-pre-wrap japanese-text max-h-[400px] overflow-y-auto">
                              {selectedCase.detailDescription || "詳細情報はありません"}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="flex items-center justify-center h-[400px] text-center">
                        <CardContent>
                          <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-2" />
                          <p className="text-muted-foreground japanese-text">案件を選択して詳細を表示</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
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
                  AIにより案件情報が自動的に構造化されます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StructuredCaseForm />
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
                          <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
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
                          <Calendar className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
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
                          // Show first page, current page, and last page, with ellipsis in between
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
                      特定の送信者や���メインからのメールを優先的に処理します
                    </p>
                  </div>
                  
                  <Button className="mt-2 japanese-text">設定を保存</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="send" className="space-y-6">
            <EmailSender mailCases={filteredMailCases} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Cases;
