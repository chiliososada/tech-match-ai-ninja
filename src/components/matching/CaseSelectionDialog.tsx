
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface CaseItem {
  id: number;
  title: string;
  client: string;
  skills?: string[];
  experience?: string;
  budget?: string;
  location?: string;
  workType?: string;
  priority?: string;
  description?: string;
  companyType?: string; // Added companyType field
}

interface CaseSelectionDialogProps {
  onSelect: (selectedCase: CaseItem) => void;
}

export function CaseSelectionDialog({ onSelect }: CaseSelectionDialogProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [companyTypeFilter, setCompanyTypeFilter] = useState<string>("all");
  const [open, setOpen] = useState(false);
  
  // Enhanced dummy data for existing cases
  const existingCases: CaseItem[] = [
    { 
      id: 1, 
      title: 'Java開発エンジニア', 
      client: '株式会社テック',
      skills: ['Java', 'Spring Boot', 'MySQL'],
      experience: '5',
      budget: '60~80',
      location: '東京',
      workType: 'リモート可',
      description: '金融系システムの開発案件。Java/Spring Bootの経験者を募集。',
      companyType: '自社'
    },
    { 
      id: 2, 
      title: 'フロントエンドエンジニア', 
      client: 'デジタルソリューション株式会社',
      skills: ['React', 'TypeScript', 'Next.js'],
      experience: '3',
      budget: '50~70',
      location: '大阪',
      workType: 'リモート可',
      description: 'ECサイトのフロントエンド開発。React/TypeScriptの経験者必須。',
      companyType: '他社'
    },
    { 
      id: 3, 
      title: 'インフラエンジニア', 
      client: 'クラウドシステム株式会社',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      experience: '3',
      budget: '70~90',
      location: '東京',
      workType: 'オンサイト',
      description: 'クラウド環境の構築・運用。AWS、Docker、Kubernetesの経験者を募集。',
      companyType: '自社'
    },
    { 
      id: 4, 
      title: 'バックエンドエンジニア', 
      client: 'ウェブサービス株式会社',
      skills: ['Python', 'Django', 'PostgreSQL'],
      experience: '3',
      budget: '55~75',
      location: '福岡',
      workType: 'フルリモート',
      description: 'WebサービスのAPI開発。Python/Djangoの経験者を募集。',
      companyType: '他社'
    },
    { 
      id: 5, 
      title: 'モバイルアプリ開発者', 
      client: 'モバイルテクノロジー株式会社',
      skills: ['iOS', 'Swift', 'Objective-C'],
      experience: '4',
      budget: '65~85',
      location: '東京',
      workType: 'ハイブリッド',
      description: 'iOSアプリケーション開発。Swift/Objective-Cの経験者必須。',
      companyType: '自社'
    },
    { 
      id: 6, 
      title: 'データアナリスト', 
      client: 'データインサイト株式会社',
      skills: ['Python', 'R', 'SQL', 'Tableau'],
      experience: '3',
      budget: '60~80',
      location: '名古屋',
      workType: 'リモート可',
      description: 'データ分析と可視化。Python/R/SQLの経験者を募集。',
      companyType: '他社'
    }
  ];

  // Filter cases based on search query and company type
  const filteredCases = existingCases.filter(caseItem => {
    const matchesSearch = !searchQuery || 
      caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCompanyType = companyTypeFilter === "all" || 
      caseItem.companyType === companyTypeFilter;
    
    return matchesSearch && matchesCompanyType;
  });

  // Handle case selection and close dialog
  const handleSelect = (caseItem: CaseItem) => {
    onSelect(caseItem);
    setOpen(false); // Close dialog after selection
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full japanese-text">
          <FileText className="mr-2 h-4 w-4" />
          既存案件から選択
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="japanese-text">既存案件から選択</DialogTitle>
          <DialogDescription className="japanese-text">
            マッチングに使用する案件を選択してください
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center border rounded-md border-input hover:border-primary/60 transition-colors bg-background px-3 shadow-sm">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="案件名、会社名、スキルを検索" 
                className="japanese-text border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                <TableHead className="japanese-text">案件名</TableHead>
                <TableHead className="japanese-text">クライアント</TableHead>
                <TableHead className="japanese-text">スキル</TableHead>
                <TableHead className="japanese-text">所属</TableHead>
                <TableHead className="w-24 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((caseItem) => (
                <TableRow key={caseItem.id} className="cursor-pointer hover:bg-muted/40">
                  <TableCell className="font-medium japanese-text">{caseItem.title}</TableCell>
                  <TableCell className="japanese-text">{caseItem.client}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {caseItem.skills?.slice(0, 2).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {(caseItem.skills?.length || 0) > 2 && (
                        <Badge variant="outline" className="bg-gray-100 text-xs">
                          +{(caseItem.skills?.length || 0) - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="japanese-text">{caseItem.companyType || '未設定'}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleSelect(caseItem)} 
                      className="japanese-text"
                    >
                      選択
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <div className="text-muted-foreground japanese-text">
                      該当する案件がありません
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
