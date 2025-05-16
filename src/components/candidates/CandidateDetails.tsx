
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Flag, Cake, User, Train } from 'lucide-react';
import { Engineer } from './types';

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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
            
            {engineer.companyType === '他社' && (
              <div>
                <h4 className="text-sm font-medium japanese-text">所属会社</h4>
                <p className="japanese-text">{engineer.companyName || 'N/A'}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium japanese-text">国籍</h4>
              <div className="flex items-center">
                <Flag className="h-4 w-4 mr-2" />
                <p className="japanese-text">{engineer.nationality || '未設定'}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">年齢</h4>
              <div className="flex items-center">
                <Cake className="h-4 w-4 mr-2" />
                <p className="japanese-text">{engineer.age || '未設定'}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">性別</h4>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <p className="japanese-text">{engineer.gender || '未設定'}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">最寄駅</h4>
              <div className="flex items-center">
                <Train className="h-4 w-4 mr-2" />
                <p className="japanese-text">{engineer.nearestStation || '未設定'}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">学歴</h4>
              <p className="japanese-text">{engineer.education || '未設定'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">来日年度</h4>
              <p className="japanese-text">{engineer.arrivalYear || '未設定'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">メールアドレス</h4>
              <p>{engineer.email || '未設定'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">電話番号</h4>
              <p>{engineer.phone || '未設定'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">スキル</h4>
              <p className="japanese-text">{engineer.skills && engineer.skills.join(', ')}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">技術キーワード</h4>
              <p className="japanese-text">{engineer.technicalKeywords ? (Array.isArray(engineer.technicalKeywords) ? engineer.technicalKeywords.join(', ') : engineer.technicalKeywords) : '未設定'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">資格</h4>
              <p className="japanese-text">{engineer.certifications ? (Array.isArray(engineer.certifications) ? engineer.certifications.join(', ') : engineer.certifications) : '未設定'}</p>
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
              <h4 className="text-sm font-medium japanese-text">英語レベル</h4>
              <p className="japanese-text">{engineer.englishLevel || '未設定'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">業務範囲</h4>
              <p className="japanese-text">{engineer.workScope || '未設定'}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium japanese-text">業務経験</h4>
              <p className="japanese-text">{engineer.workExperience || '未設定'}</p>
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
              <h4 className="text-sm font-medium japanese-text">自己アピール</h4>
              <p className="japanese-text">{engineer.selfPromotion || '未設定'}</p>
            </div>
            
            <div className="col-span-2">
              <h4 className="text-sm font-medium japanese-text">備考</h4>
              <p className="japanese-text">{engineer.remarks}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 japanese-text">ステータス</h4>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(engineer.status) ? 
                engineer.status.map((status, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline" 
                    className={`japanese-text ${
                      status === '提案中' ? 'bg-blue-500 text-white' : 
                      status === '事前面談' ? 'bg-orange-500 text-white' : 
                      status === '面談' ? 'bg-green-500 text-white' : 
                      status === '結果待ち' ? 'bg-purple-500 text-white' : 
                      status === '営業終了' ? 'bg-gray-500 text-white' : ''
                    }`}
                  >
                    {status}
                  </Badge>
                )) : 
                <Badge variant="outline" className="japanese-text">
                  {engineer.status}
                </Badge>
              }
            </div>
            <div className="mt-3">
              <Select
                onValueChange={onStatusChange}
                defaultValue="ステータスを選択"
              >
                <SelectTrigger className="w-full japanese-text">
                  <SelectValue placeholder="ステータスを更新" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ステータスを選択" className="japanese-text">ステータスを選択</SelectItem>
                  <SelectItem value="提案中" className="japanese-text">提案中</SelectItem>
                  <SelectItem value="事前面談" className="japanese-text">事前面談</SelectItem>
                  <SelectItem value="面談" className="japanese-text">面談</SelectItem>
                  <SelectItem value="結果待ち" className="japanese-text">結果待ち</SelectItem>
                  <SelectItem value="営業終了" className="japanese-text">営業終了</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 japanese-text">推薦文</h4>
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm japanese-text whitespace-pre-wrap">{engineer.recommendation || '未設定'}</p>
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
