
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CandidateList } from '@/components/candidates/CandidateList';
import { CandidateForm } from '@/components/candidates/CandidateForm';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { BulkEmailTab } from '@/components/candidates/BulkEmailTab';
import { useLocation } from 'react-router-dom';
import { Engineer, CategoryType } from '@/components/candidates/types';

interface CandidatesProps {
  companyType?: 'own' | 'other';
}

// First, let's fix the default props for the components
// Creating mock initialData for CandidateForm
const initialCandidateData = {
  name: '',
  skills: '',
  japaneseLevel: '',
  experience: '',
  availability: '',
  status: '',
  desiredConditions: '',
  companyType: '',
  companyName: '',
  source: '',
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
    status: '案件探し中',
    desiredConditions: '東京/リモート, 60~80万円',
    companyType: '自社',
    companyName: 'テックイノベーション株式会社',
    source: '直接応募',
    registeredAt: '2023-01-15',
    updatedAt: '2023-03-20',
  },
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

  // Handle candidate view/edit actions - Updated to accept Engineer object
  const handleViewDetails = (engineer: Engineer) => {
    console.log(`View details for candidate: ${engineer.id}`);
  };

  const handleEditEngineer = (engineer: Engineer) => {
    console.log(`Edit candidate: ${engineer.id}`);
  };

  const handleDeleteEngineer = (id: string) => {
    console.log(`Delete candidate: ${id}`);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Change status of candidate ${id} to ${newStatus}`);
  };
  
  // Add a function to handle resume downloads
  const handleDownloadResume = (id: string) => {
    console.log(`Download resume for candidate: ${id}`);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleDataChange = (data: any) => {
    // Handle data change
  };

  const handleGenerateRecommendation = () => {
    // Handle recommendation generation
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <h1 className="text-3xl font-bold mb-6 japanese-text">{pageTitle}</h1>
        
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list" className="japanese-text">人材一覧</TabsTrigger>
            <TabsTrigger value="add" className="japanese-text">新規登録</TabsTrigger>
            <TabsTrigger value="resume" className="japanese-text">履歴書アップロード</TabsTrigger>
            <TabsTrigger value="email" className="japanese-text">一括メール</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <CandidateList 
              engineers={mockEngineers}
              categories={mockCategories}
              onViewDetails={handleViewDetails}
              onEditEngineer={handleEditEngineer}
              onDeleteEngineer={handleDeleteEngineer}
              onStatusChange={handleStatusChange}
              onDownloadResume={handleDownloadResume}
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
            />
          </TabsContent>
          
          <TabsContent value="resume">
            <ResumeUpload />
          </TabsContent>
          
          <TabsContent value="email">
            <BulkEmailTab />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Candidates;
