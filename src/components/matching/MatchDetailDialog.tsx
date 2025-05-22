
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { EnhancedMatchingResult, CaseDetailItem, CandidateItem } from './types';

interface MatchDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: EnhancedMatchingResult | null;
  caseData?: CaseDetailItem;
  candidateData?: CandidateItem;
  onMemoSave?: (id: number | string, memo: string) => void;
}

export const MatchDetailDialog: React.FC<MatchDetailDialogProps> = ({
  isOpen,
  onClose,
  matchData,
  caseData,
  candidateData,
  onMemoSave
}) => {
  const [memo, setMemo] = useState(matchData?.memo || '');
  const [activeTab, setActiveTab] = useState('match');

  if (!matchData) return null;

  const handleSaveMemo = () => {
    if (onMemoSave) {
      onMemoSave(matchData.id, memo);
    }
    // Close dialog or show success message
  };

  // Helper function to render skills appropriately based on type
  const renderSkills = (skills: string | string[] | undefined) => {
    if (!skills) return null;
    
    if (Array.isArray(skills)) {
      return (
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50">{skill}</Badge>
          ))}
        </div>
      );
    } else {
      // If skills is a string, split by commas and render as badges
      return (
        <div className="flex flex-wrap gap-1">
          {skills.split(',').map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50">{skill.trim()}</Badge>
          ))}
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl japanese-text">
            マッチング詳細
          </DialogTitle>
          <DialogDescription className="japanese-text">
            {matchData.caseName} と {matchData.candidateName} のマッチング情報
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="match" className="japanese-text">マッチング情報</TabsTrigger>
            <TabsTrigger value="case" className="japanese-text">案件詳細</TabsTrigger>
            <TabsTrigger value="candidate" className="japanese-text">候補者詳細</TabsTrigger>
          </TabsList>
          
          {/* Match details tab */}
          <TabsContent value="match" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium japanese-text">マッチング率</p>
                <p className="text-lg font-bold">{matchData.matchingRate}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium japanese-text">候補者所属</p>
                <p className="japanese-text">{matchData.candidateCompany || '未設定'}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium japanese-text">案件会社</p>
                <p className="japanese-text">{matchData.caseCompany || '未設定'}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium japanese-text">マッチング理由</p>
              <p className="japanese-text border p-3 rounded-md bg-muted/10">{matchData.matchingReason}</p>
            </div>
            
            {matchData.recommendationComment && (
              <div>
                <p className="text-sm font-medium japanese-text">推薦コメント</p>
                <p className="japanese-text border p-3 rounded-md bg-muted/10">{matchData.recommendationComment}</p>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium japanese-text">メモ</p>
              <Textarea 
                value={memo} 
                onChange={(e) => setMemo(e.target.value)}
                placeholder="メモを入力してください"
                className="japanese-text"
              />
              <Button 
                onClick={handleSaveMemo}
                className="mt-2 japanese-text"
                size="sm"
              >
                メモを保存
              </Button>
            </div>
          </TabsContent>
          
          {/* Case details tab */}
          <TabsContent value="case">
            {caseData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium japanese-text">案件名</p>
                    <p className="japanese-text">{caseData.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium japanese-text">クライアント</p>
                    <p className="japanese-text">{caseData.client}</p>
                  </div>
                </div>
                
                {caseData.skills && (
                  <div>
                    <p className="text-sm font-medium japanese-text">必要スキル</p>
                    {renderSkills(caseData.skills)}
                  </div>
                )}
                
                {caseData.description && (
                  <div>
                    <p className="text-sm font-medium japanese-text">概要</p>
                    <p className="japanese-text border p-3 rounded-md bg-muted/10">{caseData.description}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="japanese-text">案件情報がありません</p>
            )}
          </TabsContent>
          
          {/* Candidate details tab */}
          <TabsContent value="candidate">
            {candidateData ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium japanese-text">名前</p>
                    <p className="japanese-text">{candidateData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium japanese-text">所属</p>
                    <p className="japanese-text">{candidateData.companyType || '未設定'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium japanese-text">スキル</p>
                    {renderSkills(candidateData.skills)}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium japanese-text">経験年数</p>
                    <p className="japanese-text">{candidateData.experience || '未設定'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="japanese-text">候補者情報がありません</p>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose} className="japanese-text">閉じる</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
