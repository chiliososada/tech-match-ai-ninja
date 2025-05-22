import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, List, Mail } from 'lucide-react';
import { BatchMatchingTab3 } from '@/components/batch-matching/BatchMatchingTab3';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { SendMessageDialog } from '@/components/matching/SendMessageDialog';
import { EnhancedMatchingResult } from '@/components/matching/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { EnhancedMatchingResultsTable } from '@/components/matching/EnhancedMatchingResultsTable';

export function BatchMatching() {
  const [activeTab, setActiveTab] = useState<"combined-matching" | "matching-history">("combined-matching");
  
  // Keep only the three required filter states
  const [filterCaseAffiliation, setFilterCaseAffiliation] = useState<string>('');
  const [filterCandidateAffiliation, setFilterCandidateAffiliation] = useState<string>('');
  const [filterCaseStartDate, setFilterCaseStartDate] = useState<string>('');
  
  // Search result states
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [showCases, setShowCases] = useState<boolean>(false);
  
  // Pagination states
  const [matchingResultsCurrentPage, setMatchingResultsCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 3; // Number of items per page
  
  // SendMessageDialog state
  const [isSendMessageDialogOpen, setIsSendMessageDialogOpen] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<EnhancedMatchingResult | null>(null);

  // Enhanced sample data for bidirectional matching results with more company information
  const combinedMatchingResults = [
    {
      id: "1",
      caseName: 'XX証券向けシステム開発',
      caseCompany: '株式会社A',
      candidateName: '山田太郎',
      candidateCompany: '技術者株式会社X',
      matchingRate: "92%",
      skills: ['Java', 'Spring Boot', 'AWS'],
      experience: '10年',
      caseManager: '佐藤部長',
      caseManagerEmail: 'sato@companyA.co.jp',
      affiliationManager: '鈴木課長',
      affiliationManagerEmail: 'suzuki@companyX.co.jp',
      memo: 'システム開発経験あり',
    },
    {
      id: "2",
      caseName: 'ECサイト開発案件',
      caseCompany: '株式会社B',
      candidateName: '佐藤花子',
      candidateCompany: '技術者株式会社Y',
      matchingRate: "88%",
      skills: ['React', 'TypeScript', 'AWS'],
      experience: '7年',
      caseManager: '田中部長',
      caseManagerEmail: 'tanaka@companyB.co.jp',
      affiliationManager: '高橋課長',
      affiliationManagerEmail: 'takahashi@companyY.co.jp',
      memo: 'フロントエンド専門',
    },
    {
      id: "3",
      caseName: '物流管理システム構築',
      caseCompany: '株式会社C',
      candidateName: '鈴木一郎',
      candidateCompany: '技術者株式会社Z',
      matchingRate: "85%",
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '5年',
      caseManager: '渡辺部長',
      caseManagerEmail: 'watanabe@companyC.co.jp',
      affiliationManager: '伊藤課長',
      affiliationManagerEmail: 'ito@companyZ.co.jp',
      memo: 'バックエンド専門',
    },
    {
      id: "4",
      caseName: 'クラウド移行プロジェクト',
      caseCompany: '株式会社D',
      candidateName: '高橋次郎',
      candidateCompany: '技術者株式会社W',
      matchingRate: "90%",
      skills: ['AWS', 'Terraform', 'Docker'],
      experience: '8年',
      caseManager: '山本部長',
      caseManagerEmail: 'yamamoto@companyD.co.jp',
      affiliationManager: '中村課長',
      affiliationManagerEmail: 'nakamura@companyW.co.jp',
      memo: 'クラウド移行経験豊富',
    },
    {
      id: "5",
      caseName: 'AI推薦システム開発',
      caseCompany: '株式会社E',
      candidateName: '渡辺三郎',
      candidateCompany: '技術者株式会社V',
      matchingRate: "87%",
      skills: ['Python', 'TensorFlow', 'AWS'],
      experience: '6年',
      caseManager: '小林部長',
      caseManagerEmail: 'kobayashi@companyE.co.jp', 
      affiliationManager: '加藤課長',
      affiliationManagerEmail: 'kato@companyV.co.jp',
      memo: 'AI開発経験あり',
    },
    {
      id: "6",
      caseName: 'XX証券向けシステム開発',  // Same case as ID 1, different candidate
      caseCompany: '株式会社A',
      candidateName: '伊藤健太',
      candidateCompany: '技術者株式会社U',
      matchingRate: "84%",
      skills: ['Java', 'Spring Boot', 'Oracle'],
      experience: '8年',
      caseManager: '佐藤部長',
      caseManagerEmail: 'sato@companyA.co.jp',
      affiliationManager: '吉田課長',
      affiliationManagerEmail: 'yoshida@companyU.co.jp',
      memo: 'Java専門',
    },
    {
      id: "7",
      caseName: 'ECサイト開発案件',  // Same case as ID 2, different candidate
      caseCompany: '株式会社B',
      candidateName: '佐々木隆',
      candidateCompany: '技術者株式会社T',
      matchingRate: "83%",
      skills: ['React', 'Next.js', 'GraphQL'],
      experience: '6年',
      caseManager: '田中部長',
      caseManagerEmail: 'tanaka@companyB.co.jp',
      affiliationManager: '山田課長',
      affiliationManagerEmail: 'yamada@companyT.co.jp',
      memo: 'フロントエンド設計得意',
    }
  ];

  // Sample case details for modal
  const caseDetails = [
    {
      id: "1",
      name: 'ECサイト開発案件',
      company: '株式会社A',
      location: '東京（リモート可）',
      skills: 'React, TypeScript, AWS',
      rate: '70万円/月',
      matchScore: 95,
      manager: '佐藤部長',
      managerEmail: 'sato@companyA.co.jp',
    },
    {
      id: "2",
      name: 'コーポレートサイトリニューアル',
      company: '株式会社B',
      location: '大阪（リモート可）',
      skills: 'React, Next.js, TypeScript',
      rate: '65万円/月',
      matchScore: 87,
      manager: '田中部長',
      managerEmail: 'tanaka@companyB.co.jp',
    }
  ];

  // Function to get paginated results
  const getPaginatedResults = (results: any[], page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return results.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const handleSearch = () => {
    setIsSearched(true);
  };
  
  // Handle sending a message to a candidate
  const handleSendMessage = (match: any) => {
    // Create a match object with the necessary data
    const matchData: EnhancedMatchingResult = {
      id: match.id,
      caseId: 'c101',
      candidateId: `u${match.id}`,
      caseName: match.caseName,
      candidateName: match.candidateName,
      matchingRate: match.matchingRate,
      matchingReason: 'スキル・経験年数が一致',
      caseCompany: match.caseCompany,
      candidateCompany: match.candidateCompany,
      caseManager: match.caseManager,
      caseManagerEmail: match.caseManagerEmail,
      affiliationManager: match.affiliationManager,
      affiliationManagerEmail: match.affiliationManagerEmail,
      memo: match.memo || `経験年数: ${match.experience}`,
      recommendationComment: `${Array.isArray(match.skills) ? match.skills.join(', ') : match.skills}のスキルが案件に適合`
    };
    
    setSelectedMatch(matchData);
    setIsSendMessageDialogOpen(true);
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
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
            {/* Filter Area - Simplified with only three filters */}
            <div className="p-6 bg-white rounded-lg shadow-sm border mb-6">
              <h3 className="text-lg font-medium mb-4 japanese-text">フィルター条件設定</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">案件の所属</label>
                  <Select value={filterCaseAffiliation} onValueChange={setFilterCaseAffiliation}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">自社</SelectItem>
                      <SelectItem value="2">他社</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">技術者の所属</label>
                  <Select value={filterCandidateAffiliation} onValueChange={setFilterCandidateAffiliation}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">自社</SelectItem>
                      <SelectItem value="2">他社</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">案件の開始時期</label>
                  <input 
                    type="month"
                    value={filterCaseStartDate}
                    onChange={(e) => setFilterCaseStartDate(e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Button 
                  onClick={handleSearch} 
                  className="japanese-text"
                >
                  マッチング検索
                </Button>
              </div>
            </div>

            {/* Results Area - With pagination for large result sets */}
            {isSearched && (
              <div className="space-y-8">
                {/* Combined Bidirectional Matching Results */}
                <Card className="shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium mb-4 japanese-text">マッチング検索結果</h3>
                    
                    <div className="space-y-4">
                      {getPaginatedResults(combinedMatchingResults, matchingResultsCurrentPage).map(result => (
                        <Card key={result.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium text-lg">{result.caseName}</h4>
                                <p className="text-sm text-gray-700"><span className="font-medium">案件会社:</span> {result.caseCompany}</p>
                                <p className="text-sm text-gray-700"><span className="font-medium">案件担当者:</span> {result.caseManager}</p>
                                <p className="text-sm text-gray-700 text-xs">{result.caseManagerEmail}</p>
                                <div className="mt-1">
                                  <Badge className="bg-blue-100 text-blue-800">マッチング: {result.matchingRate}</Badge>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className="font-medium text-lg">{result.candidateName}</h4>
                                <p className="text-sm text-gray-700"><span className="font-medium">所属会社:</span> {result.candidateCompany}</p>
                                <p className="text-sm text-gray-700"><span className="font-medium">所属担当者:</span> {result.affiliationManager}</p>
                                <p className="text-sm text-gray-700 text-xs">{result.affiliationManagerEmail}</p>
                                <p className="text-sm text-gray-700"><span className="font-medium">スキル:</span> {result.skills.join(', ')}</p>
                                <p className="text-sm text-gray-700"><span className="font-medium">経験:</span> {result.experience}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-end space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="japanese-text"
                                onClick={() => setShowCases(true)}
                              >
                                案件詳細
                              </Button>
                              <Button 
                                size="sm" 
                                className="japanese-text flex items-center"
                                onClick={() => handleSendMessage(result)}
                              >
                                <Mail className="h-4 w-4 mr-1" />
                                メール送信
                              </Button>
                            </div>
                            
                            {result.memo && (
                              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                                <span className="font-medium">メモ:</span> {result.memo}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {/* Pagination for matching results */}
                    {combinedMatchingResults.length > ITEMS_PER_PAGE && (
                      <div className="mt-4 flex justify-center">
                        <Pagination
                          currentPage={matchingResultsCurrentPage}
                          totalPages={Math.ceil(combinedMatchingResults.length / ITEMS_PER_PAGE)}
                          onPageChange={setMatchingResultsCurrentPage}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Cases Dialog */}
            <Dialog open={showCases} onOpenChange={setShowCases}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="japanese-text">案件詳細一覧</DialogTitle>
                </DialogHeader>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 pr-0">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="japanese-text">案件名</TableHead>
                      <TableHead className="japanese-text">会社</TableHead>
                      <TableHead className="japanese-text">勤務地</TableHead>
                      <TableHead className="japanese-text">スキル</TableHead>
                      <TableHead className="japanese-text">単価</TableHead>
                      <TableHead className="japanese-text">担当者</TableHead>
                      <TableHead className="japanese-text">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {caseDetails.map((caseItem) => (
                      <TableRow key={caseItem.id}>
                        <TableCell className="pr-0">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{caseItem.name}</TableCell>
                        <TableCell>{caseItem.company}</TableCell>
                        <TableCell>{caseItem.location}</TableCell>
                        <TableCell>{caseItem.skills}</TableCell>
                        <TableCell>{caseItem.rate}</TableCell>
                        <TableCell>
                          <div>
                            <div>{caseItem.manager}</div>
                            <div className="text-xs text-gray-500">{caseItem.managerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" title="メールを送信">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button className="japanese-text">
                    <Mail className="mr-2 h-4 w-4" />
                    選択した案件を提案
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            {/* Send Message Dialog */}
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
