
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CandidateSelectionDialog } from './CandidateSelectionDialog';
import { MatchingResultsCard } from './MatchingResultsCard';
import { MatchingProgressCard } from './MatchingProgressCard';
import { CandidateTextInput } from './CandidateTextInput';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { Loader } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface CandidateItem {
  id: number;
  name: string;
  skills: string;
  companyType?: string;
}

interface CaseItem {
  id: number;
  title: string;
  client: string;
}

export function CandidateToCase() {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem | null>(null);
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form
  const candidateForm = useForm({
    defaultValues: {
      skills: '',
      experience: '',
      preferredRate: '',
      preferredLocation: '',
      workType: '',
      availability: ''
    }
  });

  const handleCandidateSelect = (candidate: CandidateItem) => {
    setSelectedCandidate(candidate);
    console.log("Selected candidate:", candidate);
    
    // Update form with candidate data
    candidateForm.setValue('skills', candidate.skills);
    
    // Set mock data for the other fields
    candidateForm.setValue('experience', '5年');
    candidateForm.setValue('preferredRate', '60〜80万円');
    candidateForm.setValue('preferredLocation', '東京');
    candidateForm.setValue('workType', 'リモート可');
    candidateForm.setValue('availability', '即日');
    
    toast({
      title: "候補者を選択しました",
      description: `${candidate.name}が選択されました`,
    });
  };

  // Handle structured data from text input
  const handleStructuredData = (data: any) => {
    // Update form with extracted data
    candidateForm.setValue('skills', data.skills);
    candidateForm.setValue('experience', data.experience);
    candidateForm.setValue('preferredRate', data.rate);
    candidateForm.setValue('preferredLocation', data.location);
    candidateForm.setValue('workType', data.workType);
    candidateForm.setValue('availability', data.availability);
    
    toast({
      title: "データを抽出しました",
      description: "候補者情報からデータを抽出してフォームに適用しました",
    });
  };

  const startMatching = (data: any) => {
    if (!selectedCandidate && !data.skills) {
      toast({
        title: "エラー",
        description: "候補者を選択するか、スキル情報を入力してください",
        variant: "destructive",
      });
      return;
    }

    setMatchingStarted(true);
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
          setMatchingComplete(true);
          
          // Show completion toast
          toast({
            title: "マッチング完了",
            description: "5件の案件が見つかりました",
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  // Mock matching results
  const matchingResults = [
    {
      id: 1,
      name: 'Java開発エンジニア',
      skills: ['Java', 'Spring Boot', 'AWS']
    },
    {
      id: 2,
      name: 'フロントエンドエンジニア',
      skills: ['React', 'TypeScript', 'Next.js']
    },
    {
      id: 3,
      name: 'インフラエンジニア',
      skills: ['AWS', 'Docker', 'Kubernetes']
    },
    {
      id: 4,
      name: 'バックエンドエンジニア',
      skills: ['Python', 'Django', 'PostgreSQL']
    },
    {
      id: 5,
      name: 'モバイルアプリ開発',
      skills: ['iOS', 'Android', 'Flutter']
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Parameter Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="japanese-text">マッチングパラメータ設定</CardTitle>
            <CardDescription className="japanese-text">
              人材に合った案件を探すためのパラメータを設定してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <CandidateSelectionDialog onSelect={handleCandidateSelect} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full japanese-text">
                    候補者テキスト検索
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="japanese-text">候補者テキスト検索</DialogTitle>
                    <DialogDescription className="japanese-text">
                      候補者のテキスト情報を入力して構造化データに変換します。
                    </DialogDescription>
                  </DialogHeader>
                  <CandidateTextInput onStructuredData={handleStructuredData} />
                </DialogContent>
              </Dialog>
            </div>

            <Form {...candidateForm}>
              <form onSubmit={candidateForm.handleSubmit(startMatching)} className="space-y-6">
                <FormField
                  control={candidateForm.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="japanese-text">スキル</FormLabel>
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
                          <SelectItem value="1年" className="japanese-text">1年</SelectItem>
                          <SelectItem value="3年" className="japanese-text">3年</SelectItem>
                          <SelectItem value="5年" className="japanese-text">5年</SelectItem>
                          <SelectItem value="10年以上" className="japanese-text">10年以上</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={candidateForm.control}
                  name="preferredRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="japanese-text">希望単価（万円）</FormLabel>
                      <FormControl>
                        <Input placeholder="50〜80" {...field} className="japanese-text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={candidateForm.control}
                  name="preferredLocation"
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
                          <SelectItem value="即日" className="japanese-text">即日</SelectItem>
                          <SelectItem value="1週間以内" className="japanese-text">1週間以内</SelectItem>
                          <SelectItem value="2週間以内" className="japanese-text">2週間以内</SelectItem>
                          <SelectItem value="1ヶ月以内" className="japanese-text">1ヶ月以内</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full japanese-text" 
                  disabled={matchingStarted}
                >
                  {matchingStarted ? (
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
          isInProgress={matchingStarted && !matchingComplete}
          completionMessage="5件の案件が見つかりました"
          processingMessage="案件データを分析中..."
        />
      </div>

      {/* Matching Results Card */}
      {matchingComplete && (
        <MatchingResultsCard 
          title="マッチング結果"
          description={`${selectedCandidate?.name || '候補者'}に合う案件が見つかりました`}
          matches={matchingResults.map(result => ({
            id: String(result.id),
            name: result.name,
            skills: result.skills
          }))}
        />
      )}
    </div>
  );
}
