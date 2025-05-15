
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CaseMatchingResult } from './CaseToCandidate';

interface MatchingResultsCardProps {
  results: CaseMatchingResult[];
  exportButtonText: string;
  actionButtonText: string;
}

export function MatchingResultsCard({ results, exportButtonText, actionButtonText }: MatchingResultsCardProps) {
  return (
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
            {results.map(result => (
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
        <Button variant="outline" className="japanese-text">{exportButtonText}</Button>
        <Button className="japanese-text">{actionButtonText}</Button>
      </CardFooter>
    </Card>
  );
}
