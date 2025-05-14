import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDown, Edit, Trash2, Wand2 } from 'lucide-react';
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
    desiredConditions: "東京/リモート, 60~80万円"
  },
  {
    id: "2",
    name: "田中花子",
    skills: ["React", "TypeScript", "Node.js"],
    japaneseLevel: "ネイティブ",
    experience: "5年",
    availability: "1ヶ月後",
    status: "案件探し中",
    desiredConditions: "大阪/リモート, 55~70万円"
  },
  {
    id: "3",
    name: "山田健太",
    skills: ["Python", "Django", "Docker"],
    japaneseLevel: "日常会話レベル",
    experience: "3年",
    availability: "応相談",
    status: "案件探し中",
    desiredConditions: "リモートのみ, 50~65万円"
  },
  {
    id: "4",
    name: "佐藤一郎",
    skills: ["AWS", "Docker", "Kubernetes"],
    japaneseLevel: "ビジネスレベル",
    experience: "8年",
    availability: "即日",
    status: "稼働中",
    desiredConditions: "東京, 70~90万円"
  },
  {
    id: "5",
    name: "高橋誠",
    skills: ["JavaScript", "Vue.js", "Firebase"],
    japaneseLevel: "ビジネスレベル",
    experience: "4年",
    availability: "2週間後",
    status: "案件探し中",
    desiredConditions: "東京/リモート, 55~75万円"
  },
  {
    id: "6",
    name: "伊藤裕子",
    skills: ["PHP", "Laravel", "MySQL"],
    japaneseLevel: "ネイティブ",
    experience: "6年",
    availability: "即日",
    status: "稼働中",
    desiredConditions: "大阪, 50~70万円"
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
    desiredConditions: ''
  });
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(engineersData.length / itemsPerPage);
  
  // ページネーションで表示する技術者
  const paginatedEngineers = engineersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // AIで推薦文を生成（シミュレーション）
  const generateRecommendation = () => {
    toast.success('推薦文を生成中...', { duration: 2000 });
    
    setTimeout(() => {
      // テンプレートに基づいて推薦文を生成（実際はAI APIを呼び出す）
      const newText = recommendationTemplate
        .replace('[名前]', '鈴木さん')
        .replace('[スキル]', 'JavaとSpring Boot')
        .replace('[経験]', '7')
        .replace('[日本語レベル]', 'ビジネスレベル')
        .replace('[得意分野]', '金融系のプロジェクト')
        .replace('[ツール]', 'AWSやDocker')
        .replace('[勤務地]', '東京またはリモートワーク')
        .replace('[単価]', '60万円〜80万円');
        
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
    
    toast.success('技術者が追加されました', {
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
      desiredConditions: ''
    });
  };
  
  // 技術者の削除（シミュレーション）
  const handleDeleteEngineer = (id: string) => {
    toast.success('技術者情報を削除しました');
  };
  
  // 技術者の編集（シミュレーション）
  const handleEditEngineer = (id: string) => {
    toast.success('技術者情報を編集します');
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
                          <SelectItem value="不問" className="japanese-text">不問</SelectItem>
                          <SelectItem value="日常会話レベル" className="japanese-text">日常会話レベル</SelectItem>
                          <SelectItem value="ビジネスレベル" className="japanese-text">ビジネスレベル</SelectItem>
                          <SelectItem value="ネイティブレベル" className="japanese-text">ネイティブレベル</SelectItem>
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
                          <SelectItem value="案件探し中" className="japanese-text">案件探し中</SelectItem>
                          <SelectItem value="提案中" className="japanese-text">提案中</SelectItem>
                          <SelectItem value="稼働中" className="japanese-text">稼働中</SelectItem>
                          <SelectItem value="非稼働" className="japanese-text">非稼働</SelectItem>
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
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="japanese-text">登録する</Button>
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
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="japanese-text">名前</TableHead>
                        <TableHead className="japanese-text">スキル</TableHead>
                        <TableHead className="japanese-text">経験年数</TableHead>
                        <TableHead className="japanese-text">日本語レベル</TableHead>
                        <TableHead className="japanese-text">希望条件</TableHead>
                        <TableHead className="japanese-text">ステータス</TableHead>
                        <TableHead className="japanese-text">アクション</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEngineers.map((engineer) => (
                        <TableRow key={engineer.id}>
                          <TableCell className="font-medium japanese-text">{engineer.name}</TableCell>
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
                                onClick={() => handleDownloadResume(engineer.id)}
                                title="履歴書をダウンロード"
                              >
                                <FileDown className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleEditEngineer(engineer.id)}
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
      </div>
    </MainLayout>
  );
}

export default Candidates;
