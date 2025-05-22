
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, List } from 'lucide-react';
import { BatchMatchingTab3 } from '@/components/batch-matching/BatchMatchingTab3';
import { SendMessageDialog } from '@/components/matching/SendMessageDialog';
import { CandidateDetailDialog } from '@/components/batch-matching/CandidateDetailDialog';
import { CaseDetailDialog } from '@/components/batch-matching/CaseDetailDialog';
import { FilterArea } from '@/components/batch-matching/FilterArea';
import { MatchResultsList } from '@/components/batch-matching/MatchResultsList';
import { useBatchMatching } from '@/components/batch-matching/hooks/useBatchMatching';

export function BatchMatching() {
  const [activeTab, setActiveTab] = useState<"combined-matching" | "matching-history">("combined-matching");
  
  const {
    // Filter states
    filterCaseAffiliation,
    setFilterCaseAffiliation,
    filterCandidateAffiliation,
    setFilterCandidateAffiliation,
    filterCaseStartDate,
    setFilterCaseStartDate,
    
    // Results state
    isSearched,
    
    // Pagination
    matchingResultsCurrentPage,
    setMatchingResultsCurrentPage,
    totalPages,
    paginatedResults,
    
    // Dialog states
    isSendMessageDialogOpen,
    setIsSendMessageDialogOpen,
    isCaseDetailDialogOpen,
    setIsCaseDetailDialogOpen,
    isCandidateDetailDialogOpen,
    setIsCandidateDetailDialogOpen,
    
    // Selected items
    selectedMatch,
    selectedCase,
    selectedCandidate,
    
    // Handlers
    handleSearch,
    handleSendMessage,
    handleCaseDetail,
    handleCandidateDetail
  } = useBatchMatching();

  return (
    <MainLayout>
      <div className="flex-1 p-8 pt-6 overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">一括マッチング</h2>
        </div>

        <Tabs defaultValue="combined-matching" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="combined-matching" className="japanese-text">
              <List className="mr-2 h-4 w-4" />
              マッチング検索
            </TabsTrigger>
            <TabsTrigger value="matching-history" className="japanese-text">
              <FileText className="mr-2 h-4 w-4" />
              マッチング結果履歴
            </TabsTrigger>
          </TabsList>
          
          {/* Combined Tab for bidirectional matching */}
          <TabsContent value="combined-matching">
            {/* Filter Area */}
            <FilterArea 
              filterCaseAffiliation={filterCaseAffiliation}
              setFilterCaseAffiliation={setFilterCaseAffiliation}
              filterCandidateAffiliation={filterCandidateAffiliation}
              setFilterCandidateAffiliation={setFilterCandidateAffiliation}
              filterCaseStartDate={filterCaseStartDate}
              setFilterCaseStartDate={setFilterCaseStartDate}
              handleSearch={handleSearch}
            />

            {/* Results Area */}
            {isSearched && (
              <div>
                <MatchResultsList
                  results={paginatedResults}
                  currentPage={matchingResultsCurrentPage}
                  totalPages={totalPages}
                  onPageChange={setMatchingResultsCurrentPage}
                  onCaseDetail={handleCaseDetail}
                  onCandidateDetail={handleCandidateDetail}
                  onSendMessage={handleSendMessage}
                />
              </div>
            )}
            
            {/* Dialogs */}
            <CaseDetailDialog
              isOpen={isCaseDetailDialogOpen}
              onClose={() => setIsCaseDetailDialogOpen(false)}
              caseData={selectedCase}
            />
            
            <CandidateDetailDialog
              isOpen={isCandidateDetailDialogOpen}
              onClose={() => setIsCandidateDetailDialogOpen(false)}
              candidateData={selectedCandidate}
            />
            
            <SendMessageDialog 
              isOpen={isSendMessageDialogOpen}
              onClose={() => setIsSendMessageDialogOpen(false)}
              matchData={selectedMatch}
            />
          </TabsContent>
          
          {/* Matching History Tab */}
          <TabsContent value="matching-history">
            <BatchMatchingTab3 />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default BatchMatching;
