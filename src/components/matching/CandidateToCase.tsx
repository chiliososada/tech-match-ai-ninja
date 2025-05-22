
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CandidateSelectionDialog } from './CandidateSelectionDialog';
import { MatchingResultsCard } from './MatchingResultsCard';
import { MatchingProgressCard } from './MatchingProgressCard';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { candidatesData } from '@/components/candidates/data/candidatesData';

interface CandidateItem {
  id: number;
  name: string;
  skills: string;
  companyType?: string;
  companyName?: string;
  nationality?: string;
  age?: string;
  gender?: string;
  experience?: string;
  japaneseLevel?: string;
  availability?: string;
  status?: string[];
}

export function CandidateToCase() {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem | null>(null);
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [matchingComplete, setMatchingComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCandidateSelect = (candidate: CandidateItem) => {
    setSelectedCandidate(candidate);
    console.log("Selected candidate:", candidate);
    
    toast("候補者を選択しました", {
      description: `${candidate.name}が選択されました`,
    });
  };

  const startMatching = () => {
    if (!selectedCandidate) {
      toast("エラー", {
        description: "候補者を選択してください",
        variant: "destructive",
      });
      return;
    }

    setMatchingStarted(true);
    setProgress(0);
    
    // Show toast notification
    toast("マッチング処理を開始しました", {
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
          toast("マッチング完了", {
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
            {/* Show only the candidate selection dialog */}
            <div className="mb-4">
              <CandidateSelectionDialog onSelect={handleCandidateSelect} />
            </div>

            {/* Display selected candidate info */}
            {selectedCandidate && (
              <Card className="mb-4 bg-muted/50">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium japanese-text">氏名:</p>
                        <p className="japanese-text">{selectedCandidate.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium japanese-text">所属:</p>
                        <p className="japanese-text">{selectedCandidate.companyType || '自社'}</p>
                      </div>
                    </div>
                    
                    {selectedCandidate.companyType === '他社' && (
                      <div>
                        <p className="text-sm font-medium japanese-text">会社名:</p>
                        <p className="japanese-text">{selectedCandidate.companyName || '未設定'}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium japanese-text">国籍:</p>
                        <p className="japanese-text">{selectedCandidate.nationality || '未設定'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium japanese-text">年齢:</p>
                        <p className="japanese-text">{selectedCandidate.age || '未設定'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium japanese-text">性別:</p>
                        <p className="japanese-text">{selectedCandidate.gender || '未設定'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium japanese-text">経験年数:</p>
                        <p className="japanese-text">{selectedCandidate.experience || '未設定'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium japanese-text">スキル:</p>
                      <p className="japanese-text">{selectedCandidate.skills}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium japanese-text">日本語レベル:</p>
                        <p className="japanese-text">{selectedCandidate.japaneseLevel || '未設定'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium japanese-text">稼働可能時期:</p>
                        <p className="japanese-text">{selectedCandidate.availability || '未設定'}</p>
                      </div>
                    </div>
                    
                    {/* Status badges */}
                    <div>
                      <p className="text-sm font-medium japanese-text">ステータス:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedCandidate.status && selectedCandidate.status.map((status, index) => (
                          <Badge key={index} variant="outline" className={`
                            japanese-text
                            ${status === '提案中' ? 'bg-blue-100 text-blue-800' : ''}
                            ${status === '事前面談' ? 'bg-green-100 text-green-800' : ''}
                            ${status === '面談' ? 'bg-amber-100 text-amber-800' : ''}
                            ${status === '結果待ち' ? 'bg-purple-100 text-purple-800' : ''}
                            ${status === '営業終了' ? 'bg-gray-100 text-gray-800' : ''}
                            ${status === '未提案' ? 'bg-gray-100 text-gray-800' : ''}
                          `}>
                            {status}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button 
              onClick={startMatching} 
              className="w-full japanese-text" 
              disabled={matchingStarted || !selectedCandidate}
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
