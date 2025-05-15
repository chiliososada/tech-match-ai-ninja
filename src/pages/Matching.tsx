
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
import { Loader, Search, FileText, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function Matching() {
  // Common state
  const [activeTab, setActiveTab] = useState<"case-to-candidate" | "candidate-to-case">("case-to-candidate");

  // Case to candidate matching states
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

  // Candidate to case matching states
  const [candidateMatchingInProgress, setCandidateMatchingInProgress] = useState(false);
  const [candidateProgress, setCandidateProgress] = useState(0);
  const [candidateMatchingResults, setCandidateMatchingResults] = useState<any[]>([
    {
      id: 1,
      candidate: '鈴木太郎',
      case: 'Java開発エンジニア',
      matchingRate: '92%',
      matchingReason: 'スキル・経験年数・単価が一致',
      status: '提案可能',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      candidate: '鈴木太郎',
      case: 'フロントエンドエンジニア',
      matchingRate: '85%',
      matchingReason: 'React経験が案件要件に一致',
      status: '提案可能',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      candidate: '鈴木太郎',
      case: 'バックエンドエンジニア',
      matchingRate: '78%',
      matchingReason: 'Java経験あり、フレームワーク経験なし',
      status: '要検討',
      statusClass: 'bg-amber-100 text-amber-800'
    }
  ]);

  // Dummy data for existing cases and candidates
  const existingCases = [
    { id: 1, title: 'Java開発エンジニア', client: '株式会社テック' },
    { id: 2, title: 'フロントエンドエンジニア', client: 'デジタルソリューション株式会社' },
    { id: 3, title: 'インフラエンジニア', client: 'クラウドシステム株式会社' },
    { id: 4, title: 'バックエンドエンジニア', client: 'ウェブサービス株式会社' }
  ];

  const existingCandidates = [
    { id: 1, name: '鈴木太郎', skills: 'Java, Spring, AWS' },
    { id: 2, name: '田中花子', skills: 'React, TypeScript, Node.js' },
    { id: 3, name: '佐藤一郎', skills: 'AWS, Docker, Kubernetes' },
    { id: 4, name: '山田健太', skills: 'Python, Django, MySQL' }
  ];

  // Forms
  const caseForm = useForm({
    defaultValues: {
      skills: 'Java, Python, React',
      experience: '3',
      budget: '50~80',
      location: '東京',
      workType: 'リモート可',
      priority: 'high'
    }
  });

  const candidateForm = useForm({
    defaultValues: {
      skills: 'Java, Spring, AWS',
      experience: '5',
      budget: '60~90',
      location: '東京',
      workType: 'リモート可',
      availability: 'immediate'
    }
  });

  // Handle Case to Candidate matching
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

  // Handle Candidate to Case matching
  const startCandidateMatching = (data: any) => {
    // Start the matching process
    setCandidateMatchingInProgress(true);
    setCandidateProgress(0);

    // Show toast notification
    toast({
      title: "マッチング処理を開始しました",
      description: "処理が完了するまでお待ちください",
    });

    // Simulate progress updates
    const interval = setInterval(() => {
      setCandidateProgress(prev => {
        const newProgress = prev + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setCandidateMatchingInProgress(false);
          
          // Show completion toast
          toast({
            title: "マッチング完了",
            description: "3つの案件が見つかりました",
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  // Handle case selection
  const handleCaseSelect = (selectedCase: any) => {
    toast({
      title: "案件を選択しました",
      description: `${selectedCase.title}の情報をフォームに反映しました`,
    });
    
    // Here you would update the form with the selected case data
  };

  // Handle candidate selection
  const handleCandidateSelect = (selectedCandidate: any) => {
    toast({
      title: "人材を選択しました",
      description: `${selectedCandidate.name}の情報をフォームに反映しました`,
    });
    
    candidateForm.setValue('skills', selectedCandidate.skills);
    // Here you would update other form fields based on the candidate
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">案件とのマッチング</h2>
        </div>

        <Tabs defaultValue="case-to-candidate" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="case-to-candidate" className="japanese-text">
              <FileText className="mr-2 h-4 w-4" />
              案件から人材を探す
            </TabsTrigger>
            <TabsTrigger value="candidate-to-case" className="japanese-text">
              <Users className="mr-2 h-4 w-4" />
              人材に合う案件を探す
            </TabsTrigger>
          </TabsList>
          
          {/* Case to Candidate Tab */}
          <TabsContent value="case-to-candidate">
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
                  <div className="flex space-x-2 mb-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full japanese-text">
                          <FileText className="mr-2 h-4 w-4" />
                          既存案件から選択
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle className="japanese-text">既存案件から選択</DialogTitle>
                          <DialogDescription className="japanese-text">
                            マッチングに使用する案件を選択してください
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 max-h-80 overflow-y-auto">
                          <Input placeholder="案件を検索" className="japanese-text" />
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="japanese-text">案件名</TableHead>
                                <TableHead className="japanese-text">クライアント</TableHead>
                                <TableHead className="w-24 text-right"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {existingCases.map((caseItem) => (
                                <TableRow key={caseItem.id}>
                                  <TableCell className="font-medium japanese-text">{caseItem.title}</TableCell>
                                  <TableCell className="japanese-text">{caseItem.client}</TableCell>
                                  <TableCell className="text-right">
                                    <Button size="sm" variant="outline" onClick={() => handleCaseSelect(caseItem)} className="japanese-text">選択</Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="w-full japanese-text">
                      <Search className="mr-2 h-4 w-4" />
                      案件テキスト検索
                    </Button>
                  </div>

                  <Form {...caseForm}>
                    <form onSubmit={caseForm.handleSubmit(startMatching)} className="space-y-6">
                      <FormField
                        control={caseForm.control}
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
                        control={caseForm.control}
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
                        control={caseForm.control}
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
                        control={caseForm.control}
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
                        control={caseForm.control}
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
                        control={caseForm.control}
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
            <Card className="mt-8">
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
          </TabsContent>
          
          {/* Candidate to Case Tab */}
          <TabsContent value="candidate-to-case">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Candidate Parameter Settings Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="japanese-text">人材パラメータ設定</CardTitle>
                  <CardDescription className="japanese-text">
                    人材に合った案件を探すためのパラメータを設定してください
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mb-6 japanese-text">
                        <Users className="mr-2 h-4 w-4" />
                        既存人材から選択
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle className="japanese-text">既存人材から選択</DialogTitle>
                        <DialogDescription className="japanese-text">
                          マッチングに使用する人材を選択してください
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 max-h-80 overflow-y-auto">
                        <Input placeholder="人材を検索" className="japanese-text" />
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="japanese-text">氏名</TableHead>
                              <TableHead className="japanese-text">スキル</TableHead>
                              <TableHead className="w-24 text-right"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {existingCandidates.map((candidate) => (
                              <TableRow key={candidate.id}>
                                <TableCell className="font-medium japanese-text">{candidate.name}</TableCell>
                                <TableCell className="japanese-text">{candidate.skills}</TableCell>
                                <TableCell className="text-right">
                                  <Button size="sm" variant="outline" onClick={() => handleCandidateSelect(candidate)} className="japanese-text">選択</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Form {...candidateForm}>
                    <form onSubmit={candidateForm.handleSubmit(startCandidateMatching)} className="space-y-6">
                      <FormField
                        control={candidateForm.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="japanese-text">保有スキル</FormLabel>
                            <FormControl>
                              <Input placeholder="Java, Spring, AWS など" {...field} className="japanese-text" />
                            </FormControl>
                            <FormDescription className="japanese-text">
                              カンマ区切りでスキルを入力してください
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={candidateForm.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="japanese-text">経験年数</FormLabel>
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
                                <SelectItem value="1" className="japanese-text">1年</SelectItem>
                                <SelectItem value="3" className="japanese-text">3年</SelectItem>
                                <SelectItem value="5" className="japanese-text">5年</SelectItem>
                                <SelectItem value="10" className="japanese-text">10年以上</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={candidateForm.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="japanese-text">単価範囲（万円）</FormLabel>
                            <FormControl>
                              <Input placeholder="60~90" {...field} className="japanese-text" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={candidateForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="japanese-text">希望勤務地</FormLabel>
                            <FormControl>
                              <Input placeholder="東京" {...field} className="japanese-text" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={candidateForm.control}
                        name="workType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="japanese-text">希望勤務形態</FormLabel>
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
                        control={candidateForm.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="japanese-text">稼働可能時期</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="japanese-text">
                                  <SelectValue placeholder="稼働可能時期を選択" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="immediate" className="japanese-text">即日</SelectItem>
                                <SelectItem value="2weeks" className="japanese-text">2週間以内</SelectItem>
                                <SelectItem value="1month" className="japanese-text">1ヶ月以内</SelectItem>
                                <SelectItem value="3months" className="japanese-text">3ヶ月以内</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full japanese-text" 
                        disabled={candidateMatchingInProgress}
                      >
                        {candidateMatchingInProgress ? (
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

              {/* Candidate Matching Progress Card */}
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
                      <span className="text-sm font-medium japanese-text">{candidateProgress}%</span>
                    </div>
                    <Progress value={candidateProgress} className="h-2" />
                  </div>
                  
                  {candidateMatchingInProgress ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Loader className="h-4 w-4 animate-spin text-blue-500" />
                        <span className="text-sm japanese-text">案件データを分析中...</span>
                      </div>
                      <div className="text-sm text-muted-foreground japanese-text">
                        マッチング中も他の機能を使用できます。処理が完了するとお知らせします。
                      </div>
                    </div>
                  ) : candidateProgress === 100 ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-green-500 japanese-text">マッチング完了!</span>
                      </div>
                      <div className="text-sm text-muted-foreground japanese-text">
                        3つの案件が見つかりました。下記の結果をご確認ください。
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

            {/* Candidate Matching Results Card */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="japanese-text">マッチング結果</CardTitle>
                <CardDescription className="japanese-text">
                  AIによる人材と案件のマッチング結果
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
                    {candidateMatchingResults.map(result => (
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
                <Button className="japanese-text">一括応募</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default Matching;
