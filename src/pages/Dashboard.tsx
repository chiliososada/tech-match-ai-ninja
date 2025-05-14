
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function Dashboard() {
  // Mock data for the dashboard with source and date information
  const recentCases = [
    { id: 1, title: 'Java開発エンジニア', company: '株式会社テクノロジー', location: '東京', postedAt: '2025-05-14', source: 'mail', daysAgo: 0 },
    { id: 2, title: 'フロントエンドエンジニア', company: 'デジタルソリューションズ', location: '大阪', postedAt: '2025-05-13', source: 'manual', daysAgo: 1 },
    { id: 3, title: 'インフラエンジニア', company: 'クラウドシステムズ', location: '名古屋', postedAt: '2025-05-12', source: 'mail', daysAgo: 2 },
    { id: 4, title: 'QAエンジニア', company: 'テストシステム株式会社', location: 'リモート', postedAt: '2025-05-11', source: 'manual', daysAgo: 3 },
    { id: 5, title: 'PHP開発エンジニア', company: 'ウェブシステム株式会社', location: '東京', postedAt: '2025-05-09', source: 'mail', daysAgo: 5 },
    { id: 6, title: 'Python開発者', company: 'AIソリューション', location: '福岡', postedAt: '2025-05-07', source: 'manual', daysAgo: 7 },
  ];

  const recentCandidates = [
    { id: 1, name: '鈴木太郎', skills: 'Java, Spring Boot, AWS', experience: '7年', lastUpdated: '2025-05-14', daysAgo: 0 },
    { id: 2, name: '田中花子', skills: 'React, TypeScript, Node.js', experience: '5年', lastUpdated: '2025-05-12', daysAgo: 2 },
    { id: 3, name: '佐藤一郎', skills: 'Python, Django, Docker', experience: '3年', lastUpdated: '2025-05-11', daysAgo: 3 },
    { id: 4, name: '山田次郎', skills: 'C#, .NET, Azure', experience: '8年', lastUpdated: '2025-05-08', daysAgo: 6 },
    { id: 5, name: '伊藤三郎', skills: 'PHP, Laravel, MySQL', experience: '4年', lastUpdated: '2025-05-07', daysAgo: 7 },
  ];

  // Filter cases by timeframe
  const getFilteredCases = (days: number, source?: string) => {
    return recentCases.filter(item => {
      const matchesTimeframe = days === 0 || item.daysAgo <= days;
      const matchesSource = !source || item.source === source;
      return matchesTimeframe && matchesSource;
    });
  };

  // Filter candidates by timeframe
  const getFilteredCandidates = (days: number) => {
    return recentCandidates.filter(item => days === 0 || item.daysAgo <= days);
  };

  // Get cases data for specific timeframe and source
  const last3DaysMailCases = getFilteredCases(3, 'mail');
  const last3DaysManualCases = getFilteredCases(3, 'manual');
  const lastWeekMailCases = getFilteredCases(7, 'mail');
  const lastWeekManualCases = getFilteredCases(7, 'manual');

  // Get candidate data for specific timeframe
  const last3DaysCandidates = getFilteredCandidates(3);
  const lastWeekCandidates = getFilteredCandidates(7);

  // Helper function to render case items
  const renderCaseItems = (items: typeof recentCases) => {
    return items.map((item) => (
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
    ));
  };

  // Helper function to render candidate items
  const renderCandidateItems = (items: typeof recentCandidates) => {
    return items.map((candidate) => (
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
    ));
  };

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
              <Tabs defaultValue="all">
                <TabsList className="mb-4 grid grid-cols-4">
                  <TabsTrigger value="all" className="japanese-text text-xs">全て</TabsTrigger>
                  <TabsTrigger value="3days" className="japanese-text text-xs">3日以内</TabsTrigger>
                  <TabsTrigger value="week" className="japanese-text text-xs">1週間以内</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground japanese-text">メールから取得</h4>
                    {renderCaseItems(getFilteredCases(0, 'mail').slice(0, 3))}
                    <h4 className="text-sm font-medium text-muted-foreground japanese-text">手動登録</h4>
                    {renderCaseItems(getFilteredCases(0, 'manual').slice(0, 3))}
                  </div>
                </TabsContent>
                <TabsContent value="3days" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground japanese-text">メールから取得（3日以内）</h4>
                    {renderCaseItems(last3DaysMailCases)}
                    <h4 className="text-sm font-medium text-muted-foreground japanese-text">手動登録（3日以内）</h4>
                    {renderCaseItems(last3DaysManualCases)}
                  </div>
                </TabsContent>
                <TabsContent value="week" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-muted-foreground japanese-text">メールから取得（1週間以内）</h4>
                    {renderCaseItems(lastWeekMailCases)}
                    <h4 className="text-sm font-medium text-muted-foreground japanese-text">手動登録（1週間以内）</h4>
                    {renderCaseItems(lastWeekManualCases)}
                  </div>
                </TabsContent>
              </Tabs>
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
              <Tabs defaultValue="all">
                <TabsList className="mb-4 grid grid-cols-3">
                  <TabsTrigger value="all" className="japanese-text text-xs">全て</TabsTrigger>
                  <TabsTrigger value="3days" className="japanese-text text-xs">3日以内</TabsTrigger>
                  <TabsTrigger value="week" className="japanese-text text-xs">1週間以内</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {renderCandidateItems(recentCandidates)}
                </TabsContent>
                <TabsContent value="3days" className="space-y-4">
                  {renderCandidateItems(last3DaysCandidates)}
                </TabsContent>
                <TabsContent value="week" className="space-y-4">
                  {renderCandidateItems(lastWeekCandidates)}
                </TabsContent>
              </Tabs>
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
