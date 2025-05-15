
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
import { Mail, Send, Wand2, FileText, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface CandidateEmailSenderProps {
  candidateCompanies: any[];
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
    subject: "【ご挨拶】案件のご案内",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

貴社の技術者の方々に最適な案件をご紹介できればと思い、ご連絡いたしました。
弊社では、多数の企業様から[技術領域]に関する案件を頂いており、短期・中期・長期のプロジェクトをご用意しております。

現在、特に以下のスキルに関する案件の依頼が多くなっております：
- Java, Spring Boot
- React, TypeScript
- AWS, Docker, Kubernetes

ご興味がございましたら、ぜひ一度お話させていただければ幸いです。
お忙しいところ恐縮ですが、ご検討のほど、よろしくお願い申し上げます。`
  },
  {
    id: "case-intro",
    name: "案件紹介",
    subject: "【案件紹介】新規案件のご案内",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

貴社の技術者様に最適と思われる案件が入りましたので、ご連絡いたしました。

【案件概要】
・案件名：[案件名]
・スキル要件：[スキル]
・場所：[場所]
・単価：[単価]
・開始時期：[開始時期]
・期間：[期間]

詳細な案件情報を添付いたしますので、ご確認いただければ幸いです。
技術者様のご意向をお伺いできましたら幸いです。`
  },
  {
    id: "follow-up",
    name: "フォローアップ",
    subject: "【フォローアップ】先日ご紹介した案件について",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

先日ご紹介した案件についてお返事頂けますと幸いです。
もし追加の情報が必要でしたら、お気軽にお申し付けください。

【前回ご紹介した案件】
・案件名：[案件名]
・スキル要件：[スキル]
・場所：[場所]

ご検討よろしくお願い申し上げます。`
  },
  {
    id: "custom",
    name: "カスタム",
    subject: "",
    body: ""
  }
];

// サンプル案件データ
const CASES_DATA = [
  {
    id: "c1",
    title: "Java開発エンジニア",
    skills: ["Java", "Spring Boot", "SQL"],
    location: "東京（リモート可）",
    budget: "60~80万円",
    duration: "6ヶ月～",
    startDate: "即日",
    status: "募集中"
  },
  {
    id: "c2",
    title: "フロントエンドエンジニア",
    skills: ["React", "TypeScript", "Next.js"],
    location: "大阪",
    budget: "55~70万円",
    duration: "3ヶ月～",
    startDate: "1週間後～",
    status: "募集中"
  },
  {
    id: "c3",
    title: "インフラエンジニア",
    skills: ["AWS", "Docker", "Kubernetes"],
    location: "名古屋",
    budget: "65~90万円",
    duration: "12ヶ月～",
    startDate: "即日",
    status: "募集中"
  },
  {
    id: "c4",
    title: "QAエンジニア",
    skills: ["テスト自動化", "Selenium"],
    location: "リモート",
    budget: "50~65万円",
    duration: "3ヶ月～",
    startDate: "2週間後～",
    status: "募集中"
  },
  {
    id: "c5",
    title: "PHP開発エンジニア",
    skills: ["PHP", "Laravel", "MySQL"],
    location: "東京",
    budget: "55~75万円",
    duration: "6ヶ月～",
    startDate: "即日",
    status: "募集中"
  },
  {
    id: "c6",
    title: "Android開発エンジニア",
    skills: ["Kotlin", "Java", "Android SDK"],
    location: "福岡",
    budget: "60~75万円",
    duration: "3ヶ月～",
    startDate: "1週間後～",
    status: "募集中"
  },
  {
    id: "c7",
    title: "データサイエンティスト",
    skills: ["Python", "R", "機械学習"],
    location: "東京",
    budget: "70~90万円",
    duration: "6ヶ月～",
    startDate: "即日",
    status: "募集中"
  },
  {
    id: "c8",
    title: "セキュリティエンジニア",
    skills: ["ネットワークセキュリティ", "CISSP"],
    location: "大阪",
    budget: "65~85万円",
    duration: "12ヶ月～",
    startDate: "2週間後～",
    status: "募集中"
  }
];

// サンプル企業データ (実際にはpropsから渡される)
const SAMPLE_COMPANIES = [
  {
    id: "comp1",
    name: "テクノソリューション株式会社",
    contactName: "田中 一郎",
    email: "tanaka@technosolution.co.jp",
    engineerCount: 12,
    lastContact: "2025-05-10",
    specialties: ["Java", "AWS", "React"]
  },
  {
    id: "comp2",
    name: "デジタルクリエイト株式会社",
    contactName: "佐藤 二郎",
    email: "sato@digitalcreate.co.jp",
    engineerCount: 8,
    lastContact: "2025-05-08",
    specialties: ["PHP", "Laravel", "Vue.js"]
  },
  {
    id: "comp3",
    name: "アイシステム株式会社",
    contactName: "鈴木 三郎",
    email: "suzuki@isystems.jp",
    engineerCount: 15,
    lastContact: "2025-05-12",
    specialties: ["C#", ".NET", "Angular"]
  },
  {
    id: "comp4",
    name: "フューチャーテック株式会社",
    contactName: "高橋 四郎",
    email: "takahashi@futuretech.co.jp",
    engineerCount: 6,
    lastContact: "2025-05-05",
    specialties: ["Python", "Django", "React"]
  },
  {
    id: "comp5",
    name: "ウェブソリューション株式会社",
    contactName: "伊藤 五郎",
    email: "ito@websolution.jp",
    engineerCount: 10,
    lastContact: "2025-05-09",
    specialties: ["JavaScript", "Node.js", "React"]
  }
];

export function CandidateEmailSender({ candidateCompanies = SAMPLE_COMPANIES }: CandidateEmailSenderProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companyFilter, setCompanyFilter] = useState("");
  const [techFilter, setTechFilter] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("custom");
  const [signature, setSignature] = useState(DEFAULT_SIGNATURE);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [casesSelectAll, setCasesSelectAll] = useState(false);
  const [caseCurrentPage, setCaseCurrentPage] = useState(1);
  const [caseFilter, setCaseFilter] = useState("");
  
  const itemsPerPage = 5;
  
  // フィルタリングされた企業を取得
  const filteredCompanies = candidateCompanies.filter(company => {
    const matchesName = companyFilter === "" || 
                       company.name.toLowerCase().includes(companyFilter.toLowerCase());
    const matchesTech = techFilter === "" || 
                       (company.specialties && company.specialties.some(tech => 
                         tech.toLowerCase().includes(techFilter.toLowerCase())));
    return matchesName && matchesTech;
  });
  
  // ページネーションで表示する企業
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  // フィルタリングされた案件を取得
  const filteredCases = CASES_DATA.filter(caseItem => {
    // スキルフィルター
    const matchesSkill = caseFilter === "" || 
                         caseItem.skills.some(skill => 
                           skill.toLowerCase().includes(caseFilter.toLowerCase())) ||
                         caseItem.title.toLowerCase().includes(caseFilter.toLowerCase());
    
    return matchesSkill;
  });
  
  // ページネーションで表示する案件
  const paginatedCases = filteredCases.slice(
    (caseCurrentPage - 1) * itemsPerPage,
    caseCurrentPage * itemsPerPage
  );
  
  const totalCasePages = Math.ceil(filteredCases.length / itemsPerPage);

  // Handle selectAll checkbox change for companies
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(paginatedCompanies.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual company checkbox change
  const handleSelectCompany = (id: string) => {
    setSelectedCompanies(prev => 
      prev.includes(id) 
        ? prev.filter(compId => compId !== id) 
        : [...prev, id]
    );
    
    // Update selectAll state
    if (selectedCompanies.length + 1 === paginatedCompanies.length && !selectedCompanies.includes(id)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };
  
  // Handle selectAll checkbox change for cases
  const handleCaseSelectAll = () => {
    if (casesSelectAll) {
      setSelectedCases([]);
    } else {
      setSelectedCases(paginatedCases.map(item => item.id));
    }
    setCasesSelectAll(!casesSelectAll);
  };

  // Handle individual case checkbox change
  const handleCaseSelect = (id: string) => {
    setSelectedCases(prev => 
      prev.includes(id) 
        ? prev.filter(caseId => caseId !== id) 
        : [...prev, id]
    );
    
    // Update selectAll state
    if (selectedCases.length + 1 === paginatedCases.length && !selectedCases.includes(id)) {
      setCasesSelectAll(true);
    } else {
      setCasesSelectAll(false);
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
        variant: "success"
      });
    }, 1500);
  };

  // Generate email content with selected cases
  const generateEmailContentWithCases = () => {
    // Basic validation
    if (!emailBody.trim()) {
      return emailBody;
    }

    // If no cases selected, return original content
    if (selectedCases.length === 0) {
      return emailBody;
    }

    // Get selected cases data
    const casesData = CASES_DATA.filter(c => selectedCases.includes(c.id));
    
    let caseContent = "\n\n【ご紹介する案件一覧】\n";
    casesData.forEach((caseItem, index) => {
      caseContent += `
■ 案件${index + 1}
案件名：${caseItem.title}
必要スキル：${caseItem.skills.join(', ')}
勤務地：${caseItem.location}
単価：${caseItem.budget}
期間：${caseItem.duration}
開始時期：${caseItem.startDate}

`;
    });
    
    // Append case content to email body
    return emailBody + caseContent;
  };

  // Handle send email
  const handleSendEmail = () => {
    if (selectedCompanies.length === 0) {
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

    // Generate email content with cases if they're selected
    const finalEmailContent = generateEmailContentWithCases();

    // Simulate sending email
    setSending(true);
    
    setTimeout(() => {
      const selectedEmails = candidateCompanies
        .filter(company => selectedCompanies.includes(company.id))
        .map(company => company.email);
      
      toast({
        title: "メールが送信されました",
        description: `${selectedEmails.length}件のメールが正常に送信されました${selectedCases.length > 0 ? `（${selectedCases.length}件の案件情報を含む）` : ''}`,
        variant: "default"
      });
      
      setSending(false);
      setSelectedCompanies([]);
      setSelectAll(false);
      setSelectedCases([]);
      setCasesSelectAll(false);
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
            人材を保有する企業に対して案件を紹介するメールを一括で送信します
          </CardDescription>
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Input 
              placeholder="会社名でフィルター" 
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="japanese-text"
            />
            
            <Input 
              placeholder="技術スキルでフィルター" 
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="japanese-text"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="companies">
            <TabsList className="mb-4">
              <TabsTrigger value="companies" className="japanese-text">
                <Mail className="mr-2 h-4 w-4" />
                送信先企業
              </TabsTrigger>
              <TabsTrigger value="cases" className="japanese-text">
                <FileText className="mr-2 h-4 w-4" />
                案件選択
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="companies">
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
                      <TableHead className="japanese-text">会社名</TableHead>
                      <TableHead className="japanese-text">担当者名</TableHead>
                      <TableHead className="japanese-text">メールアドレス</TableHead>
                      <TableHead className="japanese-text">技術者数</TableHead>
                      <TableHead className="japanese-text">得意分野</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedCompanies.includes(company.id)}
                            onCheckedChange={() => handleSelectCompany(company.id)}
                            aria-label={`${company.name}を選択`}
                          />
                        </TableCell>
                        <TableCell className="font-medium japanese-text">{company.name}</TableCell>
                        <TableCell className="japanese-text">{company.contactName || "-"}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell className="text-center">{company.engineerCount}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {company.specialties.map((skill, i) => (
                              <Badge key={i} variant="outline" className="japanese-text text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {paginatedCompanies.length === 0 && (
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
                  <span className="text-sm font-medium">選択中: {selectedCompanies.length}社</span>
                  {selectedCompanies.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setSelectedCompanies([])}>
                      選択をクリア
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cases">
              <div className="mb-4">
                <Input 
                  placeholder="案件名やスキルで検索" 
                  value={caseFilter}
                  onChange={(e) => setCaseFilter(e.target.value)}
                  className="japanese-text"
                />
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={casesSelectAll} 
                          onCheckedChange={handleCaseSelectAll}
                          aria-label="全選択"
                        />
                      </TableHead>
                      <TableHead className="japanese-text">案件名</TableHead>
                      <TableHead className="japanese-text">スキル</TableHead>
                      <TableHead className="japanese-text">勤務地</TableHead>
                      <TableHead className="japanese-text">単価</TableHead>
                      <TableHead className="japanese-text">開始時期</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedCases.map((caseItem) => (
                      <TableRow key={caseItem.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedCases.includes(caseItem.id)}
                            onCheckedChange={() => handleCaseSelect(caseItem.id)}
                            aria-label={`${caseItem.title}を選択`}
                          />
                        </TableCell>
                        <TableCell className="font-medium japanese-text">{caseItem.title}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {caseItem.skills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="japanese-text text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="japanese-text">{caseItem.location}</TableCell>
                        <TableCell className="japanese-text">{caseItem.budget}</TableCell>
                        <TableCell className="japanese-text">{caseItem.startDate}</TableCell>
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
              
              {totalCasePages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCaseCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={caseCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalCasePages }).map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 || 
                          pageNumber === totalCasePages || 
                          (pageNumber >= caseCurrentPage - 1 && pageNumber <= caseCurrentPage + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink 
                                isActive={caseCurrentPage === pageNumber}
                                onClick={() => setCaseCurrentPage(pageNumber)}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          pageNumber === caseCurrentPage - 2 || 
                          pageNumber === caseCurrentPage + 2
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
                          onClick={() => setCaseCurrentPage(prev => Math.min(prev + 1, totalCasePages))}
                          className={caseCurrentPage === totalCasePages ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
              
              <div className="mt-4">
                <div className="japanese-text flex items-center gap-2">
                  <span className="text-sm font-medium">選択中の案件: {selectedCases.length}件</span>
                  {selectedCases.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedCases([]);
                      setCasesSelectAll(false);
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
                {selectedCases.length > 0 && (
                  <span className="text-sm text-muted-foreground japanese-text">
                    {selectedCases.length}件の案件情報が本文に追加されます
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
                disabled={sending || selectedCompanies.length === 0} 
                onClick={handleSendEmail}
                className="japanese-text"
              >
                {sending ? (
                  <span className="japanese-text">送信中...</span>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    <span className="japanese-text">
                      {selectedCompanies.length}社にメールを送信
                      {selectedCases.length > 0 && ` (${selectedCases.length}件の案件情報を含む)`}
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

export default CandidateEmailSender;
