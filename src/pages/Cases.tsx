
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CaseUploadForm } from '@/components/cases/CaseUploadForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Cases() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">案件管理</h2>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload" className="japanese-text">案件アップロード</TabsTrigger>
            <TabsTrigger value="list" className="japanese-text">案件一覧</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">新規案件の追加</CardTitle>
                <CardDescription className="japanese-text">
                  案件情報をアップロードまたは手動で入力して、システムに追加します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CaseUploadForm />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">案件情報の構造化</CardTitle>
                <CardDescription className="japanese-text">
                  AIにより案件情報が以下のように自動的に構造化されます
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-4">
                  <pre className="text-sm whitespace-pre-wrap">
{`{
  "title": "Java開発エンジニア",
  "skills": ["Java", "Spring Boot", "SQL"],
  "experience": "5年以上",
  "location": "東京都",
  "workType": "リモート可（週3出社）",
  "duration": "6ヶ月〜",
  "budget": "60万円〜80万円",
  "japanese": "ビジネスレベル",
  "priority": "高",
  "description": "金融系システムの新規開発プロジェクト..."
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">案件一覧</CardTitle>
                <CardDescription className="japanese-text">
                  登録済みの案件一覧と詳細を表示します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div className="japanese-text">案件名</div>
                    <div className="japanese-text">スキル</div>
                    <div className="japanese-text">勤務地</div>
                    <div className="japanese-text">単価</div>
                    <div className="japanese-text">ステータス</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">Java開発エンジニア</div>
                      <div className="japanese-text text-sm">Java, Spring Boot, SQL</div>
                      <div className="japanese-text text-sm">東京（リモート可）</div>
                      <div className="japanese-text text-sm">60~80万円</div>
                      <div><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">募集中</span></div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">フロントエンドエンジニア</div>
                      <div className="japanese-text text-sm">React, TypeScript, Next.js</div>
                      <div className="japanese-text text-sm">大阪</div>
                      <div className="japanese-text text-sm">55~70万円</div>
                      <div><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">募集中</span></div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">インフラエンジニア</div>
                      <div className="japanese-text text-sm">AWS, Docker, Kubernetes</div>
                      <div className="japanese-text text-sm">名古屋</div>
                      <div className="japanese-text text-sm">65~90万円</div>
                      <div><span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 japanese-text">選考中</span></div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">QAエンジニア</div>
                      <div className="japanese-text text-sm">テスト自動化, Selenium</div>
                      <div className="japanese-text text-sm">リモート</div>
                      <div className="japanese-text text-sm">50~65万円</div>
                      <div><span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 japanese-text">提案済</span></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Cases;
