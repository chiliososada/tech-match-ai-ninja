
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import { CandidateSelectionDialog } from './CandidateSelectionDialog';
import { MatchingProgressCard } from './MatchingProgressCard';
import { MatchingResultsCard } from './MatchingResultsCard';
import { CaseMatchingResult } from './CaseToCandidate';

export function CandidateToCase() {
  // Candidate to case matching states
  const [candidateMatchingInProgress, setCandidateMatchingInProgress] = useState(false);
  const [candidateProgress, setCandidateProgress] = useState(0);
  const [candidateMatchingResults, setCandidateMatchingResults] = useState<CaseMatchingResult[]>([
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
      status: '提案可能',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      candidate: '鈴木太郎',
      candidateCompany: 'テック株式会社',
      candidateManager: '佐藤部長',
      candidateEmail: 'sato@tech.co.jp',
      case: 'フロントエンドエンジニア',
      caseCompany: 'ウェブ開発株式会社',
      caseManager: '伊藤課長',
      caseEmail: 'ito@web.co.jp',
      matchingRate: '85%',
      matchingReason: 'React経験が案件要件に一致',
      status: '提案可能',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      candidate: '鈴木太郎',
      candidateCompany: 'テック株式会社',
      candidateManager: '佐藤部長',
      candidateEmail: 'sato@tech.co.jp',
      case: 'バックエンドエンジニア',
      caseCompany: 'サーバー株式会社',
      caseManager: '加藤部長',
      caseEmail: 'kato@server.co.jp',
      matchingRate: '78%',
      matchingReason: 'Java経験あり、フレームワーク経験なし',
      status: '要検討',
      statusClass: 'bg-amber-100 text-amber-800'
    },
    {
      id: 4,
      candidate: '鈴木太郎',
      candidateCompany: 'テック株式会社',
      candidateManager: '佐藤部長',
      candidateEmail: 'sato@tech.co.jp',
      case: 'クラウドエンジニア',
      caseCompany: 'クラウドサービス株式会社',
      caseManager: '小林部長',
      caseEmail: 'kobayashi@cloud.co.jp',
      matchingRate: '82%',
      matchingReason: 'AWS経験が案件と一致',
      status: '提案可能',
      statusClass: 'bg-green-100 text-green-800'
    },
    {
      id: 5,
      candidate: '鈴木太郎',
      candidateCompany: 'テック株式会社',
      candidateManager: '佐藤部長',
      candidateEmail: 'sato@tech.co.jp',
      case: 'モバイルアプリ開発',
      caseCompany: 'アプリケーション株式会社',
      caseManager: '斎藤課長',
      caseEmail: 'saito@application.co.jp',
      matchingRate: '68%',
      matchingReason: 'モバイル開発経験が少ない',
      status: '要検討',
      statusClass: 'bg-amber-100 text-amber-800'
    },
    {
      id: 6,
      candidate: '鈴木太郎',
      candidateCompany: 'テック株式会社',
      candidateManager: '佐藤部長',
      candidateEmail: 'sato@tech.co.jp',
      case: 'データアナリスト',
      caseCompany: '分析株式会社',
      caseManager: '佐々木部長',
      caseEmail: 'sasaki@analytics.co.jp',
      matchingRate: '72%',
      matchingReason: 'データ分析の基礎知識あり',
      status: '要検討',
      statusClass: 'bg-amber-100 text-amber-800'
    }
  ]);

  // Form
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
    <div className="space-y-8">
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
            <CandidateSelectionDialog onSelect={handleCandidateSelect} />

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
        <MatchingProgressCard 
          progress={candidateProgress}
          isInProgress={candidateMatchingInProgress}
          completionMessage="3つの案件が見つかりました"
          processingMessage="案件データを分析中..."
        />
      </div>

      {/* Candidate Matching Results Card */}
      <MatchingResultsCard 
        results={candidateMatchingResults}
        exportButtonText="CSV出力"
        actionButtonText="一括応募"
      />
    </div>
  );
}

