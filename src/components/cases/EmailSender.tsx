
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

import { 
  EmailSenderProps, 
  Engineer, 
  EMAIL_TEMPLATES, 
  SAMPLE_ENGINEERS,
  DEFAULT_SIGNATURE
} from './email/types';
import { CasesList } from './email/CasesList';
import { EmailForm } from './email/EmailForm';
import { EngineerSelection } from './email/EngineerSelection';
import { EngineerSearchDialog } from './email/EngineerSearchDialog';

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
          <CasesList
            paginatedCases={paginatedCases}
            selectedCases={selectedCases}
            handleSelectCase={handleSelectCase}
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* メール設定部分 - 左カラム（2/3幅） */}
            <div className="lg:col-span-2">
              <EmailForm
                emailTemplates={EMAIL_TEMPLATES}
                selectedTemplate={selectedTemplate}
                handleTemplateChange={handleTemplateChange}
                subject={subject}
                setSubject={setSubject}
                emailBody={emailBody}
                setEmailBody={setEmailBody}
                signature={signature}
                setSignature={setSignature}
                handleEnhanceEmail={handleEnhanceEmail}
                handleSendEmail={handleSendEmail}
                sending={sending}
                selectedCasesCount={selectedCases.length}
              />
            </div>

            {/* 技術者選択部分 - 右カラム（1/3幅） */}
            <div>
              <EngineerSelection 
                selectedEngineers={selectedEngineers}
                openEngineerDialog={openEngineerDialog}
                removeSelectedEngineer={removeSelectedEngineer}
                applyEngineerToTemplate={applyEngineerToTemplate}
                selectedCasesLength={selectedCases.length}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 技術者検索ダイアログ */}
      <EngineerSearchDialog 
        isOpen={isEngineerDialogOpen}
        setIsOpen={setIsEngineerDialogOpen}
        paginatedEngineers={paginatedEngineers}
        selectedEngineers={selectedEngineers}
        toggleEngineerSelection={toggleEngineerSelection}
        engineerFilter={engineerFilter}
        setEngineerFilter={setEngineerFilter}
        engineerCurrentPage={engineerCurrentPage}
        setEngineerCurrentPage={setEngineerCurrentPage}
        totalEngineerPages={totalEngineerPages}
        filteredEngineersLength={filteredEngineers.length}
      />
    </div>
  );
}

export default EmailSender;
