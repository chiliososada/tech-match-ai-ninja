
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

export function Matching() {
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [matchingResults, setMatchingResults] = useState<any[]>([
    {
      id: 1,
      candidate: '鈴木太郎',
      case: 'Java開発エンジニア',
      matchingRate: '92%',
      matchingReason: 'スキル・経験年数・単価が一致',
      status: '提案済み',
      statusClass: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      candidate: '田中花子',
      case: 'フロントエンドエンジニア',
      matchingRate: '89%',
      matchingReason: 'React経験が案件要件に一致',
      status: '未提案',
      statusClass: 'bg-gray-100 text-gray-800'
    },
    {
      id: 3,
      candidate: '佐藤一郎',
      case: 'インフラエンジニア',
      matchingRate: '94%',
      matchingReason: 'AWS/Dockerの経験が豊富',
      status: '選考中',
      statusClass: 'bg-amber-100 text-amber-800'
    },
    {
      id: 4,
      candidate: '山田健太',
      case: 'バックエンドエンジニア',
      matchingRate: '75%',
      matchingReason: 'Python経験あるが、年数不足',
      status: '未提案',
      statusClass: 'bg-gray-100 text-gray-800'
    }
  ]);

  const form = useForm({
    defaultValues: {
      skills: 'Java, Python, React',
      experience: '3',
      budget: '50~80',
      location: '東京',
      workType: 'リモート可',
      priority: 'high'
    }
  });

  const startMatching = (data: any) => {
    // Start the matching process
    setMatchingInProgress(true);
    setProgress(0);

    // Show toast notification
    toast({
      title: "マッチング処理を開始しました",
      description: "処理が完了するまでお待ちください",
    });

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setMatchingInProgress(false);
          
          // Show completion toast
          toast({
            title: "マッチング完了",
            description: "4人の候補者が見つかりました",
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">案件とのマッチング</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Parameter Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle className="japanese-text">マッチングパラメータ設定</CardTitle>
              <CardDescription className="japanese-text">
                案件に合った人材を探すためのパラメータを設定してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(startMatching)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="japanese-text">必要スキル</FormLabel>
                        <FormControl>
                          <Input placeholder="Java, Python, React など" {...field} className="japanese-text" />
                        </FormControl>
                        <FormDescription className="japanese-text">
                          カンマ区切りでスキルを入力してください
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="japanese-text">必要経験年数</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="japanese-text">
                              <SelectValue placeholder="経験年数を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1" className="japanese-text">1年以上</SelectItem>
                            <SelectItem value="3" className="japanese-text">3年以上</SelectItem>
                            <SelectItem value="5" className="japanese-text">5年以上</SelectItem>
                            <SelectItem value="10" className="japanese-text">10年以上</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="japanese-text">予算範囲（万円）</FormLabel>
                        <FormControl>
                          <Input placeholder="50~80" {...field} className="japanese-text" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="japanese-text">勤務地</FormLabel>
                        <FormControl>
                          <Input placeholder="東京" {...field} className="japanese-text" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="workType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="japanese-text">勤務形態</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="japanese-text">
                              <SelectValue placeholder="勤務形態を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="オンサイト" className="japanese-text">オンサイト</SelectItem>
                            <SelectItem value="リモート可" className="japanese-text">リモート可</SelectItem>
                            <SelectItem value="フルリモート" className="japanese-text">フルリモート</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="japanese-text">優先度</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="japanese-text">
                              <SelectValue placeholder="優先度を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low" className="japanese-text">低</SelectItem>
                            <SelectItem value="medium" className="japanese-text">中</SelectItem>
                            <SelectItem value="high" className="japanese-text">高</SelectItem>
                            <SelectItem value="urgent" className="japanese-text">緊急</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full japanese-text" 
                    disabled={matchingInProgress}
                  >
                    {matchingInProgress ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        <span className="japanese-text">マッチング処理中...</span>
                      </>
                    ) : (
                      <span className="japanese-text">マッチングを開始</span>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Matching Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle className="japanese-text">マッチング進捗</CardTitle>
              <CardDescription className="japanese-text">
                AIによるマッチング処理の進捗状況
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium japanese-text">マッチング処理</span>
                  <span className="text-sm font-medium japanese-text">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              {matchingInProgress ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin text-blue-500" />
                    <span className="text-sm japanese-text">候補者データを分析中...</span>
                  </div>
                  <div className="text-sm text-muted-foreground japanese-text">
                    マッチング中も他の機能を使用できます。処理が完了するとお知らせします。
                  </div>
                </div>
              ) : progress === 100 ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-green-500 japanese-text">マッチング完了!</span>
                  </div>
                  <div className="text-sm text-muted-foreground japanese-text">
                    4人の候補者が見つかりました。下記の結果をご確認ください。
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm japanese-text">「マッチングを開始」ボタンを押して処理を開始してください</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Matching Results Card */}
        <Card>
          <CardHeader>
            <CardTitle className="japanese-text">マッチング結果</CardTitle>
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
                {matchingResults.map(result => (
                  <div key={result.id} className="grid grid-cols-5 gap-4 p-4 items-center">
                    <div className="font-medium japanese-text">{result.candidate}</div>
                    <div className="japanese-text text-sm">{result.case}</div>
                    <div>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                        {result.matchingRate}
                      </span>
                    </div>
                    <div className="japanese-text text-sm">{result.matchingReason}</div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${result.statusClass} japanese-text`}>
                        {result.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="japanese-text">CSV出力</Button>
            <Button className="japanese-text">一括提案</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Matching;
