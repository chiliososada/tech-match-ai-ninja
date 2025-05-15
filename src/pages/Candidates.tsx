
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { BulkEmailTab } from '@/components/candidates/BulkEmailTab';
import { CandidateList } from '@/components/candidates/CandidateList';
import { CandidateForm } from '@/components/candidates/CandidateForm';
import { CandidateDetails } from '@/components/candidates/CandidateDetails';
import { CandidateEdit } from '@/components/candidates/CandidateEdit';
import { Engineer, CategoryType, NewEngineerType } from '@/components/candidates/types';

// サンプル技術者データ
const engineersData: Engineer[] = [
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
    companyName: "テックイノベーション株式会社",
    source: "手動入力",
    recommendation: "鈴木さんはJavaとSpring Bootを中心に7年以上の開発経験があり、日本語はビジネスレベルです。金融系のプロジェクトに強みがあり、AWSやDockerなどのクラウド技術も習得しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。直近では大手金融機関のオンラインバンキングシステム開発に5年間携わっており、セキュリティに関する知識も豊富です。希望条件は東京またはリモートワークで、単価は60万円〜80万円です。",
    email: "taro.suzuki@example.com",
    phone: "090-1234-5678",
    registeredAt: "2024-01-15",
    updatedAt: "2024-05-01"
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
    companyName: "フロントエンドパートナーズ株式会社",
    source: "メール",
    recommendation: "田中さんはReactとTypeScriptを中心に5年以上のフロントエンド開発経験があり、日本語はネイティブレベルです。Webアプリケーション開発に強みがあり、Node.jsやExpressなどのバックエンド技術も習得しています。直近では大手ECサイトのフロントエンド開発に3年間携わっており、パフォーマンス最適化とユーザー体験の向上に貢献しました。希望条件は大阪またはリモートワークで、単価は55万円〜70万円です。",
    email: "hanako.tanaka@example.com",
    phone: "090-2345-6789",
    registeredAt: "2024-02-10",
    updatedAt: "2024-04-15"
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
    companyName: "テックイノベーション株式会社",
    source: "手動入力",
    recommendation: "山田さんはPythonとDjangoを中心に3年以上のバックエンド開発経験があり、日本語は日常会話レベルです。クラウドサービスの開発に強みがあり、DockerやKubernetesなどのコンテナ技術も習得しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件はリモートのみで、単価は50万円〜65万円です。",
    email: "kenji.yamada@example.com",
    phone: "090-3456-7890",
    registeredAt: "2024-03-05",
    updatedAt: "2024-03-05"
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
    companyName: "クラウドシステムズ株式会社",
    source: "メール",
    recommendation: "佐藤さんはAWSとDockerを中心に8年以上のクラウド開発経験があり、日本語はビジネスレベルです。AIやIoTなどの技術に強みがあり、KubernetesやEKSなどのクラウドサービスを活用しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件は東京で、単価は70万円〜90万円です。",
    email: "yoshihiro.sato@example.com",
    phone: "090-4567-8901",
    registeredAt: "2024-01-20",
    updatedAt: "2024-05-10"
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
    companyName: "テックイノベーション株式会社",
    source: "手動入力",
    recommendation: "高橋さんはJavaScriptとVue.jsを中心に4年以上のフロントエンド開発経験があり、日本語はビジネスレベルです。クラウドサービスの開発に強みがあり、FirebaseやAWSなどのサービスを活用しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件は東京またはリモートワークで、単価は55万円〜75万円です。",
    email: "shohei.kawasaki@example.com",
    phone: "090-5678-9012",
    registeredAt: "2024-02-28",
    updatedAt: "2024-04-30"
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
    companyName: "ウェブソリューションズ株式会社",
    source: "メール",
    recommendation: "伊藤さんはPHPとLaravelを中心に6年以上のバックエンド開発経験があり、日本語はネイティブレベルです。データベースの設計と管理に強みがあり、MySQLやPostgreSQLなどのデータベースを活用しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。希望条件は大阪で、単価は50万円〜70万円です。",
    email: "yukiko.itoh@example.com",
    phone: "090-6789-0123",
    registeredAt: "2024-03-15",
    updatedAt: "2024-05-05"
  }
];

// カテゴリー定義
const categories: CategoryType[] = [
  { id: "all", name: "全て" },
  { id: "self", name: "自社" },
  { id: "other", name: "他社" }
];

// 新規エンジニアのサンプルデータに所属会社のフィールドを追加
const newEngineerInitialState: NewEngineerType = {
  name: '',
  skills: '',
  japaneseLevel: 'ビジネスレベル',
  experience: '',
  availability: '',
  status: '案件探し中',
  desiredConditions: '',
  companyType: '自社',
  companyName: '',
  source: '手動入力',
  registeredAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0]
};

export function Candidates() {
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
  const [newEngineer, setNewEngineer] = useState<NewEngineerType>(newEngineerInitialState);
  
  // 詳細ダイアログの状態管理
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  const [editEngineerData, setEditEngineerData] = useState<Engineer | null>(null);
  
  // 技術者詳細を表示
  const handleViewDetails = (engineer: Engineer) => {
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
  
  // 技術者の編集 (詳細画面から)
  const handleEditClick = () => {
    setDetailDialogOpen(false);
    setEditEngineerData({...selectedEngineer!});
    setEditDialogOpen(true);
  };
  
  // 技術者の編集 (テーブルから直接)
  const handleDirectEditClick = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setEditEngineerData({...engineer});
    setEditDialogOpen(true);
  };
  
  // 編集内容を保存
  const handleSaveEdit = () => {
    if (editEngineerData) {
      // 更新日を現在の日付に設定
      editEngineerData.updatedAt = new Date().toISOString().split('T')[0];
    }
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
    
    // 現在の日付を設定
    const today = new Date().toISOString().split('T')[0];
    
    toast.success('技術者と推薦文が登録されました', {
      description: `${newEngineer.name}さんのプロフィールが登録されました`
    });
    
    // フォームをリセット
    setNewEngineer(newEngineerInitialState);
    setRecommendationText("");
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">人材管理</h2>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list" className="japanese-text">技術者一覧</TabsTrigger>
            <TabsTrigger value="upload" className="japanese-text">履歴書アップロード</TabsTrigger>
            <TabsTrigger value="add" className="japanese-text">技術者追加</TabsTrigger>
            <TabsTrigger value="bulk-email" className="japanese-text">一括送信</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <CandidateList 
              engineers={engineersData}
              categories={categories}
              onViewDetails={handleViewDetails}
              onEditEngineer={handleDirectEditClick}
              onDeleteEngineer={handleDeleteEngineer}
              onDownloadResume={handleDownloadResume}
            />
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            <ResumeUpload />
          </TabsContent>
          
          <TabsContent value="add" className="space-y-6">
            <CandidateForm
              initialData={newEngineer}
              onSubmit={handleAddEngineer}
              onDataChange={setNewEngineer}
              recommendationTemplate={recommendationTemplate}
              recommendationText={recommendationText}
              onRecommendationTemplateChange={setRecommendationTemplate}
              onRecommendationTextChange={setRecommendationText}
              onGenerateRecommendation={generateRecommendation}
            />
          </TabsContent>

          <TabsContent value="bulk-email" className="space-y-6">
            <BulkEmailTab />
          </TabsContent>
        </Tabs>
        
        {/* 技術者詳細ダイアログ */}
        <CandidateDetails
          open={detailDialogOpen}
          onOpenChange={setDetailDialogOpen}
          engineer={selectedEngineer}
          onStatusChange={handleStatusChange}
          onEditClick={handleEditClick}
        />
        
        {/* 技術者編集ダイアログ */}
        <CandidateEdit
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          engineer={editEngineerData}
          onEngineerChange={setEditEngineerData}
          onSave={handleSaveEdit}
        />
      </div>
    </MainLayout>
  );
}

export default Candidates;
