
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CaseMatchingResult } from './CaseToCandidate';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  generatePaginationRange
} from '@/components/ui/pagination';

interface MatchingResultsCardProps {
  results: CaseMatchingResult[];
  exportButtonText: string;
  actionButtonText: string;
}

export function MatchingResultsCard({ results, exportButtonText, actionButtonText }: MatchingResultsCardProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(results.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const paginationRange = generatePaginationRange(currentPage, totalPages);
  
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
                <TableHead className="japanese-text">案件</TableHead>
                <TableHead className="japanese-text">案件会社</TableHead>
                <TableHead className="japanese-text">案件担当者</TableHead>
                <TableHead className="japanese-text">担当者メール</TableHead>
                <TableHead className="japanese-text">マッチング度</TableHead>
                <TableHead className="japanese-text">マッチング理由</TableHead>
                <TableHead className="japanese-text">ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map(result => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium japanese-text">{result.candidate}</TableCell>
                  <TableCell className="japanese-text">{result.candidateCompany || "会社情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.candidateManager || "担当者情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.candidateEmail || "メール情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.case}</TableCell>
                  <TableCell className="japanese-text">{result.caseCompany || "会社情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.caseManager || "担当者情報なし"}</TableCell>
                  <TableCell className="japanese-text">{result.caseEmail || "メール情報なし"}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                      {result.matchingRate}
                    </span>
                  </TableCell>
                  <TableCell className="japanese-text max-w-[200px] truncate" title={result.matchingReason}>
                    {result.matchingReason}
                  </TableCell>
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
        
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      className="cursor-pointer japanese-text"
                    />
                  </PaginationItem>
                )}
                
                {paginationRange.map((pageNumber, i) => (
                  <PaginationItem key={i}>
                    {pageNumber === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        isActive={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber as number)}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      className="cursor-pointer japanese-text"
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="japanese-text">{exportButtonText}</Button>
        <Button className="japanese-text">{actionButtonText}</Button>
      </CardFooter>
    </Card>
  );
}

function PaginationEllipsis() {
  return (
    <span className="flex h-9 w-9 items-center justify-center">
      ...
    </span>
  );
}
