
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, List } from 'lucide-react';
import { BatchMatchingTab3 } from '@/components/batch-matching/BatchMatchingTab3';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, File } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export function BatchMatching() {
  const [activeTab, setActiveTab] = useState<"combined-matching" | "matching-history">("combined-matching");
  
  // Common filter states
  const [filterCaseRegistrationDate, setFilterCaseRegistrationDate] = useState<string>('');
  const [filterCaseAffiliation, setFilterCaseAffiliation] = useState<string>('');
  const [filterCaseStartDate, setFilterCaseStartDate] = useState<string>('');
  const [filterRequiredSkills, setFilterRequiredSkills] = useState<string>('');
  const [filterCandidateStatus, setFilterCandidateStatus] = useState<string>('');
  const [filterCandidateAffiliation, setFilterCandidateAffiliation] = useState<string>('');
  const [filterCandidateUpdateDate, setFilterCandidateUpdateDate] = useState<string>('');
  
  // Search result states
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>(''); // 'case-to-candidate' or 'candidate-to-case'
  const [showCandidates, setShowCandidates] = useState<boolean>(false);
  const [showCases, setShowCases] = useState<boolean>(false);

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

  const matchingCandidateResults = [
    {
      id: 1,
      name: '田中 太郎',
      skills: 'React, TypeScript, AWS',
      matchCount: 3,
    },
    {
      id: 2,
      name: '佐藤 花子',
      skills: 'Java, Spring Boot, Oracle',
      matchCount: 5,
    }
  ];

  // Sample candidates details for modal
  const candidatesDetails = [
    {
      id: 1,
      name: '山田太郎',
      skills: 'Java, AWS, Spring Boot',
      experience: '10年',
      matchScore: 92,
    },
    {
      id: 2,
      name: '佐藤一郎',
      skills: 'Java, React, AWS',
      experience: '8年',
      matchScore: 87,
    }
  ];

  // Sample case details for modal
  const caseDetails = [
    {
      id: 1,
      name: 'ECサイト開発案件',
      company: '株式会社A',
      location: '東京（リモート可）',
      skills: 'React, TypeScript, AWS',
      rate: '70万円/月',
      matchScore: 95,
    },
    {
      id: 2,
      name: 'コーポレートサイトリニューアル',
      company: '株式会社B',
      location: '大阪（リモート可）',
      skills: 'React, Next.js, TypeScript',
      rate: '65万円/月',
      matchScore: 87,
    }
  ];

  const handleSearch = (type: string) => {
    setIsSearched(true);
    setSearchType(type);
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
            {/* Filter Area */}
            <div className="p-6 bg-white rounded-lg shadow-sm border mb-6">
              <h3 className="text-lg font-medium mb-4 japanese-text">フィルター条件設定</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">案件の登録日</label>
                  <Input 
                    type="date"
                    value={filterCaseRegistrationDate}
                    onChange={(e) => setFilterCaseRegistrationDate(e.target.value)}
                  />
                </div>
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
                  <label className="text-sm font-medium japanese-text">案件の開始時期</label>
                  <Input 
                    type="month"
                    value={filterCaseStartDate}
                    onChange={(e) => setFilterCaseStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">必須スキル</label>
                  <Input 
                    placeholder="例：Java, AWS, React" 
                    value={filterRequiredSkills}
                    onChange={(e) => setFilterRequiredSkills(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">技術者の状態</label>
                  <Input 
                    placeholder="例：案件探し中" 
                    value={filterCandidateStatus}
                    onChange={(e) => setFilterCandidateStatus(e.target.value)}
                  />
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
                  <label className="text-sm font-medium japanese-text">技術者资料更新日</label>
                  <Input 
                    type="date"
                    value={filterCandidateUpdateDate}
                    onChange={(e) => setFilterCandidateUpdateDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Button 
                  onClick={() => handleSearch('case-to-candidate')} 
                  className="japanese-text"
                >
                  案件に合う技術者を検索
                </Button>
                <Button 
                  onClick={() => handleSearch('candidate-to-case')} 
                  className="japanese-text"
                  variant="outline"
                >
                  技術者に合う案件を検索
                </Button>
              </div>
            </div>

            {/* Results Area - Case to Candidate */}
            {isSearched && searchType === 'case-to-candidate' && (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-8">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-medium japanese-text">案件に合う技術者検索結果</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="japanese-text">案件名</TableHead>
                      <TableHead className="japanese-text">会社名</TableHead>
                      <TableHead className="japanese-text">技術者数</TableHead>
                      <TableHead className="japanese-text">候補者（上位3人）</TableHead>
                      <TableHead className="japanese-text">詳細</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matchingCaseResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.caseName}</TableCell>
                        <TableCell>{result.companyName}</TableCell>
                        <TableCell>{result.candidateCount}名</TableCell>
                        <TableCell>{result.topCandidates.join('、')}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="japanese-text"
                            onClick={() => setShowCandidates(true)}
                          >
                            候補者一覧を見る
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Results Area - Candidate to Case */}
            {isSearched && searchType === 'candidate-to-case' && (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-medium japanese-text">技術者に合う案件検索結果</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="japanese-text">技術者名</TableHead>
                      <TableHead className="japanese-text">スキル</TableHead>
                      <TableHead className="japanese-text">マッチ案件数</TableHead>
                      <TableHead className="japanese-text">案件一覧</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matchingCandidateResults.map((tech) => (
                      <TableRow key={tech.id}>
                        <TableCell className="font-medium">{tech.name}</TableCell>
                        <TableCell>{tech.skills}</TableCell>
                        <TableCell>{tech.matchCount}件</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="japanese-text"
                            onClick={() => setShowCases(true)}
                          >
                            案件を見る
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                            <Button variant="outline" size="icon" title="メールを送信">
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
