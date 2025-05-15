
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';

export function BatchMatchingTab3() {
  const [showDetail, setShowDetail] = React.useState(false);
  const [selectedHistory, setSelectedHistory] = React.useState<any>(null);

  // Sample history data
  const historyData = [
    {
      id: 1,
      date: '2025/05/15 14:30',
      user: '山本',
      caseCount: 3,
      candidateCount: 12,
      status: 'メール送信済み',
    },
    {
      id: 2,
      date: '2025/05/14 11:15',
      user: '鈴木',
      caseCount: 5,
      candidateCount: 8,
      status: '処理完了',
    },
    {
      id: 3,
      date: '2025/05/13 16:45',
      user: '田中',
      caseCount: 2,
      candidateCount: 15,
      status: 'PDF出力済み',
    },
    {
      id: 4,
      date: '2025/05/12 10:20',
      user: '佐藤',
      caseCount: 4,
      candidateCount: 10,
      status: '処理完了',
    },
    {
      id: 5,
      date: '2025/05/11 13:50',
      user: '高橋',
      caseCount: 1,
      candidateCount: 7,
      status: 'メール送信済み',
    }
  ];

  // Sample detail data for a specific history item
  const historyDetail = {
    cases: [
      { name: 'XX証券向けシステム開発', company: '株式会社A', matchedCandidates: 5 },
      { name: '物流管理システム構築', company: '株式会社B', matchedCandidates: 3 },
      { name: 'ECサイトリニューアル', company: '株式会社C', matchedCandidates: 4 }
    ],
    candidates: [
      { name: '山田太郎', matchScore: 92, emailSent: true },
      { name: '佐藤一郎', matchScore: 87, emailSent: true },
      { name: '鈴木次郎', matchScore: 83, emailSent: false },
      { name: '高橋三郎', matchScore: 78, emailSent: true },
      { name: '田中四郎', matchScore: 75, emailSent: true }
    ],
    actions: [
      { time: '14:32:45', action: 'メール送信 (5名)', user: '山本' },
      { time: '14:31:20', action: 'PDF出力 (3件)', user: '山本' },
      { time: '14:30:05', action: 'マッチング実行', user: '山本' }
    ]
  };

  const handleViewDetail = (history: any) => {
    setSelectedHistory(history);
    setShowDetail(true);
  };

  return (
    <div className="space-y-6">
      {/* History Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <h3 className="text-lg font-medium p-4 border-b japanese-text">マッチング結果履歴</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="japanese-text">実行日時</TableHead>
              <TableHead className="japanese-text">実行者</TableHead>
              <TableHead className="japanese-text">案件数</TableHead>
              <TableHead className="japanese-text">技術者数</TableHead>
              <TableHead className="japanese-text">処理状況</TableHead>
              <TableHead className="japanese-text">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((history) => (
              <TableRow key={history.id}>
                <TableCell>{history.date}</TableCell>
                <TableCell>{history.user}</TableCell>
                <TableCell>{history.caseCount}件</TableCell>
                <TableCell>{history.candidateCount}名</TableCell>
                <TableCell>{history.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="japanese-text"
                    onClick={() => handleViewDetail(history)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    詳細
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Detail Dialog */}
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="japanese-text">
              マッチング詳細 - {selectedHistory?.date}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Cases section */}
            <div>
              <h4 className="text-sm font-medium mb-2 japanese-text">マッチングした案件</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="japanese-text">案件名</TableHead>
                    <TableHead className="japanese-text">会社名</TableHead>
                    <TableHead className="japanese-text">マッチング技術者数</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyDetail.cases.map((caseItem, index) => (
                    <TableRow key={index}>
                      <TableCell>{caseItem.name}</TableCell>
                      <TableCell>{caseItem.company}</TableCell>
                      <TableCell>{caseItem.matchedCandidates}名</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Candidates section */}
            <div>
              <h4 className="text-sm font-medium mb-2 japanese-text">マッチングした技術者</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="japanese-text">技術者名</TableHead>
                    <TableHead className="japanese-text">マッチスコア</TableHead>
                    <TableHead className="japanese-text">メール送信</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyDetail.candidates.map((candidate, index) => (
                    <TableRow key={index}>
                      <TableCell>{candidate.name}</TableCell>
                      <TableCell>{candidate.matchScore}%</TableCell>
                      <TableCell>{candidate.emailSent ? '送信済み' : '未送信'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Actions history */}
            <div>
              <h4 className="text-sm font-medium mb-2 japanese-text">操作履歴</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="japanese-text">時刻</TableHead>
                    <TableHead className="japanese-text">操作</TableHead>
                    <TableHead className="japanese-text">実行者</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyDetail.actions.map((action, index) => (
                    <TableRow key={index}>
                      <TableCell>{action.time}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>{action.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
