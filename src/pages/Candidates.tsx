
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ResumeUpload } from '@/components/candidates/ResumeUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

export function Candidates() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">人材管理</h2>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload" className="japanese-text">履歴書アップロード</TabsTrigger>
            <TabsTrigger value="list" className="japanese-text">候補者一覧</TabsTrigger>
            <TabsTrigger value="matching" className="japanese-text">マッチング</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <ResumeUpload />
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="japanese-text">構造化データ</CardTitle>
                  <CardDescription className="japanese-text">
                    AIにより抽出された候補者情報
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md bg-muted p-4">
                    <pre className="text-sm whitespace-pre-wrap">
{`{
  "name": "鈴木太郎",
  "email": "taro.suzuki@example.com",
  "phone": "090-1234-5678",
  "skills": [
    {"name": "Java", "years": 7},
    {"name": "Spring Boot", "years": 5},
    {"name": "AWS", "years": 3},
    {"name": "Docker", "years": 2}
  ],
  "japaneseLevel": "ビジネスレベル",
  "experience": [
    {
      "company": "テクノロジー株式会社",
      "title": "シニアエンジニア",
      "period": "2018-2023",
      "description": "金融システムの開発..."
    }
  ],
  "education": {
    "university": "東京工科大学",
    "degree": "情報工学学士",
    "graduationYear": 2017
  },
  "desiredConditions": {
    "location": ["東京", "リモート"],
    "salary": "60万円〜80万円"
  }
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="japanese-text">推薦文生成</CardTitle>
                  <CardDescription className="japanese-text">
                    候補者の自動生成された推薦文
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    readOnly 
                    className="min-h-[300px] japanese-text" 
                    value="鈴木さんはJavaとSpring Bootを中心に7年以上の開発経験があり、日本語はビジネスレベルです。金融系のプロジェクトに強みがあり、AWSやDockerなどのクラウド技術も習得しています。チームリーダーとしての経験もあり、要件定義から設計、実装、テストまでの一連の開発プロセスを担当できます。直近では大手金融機関のオンラインバンキングシステム開発に5年間携わっており、セキュリティに関する知識も豊富です。希望条件は東京またはリモートワークで、単価は60万円〜80万円です。"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">候補者一覧</CardTitle>
                <CardDescription className="japanese-text">
                  登録済みの候補者一覧と詳細を表示します
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div className="japanese-text">名前</div>
                    <div className="japanese-text">スキル</div>
                    <div className="japanese-text">経験年数</div>
                    <div className="japanese-text">日本語レベル</div>
                    <div className="japanese-text">希望条件</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">鈴木太郎</div>
                      <div className="japanese-text text-sm truncate">Java, Spring Boot, AWS</div>
                      <div className="japanese-text text-sm">7年</div>
                      <div className="japanese-text text-sm">ビジネスレベル</div>
                      <div className="japanese-text text-sm truncate">東京/リモート, 60~80万円</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">田中花子</div>
                      <div className="japanese-text text-sm truncate">React, TypeScript, Node.js</div>
                      <div className="japanese-text text-sm">5年</div>
                      <div className="japanese-text text-sm">ネイティブ</div>
                      <div className="japanese-text text-sm truncate">大阪/リモート, 55~70万円</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">山田健太</div>
                      <div className="japanese-text text-sm truncate">Python, Django, Docker</div>
                      <div className="japanese-text text-sm">3年</div>
                      <div className="japanese-text text-sm">日常会話レベル</div>
                      <div className="japanese-text text-sm truncate">リモートのみ, 50~65万円</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">佐藤一郎</div>
                      <div className="japanese-text text-sm truncate">AWS, Docker, Kubernetes</div>
                      <div className="japanese-text text-sm">8年</div>
                      <div className="japanese-text text-sm">ビジネスレベル</div>
                      <div className="japanese-text text-sm truncate">東京, 70~90万円</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="matching">
            <Card>
              <CardHeader>
                <CardTitle className="japanese-text">案件とのマッチング</CardTitle>
                <CardDescription className="japanese-text">
                  AIによる候補者と案件のマッチング結果
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div className="japanese-text">候補者</div>
                    <div className="japanese-text">案件</div>
                    <div className="japanese-text">マッチング度</div>
                    <div className="japanese-text">マッチング理由</div>
                    <div className="japanese-text">ステータス</div>
                  </div>
                  <div className="divide-y">
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">鈴木太郎</div>
                      <div className="japanese-text text-sm">Java開発エンジニア</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                          92%
                        </span>
                      </div>
                      <div className="japanese-text text-sm">スキル・経験年数・単価が一致</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 japanese-text">
                          提案済み
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">田中花子</div>
                      <div className="japanese-text text-sm">フロントエンドエンジニア</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                          89%
                        </span>
                      </div>
                      <div className="japanese-text text-sm">React経験が案件要件に一致</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 japanese-text">
                          未提案
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">佐藤一郎</div>
                      <div className="japanese-text text-sm">インフラエンジニア</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                          94%
                        </span>
                      </div>
                      <div className="japanese-text text-sm">AWS/Dockerの経験が豊富</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 japanese-text">
                          選考中
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4 items-center">
                      <div className="font-medium japanese-text">山田健太</div>
                      <div className="japanese-text text-sm">バックエンドエンジニア</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 japanese-text">
                          75%
                        </span>
                      </div>
                      <div className="japanese-text text-sm">Python経験あるが、年数不足</div>
                      <div>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 japanese-text">
                          未提案
                        </span>
                      </div>
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

export default Candidates;
