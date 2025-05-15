import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from '@/hooks/use-toast';
import { Mail, Send, Wand2, UserRound, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface EmailSenderProps {
  mailCases: any[];
}

const DEFAULT_SIGNATURE = `
--
株式会社テックリクルーター
営業部 山田太郎
TEL: 03-1234-5678
Email: yamada@techrecruiter.co.jp
`;

const EMAIL_TEMPLATES = [
  {
    id: "greeting",
    name: "初回挨拶",
    subject: "【ご挨拶】技術者派遣のご案内",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

貴社のプロジェクトに最適な技術者をご紹介できればと思い、ご連絡いたしました。
弊社では、[技術領域]に精通したエンジニアを多数抱えており、短期・中期・長期のプロジェクトに対応可能です。

現在、特に以下のスキルを持つエンジニアが稼働可能となっております：
- Java, Spring Boot（経験5年以上）
- React, TypeScript（経験3年以上）
- AWS, Docker, Kubernetes（経験4年以上）

ご興味がございましたら、ぜひ一度お話させていただければ幸いです。
お忙しいところ恐縮ですが、ご検討のほど、よろしくお願い申し上げます。`
  },
  {
    id: "follow-up",
    name: "案件フォローアップ",
    subject: "【フォローアップ】先日ご連絡した件について",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

先日は貴社の案件情報をご共有いただき、誠にありがとうございました。
頂いた案件情報に基づき、条件に合致する技術者を選定いたしましたので、ご報告させていただきます。

・[案件名]案件について
・スキル要件：[スキル]
・稼働可能時期：即日〜

技術者のプロフィールを添付いたしますので、ご確認いただければ幸いです。
ご不明な点やご質問がございましたら、お気軽にお問い合わせください。`
  },
  {
    id: "engineer-intro",
    name: "技術者紹介",
    subject: "【技術者紹介】案件に最適な人材のご紹介",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

貴社の案件に最適な技術者をご紹介いたします。

【技術者情報】
・氏名：[技術者名]
・スキル：[技術者スキル]
・経験年数：[経験年数]年
・稼働可能時期：[稼働可能時期]
・単価：[単価]

詳細な経歴書を添付いたしますので、ご確認いただければ幸いです。
面談のセッティングなど、お気軽にご相談ください。`
  },
  {
    id: "custom",
    name: "カスタム",
    subject: "",
    body: ""
  }
];

// サンプル技術者データ
const ENGINEERS_DATA = [
  {
    id: "e1",
    name: "佐藤 一郎",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: "7年",
    availability: "即日",
    rate: "80万円",
    languages: ["日本語（ネイティブ）", "英語（ビジネスレベル）"],
    status: "稼働中"
  },
  {
    id: "e2",
    name: "鈴木 二郎",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5年",
    availability: "１週間後",
    rate: "75万円",
    languages: ["日本語（ネイティブ）"],
    status: "待機中"
  },
  {
    id: "e3",
    name: "高橋 三郎",
    skills: ["Python", "Django", "AWS"],
    experience: "4年",
    availability: "即日",
    rate: "70万円",
    languages: ["日本語（ビジネスレベル）", "英語（日常会話）"],
    status: "待機中"
  },
  {
    id: "e4",
    name: "田中 四郎",
    skills: ["C#", ".NET", "Azure"],
    experience: "6年",
    availability: "2週間後",
    rate: "78万円",
    languages: ["日本語（ネイティブ）", "中国語（日常会話）"],
    status: "稼働中"
  },
  {
    id: "e5",
    name: "渡辺 五郎",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "3年",
    availability: "即日",
    rate: "65万円",
    languages: ["日本語（ネイティブ）"],
    status: "待機中"
  },
  {
    id: "e6",
    name: "伊藤 六郎",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    experience: "4年",
    availability: "1ヶ月後",
    rate: "72万円",
    languages: ["日本語（ネイティブ）", "英語（ビジネスレベル）"],
    status: "稼働中"
  },
  {
    id: "e7",
    name: "山本 七郎",
    skills: ["Go", "Docker", "Kubernetes"],
    experience: "5年",
    availability: "即日",
    rate: "85万円",
    languages: ["日本語（ネイティブ）", "英語（ビジネスレベル）"],
    status: "待機中"
  },
  {
    id: "e8",
    name: "中村 八郎",
    skills: ["Ruby", "Rails", "PostgreSQL"],
    experience: "6年",
    availability: "2週間後",
    rate: "78万円",
    languages: ["日本語（ネイティブ）"],
    status: "稼働中"
  },
  {
    id: "e9",
    name: "小林 九郎",
    skills: ["Angular", "TypeScript", "Firebase"],
    experience: "3年",
    availability: "即日",
    rate: "68万円",
    languages: ["日本語（ビジネスレベル）", "英語（日常会話）"],
    status: "待機中"
  },
  {
    id: "e10",
    name: "加藤 十郎",
    skills: ["Swift", "iOS", "Firebase"],
    experience: "4年",
    availability: "1週間後",
    rate: "75万円",
    languages: ["日本語（ネイティブ）"],
    status: "稼働中"
  }
];

export function EmailSender({ mailCases }: EmailSenderProps) {
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companyFilter, setCompanyFilter] = useState("all");
  const [techFilter, setTechFilter] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("custom");
  const [signature, setSignature] = useState(DEFAULT_SIGNATURE);
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([]);
  const [engineersSelectAll, setEngineersSelectAll] = useState(false);
  const [engineerCurrentPage, setEngineerCurrentPage] = useState(1);
  const [engineerFilter, setEngineerFilter] = useState("");
  const [engineerStatusFilter, setEngineerStatusFilter] = useState("all");
  
  const itemsPerPage = 5;
  
  // 会社のリストを取得
  const companyList = Array.from(new Set(mailCases.filter(item => item.company).map(item => item.company)));
  
  // フィルタリングされた案件を取得
  const filteredCases = mailCases.filter(item => {
    const matchesCompany = companyFilter === "all" || item.company === companyFilter;
    const matchesTech = techFilter === "" || 
                       (item.keyTechnologies && item.keyTechnologies.toLowerCase().includes(techFilter.toLowerCase()));
    return matchesCompany && matchesTech;
  });
  
  // ページネーションで表示するケース
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);

  // フィルタリングされた技術者を取得
  const filteredEngineers = ENGINEERS_DATA.filter(engineer => {
    // スキルフィルター
    const matchesSkill = engineerFilter === "" || 
                         engineer.skills.some(skill => 
                           skill.toLowerCase().includes(engineerFilter.toLowerCase()));
    
    // ステータスフィルター
    const matchesStatus = engineerStatusFilter === "all" || 
                          engineer.status === engineerStatusFilter;
    
    return matchesSkill && matchesStatus;
  });
  
  // ページネーションで表示する技術者
  const paginatedEngineers = filteredEngineers.slice(
    (engineerCurrentPage - 1) * itemsPerPage,
    engineerCurrentPage * itemsPerPage
  );
  
  const totalEngineerPages = Math.ceil(filteredEngineers.length / itemsPerPage);

  // Handle selectAll checkbox change for cases
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCases([]);
    } else {
      setSelectedCases(paginatedCases.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual case checkbox change
  const handleSelectCase = (id: string) => {
    setSelectedCases(prev => 
      prev.includes(id) 
        ? prev.filter(caseId => caseId !== id) 
        : [...prev, id]
    );
    
    // Update selectAll state
    if (selectedCases.length + 1 === paginatedCases.length && !selectedCases.includes(id)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };
  
  // Handle selectAll checkbox change for engineers
  const handleEngineerSelectAll = () => {
    if (engineersSelectAll) {
      setSelectedEngineers([]);
    } else {
      setSelectedEngineers(paginatedEngineers.map(item => item.id));
    }
    setEngineersSelectAll(!engineersSelectAll);
  };

  // Handle individual engineer checkbox change
  const handleEngineerSelect = (id: string) => {
    setSelectedEngineers(prev => 
      prev.includes(id) 
        ? prev.filter(engId => engId !== id) 
        : [...prev, id]
    );
    
    // Update selectAll state
    if (selectedEngineers.length + 1 === paginatedEngineers.length && !selectedEngineers.includes(id)) {
      setEngineersSelectAll(true);
    } else {
      setEngineersSelectAll(false);
    }
  };

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId !== "custom") {
      const template = EMAIL_TEMPLATES.find(t => t.id === templateId);
      if (template) {
        setSubject(template.subject);
        setEmailBody(template.body);
      }
    }
  };

  // Apply AI enhancement to email content
  const handleEnhanceEmail = () => {
    if (!emailBody.trim()) {
      toast({
        title: "エラー",
        description: 'メール本文を入力してください',
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an AI service
    // For now, we'll simulate enhanced content
    setSending(true);
    setTimeout(() => {
      const enhancedBody = `${emailBody.trim()}
      
${emailBody.includes('よろしくお願いいたします') ? '' : '\nご検討のほど、よろしくお願いいたします。'}`;
      setEmailBody(enhancedBody);
      setSending(false);
      toast({
        title: "メール内容が改善されました",
        variant: "default"
      });
    }, 1500);
  };

  // Generate email content with selected engineers
  const generateEmailContentWithEngineers = () => {
    // Basic validation
    if (!emailBody.trim()) {
      return emailBody;
    }

    // If no engineers selected, return original content
    if (selectedEngineers.length === 0) {
      return emailBody;
    }

    // Get selected engineers data
    const engineersData = ENGINEERS_DATA.filter(eng => selectedEngineers.includes(eng.id));
    
    let engineerContent = "\n\n【ご紹介する技術者一覧】\n";
    engineersData.forEach((eng, index) => {
      engineerContent += `
■ 技術者${index + 1}
氏名：${eng.name}
スキル：${eng.skills.join(', ')}
経験年数：${eng.experience}
稼働可能時期：${eng.availability}
単価：${eng.rate}
言語：${eng.languages.join(', ')}

`;
    });
    
    // Append engineer content to email body
    return emailBody + engineerContent;
  };

  // Handle send email
  const handleSendEmail = () => {
    if (selectedCases.length === 0) {
      toast({
        title: "エラー",
        description: '送信先を選択してください',
        variant: "destructive"
      });
      return;
    }
    
    if (!subject.trim()) {
      toast({
        title: "エラー",
        description: '件名を入力してください',
        variant: "destructive"
      });
      return;
    }
    
    if (!emailBody.trim()) {
      toast({
        title: "エラー",
        description: '本文を入力してください',
        variant: "destructive"
      });
      return;
    }

    // Generate email content with engineers if they're selected
    const finalEmailContent = generateEmailContentWithEngineers();

    // Simulate sending email
    setSending(true);
    
    setTimeout(() => {
      const selectedEmails = mailCases
        .filter(item => selectedCases.includes(item.id))
        .map(item => item.sender);
      
      toast({
        title: "メールが送信されました",
        description: `${selectedEmails.length}件のメールが正常に送信されました${selectedEngineers.length > 0 ? `（${selectedEngineers.length}名の技術者情報を含む）` : ''}`,
        variant: "default"
      });
      
      setSending(false);
      setSelectedCases([]);
      setSelectAll(false);
      setSelectedEngineers([]);
      setEngineersSelectAll(false);
      setSubject('');
      setEmailBody('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">一括メール送信</CardTitle>
          <CardDescription className="japanese-text">
            メール案件の送信者に一括でメールを送信します
          </CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="japanese-text w-full sm:w-[200px]">
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
            
            <Input 
              placeholder="技術キーワードでフィルター" 
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="japanese-text"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cases">
            <TabsList className="mb-4">
              <TabsTrigger value="cases" className="japanese-text">
                <Mail className="mr-2 h-4 w-4" />
                送信先
              </TabsTrigger>
              <TabsTrigger value="engineers" className="japanese-text">
                <Users className="mr-2 h-4 w-4" />
                技術者選択
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="cases">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectAll} 
                          onCheckedChange={handleSelectAll}
                          aria-label="全選択"
                        />
                      </TableHead>
                      <TableHead className="japanese-text">送信者</TableHead>
                      <TableHead className="japanese-text">担当者名</TableHead>
                      <TableHead className="japanese-text">会社</TableHead>
                      <TableHead className="japanese-text">案件名</TableHead>
                      <TableHead className="japanese-text">技術キーワード</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCases.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedCases.includes(item.id)}
                            onCheckedChange={() => handleSelectCase(item.id)}
                            aria-label={`${item.sender}を選択`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{item.sender}</TableCell>
                        <TableCell className="japanese-text">{item.senderName || "-"}</TableCell>
                        <TableCell className="japanese-text">{item.company || "-"}</TableCell>
                        <TableCell className="japanese-text">{item.title}</TableCell>
                        <TableCell className="japanese-text">{item.keyTechnologies || "-"}</TableCell>
                      </TableRow>
                    ))}
                    {paginatedCases.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 japanese-text">
                          フィルター条件に一致するデータが見つかりません
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
              
              <div className="mt-4">
                <div className="japanese-text flex items-center gap-2">
                  <span className="text-sm font-medium">選択中: {selectedCases.length}件</span>
                  {selectedCases.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setSelectedCases([])}>
                      選択をクリア
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="engineers">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Input 
                  placeholder="スキルで検索" 
                  value={engineerFilter}
                  onChange={(e) => setEngineerFilter(e.target.value)}
                  className="japanese-text"
                />
                
                <Select value={engineerStatusFilter} onValueChange={setEngineerStatusFilter}>
                  <SelectTrigger className="japanese-text w-full sm:w-[200px]">
                    <SelectValue placeholder="ステータスでフィルター" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="japanese-text">すべてのステータス</SelectItem>
                    <SelectItem value="待機中" className="japanese-text">待機中</SelectItem>
                    <SelectItem value="稼働中" className="japanese-text">稼働中</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={engineersSelectAll} 
                          onCheckedChange={handleEngineerSelectAll}
                          aria-label="全選択"
                        />
                      </TableHead>
                      <TableHead className="japanese-text">氏名</TableHead>
                      <TableHead className="japanese-text">スキル</TableHead>
                      <TableHead className="japanese-text">経験</TableHead>
                      <TableHead className="japanese-text">稼働可能時期</TableHead>
                      <TableHead className="japanese-text">単価</TableHead>
                      <TableHead className="japanese-text">ステータス</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEngineers.map((engineer) => (
                      <TableRow key={engineer.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedEngineers.includes(engineer.id)}
                            onCheckedChange={() => handleEngineerSelect(engineer.id)}
                            aria-label={`${engineer.name}を選択`}
                          />
                        </TableCell>
                        <TableCell className="font-medium japanese-text">{engineer.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {engineer.skills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="japanese-text text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="japanese-text">{engineer.experience}</TableCell>
                        <TableCell className="japanese-text">{engineer.availability}</TableCell>
                        <TableCell className="japanese-text">{engineer.rate}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={engineer.status === "待機中" ? "secondary" : "outline"}
                            className="japanese-text"
                          >
                            {engineer.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {paginatedEngineers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 japanese-text">
                          フィルター条件に一致するデータが見つかりません
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalEngineerPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setEngineerCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={engineerCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalEngineerPages }).map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 || 
                          pageNumber === totalEngineerPages || 
                          (pageNumber >= engineerCurrentPage - 1 && pageNumber <= engineerCurrentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink 
                                isActive={engineerCurrentPage === pageNumber}
                                onClick={() => setEngineerCurrentPage(pageNumber)}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          pageNumber === engineerCurrentPage - 2 || 
                          pageNumber === engineerCurrentPage + 2
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
                          onClick={() => setEngineerCurrentPage(prev => Math.min(prev + 1, totalEngineerPages))}
                          className={engineerCurrentPage === totalEngineerPages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
              
              <div className="mt-4">
                <div className="japanese-text flex items-center gap-2">
                  <span className="text-sm font-medium">選択中の技術者: {selectedEngineers.length}名</span>
                  {selectedEngineers.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedEngineers([]);
                      setEngineersSelectAll(false);
                    }}>
                      選択をクリア
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-template" className="japanese-text">メールテンプレート</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="テンプレートを選択" />
                </SelectTrigger>
                <SelectContent>
                  {EMAIL_TEMPLATES.map((template) => (
                    <SelectItem key={template.id} value={template.id} className="japanese-text">
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject" className="japanese-text">件名</Label>
              <Input 
                id="subject"
                placeholder="メールの件名"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body" className="japanese-text">本文</Label>
              <Textarea 
                id="body"
                placeholder="メールの本文"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={8}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="signature" className="japanese-text">署名</Label>
                {selectedEngineers.length > 0 && (
                  <span className="text-sm text-muted-foreground japanese-text">
                    {selectedEngineers.length}名の技術者情報が本文に追加されます
                  </span>
                )}
              </div>
              <Textarea 
                id="signature"
                placeholder="メールの署名"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                rows={4}
                className="japanese-text"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-2">
              <Button 
                variant="outline"
                onClick={handleEnhanceEmail}
                disabled={sending || !emailBody.trim()}
                className="japanese-text"
              >
                <Wand2 className="mr-2 h-4 w-4" />
                <span className="japanese-text">AIで改善</span>
              </Button>
              
              <Button 
                disabled={sending || selectedCases.length === 0} 
                onClick={handleSendEmail}
                className="japanese-text"
              >
                {sending ? (
                  <span className="japanese-text">送信中...</span>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    <span className="japanese-text">
                      {selectedCases.length}件のメールを送信
                      {selectedEngineers.length > 0 && ` (${selectedEngineers.length}名の技術者情報を含む)`}
                    </span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailSender;
