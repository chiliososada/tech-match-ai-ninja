
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { CandidateEmailSender } from '@/components/candidates/CandidateEmailSender';

export function Candidates() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">人材管理</h2>
        </div>

        <Tabs defaultValue="resume-upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="resume-upload" className="japanese-text">レジュメアップロード</TabsTrigger>
            <TabsTrigger value="email" className="japanese-text">一括送信</TabsTrigger>
          </TabsList>

          <TabsContent value="resume-upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">
                  レジュメ管理
                </CardTitle>
                <CardDescription className="japanese-text">
                  技術者のレジュメをアップロードし、AIで分析して技術者情報を抽出します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <ResumeUpload />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <CandidateEmailSender candidateCompanies={[]} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Candidates;
