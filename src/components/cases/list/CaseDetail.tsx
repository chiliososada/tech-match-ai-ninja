import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PencilIcon, FileText, Calendar, MapPin, Briefcase, Code, Users, Clock, Languages, Flag, User, CircleDollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getStatusBadgeColor } from '../utils/statusUtils';
import { MailCase } from '../email/types';

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
      <Card className="flex items-center justify-center h-[300px] text-center bg-muted/10 border-dashed">
        <CardContent>
          <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-2" />
          <p className="text-muted-foreground japanese-text">案件を選択して詳細を表示</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-muted/10 border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl japanese-text font-bold">{selectedCase.title}</CardTitle>
          <Button onClick={toggleEditMode} variant="ghost" size="sm" className="hover:bg-muted">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Badge className={`${getStatusBadgeColor(selectedCase.status)} px-2 py-1`}>
            <span className="japanese-text">{selectedCase.status}</span>
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="japanese-text">作成日: {selectedCase.createdAt}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">
        {!editMode ? (
          // ... keep existing code (display mode section with all the case details)
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6">
              <div className="flex space-x-2">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">会社名</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.company || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-cyan-100 p-2 rounded-md">
                  <User className="h-4 w-4 text-cyan-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">担当者</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.manager || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-blue-100 p-2 rounded-md">
                  <Users className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">連絡先</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.managerEmail || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <Code className="h-4 w-4 text-indigo-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">必要経験</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.experience || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Briefcase className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">勤務形態</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.workType || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-amber-100 p-2 rounded-md">
                  <Clock className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">期間</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.duration || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-emerald-100 p-2 rounded-md">
                  <Languages className="h-4 w-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">日本語レベル</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.japanese || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-rose-100 p-2 rounded-md">
                  <Flag className="h-4 w-4 text-rose-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">優先度</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.priority || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-green-100 p-2 rounded-md">
                  <MapPin className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">勤務地</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.location}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-green-100 p-2 rounded-md">
                  <CircleDollarSign className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">単価</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.budget}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className={`${selectedCase.foreignerAccepted ? 'bg-green-100' : 'bg-red-100'} p-2 rounded-md`}>
                  <Users className={`h-4 w-4 ${selectedCase.foreignerAccepted ? 'text-green-700' : 'text-red-700'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">外国人採用</h4>
                  <p className={`text-sm japanese-text px-2 py-1 rounded-sm ${selectedCase.foreignerAccepted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedCase.foreignerAccepted ? '可能' : '不可'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className={`${selectedCase.freelancerAccepted ? 'bg-green-100' : 'bg-red-100'} p-2 rounded-md`}>
                  <User className={`h-4 w-4 ${selectedCase.freelancerAccepted ? 'text-green-700' : 'text-red-700'}`} />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">個人事業者</h4>
                  <p className={`text-sm japanese-text px-2 py-1 rounded-sm ${selectedCase.freelancerAccepted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {selectedCase.freelancerAccepted ? '可能' : '不可'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-purple-100 p-2 rounded-md">
                  <CircleDollarSign className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">希望単価</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.desiredBudget || "未設定"}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <div className="bg-blue-100 p-2 rounded-md">
                  <Calendar className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1 japanese-text">開始日</h4>
                  <p className="text-sm japanese-text bg-muted/20 px-2 py-1 rounded-sm">{selectedCase.startDate || "未設定"}</p>
                </div>
              </div>
              
              <div className="col-span-2 mt-2">
                <h4 className="text-sm font-medium mb-1 japanese-text flex items-center">
                  <Code className="h-4 w-4 mr-1 text-blue-600" />
                  スキル
                </h4>
                <div className="flex flex-wrap gap-1.5 bg-blue-50 p-2 rounded-md">
                  {selectedCase.skills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 japanese-text flex items-center">
                <FileText className="h-4 w-4 mr-1 text-gray-600" />
                案件詳細
              </h4>
              <div className="bg-muted/20 rounded-md p-4 text-sm whitespace-pre-wrap japanese-text max-h-[300px] overflow-y-auto border border-muted">
                {selectedCase.detailDescription || "詳細情報はありません"}
              </div>
            </div>
          </>
        ) : (
          // Edit mode - Fix the issue where the form disappears
          <>
            {/* Fix: Use the selectedCase as a fallback if editingCaseData is not available */}
            {(editingCaseData || selectedCase) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <Briefcase className="h-4 w-4 mr-1 text-gray-600" />
                    案件名
                  </label>
                  <Input 
                    value={editingCaseData?.title || selectedCase.title} 
                    onChange={(e) => handleEditChange('title', e.target.value)} 
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-600" />
                    開始日
                  </label>
                  <Input 
                    type="date"
                    value={editingCaseData?.startDate || selectedCase.startDate || ''} 
                    onChange={(e) => handleEditChange('startDate', e.target.value)}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-600" />
                    勤務地
                  </label>
                  <Input 
                    value={editingCaseData?.location || selectedCase.location} 
                    onChange={(e) => handleEditChange('location', e.target.value)}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <CircleDollarSign className="h-4 w-4 mr-1 text-gray-600" />
                    単価
                  </label>
                  <Input 
                    value={editingCaseData?.budget || selectedCase.budget} 
                    onChange={(e) => handleEditChange('budget', e.target.value)}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <CircleDollarSign className="h-4 w-4 mr-1 text-gray-600" />
                    希望単価
                  </label>
                  <Input 
                    value={editingCaseData?.desiredBudget || selectedCase.desiredBudget || ''} 
                    onChange={(e) => handleEditChange('desiredBudget', e.target.value)}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <Flag className="h-4 w-4 mr-1 text-gray-600" />
                    ステータス
                  </label>
                  <Select 
                    value={editingCaseData?.status || selectedCase.status}
                    onValueChange={(value) => handleEditChange('status', value)}
                  >
                    <SelectTrigger className="border-primary/30 focus:border-primary">
                      <SelectValue placeholder="ステータスを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="募集中">募集中</SelectItem>
                      <SelectItem value="募集完了">募集完了</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-600" />
                    外国人採用
                  </label>
                  <Select 
                    value={(editingCaseData?.foreignerAccepted || selectedCase.foreignerAccepted) ? "true" : "false"}
                    onValueChange={(value) => handleEditChange('foreignerAccepted', value === "true")}
                  >
                    <SelectTrigger className="border-primary/30 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">可能</SelectItem>
                      <SelectItem value="false">不可</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-600" />
                    個人事業者
                  </label>
                  <Select 
                    value={(editingCaseData?.freelancerAccepted || selectedCase.freelancerAccepted) ? "true" : "false"}
                    onValueChange={(value) => handleEditChange('freelancerAccepted', value === "true")}
                  >
                    <SelectTrigger className="border-primary/30 focus:border-primary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">可能</SelectItem>
                      <SelectItem value="false">不可</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <Code className="h-4 w-4 mr-1 text-gray-600" />
                    スキル（カンマ区切り）
                  </label>
                  <Input 
                    value={(editingCaseData?.skills || selectedCase.skills).join(', ')} 
                    onChange={(e) => handleEditChange('skills', e.target.value.split(',').map(s => s.trim()))}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium japanese-text flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-gray-600" />
                    案件詳細
                  </label>
                  <Textarea 
                    value={editingCaseData?.detailDescription || selectedCase.detailDescription || ''} 
                    onChange={(e) => handleEditChange('detailDescription', e.target.value)}
                    rows={8}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                
                <div className="col-span-2 flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={toggleEditMode} className="border-gray-300">
                    キャンセル
                  </Button>
                  <Button onClick={handleSaveEdit} className="bg-primary hover:bg-primary/90">
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
