
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PencilIcon, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MailCase } from '../email/types';

// 案件のステータスに応じた色を返す関数
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "募集中":
      return "bg-green-100 text-green-800";
    case "募集完了":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface CaseDetailProps {
  selectedCase: MailCase | null;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  editingCaseData: MailCase | null;
  handleEditChange: (field: string, value: any) => void;
  handleSaveEdit: () => void;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({
  selectedCase,
  editMode,
  setEditMode,
  editingCaseData,
  handleEditChange,
  handleSaveEdit
}) => {
  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!selectedCase) {
    return (
      <Card className="flex items-center justify-center h-[300px] text-center">
        <CardContent>
          <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-2" />
          <p className="text-muted-foreground japanese-text">案件を選択して詳細を表示</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl japanese-text">{selectedCase.title}</CardTitle>
          <Button onClick={toggleEditMode} variant="ghost" size="sm">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Badge className={getStatusBadgeColor(selectedCase.status)}>
            <span className="japanese-text">{selectedCase.status}</span>
          </Badge>
          <span className="text-sm text-muted-foreground japanese-text">作成日: {selectedCase.createdAt}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!editMode ? (
          <>
            {/* 表示モード */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">会社名</h4>
                <p className="text-sm japanese-text">{selectedCase.company || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">担当者</h4>
                <p className="text-sm japanese-text">{selectedCase.manager || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">連絡先</h4>
                <p className="text-sm japanese-text">{selectedCase.managerEmail || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">必要経験</h4>
                <p className="text-sm japanese-text">{selectedCase.experience || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">勤務形態</h4>
                <p className="text-sm japanese-text">{selectedCase.workType || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">期間</h4>
                <p className="text-sm japanese-text">{selectedCase.duration || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">日本語レベル</h4>
                <p className="text-sm japanese-text">{selectedCase.japanese || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">優先度</h4>
                <p className="text-sm japanese-text">{selectedCase.priority || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">勤務地</h4>
                <p className="text-sm japanese-text">{selectedCase.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">単価</h4>
                <p className="text-sm japanese-text">{selectedCase.budget}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">外国人採用</h4>
                <p className="text-sm japanese-text">{selectedCase.foreignerAccepted ? '可能' : '不可'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">個人事業者</h4>
                <p className="text-sm japanese-text">{selectedCase.freelancerAccepted ? '可能' : '不可'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">希望単価</h4>
                <p className="text-sm japanese-text">{selectedCase.desiredBudget || "未設定"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 japanese-text">開始日</h4>
                <p className="text-sm japanese-text">{selectedCase.startDate || "未設定"}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium mb-1 japanese-text">スキル</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCase.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="japanese-text">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 japanese-text">案件詳細</h4>
              <div className="bg-muted/50 rounded-md p-3 text-sm whitespace-pre-wrap japanese-text max-h-[300px] overflow-y-auto">
                {selectedCase.detailDescription || "詳細情報はありません"}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 編集モード */}
            {editingCaseData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">案件名</label>
                  <Input 
                    value={editingCaseData.title} 
                    onChange={(e) => handleEditChange('title', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">開始日</label>
                  <Input 
                    type="date"
                    value={editingCaseData.startDate || ''} 
                    onChange={(e) => handleEditChange('startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">勤務地</label>
                  <Input 
                    value={editingCaseData.location} 
                    onChange={(e) => handleEditChange('location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">単価</label>
                  <Input 
                    value={editingCaseData.budget} 
                    onChange={(e) => handleEditChange('budget', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">希望単価</label>
                  <Input 
                    value={editingCaseData.desiredBudget || ''} 
                    onChange={(e) => handleEditChange('desiredBudget', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">ステータス</label>
                  <Select 
                    value={editingCaseData.status}
                    onValueChange={(value) => handleEditChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ステータスを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="募集中">募集中</SelectItem>
                      <SelectItem value="募集完了">募集完了</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">外国人採用</label>
                  <Select 
                    value={editingCaseData.foreignerAccepted ? "true" : "false"}
                    onValueChange={(value) => handleEditChange('foreignerAccepted', value === "true")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">可能</SelectItem>
                      <SelectItem value="false">不可</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text">個人事業者</label>
                  <Select 
                    value={editingCaseData.freelancerAccepted ? "true" : "false"}
                    onValueChange={(value) => handleEditChange('freelancerAccepted', value === "true")}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">可能</SelectItem>
                      <SelectItem value="false">不可</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium japanese-text">スキル（カンマ区切り）</label>
                  <Input 
                    value={editingCaseData.skills.join(', ')} 
                    onChange={(e) => handleEditChange('skills', e.target.value.split(',').map(s => s.trim()))}
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium japanese-text">案件詳細</label>
                  <Textarea 
                    value={editingCaseData.detailDescription || ''} 
                    onChange={(e) => handleEditChange('detailDescription', e.target.value)}
                    rows={8}
                  />
                </div>
                
                <div className="col-span-2 flex justify-end space-x-2">
                  <Button variant="outline" onClick={toggleEditMode}>
                    キャンセル
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    保存
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
