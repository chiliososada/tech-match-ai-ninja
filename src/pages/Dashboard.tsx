
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Dashboard() {
  // Mock data for the dashboard
  const recentCases = [
    { id: 1, title: 'Java開発エンジニア', company: '株式会社テクノロジー', location: '東京', postedAt: '2日前' },
    { id: 2, title: 'フロントエンドエンジニア', company: 'デジタルソリューションズ', location: '大阪', postedAt: '3日前' },
    { id: 3, title: 'インフラエンジニア', company: 'クラウドシステムズ', location: '名古屋', postedAt: '1週間前' },
  ];

  const recentCandidates = [
    { id: 1, name: '鈴木太郎', skills: 'Java, Spring Boot, AWS', experience: '7年', lastUpdated: '1日前' },
    { id: 2, name: '田中花子', skills: 'React, TypeScript, Node.js', experience: '5年', lastUpdated: '3日前' },
    { id: 3, name: '佐藤一郎', skills: 'Python, Django, Docker', experience: '3年', lastUpdated: '1週間前' },
  ];

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">ダッシュボード</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="japanese-text">
              レポート出力
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="全案件数" 
            value="42"
            description="先月比 +12%" 
          />
          <StatsCard 
            title="現在の有効案件" 
            value="18"
            description="先週比 +3" 
          />
          <StatsCard 
            title="候補者データベース" 
            value="156"
            description="新規: 今週 +5" 
          />
          <StatsCard 
            title="マッチング成功率" 
            value="67%"
            description="先月比 +5%" 
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="japanese-text">最近の案件</CardTitle>
                <CardDescription className="japanese-text">最近追加または更新された案件</CardDescription>
              </div>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none japanese-text">{item.title}</p>
                      <p className="text-sm text-muted-foreground japanese-text">
                        {item.company} - {item.location}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-xs text-muted-foreground japanese-text">{item.postedAt}</p>
                      <Button variant="ghost" size="icon" className="ml-2 h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 w-full japanese-text" asChild>
                <a href="/cases">全ての案件を見る</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle className="japanese-text">最近の候補者</CardTitle>
                <CardDescription className="japanese-text">最近追加または更新された候補者</CardDescription>
              </div>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCandidates.map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none japanese-text">{candidate.name}</p>
                      <p className="text-sm text-muted-foreground truncate japanese-text" style={{ maxWidth: '200px' }}>
                        {candidate.skills}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-xs text-muted-foreground japanese-text">{candidate.lastUpdated}</p>
                      <Button variant="ghost" size="icon" className="ml-2 h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 w-full japanese-text" asChild>
                <a href="/candidates">全ての候補者を見る</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
