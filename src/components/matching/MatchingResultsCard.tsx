
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CaseMatchingResult } from './CaseToCandidate';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="japanese-text">候補者</TableHead>
                <TableHead className="japanese-text">候補者会社</TableHead>
                <TableHead className="japanese-text">候補者担当者</TableHead>
                <TableHead className="japanese-text">担当者メール</TableHead>
                <TableHead className="japanese-text">担当者電話</TableHead>
                <TableHead className="japanese-text">案件</TableHead>
                <TableHead className="japanese-text">案件会社</TableHead>
                <TableHead className="japanese-text">案件担当者</TableHead>
                <TableHead className="japanese-text">担当者メール</TableHead>
                <TableHead className="japanese-text">担当者電話</TableHead>
                <TableHead className="japanese-text">マッチング度</TableHead>
                <TableHead className="japanese-text">マッチング理由</TableHead>
                <TableHead className="japanese-text">ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map(result => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium japanese-text">{result.candidate}</TableCell>
                  <TableCell className="japanese-text">{result.candidateCompany || "会社情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.candidateManager || "担当者情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.candidateEmail || "メール情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.candidatePhone || "電話情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.case}</TableCell>
                  <TableCell className="japanese-text">{result.caseCompany || "会社情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.caseManager || "担当者情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.caseEmail || "メール情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.casePhone || "電話情報なし"}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                      {result.matchingRate}
                    </span>
                  </TableCell>
                  <TableCell className="japanese-text">{result.matchingReason}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${result.statusClass} japanese-text`}>
                      {result.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="japanese-text">{exportButtonText}</Button>
        <Button className="japanese-text">{actionButtonText}</Button>
      </CardFooter>
    </Card>
  );
}
