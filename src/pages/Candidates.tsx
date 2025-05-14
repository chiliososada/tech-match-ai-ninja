import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDown, Edit, Trash2, Wand2, Save, Eye, Search } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Command } from '@/components/ui/command';
import { cn } from '@/lib/utils';

// サンプル技術者データ
const engineersData = [
  {
    id: "1",
    name: "鈴木太郎",
    skills: ["Java", "Spring Boot", "AWS"],
    japaneseLevel: "ビジネスレベル",
    experience: "7年",
    availability: "即日",
    status: "稼働中",
    desiredConditions: "東京/リモート, 60~80万円",
    companyType: "自社",
    recommendation: "鈴木さんはJavaとSpring Bootを中心に7年以上の開発経験があり、日本語はビジネスレベルです。金融系のプロジェクトに強みがあり、AWSやDockerなどのクラウド技術も習得しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。直近では大手金融機関のオンラインバンキングシステム開発に5年間携わっており、セキュリティに関する知識も豊富です。希望条件は東京またはリモートワークで、単価は60万円〜80万円です。",
    email: "taro.suzuki@example.com",
    phone: "090-1234-5678",
  },
  {
    id: "2",
    name: "田中花子",
    skills: ["React", "TypeScript", "Node.js"],
    japaneseLevel: "ネイティブ",
    experience: "5年",
    availability: "1ヶ月後",
    status: "案件探し中",
    desiredConditions: "大阪/リモート, 55~70万円",
    companyType: "他社",
    recommendation: "田中さんはReactとTypeScriptを中心に5年以上のフロントエンド開発経験があり、日本語はネイティブレベルです。Webアプリケーション開発に強みがあり、Node.jsやExpressなどのバックエンド技術も習得しています。直近では大手ECサイトのフロントエンド開発に3年間携わっており、パフォーマンス最適化とユーザー体験の向上に貢献しました。希望条件は大阪またはリモートワークで、単価は55万円〜70万円です。",
    email: "hanako.tanaka@example.com",
    phone: "090-2345-6789",
  },
  {
    id: "3",
    name: "山田健太",
    skills: ["Python", "Django", "Docker"],
    japaneseLevel: "日常会話レベル",
    experience: "3年",
    availability: "応相談",
    status: "案件探し中",
    desiredConditions: "リモートのみ, 50~65万円",
    companyType: "自社",
    recommendation: "山田さんはPythonとDjangoを中心に3年以上のバックエンド開発経験があり、日本語は日常会話レベルです。クラウドサービスの開発に強みがあり、DockerやKubernetesなどのコンテナ技術も習得しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件はリモートのみで、単価は50万円〜65万円です。",
    email: "kenji.yamada@example.com",
    phone: "090-3456-7890",
  },
  {
    id: "4",
    name: "佐藤一郎",
    skills: ["AWS", "Docker", "Kubernetes"],
    japaneseLevel: "ビジネスレベル",
    experience: "8年",
    availability: "即日",
    status: "稼働中",
    desiredConditions: "東京, 70~90万円",
    companyType: "他社",
    recommendation: "佐藤さんはAWSとDockerを中心に8年以上のクラウド開発経験があり、日本語はビジネスレベルです。AIやIoTなどの技術に強みがあり、KubernetesやEKSなどのクラウドサービスを活用しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件は東京で、単価は70万円〜90万円です。",
    email: "yoshihiro.sato@example.com",
    phone: "090-4567-8901",
  },
  {
    id: "5",
    name: "高橋誠",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    japaneseLevel: "ビジネスレベル",
    experience: "4年",
    availability: "2週間後",
    status: "案件探し中",
    desiredConditions: "東京/リモート, 55~75万円",
    companyType: "自社",
    recommendation: "高橋さんはJavaScriptとVue.jsを中心に4年以上のフロントエンド開発経験があり、日本語はビジネスレベルです。クラウドサービスの開発に強みがあり、FirebaseやAWSなどのサービスを活用しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件は東京またはリモートワークで、単価は55万円〜75万円です。",
    email: "shohei.kawasaki@example.com",
    phone: "090-5678-9012",
  },
  {
    id: "6",
    name: "伊藤裕子",
    skills: ["PHP", "Laravel", "MySQL"],
    japaneseLevel: "ネイティブ",
    experience: "6年",
    availability: "即日",
    status: "稼働中",
    desiredConditions: "大阪, 50~70万円",
    companyType: "他社",
    recommendation: "伊藤さんはPHPとLaravelを中心に6年以上のバックエンド開発経験があり、日本語はネイティブレベルです。データベースの設計と管理に強みがあり、MySQLやPostgreSQLなどのデータベースを活用しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件は大阪で、単価は50万円〜70万円です。",
    email: "yukiko.itoh@example.com",
    phone: "090-6789-0123",
  }
];

export function Candidates() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendationTemplate, setRecommendationTemplate] = useState(
    `[名前]は[スキル]を中心に[経験]年の開発経験があり、日本語は[日本語レベル]です。
[得意分野]に強みがあり、[ツール]などの技術も習得しています。
チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。
希望条件は[勤務地]で、単価は[単価]です。`
  );
  const [recommendationText, setRecommendationText] = useState(
    "鈴木さんはJavaとSpring Bootを中心に7年以上の開発経験があり、日本語はビジネスレベルです。金融系のプロジェクトに強みがあり、AWSやDockerなどのクラウド技術も習得しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。直近では大手金融機関のオンラインバンキングシステム開発に5年間携わっており、セキュリティに関する知識も豊富です。希望条件は東京またはリモートワークで、単価は60万円〜80万円です。"
  );
  
  // 新規技術者のフォームデータ
  const [newEngineer, setNewEngineer] = useState({
    name: '',
    skills: '',
    japaneseLevel: 'ビジネスレベル',
    experience: '',
    availability: '',
    status: '案件探し中',
    desiredConditions: '',
    companyType: '自社'
  });
  
  // 詳細ダイアログの状態管理
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState<any>(null);
  const [editEngineerData, setEditEngineerData] = useState<any>(null);
  
  // 検索関連の状態
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    companyType: '',
    skills: '',
    experience: '',
    japaneseLevel: '',
    desiredConditions: '',
    status: ''
  });
  
  // フィルター適用済みのエンジニアデータ
  const [filteredEngineers, setFilteredEngineers] = useState(engineersData);
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredEngineers.length / itemsPerPage);
  
  // ページネーションで表示する技術者
  const paginatedEngineers = filteredEngineers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 検索時にページをリセット
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredEngineers]);
  
  // 検索クエリが変更されたときに検索を実行
  useEffect(() => {
    handleSearch();
  }, [searchQuery, filters.companyType, filters.japaneseLevel, filters.status]);
  
  // 検索を実行
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    
    const filtered = engineersData.filter(engineer => {
      // 検索クエリでフィルター
      if (query) {
        const nameMatch = engineer.name.toLowerCase().includes(query);
        const skillsMatch = engineer.skills.some((skill: string) => 
          skill.toLowerCase().includes(query)
        );
        const experienceMatch = engineer.experience.toLowerCase().includes(query);
        const conditionsMatch = engineer.desiredConditions.toLowerCase().includes(query);
        
        if (!(nameMatch || skillsMatch || experienceMatch || conditionsMatch)) {
          return false;
        }
      }
      
      // 区分でフィルター
      if (filters.companyType && engineer.companyType !== filters.companyType) {
        return false;
      }
      
      // 日本語レベルでフィルター
      if (filters.japaneseLevel && engineer.japaneseLevel !== filters.japaneseLevel) {
        return false;
      }
      
      // ステータスでフィルター
      if (filters.status && engineer.status !== filters.status) {
        return false;
      }
      
      return true;
    });
    
    setFilteredEngineers(filtered);
    
    if (filtered.length === 0 && (query || filters.companyType || filters.japaneseLevel || filters.status)) {
      toast.info('該当する技術者が見つかりませんでした');
    }
  };
  
  // フィルター条件をリセット
  const resetFilters = () => {
    setSearchQuery('');
    setFilters({
      name: '',
      companyType: '',
      skills: '',
      experience: '',
      japaneseLevel: '',
      desiredConditions: '',
      status: ''
    });
    setFilteredEngineers(engineersData);
  };
  
  // AIで推薦文を生成（シミュレーション）
  const generateRecommendation = () => {
    toast.success('推薦文を生成中...', { duration: 2000 });
    
    setTimeout(() => {
      // テンプレートに基づいて推薦文を生成（実際はAI APIを呼び出す）
      const newText = recommendationTemplate
        .replace('[名前]', `${newEngineer.name || '候補者'}さん`)
        .replace('[スキル]', newEngineer.skills || 'プログラミング言語')
        .replace('[経験]', newEngineer.experience || '5')
        .replace('[日本語レベル]', newEngineer.japaneseLevel)
        .replace('[得意分野]', '金融系のプロジェクト')
        .replace('[ツール]', 'クラウドサービス')
        .replace('[勤務地]', newEngineer.desiredConditions.split(',')[0] || '東京/リモート')
        .replace('[単価]', newEngineer.desiredConditions.split(',')[1] || '60~80万円');
        
      setRecommendationText(newText);
      toast.success('推薦文が生成されました');
    }, 2000);
  };
  
  // 技術者追加フォームの送信処理
  const handleAddEngineer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEngineer.name || !newEngineer.skills || !newEngineer.experience) {
      toast.error('必須項目を入力してください');
      return;
    }
    
    toast.success('技術者と推薦文が登録されました', {
      description: `${newEngineer.name}さんのプロフィールが登録されました`
    });
    
    // フォームをリセット
    setNewEngineer({
      name: '',
      skills: '',
      japaneseLevel: 'ビジネスレベル',
      experience: '',
      availability: '',
      status: '案件探し中',
      desiredConditions: '',
      companyType: '自社'
    });
    setRecommendationText("");
  };
  
  // 技術者詳細を表示
  const handleViewDetails = (engineer: any) => {
    setSelectedEngineer(engineer);
    setDetailDialogOpen(true);
  };
  
  // ステータスを更新
  const handleStatusChange = (value: string) => {
    if (selectedEngineer) {
      setSelectedEngineer({...selectedEngineer, status: value});
      toast.success('ステータスを更新しました');
    }
  };
  
  // 技術者の編集
  const handleEditClick = () => {
    setDetailDialogOpen(false);
    setEditEngineerData({...selectedEngineer});
    setEditDialogOpen(true);
  };
  
  // 編集内容を保存
  const handleSaveEdit = () => {
    toast.success('技術者情報を更新しました');
    setEditDialogOpen(false);
    // 実際のアプリケーションでは、ここでデータベースの更新を行います
  };
  
  // 技術者の削除（シミュレーション）
  const handleDeleteEngineer = (id: string) => {
    toast.success('技術者情報を削除しました');
  };
  
  // 履歴書ダウンロード（シミュレーション）
  const handleDownloadResume = (id: string) => {
    toast.success('履歴書をダウンロードします');
  };
  
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">人材管理</h2>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload" className="japanese-text">履歴書アップロード</TabsTrigger>
            <TabsTrigger value="add" className="japanese-text">技術者追加</TabsTrigger>
            <TabsTrigger value="list" className="japanese-text">技術者一覧</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <ResumeUpload />
          </TabsContent>
          
          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">新規技術者登録</CardTitle>
                <CardDescription className="japanese-text">
                  自社や協力会社の技術者情報を登録します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEngineer} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="japanese-text">区分</Label>
                    <RadioGroup 
                      value={newEngineer.companyType}
                      onValueChange={(value) => setNewEngineer({...newEngineer, companyType: value})}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="自社" id="own-company" />
                        <Label htmlFor="own-company" className="japanese-text">自社</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="他社" id="other-company" />
                        <Label htmlFor="other-company" className="japanese-text">他社</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="japanese-text">氏名 <span className="text-red-500">*</span></Label>
                      <Input 
                        id="name" 
                        value={newEngineer.name}
                        onChange={(e) => setNewEngineer({...newEngineer, name: e.target.value})}
                        placeholder="例: 山田太郎"
                        className="japanese-text"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="skills" className="japanese-text">保有スキル <span className="text-red-500">*</span></Label>
                      <Input 
                        id="skills" 
                        value={newEngineer.skills}
                        onChange={(e) => setNewEngineer({...newEngineer, skills: e.target.value})}
                        placeholder="例: Java, Spring Boot, AWS（カンマ区切り）"
                        className="japanese-text"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="japanese" className="japanese-text">日本語レベル <span className="text-red-500">*</span></Label>
                      <Select
                        value={newEngineer.japaneseLevel}
                        onValueChange={(value) => setNewEngineer({...newEngineer, japaneseLevel: value})}
                      >
                        <SelectTrigger className="japanese-text">
                          <SelectValue placeholder="日本語レベルを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="不問">不問</SelectItem>
                          <SelectItem value="日常会話レベル">日常会話レベル</SelectItem>
                          <SelectItem value="ビジネスレベル">ビジネスレベル</SelectItem>
                          <SelectItem value="ネイティブレベル">ネイティブレベル</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="japanese-text">経験年数 <span className="text-red-500">*</span></Label>
                      <Input 
                        id="experience" 
                        value={newEngineer.experience}
                        onChange={(e) => setNewEngineer({...newEngineer, experience: e.target.value})}
                        placeholder="例: 5年"
                        className="japanese-text"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="availability" className="japanese-text">稼働可能時期</Label>
                      <Input 
                        id="availability" 
                        value={newEngineer.availability}
                        onChange={(e) => setNewEngineer({...newEngineer, availability: e.target.value})}
                        placeholder="例: 即日、1ヶ月後、応相談"
                        className="japanese-text"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status" className="japanese-text">ステータス</Label>
                      <Select
                        value={newEngineer.status}
                        onValueChange={(value) => setNewEngineer({...newEngineer, status: value})}
                      >
                        <SelectTrigger className="japanese-text">
                          <SelectValue placeholder="ステータスを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="案件探し中">案件探し中</SelectItem>
                          <SelectItem value="提案中">提案中</SelectItem>
                          <SelectItem value="稼働中">稼働中</SelectItem>
                          <SelectItem value="非稼働">非稼働</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="desired-conditions" className="japanese-text">希望条件</Label>
                    <Input 
                      id="desired-conditions" 
                      value={newEngineer.desiredConditions}
                      onChange={(e) => setNewEngineer({...newEngineer, desiredConditions: e.target.value})}
                      placeholder="例: 東京/リモート, 60~80万円"
                      className="japanese-text"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">推薦文生成</CardTitle>
                <CardDescription className="japanese-text">
                  候補者の自動生成された推薦文
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recommendation-template" className="japanese-text">テンプレート</Label>
                  <Textarea 
                    id="recommendation-template" 
                    className="min-h-[150px] japanese-text"
                    value={recommendationTemplate}
                    onChange={(e) => setRecommendationTemplate(e.target.value)}
                    placeholder="[名前]、[スキル]、[経験]などのプレースホルダーを使用してください"
                  />
                  <p className="text-xs text-muted-foreground japanese-text">
                    推薦文のテンプレートを編集できます。[名前]、[スキル]、[経験]などのプレースホルダーを使用します。
                  </p>
                </div>
                
                <Button 
                  onClick={generateRecommendation} 
                  variant="outline" 
                  className="w-full japanese-text"
                >
                  <Wand2 className="mr-2 h-4 w-4" />
                  AIで推薦文を生成
                </Button>
                
                <div className="space-y-2">
                  <Label htmlFor="generated-recommendation" className="japanese-text">生成された推薦文</Label>
                  <Textarea 
                    id="generated-recommendation"
                    className="min-h-[150px] japanese-text" 
                    value={recommendationText}
                    onChange={(e) => setRecommendationText(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleAddEngineer} type="submit" className="japanese-text">
                  <Save className="mr-2 h-4 w-4" />
                  技術者と推薦文を登録
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">技術者一覧</CardTitle>
                <CardDescription className="japanese-text">
                  登録済みの技術者一覧と詳細を表示します
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* 検索フィールドと絞り込みオプション */}
                <div className="mb-6 space-y-4">
                  {/* 検索フィールド */}
                  <div>
                    <div className="flex items-center border-b px-3 rounded-md border">
                      <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                      <Input
                        placeholder="名前、スキル、経験などで検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="japanese-text w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                  
                  {/* 絞り込みオプション */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium japanese-text whitespace-nowrap">区分:</Label>
                      <Select
                        value={filters.companyType}
                        onValueChange={(value) => setFilters({...filters, companyType: value})}
                      >
                        <SelectTrigger className="h-8 w-[120px] japanese-text">
                          <SelectValue placeholder="全て" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全て</SelectItem>
                          <SelectItem value="自社">自社</SelectItem>
                          <SelectItem value="他社">他社</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium japanese-text whitespace-nowrap">日本語レベル:</Label>
                      <Select
                        value={filters.japaneseLevel}
                        onValueChange={(value) => setFilters({...filters, japaneseLevel: value})}
                      >
                        <SelectTrigger className="h-8 w-[160px] japanese-text">
                          <SelectValue placeholder="全て" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全て</SelectItem>
                          <SelectItem value="不問">不問</SelectItem>
                          <SelectItem value="日常会話レベル">日常会話レベル</SelectItem>
                          <SelectItem value="ビジネスレベル">ビジネスレベル</SelectItem>
                          <SelectItem value="ネイティブレベル">ネイティブレベル</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium japanese-text whitespace-nowrap">ステータス:</Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => setFilters({...filters, status: value})}
                      >
                        <SelectTrigger className="h-8 w-[120px] japanese-text">
                          <SelectValue placeholder="全て" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全て</SelectItem>
                          <SelectItem value="案件探し中">案件探し中</SelectItem>
                          <SelectItem value="提案中">提案中</SelectItem>
                          <SelectItem value="稼働中">稼働中</SelectItem>
                          <SelectItem value="非稼働">非稼働</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(searchQuery || filters.companyType || filters.japaneseLevel || filters.status) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetFilters} 
                        className="h-8 px-2 text-xs japanese-text"
                      >
                        リセット
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="japanese-text">名前</TableHead>
                        <TableHead className="japanese-text">区分</TableHead>
                        <TableHead className="japanese-text">スキル</TableHead>
                        <TableHead className="japanese-text">経験年数</TableHead>
                        <TableHead className="japanese-text">日本語レベル</TableHead>
                        <TableHead className="japanese-text">希望条件</TableHead>
                        <TableHead className="japanese-text">ステータス</TableHead>
                        <TableHead className="japanese-text">アクション</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEngineers.length > 0 ? (
                        paginatedEngineers.map((engineer) => (
                          <TableRow key={engineer.id}>
                            <TableCell className="font-medium japanese-text">{engineer.name}</TableCell>
                            <TableCell className="japanese-text text-sm">{engineer.companyType}</TableCell>
                            <TableCell className="japanese-text text-sm truncate">
                              {engineer.skills.join(", ")}
                            </TableCell>
                            <TableCell className="japanese-text text-sm">{engineer.experience}</TableCell>
                            <TableCell className="japanese-text text-sm">{engineer.japaneseLevel}</TableCell>
                            <TableCell className="japanese-text text-sm truncate">{engineer.desiredConditions}</TableCell>
                            <TableCell className="japanese-text text-sm">{engineer.status}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleViewDetails(engineer)}
                                  title="詳細を表示"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDownloadResume(engineer.id)}
                                  title="履歴書をダウンロード"
                                >
                                  <FileDown className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEditClick()}
                                  title="編集"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeleteEngineer(engineer.id)}
                                  title="削除"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            データが見つかりません
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
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* 技術者詳細ダイアログ */}
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="japanese-text">技術者詳細</DialogTitle>
              <DialogDescription className="japanese-text">
                技術者の詳細情報を表示しています
              </DialogDescription>
            </DialogHeader>
            
            {selectedEngineer && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium japanese-text">氏名</h4>
                    <p className="japanese-text">{selectedEngineer.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">区分</h4>
                    <p className="japanese-text">{selectedEngineer.companyType}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">メールアドレス</h4>
                    <p>{selectedEngineer.email || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">電話番号</h4>
                    <p>{selectedEngineer.phone || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">スキル</h4>
                    <p className="japanese-text">{selectedEngineer.skills.join(', ')}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">経験年数</h4>
                    <p className="japanese-text">{selectedEngineer.experience}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">日本語レベル</h4>
                    <p className="japanese-text">{selectedEngineer.japaneseLevel}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium japanese-text">稼働可能時期</h4>
                    <p className="japanese-text">{selectedEngineer.availability}</p>
                  </div>
                  
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium japanese-text">希望条件</h4>
                    <p className="japanese-text">{selectedEngineer.desiredConditions}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 japanese-text">ステータス</h4>
                  <Select
                    value={selectedEngineer.status}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full japanese-text">
                      <SelectValue placeholder="ステータスを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="案件探し中" className="japanese-text">案件探し中</SelectItem>
                      <SelectItem value="提案中" className="japanese-text">提案中</SelectItem>
                      <SelectItem value="稼働中" className="japanese-text">稼働中</SelectItem>
                      <SelectItem value="非稼働" className="japanese-text">非稼働</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 japanese-text">推薦文</h4>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="text-sm japanese-text whitespace-pre-wrap">{selectedEngineer.recommendation}</p>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDetailDialogOpen(false)} className="japanese-text">
                    閉じる
                  </Button>
                  <Button onClick={handleEditClick} className="japanese-text">
                    <Edit className="mr-2 h-4 w-4" />
                    編集
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* 技術者編集ダイアログ */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="japanese-text">技術者情報編集</DialogTitle>
              <DialogDescription className="japanese-text">
                技術者の情報を編集します
              </DialogDescription>
            </DialogHeader>
            
            {editEngineerData && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="japanese-text">区分</Label>
                  <RadioGroup 
                    value={editEngineerData.companyType}
                    onValueChange={(value) => setEditEngineerData({...editEngineerData, companyType: value})}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="自社" id="edit-own-company" />
                      <Label htmlFor="edit-own-company" className="japanese-text">自社</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="他社" id="edit-other-company" />
                      <Label htmlFor="edit-other-company" className="japanese-text">他社</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="japanese-text">氏名</Label>
                    <Input 
                      value={editEngineerData.name}
                      onChange={(e) => setEditEngineerData({...editEngineerData, name: e.target.value})}
                      className="japanese-text"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="japanese-text">メールアドレス</Label>
                    <Input 
                      value={editEngineerData.email || ''}
                      onChange={(e) => setEditEngineerData({...editEngineerData, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="japanese-text">電話番号</Label>
                    <Input 
                      value={editEngineerData.phone || ''}
                      onChange={(e) => setEditEngineerData({...editEngineerData, phone: e.target.value})}
                      className="japanese-text"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="japanese-text">日本語レベル</Label>
                    <Select
                      value={editEngineerData.japaneseLevel}
                      onValueChange={(value) => setEditEngineerData({...editEngineerData, japaneseLevel: value})}
                    >
                      <SelectTrigger className="japanese-text">
                        <SelectValue placeholder="日本語レベルを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="不問" className="japanese-text">不問</SelectItem>
                        <SelectItem value="日常会話レベル" className="japanese-text">日常会話レベル</SelectItem>
                        <SelectItem value="ビジネスレベル" className="japanese-text">ビジネスレベル</SelectItem>
                        <SelectItem value="ネイティブレベル" className="japanese-text">ネイティブレベル</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="japanese-text">保有スキル</Label>
                    <Input 
                      value={editEngineerData.skills.join(', ')}
                      onChange={(e) => setEditEngineerData({...editEngineerData, skills: e.target.value.split(', ')})}
                      className="japanese-text"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="japanese-text">経験年数</Label>
                    <Input 
                      value={editEngineerData.experience}
                      onChange={(e) => setEditEngineerData({...editEngineerData, experience: e.target.value})}
                      className="japanese-text"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="japanese-text">希望条件</Label>
                    <Input 
                      value={editEngineerData.desiredConditions}
                      onChange={(e) => setEditEngineerData({...editEngineerData, desiredConditions: e.target.value})}
                      className="japanese-text"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="japanese-text">稼働可能時期</Label>
                    <Input 
                      value={editEngineerData.availability}
                      onChange={(e) => setEditEngineerData({...editEngineerData, availability: e.target.value})}
                      className="japanese-text"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="japanese-text">ステータス</Label>
                  <Select
                    value={editEngineerData.status}
                    onValueChange={(value) => setEditEngineerData({...editEngineerData, status: value})}
                  >
                    <SelectTrigger className="japanese-text">
                      <SelectValue placeholder="ステータスを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="案件探し中" className="japanese-text">案件探し中</SelectItem>
                      <SelectItem value="提案中" className="japanese-text">提案中</SelectItem>
                      <SelectItem value="稼働中" className="japanese-text">稼働中</SelectItem>
                      <SelectItem value="非稼働" className="japanese-text">非稼働</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="japanese-text">推薦文</Label>
                  <Textarea 
                    value={editEngineerData.recommendation || ''}
                    onChange={(e) => setEditEngineerData({...editEngineerData, recommendation: e.target.value})}
                    className="min-h-[150px] japanese-text" 
                  />
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="japanese-text">
                    キャンセル
                  </Button>
                  <Button onClick={handleSaveEdit} className="japanese-text">
                    <Save className="mr-2 h-4 w-4" />
                    保存
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}

export default Candidates;
