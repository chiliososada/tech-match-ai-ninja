
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CompanyTypeAnalysis } from '@/components/email-analysis/CompanyTypeAnalysis';
import { EmailListWithExtraction } from '@/components/email-analysis/EmailListWithExtraction';
import { CompanyEmailHistory } from '@/components/email-analysis/CompanyEmailHistory';
import { toast } from '@/hooks/use-toast';

export function EmailAnalysis() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">メール解析・分析</h2>
        </div>

        <Tabs defaultValue="company-type-analysis" className="space-y-6">
          <TabsList>
            <TabsTrigger value="company-type-analysis" className="japanese-text">企業タイプ分析</TabsTrigger>
            <TabsTrigger value="email-list" className="japanese-text">メール一覧</TabsTrigger>
            <TabsTrigger value="company-history" className="japanese-text">会社別メール履歴</TabsTrigger>
          </TabsList>
          
          <TabsContent value="company-type-analysis" className="space-y-6">
            <CompanyTypeAnalysis />
          </TabsContent>
          
          <TabsContent value="email-list" className="space-y-6">
            <EmailListWithExtraction />
          </TabsContent>
          
          <TabsContent value="company-history" className="space-y-6">
            <CompanyEmailHistory />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default EmailAnalysis;
