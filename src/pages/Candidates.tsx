import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CandidateList } from '@/components/candidates/CandidateList';
import { CandidateForm } from '@/components/candidates/CandidateForm';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { useLocation } from 'react-router-dom';
import { Engineer, CategoryType, NewEngineerType } from '@/components/candidates/types';
import { toast } from 'sonner';

interface CandidatesProps {
  companyType?: 'own' | 'other';
}

// Creating mock initialData for CandidateForm
const initialCandidateData: NewEngineerType = {
  name: '',
  skills: '',
  japaneseLevel: '',
  englishLevel: '',
  experience: '',
  availability: '',
  status: '',
  nationality: '',
  age: '',
  gender: '',
  nearestStation: '',
  education: '',
  arrivalYear: '',
  certifications: '',
  remarks: '',
  companyType: '自社', // Default to 自社
  companyName: '',
  source: '',
  technicalKeywords: '',
  selfPromotion: '',
  workScope: '',
  workExperience: '',
  registeredAt: '',
  updatedAt: '',
};

// Mock data for CandidateList
const mockEngineers: Engineer[] = [
  {
    id: '1',
    name: '山田太郎',
    skills: ['JavaScript', 'React', 'Node.js'],
    japaneseLevel: 'ネイティブレベル',
    experience: '5年',
    availability: '即日',
    status: ['提案中', '事前面談'],  // Multiple statuses
    remarks: '週4日勤務希望, 出張可, リモート可',
    companyType: '自社',
    companyName: 'テックイノベーション株式会社',
    source: '直接応募',
    registeredAt: '2023-01-15',
    updatedAt: '2023-03-20',
    nationality: '日本',
    age: '32歳',
    gender: '男性',
    nearestStation: '品川駅',
  },
  {
    id: '2',
    name: '鈴木花子',
    skills: ['Python', 'Django', 'AWS'],
    japaneseLevel: 'ネイティブレベル',
    experience: '3年',
    availability: '1ヶ月後',
    status: ['面談', '結果待ち'],  // Multiple statuses
    remarks: 'リモート勤務希望, 週5日可',
    companyType: '他社',
    companyName: 'フロントエンドパートナーズ株式会社',
    source: 'エージェント紹介',
    registeredAt: '2023-02-20',
    updatedAt: '2023-04-15',
    nationality: '中国',
    age: '28歳',
    gender: '女性',
    nearestStation: '東京駅',
  },
  {
    id: '3',
    name: '田中誠',
    skills: ['Java', 'Spring Boot', 'Oracle'],
    japaneseLevel: 'ビジネスレベル',
    experience: '8年',
    availability: '応相談',
    status: ['営業終了'],
    remarks: '大手企業での勤務経験豊富, 長期案件希望',
    companyType: '自社',
    companyName: 'テックイノベーション株式会社',
    source: '直接応募',
    registeredAt: '2023-03-05',
    updatedAt: '2023-05-10',
    nationality: 'インド',
    age: '35歳',
    gender: '男性',
    nearestStation: '新宿駅',
  }
];

const mockCategories: CategoryType[] = [
  { id: '1', name: 'フロントエンド' },
  { id: '2', name: 'バックエンド' },
  { id: '3', name: 'フルスタック' },
];

export function Candidates({ companyType = 'own' }: CandidatesProps) {
  const location = useLocation();
  
  // Company type from URL for backward compatibility
  const urlCompanyType = location.pathname.includes('/company/other') ? 'other' : 'own';
  const effectiveCompanyType = urlCompanyType || companyType;
  
  // Page title based on company type
  const pageTitle = effectiveCompanyType === 'own' ? '自社人材管理' : '他社人材管理';

  const [recommendationTemplate, setRecommendationTemplate] = useState<string>('');
  const [recommendationText, setRecommendationText] = useState<string>('');

  // Handle candidate view/edit actions
  const handleViewDetails = (engineer: Engineer) => {
    console.log(`View details for candidate: ${engineer.id}`);
    toast.info(`${engineer.name}の詳細を表示`);
  };

  const handleEditEngineer = (engineer: Engineer) => {
    console.log(`Edit candidate: ${engineer.id}`);
    toast.info(`${engineer.name}の編集を開始`);
  };

  const handleDeleteEngineer = (id: string) => {
    console.log(`Delete candidate: ${id}`);
    toast.success('候補者を削除しました');
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Change status of candidate ${id} to ${newStatus}`);
    toast.success('ステータスを更新しました');
  };
  
  // Add a function to handle resume downloads
  const handleDownloadResume = (id: string) => {
    console.log(`Download resume for candidate: ${id}`);
    toast.success('履歴書のダウンロードを開始しました');
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('技術者情報を登録しました');
  };

  const handleDataChange = (data: any) => {
    // Handle data change
    console.log('Form data changed:', data);
  };

  const handleGenerateRecommendation = () => {
    // Handle recommendation generation
    toast.success('推薦文を生成しました');
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <h1 className="text-3xl font-bold mb-6 japanese-text">{pageTitle}</h1>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list" className="japanese-text">人材一覧</TabsTrigger>
            <TabsTrigger value="add" className="japanese-text">新規登録</TabsTrigger>
            <TabsTrigger value="resume" className="japanese-text">履歴書アップロード</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="w-full">
            <CandidateList 
              engineers={mockEngineers}
              onViewDetails={handleViewDetails}
              onEditEngineer={handleEditEngineer}
              onDeleteEngineer={handleDeleteEngineer}
              onStatusChange={handleStatusChange}
              onDownloadResume={handleDownloadResume}
              isOwnCompany={effectiveCompanyType === 'own'}
            />
          </TabsContent>
          
          <TabsContent value="add">
            <CandidateForm 
              initialData={initialCandidateData}
              onSubmit={handleSubmit}
              onDataChange={handleDataChange}
              recommendationTemplate={recommendationTemplate}
              recommendationText={recommendationText}
              onRecommendationTemplateChange={setRecommendationTemplate}
              onRecommendationTextChange={setRecommendationText}
              onGenerateRecommendation={handleGenerateRecommendation}
              isOwnCompany={effectiveCompanyType === 'own'}
            />
          </TabsContent>
          
          <TabsContent value="resume">
            <ResumeUpload />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Candidates;
