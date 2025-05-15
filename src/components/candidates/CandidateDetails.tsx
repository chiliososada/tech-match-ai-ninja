
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';

interface Engineer {
  id: string;
  name: string;
  skills?: string[];
  japaneseLevel: string;
  experience: string;
  availability: string;
  status: string;
  desiredConditions: string;
  companyType: string;
  companyName?: string;
  source: string;
  recommendation?: string;
  email?: string;
  phone?: string;
  registeredAt: string;
  updatedAt: string;
}

interface CandidateDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engineer: Engineer | null;
  onStatusChange: (value: string) => void;
  onEditClick: () => void;
}

export const CandidateDetails: React.FC<CandidateDetailsProps> = ({
  open,
  onOpenChange,
  engineer,
  onStatusChange,
  onEditClick
}) => {
  if (!engineer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="japanese-text">技術者詳細</DialogTitle>
          <DialogDescription className="japanese-text">
            技術者の詳細情報を表示しています
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium japanese-text">氏名</h4>
              <p className="japanese-text">{engineer.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">区分</h4>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={engineer.companyType === "自社" ? "default" : "secondary"} 
                  className="japanese-text"
                >
                  {engineer.companyType}
                </Badge>
                {engineer.source === "メール" && (
                  <Badge variant="outline" className="japanese-text">メール</Badge>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">所属会社</h4>
              <p className="japanese-text">{engineer.companyName || 'N/A'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">メールアドレス</h4>
              <p>{engineer.email || 'N/A'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">電話番号</h4>
              <p>{engineer.phone || 'N/A'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">スキル</h4>
              <p className="japanese-text">{engineer.skills && engineer.skills.join(', ')}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">経験年数</h4>
              <p className="japanese-text">{engineer.experience}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">日本語レベル</h4>
              <p className="japanese-text">{engineer.japaneseLevel}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">稼働可能時期</h4>
              <p className="japanese-text">{engineer.availability}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">登録日</h4>
              <p className="japanese-text">{engineer.registeredAt}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">更新日</h4>
              <p className="japanese-text">{engineer.updatedAt}</p>
            </div>
            
            <div className="col-span-2">
              <h4 className="text-sm font-medium japanese-text">希望条件</h4>
              <p className="japanese-text">{engineer.desiredConditions}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 japanese-text">ステータス</h4>
            <Select
              value={engineer.status}
              onValueChange={onStatusChange}
            >
              <SelectTrigger className="w-full japanese-text">
                <SelectValue placeholder="ステータスを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="案件探し中" className="japanese-text">案件探し中</SelectItem>
                <SelectItem value="提案中" className="japanese-text">提案中</SelectItem>
                <SelectItem value="稼働中" className="japanese-text">稼働中</SelectItem>
                <SelectItem value="非稼働" className="japanese-text">非稼働</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 japanese-text">推薦文</h4>
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm japanese-text whitespace-pre-wrap">{engineer.recommendation}</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="japanese-text">
              閉じる
            </Button>
            <Button onClick={onEditClick} className="japanese-text">
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
