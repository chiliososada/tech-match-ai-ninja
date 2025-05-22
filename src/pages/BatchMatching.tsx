import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, List } from 'lucide-react';
import { BatchMatchingTab3 } from '@/components/batch-matching/BatchMatchingTab3';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, File } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { SendMessageDialog } from '@/components/matching/SendMessageDialog';
import { EnhancedMatchingResult } from '@/components/matching/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';

export function BatchMatching() {
  const [activeTab, setActiveTab] = useState<"combined-matching" | "matching-history">("combined-matching");
  
  // Keep only the three required filter states
  const [filterCaseAffiliation, setFilterCaseAffiliation] = useState<string>('');
  const [filterCandidateAffiliation, setFilterCandidateAffiliation] = useState<string>('');
  const [filterCaseStartDate, setFilterCaseStartDate] = useState<string>('');
  
  // Search result states
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [showCandidates, setShowCandidates] = useState<boolean>(false);
  const [showCases, setShowCases] = useState<boolean>(false);
  
  // Pagination states
  const [matchingResultsCurrentPage, setMatchingResultsCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 3; // Number of items per page
  
  // SendMessageDialog state
  const [isSendMessageDialogOpen, setIsSendMessageDialogOpen] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<EnhancedMatchingResult | null>(null);

  // Combined sample data for bidirectional matching results
  const combinedMatchingResults = [
    {
      id: "1",
      matchType: "case-to-candidate", // 案件→人材
      caseName: 'XX証券向けシステム開発',
      caseCompany: '株式会社A',
      candidateName: '山田太郎',
      candidateCompany: '技術者株式会社X',
      matchingRate: "92%",
      skills: ['Java', 'Spring Boot', 'AWS'],
      experience: '10年',
    },
    {
      id: "2",
      matchType: "candidate-to-case", // 人材→案件
      caseName: 'ECサイト開発案件',
      caseCompany: '株式会社B',
      candidateName: '佐藤花子',
      candidateCompany: '技術者株式会社Y',
      matchingRate: "88%",
      skills: ['React', 'TypeScript', 'AWS'],
      experience: '7年',
    },
    {
      id: "3",
      matchType: "case-to-candidate", // 案件→人材
      caseName: '物流管理システム構築',
      caseCompany: '株式会社C',
      candidateName: '鈴木一郎',
      candidateCompany: '技術者株式会社Z',
      matchingRate: "85%",
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '5年',
    },
    {
      id: "4",
      matchType: "candidate-to-case", // 人材→案件
      caseName: 'クラウド移行プロジェクト',
      caseCompany: '株式会社D',
      candidateName: '高橋次郎',
      candidateCompany: '技術者株式会社W',
      matchingRate: "90%",
      skills: ['AWS', 'Terraform', 'Docker'],
      experience: '8年',
    },
    {
      id: "5",
      matchType: "case-to-candidate", // 案件→人材
      caseName: 'AI推薦システム開発',
      caseCompany: '株式会社E',
      candidateName: '渡辺三郎',
      candidateCompany: '技術者株式会社V',
      matchingRate: "87%",
      skills: ['Python', 'TensorFlow', 'AWS'],
      experience: '6年',
    }
  ];

  // Sample candidates details for modal
  const candidatesDetails = [
    {
      id: "1",
      name: '山田太郎',
      skills: 'Java, AWS, Spring Boot',
      experience: '10年',
      companyName: '技術者株式会社X',
      matchScore: 92,
    },
    {
      id: "2",
      name: '佐藤一郎',
      skills: 'Java, React, AWS',
      experience: '8年',
      companyName: '技術者株式会社Y',
      matchScore: 87,
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
    },
    {
      id: "2",
      name: 'コーポレートサイトリニューアル',
      company: '株式会社B',
      location: '大阪（リモート可）',
      skills: 'React, Next.js, TypeScript',
      rate: '65万円/月',
      matchScore: 87,
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
  const handleSendMessage = (candidate: any) => {
    // Create a match object with the necessary data
    const matchData: EnhancedMatchingResult = {
      id: candidate.id,
      caseId: 'c101',
      candidateId: `u${candidate.id}`,
      caseName: 'XX証券向けシステム開発',
      candidateName: candidate.name,
      matchingRate: `${candidate.matchScore}%`,
      matchingReason: 'スキル・経験年数が一致',
      caseCompany: 'システム開発株式会社',
      candidateCompany: candidate.companyName || 'テック株式会社',
      caseManager: '田中課長',
      caseManagerEmail: 'tanaka@system-dev.co.jp',
      affiliationManager: '山本部長',
      affiliationManagerEmail: 'yamamoto@tech-co.jp',
      memo: `経験年数: ${candidate.experience}`,
      recommendationComment: `${candidate.skills}のスキルが案件に適合`
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
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-lg">
                                {result.matchType === "case-to-candidate" 
                                  ? `${result.caseName} → ${result.candidateName}` 
                                  : `${result.candidateName} → ${result.caseName}`}
                              </h4>
                              <Badge 
                                className={result.matchType === "case-to-candidate" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-purple-100 text-purple-800"}
                              >
                                {result.matchType === "case-to-candidate" ? "案件→人材" : "人材→案件"}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p><span className="font-medium">案件会社:</span> {result.caseCompany}</p>
                              <p><span className="font-medium">技術者所属:</span> {result.candidateCompany}</p>
                              <p><span className="font-medium">マッチング率:</span> {result.matchingRate}</p>
                              <p><span className="font-medium">スキル:</span> {result.skills.join(', ')}</p>
                              <p><span className="font-medium">経験:</span> {result.experience}</p>
                            </div>
                            <div className="mt-3 flex justify-end">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="japanese-text mr-2"
                                onClick={() => result.matchType === "case-to-candidate" ? setShowCandidates(true) : setShowCases(true)}
                              >
                                {result.matchType === "case-to-candidate" ? "候補者詳細" : "案件詳細"}
                              </Button>
                              <Button 
                                size="sm" 
                                className="japanese-text"
                                onClick={() => handleSendMessage({
                                  id: result.id,
                                  name: result.candidateName,
                                  skills: result.skills.join(', '),
                                  experience: result.experience,
                                  companyName: result.candidateCompany,
                                  matchScore: parseInt(result.matchingRate)
                                })}
                              >
                                メッセージ送信
                              </Button>
                            </div>
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

            {/* Candidates Dialog */}
            <Dialog open={showCandidates} onOpenChange={setShowCandidates}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="japanese-text">候補者一覧 - XX証券向けシステム開発</DialogTitle>
                </DialogHeader>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 pr-0">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="japanese-text">名前</TableHead>
                      <TableHead className="japanese-text">所属会社</TableHead>
                      <TableHead className="japanese-text">スキル</TableHead>
                      <TableHead className="japanese-text">経験</TableHead>
                      <TableHead className="japanese-text">マッチ率</TableHead>
                      <TableHead className="japanese-text">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidatesDetails.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell className="pr-0">
                          <Checkbox />
                        </TableCell>
                        <TableCell className="font-medium">{candidate.name}</TableCell>
                        <TableCell>{candidate.companyName}</TableCell>
                        <TableCell>{candidate.skills}</TableCell>
                        <TableCell>{candidate.experience}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${candidate.matchScore}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{candidate.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              title="メールを送信" 
                              onClick={() => handleSendMessage(candidate)}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="履歴書を見る">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="提案資料を出力">
                              <File className="h-4 w-4" />
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
                    選択した候補者に一括メール送信
                  </Button>
                  <Button variant="outline" className="japanese-text">
                    <File className="mr-2 h-4 w-4" />
                    選択した候補者のPDF出力
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Cases Dialog */}
            <Dialog open={showCases} onOpenChange={setShowCases}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="japanese-text">マッチング案件一覧 - 田中 太郎</DialogTitle>
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
                      <TableHead className="japanese-text">マッチ率</TableHead>
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
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${caseItem.matchScore}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium">{caseItem.matchScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="icon" title="メールを送信">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="案件詳細を見る">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" title="提案資料を出力">
                              <File className="h-4 w-4" />
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
                  <Button variant="outline" className="japanese-text">
                    <File className="mr-2 h-4 w-4" />
                    選択した案件のPDF出力
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
