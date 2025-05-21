
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CandidateSelectionDialog } from './CandidateSelectionDialog';
import { CaseSelectionDialog } from './CaseSelectionDialog';
import { CandidateTextInput } from './CandidateTextInput';
import { MatchingResultsCard } from './MatchingResultsCard';
import { MatchingProgressCard } from './MatchingProgressCard';
import { toast } from '@/hooks/use-toast';

interface CandidateItem {
  id: number;
  name: string;
  skills: string;
  companyType?: string; // Add companyType field
}

interface CaseItem {
  id: number;
  title: string;
  client: string;
}

export function CandidateToCase() {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateItem | null>(null);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [matchingStarted, setMatchingStarted] = useState(false);
  const [matchingComplete, setMatchingComplete] = useState(false);
  
  const handleCandidateSelect = (candidate: CandidateItem) => {
    setSelectedCandidate(candidate);
    console.log("Selected candidate:", candidate);
    toast({
      title: "候補者を選択しました",
      description: `${candidate.name}が選択されました`,
    });
  };

  const handleCaseSelect = (caseItem: CaseItem) => {
    setSelectedCase(caseItem);
    console.log("Selected case:", caseItem);
    toast({
      title: "案件を選択しました",
      description: `${caseItem.title}が選択されました`,
    });
  };

  const startMatching = () => {
    if (!selectedCandidate || !selectedCase) {
      toast({
        title: "エラー",
        description: "候補者と案件の両方を選択してください",
        variant: "destructive",
      });
      return;
    }

    setMatchingStarted(true);
    
    // Simulate matching process
    setTimeout(() => {
      setMatchingComplete(true);
      toast({
        title: "マッチング完了",
        description: "候補者と案件のマッチングが完了しました",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">人材に合う案件を探す</CardTitle>
          <CardDescription className="japanese-text">
            人材を選択して、マッチする案件を見つけましょう
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Candidate Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium japanese-text">Step 1: 人材を選択</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <CandidateSelectionDialog onSelect={handleCandidateSelect} />
                {selectedCandidate ? (
                  <Card className="mt-2">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h4 className="font-medium japanese-text">{selectedCandidate.name}</h4>
                          <span className="text-sm text-muted-foreground japanese-text">
                            {selectedCandidate.companyType}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedCandidate.skills}</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <CandidateTextInput />
                )}
              </div>
              
              {/* Case Selection */}
              <div>
                <h3 className="text-lg font-medium mb-4 japanese-text">Step 2: 案件を選択</h3>
                <CaseSelectionDialog onSelect={handleCaseSelect} />
                {selectedCase && (
                  <Card className="mt-2">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 japanese-text">{selectedCase.title}</h4>
                      <p className="text-sm text-muted-foreground japanese-text">{selectedCase.client}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={startMatching} 
            disabled={!selectedCandidate || !selectedCase || matchingStarted} 
            className="w-full japanese-text"
          >
            マッチング開始
          </Button>
        </CardFooter>
      </Card>
      
      {/* Progress Card */}
      {matchingStarted && !matchingComplete && (
        <MatchingProgressCard />
      )}
      
      {/* Results Card */}
      {matchingComplete && (
        <MatchingResultsCard 
          candidateName={selectedCandidate?.name || ""} 
          caseTitle={selectedCase?.title || ""} 
        />
      )}
    </div>
  );
}
