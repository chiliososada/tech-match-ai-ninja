
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
import { Mail, Send } from 'lucide-react';

interface EmailSenderProps {
  mailCases: any[];
}

export function EmailSender({ mailCases }: EmailSenderProps) {
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sending, setSending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companyFilter, setCompanyFilter] = useState("all");
  const itemsPerPage = 10;
  
  // 会社のリストを取得
  const companyList = Array.from(new Set(mailCases.filter(item => item.company).map(item => item.company)));
  
  // フィルタリングされた案件を取得
  const filteredCases = mailCases.filter(item => 
    companyFilter === "all" || item.company === companyFilter
  );
  
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
    if (selectedCases.length + 1 === paginatedCases.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
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
          <div className="mt-4">
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="japanese-text w-[200px]">
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
            
            <div className="flex justify-end">
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
