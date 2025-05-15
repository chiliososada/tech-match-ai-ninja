
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
import { Mail, Send, Wand2, Search, UserPlus, User } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EmailSenderProps {
  mailCases: any[];
}

interface Engineer {
  id: string;
  name: string;
  skills: string[];
  experience: string;
  status: string;
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
    subject: "【技術者紹介】案件へのマッチング候補",
    body: `お世話になっております。株式会社テックリクルーターの山田と申します。

先日ご連絡いただいた案件について、条件に合致する技術者を見つけましたのでご紹介させていただきます。

【技術者情報】
・名前：[技術者名]
・スキル：[スキルセット]
・経験年数：[経験年数]
・稼働可能時期：即日〜

技術者のより詳細なプロフィールを添付いたしますので、ご確認いただければ幸いです。
もしご興味がございましたら、面談の日程を調整させていただきます。

ご検討のほど、よろしくお願い申し上げます。`
  },
  {
    id: "custom",
    name: "カスタム",
    subject: "",
    body: ""
  }
];

// サンプルエンジニアデータ
const SAMPLE_ENGINEERS: Engineer[] = [
  {
    id: "e1",
    name: "鈴木 一郎",
    skills: ["Java", "Spring Boot", "AWS"],
    experience: "7年",
    status: "稼働可能"
  },
  {
    id: "e2",
    name: "佐藤 次郎",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "5年",
    status: "稼働可能"
  },
  {
    id: "e3",
    name: "田中 三郎",
    skills: ["Python", "Django", "AWS"],
    experience: "3年",
    status: "稼働中"
  },
  {
    id: "e4",
    name: "高橋 四郎",
    skills: ["PHP", "Laravel", "MySQL"],
    experience: "6年",
    status: "稼働可能"
  },
  {
    id: "e5",
    name: "渡辺 五郎",
    skills: ["C#", ".NET", "Azure"],
    experience: "8年",
    status: "稼働可能"
  },
  {
    id: "e6",
    name: "伊藤 六郎",
    skills: ["Golang", "Docker", "Kubernetes"],
    experience: "4年",
    status: "稼働中"
  },
  {
    id: "e7",
    name: "山本 七郎",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    experience: "3年",
    status: "稼働可能"
  },
  {
    id: "e8",
    name: "中村 八郎",
    skills: ["Swift", "iOS", "React Native"],
    experience: "5年",
    status: "稼働中"
  },
  {
    id: "e9",
    name: "小林 九郎",
    skills: ["Angular", "TypeScript", "MongoDB"],
    experience: "4年",
    status: "稼働可能"
  },
  {
    id: "e10",
    name: "加藤 十郎",
    skills: ["Ruby", "Rails", "PostgreSQL"],
    experience: "6年",
    status: "稼働可能"
  },
  {
    id: "e11",
    name: "吉田 十一郎",
    skills: ["Java", "Android", "Kotlin"],
    experience: "7年",
    status: "稼働中"
  },
  {
    id: "e12",
    name: "山田 十二郎",
    skills: ["React", "Redux", "GraphQL"],
    experience: "4年",
    status: "稼働可能"
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
  
  // エンジニア関連のステート
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [isEngineerDialogOpen, setIsEngineerDialogOpen] = useState(false);
  const [engineerFilter, setEngineerFilter] = useState("");
  const [engineerCurrentPage, setEngineerCurrentPage] = useState(1);
  const [selectedEngineers, setSelectedEngineers] = useState<Engineer[]>([]);
  
  const itemsPerPage = 10;
  const engineerItemsPerPage = 6;
  
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

  // エンジニアのフィルタリング
  const filteredEngineers = SAMPLE_ENGINEERS.filter(engineer => {
    const searchTerm = engineerFilter.toLowerCase();
    return (
      engineer.name.toLowerCase().includes(searchTerm) ||
      engineer.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
  });

  // エンジニアのページネーション
  const paginatedEngineers = filteredEngineers.slice(
    (engineerCurrentPage - 1) * engineerItemsPerPage,
    engineerCurrentPage * engineerItemsPerPage
  );

  const totalEngineerPages = Math.ceil(filteredEngineers.length / engineerItemsPerPage);

  // Handle selectAll checkbox change
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
        description: "メール本文を入力してください",
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
        title: "成功",
        description: "メール内容が改善されました",
      });
    }, 1500);
  };

  // エンジニア検索ダイアログを開く
  const openEngineerDialog = () => {
    setIsEngineerDialogOpen(true);
    setEngineerCurrentPage(1);
    setEngineerFilter("");
  };

  // エンジニアを選択する
  const toggleEngineerSelection = (engineer: Engineer) => {
    setSelectedEngineers(prev => {
      const isSelected = prev.some(e => e.id === engineer.id);
      if (isSelected) {
        return prev.filter(e => e.id !== engineer.id);
      } else {
        return [...prev, engineer];
      }
    });
  };

  // 選択エンジニアの削除
  const removeSelectedEngineer = (engineerId: string) => {
    setSelectedEngineers(prev => prev.filter(e => e.id !== engineerId));
  };

  // 選択したエンジニアをテンプレートに反映
  const applyEngineerToTemplate = () => {
    if (selectedEngineers.length === 0 || selectedCases.length === 0) return;
    
    // エンジニア紹介テンプレートに切り替え
    setSelectedTemplate("engineer-intro");
    const template = EMAIL_TEMPLATES.find(t => t.id === "engineer-intro");
    
    if (template && selectedEngineers.length > 0) {
      const engineer = selectedEngineers[0];
      let newSubject = template.subject;
      let newBody = template.body
        .replace("[技術者名]", engineer.name)
        .replace("[スキルセット]", engineer.skills.join(", "))
        .replace("[経験年数]", engineer.experience);
      
      // 複数のエンジニアの場合、本文に追加情報を入れる
      if (selectedEngineers.length > 1) {
        newSubject = `【技術者紹介】案件へのマッチング候補（${selectedEngineers.length}名）`;
        newBody += "\n\n他にも以下の技術者がマッチングしております：\n";
        
        selectedEngineers.slice(1).forEach((eng, index) => {
          newBody += `\n${index + 2}. ${eng.name}（${eng.skills.join(", ")}、経験：${eng.experience}）`;
        });
      }
      
      setSubject(newSubject);
      setEmailBody(newBody);
    }
  };

  // Handle send email
  const handleSendEmail = () => {
    if (selectedCases.length === 0) {
      toast({
        title: "エラー",
        description: "送信先を選択してください",
        variant: "destructive"
      });
      return;
    }
    
    if (!subject.trim()) {
      toast({
        title: "エラー",
        description: "件名を入力してください",
        variant: "destructive"
      });
      return;
    }
    
    if (!emailBody.trim()) {
      toast({
        title: "エラー",
        description: "本文を入力してください",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending email
    setSending(true);
    
    setTimeout(() => {
      const selectedEmails = mailCases
        .filter(item => selectedCases.includes(item.id))
        .map(item => item.sender);
      
      toast({
        title: "成功",
        description: `${selectedEmails.length}件のメールが正常に送信されました`,
      });
      
      setSending(false);
      setSelectedCases([]);
      setSelectAll(false);
      setSubject('');
      setEmailBody('');
      setSelectedEngineers([]);
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
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* メール設定部分 - 左カラム（2/3幅） */}
            <div className="lg:col-span-2 space-y-4">
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
                <Label htmlFor="signature" className="japanese-text">署名</Label>
                <Textarea 
                  id="signature"
                  placeholder="メールの署名"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  rows={4}
                  className="japanese-text"
                />
              </div>
            </div>

            {/* 技術者選択部分 - 右カラム（1/3幅） */}
            <div className="space-y-4">
              <div className="flex flex-row justify-between items-center">
                <Label className="japanese-text text-lg font-medium">技術者を選択</Label>
                <Button 
                  onClick={openEngineerDialog} 
                  variant="outline" 
                  size="sm" 
                  className="japanese-text"
                >
                  <Search className="mr-2 h-4 w-4" />
                  技術者を検索
                </Button>
              </div>

              {selectedEngineers.length > 0 ? (
                <div className="border rounded-md p-4 space-y-3">
                  {selectedEngineers.map(engineer => (
                    <div 
                      key={engineer.id} 
                      className="flex justify-between items-center bg-muted/50 p-2 rounded-md"
                    >
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium japanese-text">{engineer.name}</p>
                          <p className="text-xs text-muted-foreground japanese-text">
                            {engineer.skills.join(", ")} | {engineer.experience}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSelectedEngineer(engineer.id)}
                        className="h-8 w-8 p-0"
                      >
                        &times;
                      </Button>
                    </div>
                  ))}

                  <Button 
                    onClick={applyEngineerToTemplate} 
                    className="w-full japanese-text mt-2"
                    variant="secondary"
                    disabled={selectedCases.length === 0}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    選択した技術者を本文に反映
                  </Button>
                </div>
              ) : (
                <div className="border rounded-md p-4 flex flex-col items-center justify-center h-[200px] text-center">
                  <User className="h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                  <p className="text-muted-foreground japanese-text">技術者が選択されていません</p>
                  <p className="text-xs text-muted-foreground japanese-text mt-1">
                    「技術者を検索」ボタンをクリックして技術者を選択してください
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-4">
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
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技術者検索ダイアログ */}
      <Dialog open={isEngineerDialogOpen} onOpenChange={setIsEngineerDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="japanese-text">技術者を検索して選択</DialogTitle>
            <DialogDescription className="japanese-text">
              案件に紹介する技術者を検索して選択してください
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="名前やスキルで検索" 
                value={engineerFilter}
                onChange={(e) => setEngineerFilter(e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              {paginatedEngineers.map(engineer => {
                const isSelected = selectedEngineers.some(e => e.id === engineer.id);
                
                return (
                  <div 
                    key={engineer.id}
                    onClick={() => toggleEngineerSelection(engineer)}
                    className={`p-3 rounded-md flex items-center justify-between cursor-pointer border 
                      ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
                  >
                    <div className="space-y-1">
                      <p className="font-medium japanese-text">{engineer.name}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="japanese-text mr-2">スキル:</span>
                        <span className="japanese-text">{engineer.skills.join(", ")}</span>
                      </div>
                      <div className="flex items-center text-xs">
                        <span className="japanese-text mr-2">経験:</span>
                        <span className="japanese-text">{engineer.experience}</span>
                        <span className="mx-2">|</span>
                        <span className={`japanese-text px-2 py-0.5 rounded-full text-xs 
                          ${engineer.status === "稼働可能" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                          {engineer.status}
                        </span>
                      </div>
                    </div>
                    
                    <Checkbox 
                      checked={isSelected}
                      className="pointer-events-none"
                    />
                  </div>
                );
              })}
              
              {filteredEngineers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground japanese-text">検索条件に一致する技術者がいません</p>
                </div>
              )}
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
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => setIsEngineerDialogOpen(false)}
                className="japanese-text"
              >
                キャンセル
              </Button>
              <Button 
                onClick={() => setIsEngineerDialogOpen(false)}
                className="japanese-text"
              >
                {selectedEngineers.length}名の技術者を選択
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EmailSender;
