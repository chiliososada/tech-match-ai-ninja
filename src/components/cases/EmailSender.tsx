
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
import { toast } from 'sonner';
import { Mail, Send, Wand2 } from 'lucide-react';

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
    id: "custom",
    name: "カスタム",
    subject: "",
    body: ""
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
  
  const itemsPerPage = 10;
  
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
      toast.error('メール本文を入力してください');
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
      toast.success('メール内容が改善されました');
    }, 1500);
  };

  // Handle send email
  const handleSendEmail = () => {
    if (selectedCases.length === 0) {
      toast.error('送信先を選択してください');
      return;
    }
    
    if (!subject.trim()) {
      toast.error('件名を入力してください');
      return;
    }
    
    if (!emailBody.trim()) {
      toast.error('本文を入力してください');
      return;
    }

    // Simulate sending email
    setSending(true);
    
    setTimeout(() => {
      const selectedEmails = mailCases
        .filter(item => selectedCases.includes(item.id))
        .map(item => item.sender);
      
      toast.success('メールが送信されました', {
        description: `${selectedEmails.length}件のメールが正常に送信されました`
      });
      
      setSending(false);
      setSelectedCases([]);
      setSelectAll(false);
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
