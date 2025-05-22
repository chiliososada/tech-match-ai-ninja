import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsWithContext } from '@/components/ui/tabs';
import { CandidateList } from '@/components/candidates/CandidateList';
import { CandidateForm } from '@/components/candidates/CandidateForm';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { useLocation } from 'react-router-dom';
import { Engineer, CategoryType, NewEngineerType } from '@/components/candidates/types';
import { toast } from 'sonner';
import { CandidateDetails } from '@/components/candidates/CandidateDetails';
import { CandidateEdit } from '@/components/candidates/CandidateEdit';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { candidatesData } from '@/components/candidates/data/candidatesData';

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
const mockEngineers: Engineer[] = candidatesData;

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

  // Generate a unique contextId based on company type to keep tabs independent
  const tabContextId = `candidates-${effectiveCompanyType}`;

  const [recommendationTemplate, setRecommendationTemplate] = useState<string>('');
  const [recommendationText, setRecommendationText] = useState<string>('');

  // Add state for modal visibility and selected engineer
  const [selectedEngineer, setSelectedEngineer] = useState<Engineer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [engineerToDelete, setEngineerToDelete] = useState<string | null>(null);

  // Handle candidate view/edit actions
  const handleViewDetails = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setIsDetailsOpen(true);
    toast.info(`${engineer.name}の詳細を表示`);
  };

  const handleEditEngineer = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    setIsEditOpen(true);
    toast.info(`${engineer.name}の編集を開始`);
  };

  const handleDeleteEngineer = (id: string) => {
    setEngineerToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (engineerToDelete) {
      console.log(`Delete candidate: ${engineerToDelete}`);
      toast.success('候補者を削除しました');
      setIsDeleteDialogOpen(false);
      setEngineerToDelete(null);
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Change status of candidate ${id} to ${newStatus}`);
    toast.success('ステータスを更新しました');
  };

  const handleEngineerStatusChange = (value: string) => {
    if (selectedEngineer) {
      handleStatusChange(selectedEngineer.id, value);
    }
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

  // Handle engineer edit
  const handleEngineerChange = (engineer: Engineer) => {
    setSelectedEngineer(engineer);
    console.log('Updated engineer:', engineer);
  };

  const handleSaveEdit = () => {
    toast.success('技術者情報を更新しました');
    setIsEditOpen(false);
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <h1 className="text-3xl font-bold mb-6 japanese-text">{pageTitle}</h1>
        
        <TabsWithContext defaultValue="list" className="w-full" contextId={tabContextId}>
          <TabsList className="mb-4">
            <TabsTrigger value="list" contextId={tabContextId} className="japanese-text">人材一覧</TabsTrigger>
            <TabsTrigger value="add" contextId={tabContextId} className="japanese-text">新規登録</TabsTrigger>
            <TabsTrigger value="resume" contextId={tabContextId} className="japanese-text">履歴書アップロード</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" contextId={tabContextId} className="w-full">
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
          
          <TabsContent value="add" contextId={tabContextId}>
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
          
          <TabsContent value="resume" contextId={tabContextId}>
            <ResumeUpload />
          </TabsContent>
        </TabsWithContext>

        {/* 候補者詳細モーダル */}
        <CandidateDetails 
          open={isDetailsOpen} 
          onOpenChange={setIsDetailsOpen}
          engineer={selectedEngineer}
          onStatusChange={handleEngineerStatusChange}
          onEditClick={() => {
            setIsDetailsOpen(false);
            setIsEditOpen(true);
          }}
        />

        {/* 候補者編集モーダル */}
        <CandidateEdit 
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          engineer={selectedEngineer}
          onEngineerChange={handleEngineerChange}
          onSave={handleSaveEdit}
          isOwnCompany={effectiveCompanyType === 'own'}
        />

        {/* 削除確認ダイアログ */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="japanese-text">候補者削除の確認</AlertDialogTitle>
              <AlertDialogDescription className="japanese-text">
                この候補者を削除してもよろしいですか？この操作は元に戻すことができません。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="japanese-text">キャンセル</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="japanese-text bg-red-600 hover:bg-red-700">
                削除
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
}

export default Candidates;
