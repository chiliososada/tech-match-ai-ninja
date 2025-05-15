
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CandidateItem {
  id: number;
  name: string;
  skills: string;
}

interface CandidateSelectionDialogProps {
  onSelect: (selectedCandidate: CandidateItem) => void;
}

export function CandidateSelectionDialog({ onSelect }: CandidateSelectionDialogProps) {
  // Dummy data for existing candidates
  const existingCandidates = [
    { id: 1, name: '鈴木太郎', skills: 'Java, Spring, AWS' },
    { id: 2, name: '田中花子', skills: 'React, TypeScript, Node.js' },
    { id: 3, name: '佐藤一郎', skills: 'AWS, Docker, Kubernetes' },
    { id: 4, name: '山田健太', skills: 'Python, Django, MySQL' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mb-6 japanese-text">
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
          <Input placeholder="人材を検索" className="japanese-text" />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="japanese-text">氏名</TableHead>
                <TableHead className="japanese-text">スキル</TableHead>
                <TableHead className="w-24 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {existingCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium japanese-text">{candidate.name}</TableCell>
                  <TableCell className="japanese-text">{candidate.skills}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" onClick={() => onSelect(candidate)} className="japanese-text">選択</Button>
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
