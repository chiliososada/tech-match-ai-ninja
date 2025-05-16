
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/card-tabs';
import { CandidateList } from '@/components/candidates/CandidateList';
import { CandidateForm } from '@/components/candidates/CandidateForm';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { BulkEmailTab } from '@/components/candidates/BulkEmailTab';
import { useLocation } from 'react-router-dom';

interface CandidatesProps {
  companyType?: 'own' | 'other';
}

export function Candidates({ companyType = 'own' }: CandidatesProps) {
  const location = useLocation();
  
  // Company type from URL for backward compatibility
  const urlCompanyType = location.pathname.includes('/company/other') ? 'other' : 'own';
  const effectiveCompanyType = urlCompanyType || companyType;
  
  // Page title based on company type
  const pageTitle = effectiveCompanyType === 'own' ? '自社人材管理' : '他社人材管理';

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6 japanese-text">{pageTitle}</h1>
        
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list" className="japanese-text">人材一覧</TabsTrigger>
            <TabsTrigger value="add" className="japanese-text">新規登録</TabsTrigger>
            <TabsTrigger value="resume" className="japanese-text">履歴書アップロード</TabsTrigger>
            <TabsTrigger value="email" className="japanese-text">一括メール</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <CandidateList companyType={effectiveCompanyType} />
          </TabsContent>
          
          <TabsContent value="add">
            <CandidateForm companyType={effectiveCompanyType} />
          </TabsContent>
          
          <TabsContent value="resume">
            <ResumeUpload companyType={effectiveCompanyType} />
          </TabsContent>
          
          <TabsContent value="email">
            <BulkEmailTab companyType={effectiveCompanyType} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Candidates;
