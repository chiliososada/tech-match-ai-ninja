
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from "@/integrations/supabase/client";
import { Engineer } from '@/components/candidates/types';

interface CandidateItem {
  id: number;
  name: string;
  skills: string;
  companyType?: string;
  companyName?: string;
  nationality?: string;
  age?: string;
  gender?: string;
  experience?: string;
  japaneseLevel?: string;
  availability?: string;
  status?: string[];
}

interface CandidateSelectionDialogProps {
  onSelect: (selectedCandidate: CandidateItem) => void;
}

export function CandidateSelectionDialog({ onSelect }: CandidateSelectionDialogProps) {
  const [companyTypeFilter, setCompanyTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Use engineers from src/pages/Candidates.tsx (mocking Supabase fetch)
  const mockEngineers: Engineer[] = [
    {
      id: '1',
      name: '山田太郎',
      skills: ['JavaScript', 'React', 'Node.js'],
      japaneseLevel: 'ネイティブレベル',
      experience: '5年',
      availability: '即日',
      status: ['提案中', '事前面談'],  // Multiple statuses
      remarks: '週4日勤務希望, 出張可, リモート可',
      companyType: '自社',
      companyName: 'テックイノベーション株式会社',
      source: '直接応募',
      registeredAt: '2023-01-15',
      updatedAt: '2023-03-20',
      nationality: '日本',
      age: '32歳',
      gender: '男性',
      nearestStation: '品川駅',
    },
    {
      id: '2',
      name: '鈴木花子',
      skills: ['Python', 'Django', 'AWS'],
      japaneseLevel: 'ネイティブレベル',
      experience: '3年',
      availability: '1ヶ月後',
      status: ['面談', '結果待ち'],  // Multiple statuses
      remarks: 'リモート勤務希望, 週5日可',
      companyType: '他社',
      companyName: 'フロントエンドパートナーズ株式会社',
      source: 'エージェント紹介',
      registeredAt: '2023-02-20',
      updatedAt: '2023-04-15',
      nationality: '中国',
      age: '28歳',
      gender: '女性',
      nearestStation: '東京駅',
    },
    {
      id: '3',
      name: '田中誠',
      skills: ['Java', 'Spring Boot', 'Oracle'],
      japaneseLevel: 'ビジネスレベル',
      experience: '8年',
      availability: '応相談',
      status: ['営業終了'],
      remarks: '大手企業での勤務経験豊富, 長期案件希望',
      companyType: '自社',
      companyName: 'テックイノベーション株式会社',
      source: '直接応募',
      registeredAt: '2023-03-05',
      updatedAt: '2023-05-10',
      nationality: 'インド',
      age: '35歳',
      gender: '男性',
      nearestStation: '新宿駅',
    }
  ];

  // Convert Engineer objects to CandidateItem format
  const convertEngineerToCandidateItem = (engineer: Engineer): CandidateItem => {
    return {
      id: parseInt(engineer.id),
      name: engineer.name,
      skills: Array.isArray(engineer.skills) ? engineer.skills.join(', ') : engineer.skills || '',
      companyType: engineer.companyType || '自社',
      companyName: engineer.companyName || '',
      nationality: engineer.nationality || '',
      age: engineer.age || '',
      gender: engineer.gender || '',
      experience: engineer.experience || '',
      japaneseLevel: engineer.japaneseLevel || '',
      availability: engineer.availability || '',
      status: Array.isArray(engineer.status) ? engineer.status : (engineer.status ? [engineer.status] : [])
    };
  };

  // Convert engineers to candidates
  const candidates: CandidateItem[] = mockEngineers.map(convertEngineerToCandidateItem);
  
  // Filter candidates based on company type and search query
  const filteredCandidates = candidates.filter(candidate => {
    const matchesCompanyType = companyTypeFilter === "all" || candidate.companyType === companyTypeFilter;
    const matchesSearch = !searchQuery || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCompanyType && matchesSearch;
  });

  const handleSelect = (candidate: CandidateItem) => {
    onSelect(candidate);
    // Close dialog by resetting state
    setSearchQuery("");
    setCompanyTypeFilter("all");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full japanese-text">
          <Users className="mr-2 h-4 w-4" />
          既存人材から選択
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="japanese-text">既存人材から選択</DialogTitle>
          <DialogDescription className="japanese-text">
            マッチングに使用する人材を選択してください
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <div className="flex flex-col space-y-4">
            <div>
              <Input 
                placeholder="人材を検索" 
                className="japanese-text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company-type" className="japanese-text mb-2 block">所属会社</Label>
              <Select 
                value={companyTypeFilter} 
                onValueChange={setCompanyTypeFilter}
              >
                <SelectTrigger id="company-type" className="w-full japanese-text">
                  <SelectValue placeholder="所属会社を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="japanese-text">全て</SelectItem>
                  <SelectItem value="自社" className="japanese-text">自社</SelectItem>
                  <SelectItem value="他社" className="japanese-text">他社</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="japanese-text">氏名</TableHead>
                <TableHead className="japanese-text">スキル</TableHead>
                <TableHead className="japanese-text">所属</TableHead>
                <TableHead className="japanese-text">会社名</TableHead>
                <TableHead className="w-24 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium japanese-text">{candidate.name}</TableCell>
                  <TableCell className="japanese-text">{candidate.skills}</TableCell>
                  <TableCell className="japanese-text">{candidate.companyType}</TableCell>
                  <TableCell className="japanese-text">{candidate.companyType === '他社' ? candidate.companyName : '-'}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleSelect(candidate)} 
                      className="japanese-text"
                    >
                      選択
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
