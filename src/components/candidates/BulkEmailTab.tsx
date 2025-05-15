import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Check, Send, ListChecks, Building, FileDown, Wand2 } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from 'sonner';

// 会社と件数のサンプルデータ
const companiesData = [
  { id: '1', name: 'テックイノベーション株式会社', count: 3, email: 'contact@techinnovation.co.jp', lastSent: '2024-04-05' },
  { id: '2', name: 'フロントエンドパートナーズ株式会社', count: 1, email: 'info@frontend-partners.co.jp', lastSent: '2024-03-20' },
  { id: '3', name: 'クラウドシステムズ株式会社', count: 1, email: 'info@cloud-systems.co.jp', lastSent: '2024-05-01' },
  { id: '4', name: 'ウェブソリューションズ株式会社', count: 1, email: 'contact@web-solutions.co.jp', lastSent: '2024-04-15' },
];

// 案件のサンプルデータ
const casesData = [
  { 
    id: '1',
    title: '大手銀行向け業務システム開発',
    requiredSkills: ['Java', 'Spring Boot', 'Oracle'],
    location: '東京都千代田区',
    budget: '70万円〜90万円',
    workType: 'オンサイト',
    startDate: '即日',
    deadline: '2024-05-31',
    description: '大手銀行グループの業務システム開発案件です。Java、Spring Bootを用いたバックエンド開発の経験者を募集しています。金融システムの開発経験があれば尚可です。',
  },
  {
    id: '2',
    title: 'ECサイトフロントエンド開発',
    requiredSkills: ['React', 'TypeScript', 'Next.js'],
    location: '大阪府大阪市',
    budget: '60万円〜75万円',
    workType: 'リモート',
    startDate: '1ヶ月後',
    deadline: '2024-06-15',
    description: '大規模ECサイトのフロントエンド開発案件です。React、TypeScript、Next.jsを使用した開発経験者を募集しています。パフォーマンス最適化の経験があれば尚可です。',
  },
  {
    id: '3',
    title: 'AIチャットボット開発',
    requiredSkills: ['Python', 'Django', 'TensorFlow'],
    location: '東京都渋谷区',
    budget: '65万円〜85万円',
    workType: 'ハイブリッド',
    startDate: '即日',
    deadline: '2024-05-25',
    description: 'AIを活用したチャットボットの開発案件です。Python、Django、TensorFlowの経験者を募集しています。自然言語処理の経験があれば尚可です。',
  },
  {
    id: '4',
    title: 'クラウドインフラ構築',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes'],
    location: '東京都港区',
    budget: '70万円〜90万円',
    workType: 'リモート',
    startDate: '即日',
    deadline: '2024-06-10',
    description: 'クラウドインフラの構築と運用案件です。AWS、Docker、Kubernetesの経験者を募集しています。マイクロサービスアーキテクチャの経験があれば尚可です。',
  },
  {
    id: '5',
    title: 'モバイルアプリ開発',
    requiredSkills: ['Swift', 'Kotlin', 'Firebase'],
    location: '東京都新宿区',
    budget: '60万円〜80万円',
    workType: 'オンサイト',
    startDate: '1ヶ月後',
    deadline: '2024-06-30',
    description: 'iOS/Androidのモバイルアプリ開発案件です。Swift、Kotlin、Firebaseの経験者を募集しています。UIデザインの知識があれば尚可です。',
  }
];

// サンプルテキスト
const sampleTemplates = [
  { 
    id: 'intro',
    name: '案件紹介',
    text: `お世話になっております。

新規案件情報のご案内をさせていただきます。

【案件名】大手銀行向け業務システム開発
【必要スキル】Java、Spring Boot、Oracle
【勤務地】東京都千代田区
【単価】70万円〜90万円
【勤務形態】オンサイト
【開始時期】即日
【応募締切】2024-05-31

御社の技術者様で、上記案件にご興味がありそうな方がいらっしゃいましたら、ぜひご連絡ください。
詳細な条件のすり合わせや面談の調整などさせていただきます。

ご検討のほど、よろしくお願い申し上げます。`
  },
  {
    id: 'follow',
    name: 'フォローアップ',
    text: `お世話になっております。

先日ご案内した案件についてフォローアップのご連絡をさせていただきます。

現在、クライアント企業様より早急に人材を確保したいとのご要望をいただいております。
もしご興味をお持ちいただける技術者様がいらっしゃいましたら、お早めにご連絡いただけますと幸いです。

何かご質問等ございましたら、お気軽にお問い合わせください。

今後ともよろしくお願い申し上げます。`
  },
  {
    id: 'thanks',
    name: 'お礼',
    text: `お世話になっております。

この度は技術者様のご紹介をいただき、誠にありがとうございました。
おかげさまで、クライアント企業様にもご満足いただけるマッチングができました。

今後とも良い関係を続けていけますよう、よろしくお願い申し上げます。`
  }
];

// デフォルト署名
const defaultSignature = `------------------------------
株式会社テックリクルーター
採用担当：山田 太郎
電話番号：03-1234-5678
メール：contact@techrecruiter.co.jp
------------------------------`;

export function BulkEmailTab() {
  // 状態管理
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSelectCaseOpen, setIsSelectCaseOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [emailTemplate, setEmailTemplate] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewCompany, setPreviewCompany] = useState<any>(null);
  const [signature, setSignature] = useState(defaultSignature);
  const [sampleTemplate, setSampleTemplate] = useState("");
  const [enhancingEmail, setEnhancingEmail] = useState(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  // ページネーションで表示する企業
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ヘルパー関数：前のページへ移動
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ヘルパー関数：次のページへ移動
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 検索クエリが変更されたときの処理
  useEffect(() => {
    const filtered = companiesData.filter(company => 
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  }, [searchQuery]);

  // 企業の選択状態を切り替える
  const toggleCompanySelection = (companyId: string) => {
    setSelectedCompanies(prev => {
      if (prev.includes(companyId)) {
        return prev.filter(id => id !== companyId);
      } else {
        return [...prev, companyId];
      }
    });
  };

  // すべての企業を選択/解除する
  const toggleAllCompanies = () => {
    if (selectedCompanies.length === filteredCompanies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(filteredCompanies.map(company => company.id));
    }
  };

  // 案件を選択して詳細を表示
  const handleSelectCase = (caseData: any) => {
    setSelectedCase(caseData);
    
    // 案件情報からメールテンプレートを自動生成
    const template = `お世話になっております。

新規案件情報のご案内をさせていただきます。

【案件名】${caseData.title}
【必要スキル】${caseData.requiredSkills.join('、')}
【勤務地】${caseData.location}
【単価】${caseData.budget}
【勤務形態】${caseData.workType}
【開始時期】${caseData.startDate}
【応募締切】${caseData.deadline}

【案件概要】
${caseData.description}

御社の技術者様で、上記案件にご興味がありそうな方がいらっしゃいましたら、ぜひご連絡ください。
詳細な条件のすり合わせや面談の調整などさせていただきます。

ご検討のほど、よろしくお願い申し上げます。`;

    setEmailTemplate(template);
    setEmailSubject(`【新規案件情報】${caseData.title} | テックリクルーターAI`);
    setIsSelectCaseOpen(false);
  };

  // サンプルテンプレートの適用
  const handleApplySample = (templateId: string) => {
    const template = sampleTemplates.find(t => t.id === templateId);
    if (template) {
      setEmailTemplate(template.text);
      toast.success(`「${template.name}」テンプレートを適用しました`);
    }
  };

  // AI による本文の美化
  const handleEnhanceEmail = () => {
    if (!emailTemplate.trim()) {
      toast.error('メール本文を入力してください');
      return;
    }
    
    setEnhancingEmail(true);
    
    // 実際のアプリケーションではAI APIを呼び出す
    // ここではタイムアウトでシミュレーション
    setTimeout(() => {
      const enhancedText = `${emailTemplate.trim()}

${!emailTemplate.includes('よろしくお願い申し上げます') ? 
  '\n何かご不明な点がございましたら、お気軽にお問い合わせください。\n\nご検討のほど、よろしくお願い申し上げます。' : ''}`;
      
      setEmailTemplate(enhancedText);
      setEnhancingEmail(false);
      toast.success('AI によるメール本文の改善が完了しました');
    }, 1500);
  };

  // メール送信プレビュー表示
  const handleShowPreview = (company: any) => {
    setPreviewCompany(company);
    setPreviewDialogOpen(true);
  };

  // メール送信処理
  const handleSendEmails = () => {
    if (!selectedCase) {
      toast.error('案件を選択してください');
      return;
    }

    if (selectedCompanies.length === 0) {
      toast.error('送信先企業を選択してください');
      return;
    }

    if (!emailTemplate.trim()) {
      toast.error('メール本文を入力してください');
      return;
    }

    if (!signature.trim()) {
      toast.error('署名を入力してください');
      return;
    }

    // メール送信処理（実際のアプリケーションではAPIコールなど）
    toast.success(`${selectedCompanies.length}社に案件情報のメールを送信しました`, {
      description: `案件「${selectedCase.title}」の情報が送信されました`
    });

    // 選択状態をリセット
    setSelectedCompanies([]);
    setSelectedCase(null);
    setEmailTemplate('');
    setEmailSubject('');
  };

  return (
    <div className="space-y-6">
      {/* 案件選択エリア */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="japanese-text">案件選択</CardTitle>
          <CardDescription className="japanese-text">
            人材紹介先企業に送信する案件情報を選択します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedCase ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium japanese-text">{selectedCase.title}</h3>
                  <Button variant="outline" onClick={() => setIsSelectCaseOpen(true)} className="japanese-text">
                    <ListChecks className="h-4 w-4 mr-2" />
                    案件を変更
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-sm font-medium japanese-text">必要スキル</h4>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {selectedCase.requiredSkills.map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary" className="japanese-text">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">勤務地</h4>
                    <p className="mt-1 text-sm japanese-text">{selectedCase.location}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">単価</h4>
                    <p className="mt-1 text-sm japanese-text">{selectedCase.budget}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">勤務形態</h4>
                    <p className="mt-1 text-sm japanese-text">{selectedCase.workType}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">開始時期</h4>
                    <p className="mt-1 text-sm japanese-text">{selectedCase.startDate}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">応募締切</h4>
                    <p className="mt-1 text-sm japanese-text">{selectedCase.deadline}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium japanese-text">案件概要</h4>
                  <p className="mt-1 text-sm japanese-text whitespace-pre-wrap">{selectedCase.description}</p>
                </div>
              </div>
            ) : (
              <Button onClick={() => setIsSelectCaseOpen(true)} className="w-full japanese-text">
                <ListChecks className="h-4 w-4 mr-2" />
                案件を選択
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* 送信先企業リスト */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="japanese-text">送信先企業</CardTitle>
              <CardDescription className="japanese-text">
                候補者を保有する企業一覧（選択した企業に案件情報をメール送信します）
              </CardDescription>
            </div>
            {selectedCompanies.length > 0 && (
              <div className="flex items-center">
                <span className="mr-2 text-sm japanese-text">{selectedCompanies.length}社を選択中</span>
                <Button 
                  disabled={!selectedCase} 
                  onClick={handleSendEmails} 
                  size="sm"
                  className="japanese-text"
                >
                  <Send className="h-4 w-4 mr-2" />
                  メール送信
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* 検索フィールド */}
            <div>
              <div className="flex items-center border-b px-3 rounded-md border">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Input
                  placeholder="企業名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="japanese-text w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            
            {/* 企業リスト */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox 
                        checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                        onCheckedChange={toggleAllCompanies} 
                        aria-label="全て選択"
                      />
                    </TableHead>
                    <TableHead className="japanese-text">企業名</TableHead>
                    <TableHead className="japanese-text">保有技術者数</TableHead>
                    <TableHead className="japanese-text">メールアドレス</TableHead>
                    <TableHead className="japanese-text">最終送信日</TableHead>
                    <TableHead className="japanese-text">アクション</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCompanies.length > 0 ? (
                    paginatedCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedCompanies.includes(company.id)}
                            onCheckedChange={() => toggleCompanySelection(company.id)}
                            aria-label={`${company.name}を選択`}
                          />
                        </TableCell>
                        <TableCell className="japanese-text font-medium">{company.name}</TableCell>
                        <TableCell>{company.count}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell className="japanese-text">{company.lastSent || '-'}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleShowPreview(company)} 
                            disabled={!selectedCase}
                            title="プレビュー"
                          >
                            <FileDown className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center japanese-text">
                        該当する企業が見つかりません
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={goToPrevPage}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
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
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={goToNextPage}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* メール編集エリア */}
      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">メール内容設定</CardTitle>
          <CardDescription className="japanese-text">
            送信するメールの内容を確認・編集します
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-subject" className="japanese-text">件名</Label>
            <Input 
              id="email-subject" 
              value={emailSubject} 
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="例: 【新規案件情報】案件名 | 会社名"
              className="japanese-text"
              disabled={!selectedCase}
            />
          </div>
          
          {/* サンプルテンプレート選択 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="sample-template" className="japanese-text">サンプルテンプレート</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleApplySample(sampleTemplate)}
                disabled={!sampleTemplate}
                className="japanese-text"
              >
                適用
              </Button>
            </div>
            <Select value={sampleTemplate} onValueChange={setSampleTemplate}>
              <SelectTrigger className="japanese-text">
                <SelectValue placeholder="テンプレートを選択" />
              </SelectTrigger>
              <SelectContent>
                {sampleTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id} className="japanese-text">
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="email-template" className="japanese-text">本文</Label>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEnhanceEmail}
                disabled={enhancingEmail || !emailTemplate.trim()}
                className="japanese-text"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {enhancingEmail ? '処理中...' : 'AIで美化'}
              </Button>
            </div>
            <Textarea 
              id="email-template" 
              value={emailTemplate} 
              onChange={(e) => setEmailTemplate(e.target.value)}
              placeholder="案件情報をメール本文に入力してください"
              className="min-h-[200px] japanese-text"
              disabled={!selectedCase}
            />
            {!selectedCase && (
              <p className="text-xs text-muted-foreground japanese-text">※ 案件を選択すると自動的にテンプレートが生成されます</p>
            )}
          </div>

          {/* 署名 */}
          <div className="space-y-2">
            <Label htmlFor="email-signature" className="japanese-text">署名</Label>
            <Textarea 
              id="email-signature" 
              value={signature} 
              onChange={(e) => setSignature(e.target.value)}
              placeholder="メールの署名を入力してください"
              className="min-h-[100px] japanese-text"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            disabled={!selectedCase || selectedCompanies.length === 0} 
            onClick={handleSendEmails}
            className="japanese-text"
          >
            <Send className="h-4 w-4 mr-2" />
            {selectedCompanies.length > 0 ? `${selectedCompanies.length}社にメール送信` : 'メール送信'}
          </Button>
        </CardFooter>
      </Card>
      
      {/* 案件選択ダイアログ */}
      <Dialog open={isSelectCaseOpen} onOpenChange={setIsSelectCaseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="japanese-text">案件選択</DialogTitle>
            <DialogDescription className="japanese-text">
              送信する案件情報を選択してください
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {casesData.map((caseData) => (
              <Card key={caseData.id} className={`cursor-pointer hover:bg-muted transition-colors ${selectedCase?.id === caseData.id ? 'border-primary' : ''}`} onClick={() => handleSelectCase(caseData)}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium japanese-text">{caseData.title}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {caseData.requiredSkills.map((skill, i) => (
                          <Badge key={i} variant="outline" className="japanese-text">{skill}</Badge>
                        ))}
                      </div>
                      <div className="mt-2 text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground japanese-text">勤務地:</span>
                          <span className="japanese-text">{caseData.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground japanese-text">単価:</span>
                          <span className="japanese-text">{caseData.budget}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground japanese-text">勤務形態:</span>
                          <span className="japanese-text">{caseData.workType}</span>
                        </div>
                      </div>
                    </div>
                    {selectedCase?.id === caseData.id && (
                      <div className="rounded-full bg-primary p-1">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSelectCaseOpen(false)} className="japanese-text">キャンセル</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* メールプレビューダイアログ */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="japanese-text">メールプレビュー</DialogTitle>
            <DialogDescription className="japanese-text">
              {previewCompany && `${previewCompany.name}宛のメール内容です`}
            </DialogDescription>
          </DialogHeader>
          
          {previewCompany && selectedCase && (
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex">
                  <span className="text-sm font-medium japanese-text w-16">宛先:</span>
                  <span className="text-sm">{previewCompany.email}</span>
                </div>
                <div className="flex">
                  <span className="text-sm font-medium japanese-text w-16">件名:</span>
                  <span className="text-sm japanese-text">{emailSubject}</span>
                </div>
              </div>
              
              <div className="rounded-md border p-4 max-h-[300px] overflow-y-auto">
                <pre className="text-sm japanese-text whitespace-pre-wrap">{emailTemplate}</pre>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setPreviewDialogOpen(false)} 
              className="japanese-text"
            >
              閉じる
            </Button>
            <Button 
              onClick={() => {
                if (previewCompany) {
                  setSelectedCompanies(prev => 
                    prev.includes(previewCompany.id) ? prev : [...prev, previewCompany.id]
                  );
                }
                setPreviewDialogOpen(false);
                toast.success(`${previewCompany?.name}を送信リストに追加しました`);
              }}
              className="japanese-text"
            >
              <Check className="h-4 w-4 mr-2" />
              送信リストに追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
