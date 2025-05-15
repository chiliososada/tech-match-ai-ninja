
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CaseItem {
  id: number;
  title: string;
  client: string;
}

interface CaseSelectionDialogProps {
  onSelect: (selectedCase: CaseItem) => void;
}

export function CaseSelectionDialog({ onSelect }: CaseSelectionDialogProps) {
  // Dummy data for existing cases
  const existingCases = [
    { id: 1, title: 'Java開発エンジニア', client: '株式会社テック' },
    { id: 2, title: 'フロントエンドエンジニア', client: 'デジタルソリューション株式会社' },
    { id: 3, title: 'インフラエンジニア', client: 'クラウドシステム株式会社' },
    { id: 4, title: 'バックエンドエンジニア', client: 'ウェブサービス株式会社' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full japanese-text">
          <FileText className="mr-2 h-4 w-4" />
          既存案件から選択
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="japanese-text">既存案件から選択</DialogTitle>
          <DialogDescription className="japanese-text">
            マッチングに使用する案件を選択してください
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          <Input placeholder="案件を検索" className="japanese-text" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="japanese-text">案件名</TableHead>
                <TableHead className="japanese-text">クライアント</TableHead>
                <TableHead className="w-24 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {existingCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium japanese-text">{caseItem.title}</TableCell>
                  <TableCell className="japanese-text">{caseItem.client}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => onSelect(caseItem)} className="japanese-text">選択</Button>
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
