
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CandidateItem {
  id: number;
  name: string;
  skills: string;
  companyType?: string; 
}

interface CandidateSelectionDialogProps {
  onSelect: (selectedCandidate: CandidateItem) => void;
}

export function CandidateSelectionDialog({ onSelect }: CandidateSelectionDialogProps) {
  const [companyTypeFilter, setCompanyTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Expanded dummy data for candidates from both company types
  const existingCandidates = [
    { id: 1, name: '鈴木太郎', skills: 'Java, Spring, AWS', companyType: '自社' },
    { id: 2, name: '田中花子', skills: 'React, TypeScript, Node.js', companyType: '他社' },
    { id: 3, name: '佐藤一郎', skills: 'AWS, Docker, Kubernetes', companyType: '自社' },
    { id: 4, name: '山田健太', skills: 'Python, Django, MySQL', companyType: '他社' },
    { id: 5, name: '伊藤誠', skills: 'iOS, Android, Flutter', companyType: '自社' },
    { id: 6, name: '高橋直樹', skills: 'Python, 機械学習, データ分析', companyType: '他社' },
    { id: 7, name: '中村美咲', skills: 'Ruby, Rails, PostgreSQL', companyType: '自社' },
    { id: 8, name: '小林隆', skills: 'PHP, Laravel, MySQL', companyType: '他社' }
  ];
  
  // Filter candidates based on company type and search query
  const filteredCandidates = existingCandidates.filter(candidate => {
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
      <DialogContent className="sm:max-w-[525px]">
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
                <TableHead className="w-24 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium japanese-text">{candidate.name}</TableCell>
                  <TableCell className="japanese-text">{candidate.skills}</TableCell>
                  <TableCell className="japanese-text">{candidate.companyType}</TableCell>
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
