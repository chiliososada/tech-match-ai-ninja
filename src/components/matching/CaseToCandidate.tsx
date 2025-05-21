
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { FileText, Loader } from 'lucide-react';
import { CaseSelectionDialog } from './CaseSelectionDialog';
import { MatchingProgressCard } from './MatchingProgressCard';
import { MatchingResultsCard } from './MatchingResultsCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CaseTextInput } from './CaseTextInput';
import { Badge } from '@/components/ui/badge';

export interface CaseMatchingResult {
  id: number;
  candidate: string;
  candidateCompany?: string;
  candidateManager?: string;
  candidateEmail?: string;
  case: string;
  caseCompany?: string;
  caseManager?: string;
  caseEmail?: string;
  matchingRate: string;
  matchingReason: string;
  status: string;
  statusClass: string;
}

interface CaseItem {
  id: number;
  title: string;
  client: string;
  skills?: string[];
  experience?: string;
  budget?: string;
  location?: string;
  workType?: string;
  priority?: string;
  description?: string;
}

export function CaseToCandidate() {
  // Case to candidate matching states
  const [matchingInProgress, setMatchingInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [matchingResults, setMatchingResults] = useState<CaseMatchingResult[]>([
    {
      id: 1,
      candidate: '鈴木太郎',
      candidateCompany: 'テック株式会社',
      candidateManager: '佐藤部長',
      candidateEmail: 'sato@tech.co.jp',
      case: 'Java開発エンジニア',
      caseCompany: 'システム開発株式会社',
      caseManager: '田中課長',
      caseEmail: 'tanaka@system.co.jp',
      matchingRate: '92%',
      matchingReason: 'スキル・経験年数・単価が一致',
      status: '提案済み',
      statusClass: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      candidate: '田中花子',
      candidateCompany: 'エンジニア株式会社',
      candidateManager: '高橋部長',
      candidateEmail: 'takahashi@engineer.co.jp',
      case: 'フロントエンドエンジニア',
      caseCompany: 'ウェブ開発株式会社',
      caseManager: '伊藤課長',
      caseEmail: 'ito@web.co.jp',
      matchingRate: '89%',
      matchingReason: 'React経験が案件要件に一致',
      status: '未提案',
      statusClass: 'bg-gray-100 text-gray-800'
    },
    {
      id: 3,
      candidate: '佐藤一郎',
      candidateCompany: 'ITソリューション株式会社',
      candidateManager: '木村課長',
      candidateEmail: 'kimura@itsolution.co.jp',
      case: 'インフラエンジニア',
      caseCompany: 'クラウドサービス株式会社',
      caseManager: '小林部長',
      caseEmail: 'kobayashi@cloud.co.jp',
      matchingRate: '94%',
      matchingReason: 'AWS/Dockerの経験が豊富',
      status: '選考中',
      statusClass: 'bg-amber-100 text-amber-800'
    },
    {
      id: 4,
      candidate: '山田健太',
      candidateCompany: 'デベロップ株式会社',
      candidateManager: '山本課長',
      candidateEmail: 'yamamoto@develop.co.jp',
      case: 'バックエンドエンジニア',
      caseCompany: 'サーバー株式会社',
      caseManager: '加藤部長',
      caseEmail: 'kato@server.co.jp',
      matchingRate: '75%',
      matchingReason: 'Python経験あるが、年数不足',
      status: '未提案',
      statusClass: 'bg-gray-100 text-gray-800'
    },
    {
      id: 5,
      candidate: '伊藤誠',
      candidateCompany: 'モバイル株式会社',
      candidateManager: '中村部長',
      candidateEmail: 'nakamura@mobile.co.jp',
      case: 'モバイルアプリ開発',
      caseCompany: 'アプリケーション株式会社',
      caseManager: '斎藤課長',
      caseEmail: 'saito@application.co.jp',
      matchingRate: '88%',
      matchingReason: 'iOSとAndroid両方の開発経験あり',
      status: '提案済み',
      statusClass: 'bg-blue-100 text-blue-800'
    },
    {
      id: 6,
      candidate: '高橋直樹',
      candidateCompany: 'データ株式会社',
      candidateManager: '藤田課長',
      candidateEmail: 'fujita@data.co.jp',
      case: 'データサイエンティスト',
      caseCompany: '分析株式会社',
      caseManager: '佐々木部長',
      caseEmail: 'sasaki@analytics.co.jp',
      matchingRate: '91%',
      matchingReason: 'Pythonと機械学習のスキルが一致',
      status: '選考中',
      statusClass: 'bg-amber-100 text-amber-800'
    }
  ]);

  // Form
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

  // Handle case selection
  const handleCaseSelect = (caseItem: CaseItem) => {
    setSelectedCase(caseItem);
    
    // Update form with the selected case data
    if (caseItem.skills) {
      caseForm.setValue('skills', Array.isArray(caseItem.skills) ? caseItem.skills.join(', ') : caseItem.skills);
    }
    
    if (caseItem.experience) {
      caseForm.setValue('experience', caseItem.experience);
    }
    
    if (caseItem.budget) {
      caseForm.setValue('budget', caseItem.budget);
    }
    
    if (caseItem.location) {
      caseForm.setValue('location', caseItem.location);
    }
    
    if (caseItem.workType) {
      caseForm.setValue('workType', caseItem.workType);
    }
    
    if (caseItem.priority) {
      caseForm.setValue('priority', caseItem.priority);
    }
    
    toast({
      title: "案件を選択しました",
      description: `${caseItem.title}の情報をフォームに反映しました`,
    });
  };

  // Handle structured data from text input
  const handleStructuredData = (data: any) => {
    // Update selected case with extracted data
    const extractedCase = {
      id: Date.now(),
      title: data.title || "案件テキストから抽出",
      client: data.company || "未指定",
      skills: data.skills.split(',').map((s: string) => s.trim()),
      experience: data.experience,
      budget: data.budget,
      location: data.location,
      workType: data.workType,
      priority: "medium",
      description: data.originalText
    };
    
    setSelectedCase(extractedCase);
    
    // Update form with extracted data
    caseForm.setValue('skills', data.skills);
    caseForm.setValue('experience', data.experience);
    caseForm.setValue('budget', data.budget);
    caseForm.setValue('location', data.location);
    caseForm.setValue('workType', data.workType);
    
    toast({
      title: "データを抽出しました",
      description: "案件テキストからデータを抽出してフォームに適用しました",
    });
  };

  return (
    <div className="space-y-8">
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
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <CaseSelectionDialog onSelect={handleCaseSelect} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full japanese-text">
                    <FileText className="mr-2 h-4 w-4" />
                    案件テキスト検索
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="japanese-text">案件テキスト検索</DialogTitle>
                    <DialogDescription className="japanese-text">
                      案件のテキスト情報を入力して構造化データに変換します。
                    </DialogDescription>
                  </DialogHeader>
                  <CaseTextInput onStructuredData={handleStructuredData} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Display selected case info */}
            {selectedCase && (
              <Card className="mb-6 bg-muted/50">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-lg japanese-text">{selectedCase.title}</h4>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">選択済み</Badge>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium japanese-text">クライアント:</p>
                      <p className="japanese-text">{selectedCase.client}</p>
                    </div>
                    
                    {selectedCase.description && (
                      <div>
                        <p className="text-sm font-medium japanese-text">概要:</p>
                        <p className="japanese-text text-sm text-muted-foreground line-clamp-3">{selectedCase.description}</p>
                      </div>
                    )}
                    
                    {selectedCase.skills && selectedCase.skills.length > 0 && (
                      <div>
                        <p className="text-sm font-medium japanese-text">必要スキル:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Array.isArray(selectedCase.skills) ? selectedCase.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50">
                              {skill}
                            </Badge>
                          )) : <Badge variant="outline" className="bg-blue-50">{selectedCase.skills}</Badge>}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

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
        <MatchingProgressCard 
          progress={progress}
          isInProgress={matchingInProgress}
          completionMessage="4人の候補者が見つかりました"
          processingMessage="候補者データを分析中..."
        />
      </div>

      {/* Matching Results Card */}
      <MatchingResultsCard 
        results={matchingResults}
        exportButtonText="CSV出力"
        actionButtonText="一括提案"
      />
    </div>
  );
}
