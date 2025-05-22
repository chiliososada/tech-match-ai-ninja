
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
import { MatchingResultsCard } from '@/components/matching/MatchingResultsCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // SendMessageDialog state
  const [isSendMessageDialogOpen, setIsSendMessageDialogOpen] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<EnhancedMatchingResult | null>(null);

  // Sample data for demonstrations
  const matchingCaseResults = [
    {
      id: 1,
      caseName: 'XX証券向けシステム開発',
      companyName: '株式会社A',
      candidateCount: 5,
      topCandidates: ['山田太郎', '佐藤一郎', '鈴木次郎']
    },
    {
      id: 2,
      caseName: '物流管理システム構築',
      companyName: '株式会社B',
      candidateCount: 3,
      topCandidates: ['高橋三郎', '田中四郎', '伊藤五郎']
    }
  ];

  // Enhanced matching results format similar to case matching
  const enhancedCaseResults = matchingCaseResults.map(item => ({
    id: item.id.toString(), // Convert ID to string
    caseName: item.caseName,
    candidateName: item.topCandidates.join('、'),
    matchingRate: "85%", // Example matching rate
    matchingReason: "スキル・経験・希望単価が一致",
    caseCompany: item.companyName,
    candidateCompany: "技術者所属会社",
    candidateCount: item.candidateCount,
    status: "マッチング成功",
    statusClass: "bg-green-100 text-green-800",
  }));

  // Update the candidate results to use string IDs
  const matchingCandidateResults = [
    {
      id: "1", // String ID
      name: '田中 太郎',
      skills: ['React', 'TypeScript', 'AWS'],
      matchCount: 3,
    },
    {
      id: "2", // String ID
      name: '佐藤 花子',
      skills: ['Java', 'Spring Boot', 'Oracle'],
      matchCount: 5,
    }
  ];

  // Enhanced candidate matching results
  const enhancedCandidateResults = matchingCandidateResults.map(item => ({
    id: item.id, // Already string ID
    candidateName: item.name,
    caseName: `マッチング案件 ${item.matchCount}件`,
    matchingRate: "92%", // Example matching rate
    matchingReason: "スキルセットが案件要件と一致",
    candidateCompany: "株式会社テックソリューション",
    caseCompany: "複数企業",
    skills: item.skills.join(', '),
    status: "候補者あり",
    statusClass: "bg-blue-100 text-blue-800",
  }));

  // Sample candidates details for modal - update IDs to strings
  const candidatesDetails = [
    {
      id: "1", // String ID
      name: '山田太郎',
      skills: 'Java, AWS, Spring Boot',
      experience: '10年',
      matchScore: 92,
    },
    {
      id: "2", // String ID
      name: '佐藤一郎',
      skills: 'Java, React, AWS',
      experience: '8年',
      matchScore: 87,
    }
  ];

  // Sample case details for modal - update IDs to strings 
  const caseDetails = [
    {
      id: "1", // String ID
      name: 'ECサイト開発案件',
      company: '株式会社A',
      location: '東京（リモート可）',
      skills: 'React, TypeScript, AWS',
      rate: '70万円/月',
      matchScore: 95,
    },
    {
      id: "2", // String ID
      name: 'コーポレートサイトリニューアル',
      company: '株式会社B',
      location: '大阪（リモート可）',
      skills: 'React, Next.js, TypeScript',
      rate: '65万円/月',
      matchScore: 87,
    }
  ];

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
      candidateCompany: 'テック株式会社',
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
          
          {/* Combined Tab for Case to Candidate and Candidate to Case */}
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

            {/* Results Area - Updated with card-based layout similar to Case Matching */}
            {isSearched && (
              <div className="space-y-8">
                {/* Case to Candidate Results using MatchingResultsCard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-4 japanese-text flex items-center">
                        <Badge className="mr-2 bg-blue-100 text-blue-800 border-blue-200">案件→人材</Badge>
                        案件に合う技術者検索結果
                      </h3>
                      
                      <div className="space-y-4">
                        {enhancedCaseResults.map(result => (
                          <Card key={result.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-lg">{result.caseName}</h4>
                                <Badge className="bg-green-100 text-green-800">{result.candidateCount}名</Badge>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">会社:</span> {result.caseCompany}</p>
                                <p><span className="font-medium">候補者:</span> {result.candidateName}</p>
                                <p><span className="font-medium">マッチング率:</span> {result.matchingRate}</p>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="japanese-text"
                                  onClick={() => setShowCandidates(true)}
                                >
                                  候補者一覧を見る
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Candidate to Case Results */}
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-4 japanese-text flex items-center">
                        <Badge className="mr-2 bg-purple-100 text-purple-800 border-purple-200">人材→案件</Badge>
                        技術者に合う案件検索結果
                      </h3>
                      
                      <div className="space-y-4">
                        {enhancedCandidateResults.map(result => (
                          <Card key={result.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-lg">{result.candidateName}</h4>
                                <Badge className="bg-blue-100 text-blue-800">{result.caseName}</Badge>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p><span className="font-medium">スキル:</span> {result.skills}</p>
                                <p><span className="font-medium">所属:</span> {result.candidateCompany}</p>
                                <p><span className="font-medium">マッチング率:</span> {result.matchingRate}</p>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="japanese-text"
                                  onClick={() => setShowCases(true)}
                                >
                                  案件を見る
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Alternative display using the MatchingResultsCard component */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MatchingResultsCard 
                    title="案件に合う技術者 (カード表示)"
                    description="案件に適した候補者のリスト"
                    results={enhancedCaseResults as any}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                  
                  <MatchingResultsCard 
                    title="技術者に合う案件 (カード表示)"
                    description="技術者に適した案件のリスト"
                    matches={matchingCandidateResults}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
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
