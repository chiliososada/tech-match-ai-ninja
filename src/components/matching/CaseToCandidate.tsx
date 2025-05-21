import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { FileText, Loader } from 'lucide-react';
import { CaseSelectionDialog } from './CaseSelectionDialog';
import { MatchingProgressCard } from './MatchingProgressCard';
import { MatchingResultsCard } from './MatchingResultsCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CaseTextInput } from './CaseTextInput';
import { Badge } from '@/components/ui/badge';
import { CaseDetailDisplay } from './CaseDetailDisplay';

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
  companyType?: string;
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

  // Handle Case to Candidate matching
  const startMatching = () => {
    if (!selectedCase) {
      toast({
        title: "エラー",
        description: "案件を選択してください",
        variant: "destructive",
      });
      return;
    }
    
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
    
    toast({
      title: "案件を選択しました",
      description: `${caseItem.title}を選択しました`,
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
      description: data.originalText,
      companyType: data.companyType || "未設定"
    };
    
    setSelectedCase(extractedCase);
    
    toast({
      title: "データを抽出しました",
      description: "案件テキストからデータを抽出しました",
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

            {/* Display selected case info using the new component */}
            {selectedCase && <CaseDetailDisplay caseData={selectedCase} />}
            
            <Button 
              onClick={startMatching} 
              className="w-full japanese-text mt-6" 
              disabled={matchingInProgress || !selectedCase}
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
