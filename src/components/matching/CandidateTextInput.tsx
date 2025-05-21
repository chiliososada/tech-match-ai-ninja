
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export function CandidateTextInput() {
  const [candidateText, setCandidateText] = useState('');
  
  const handleExtract = () => {
    // In a real implementation, this would call an AI service to extract structured data
    // For now we'll just show a toast notification
    toast({
      title: "データ抽出",
      description: "候補者情報からデータを抽出しました",
    });
  };
  
  return (
    <Card className="mt-2">
      <CardContent className="p-4">
        <div className="space-y-4">
          <Textarea
            placeholder="候補者情報を入力してください..."
            className="min-h-[100px] japanese-text"
            value={candidateText}
            onChange={(e) => setCandidateText(e.target.value)}
          />
          <Button onClick={handleExtract} className="w-full japanese-text">
            データを抽出
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
