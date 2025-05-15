
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

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

interface CandidateEditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engineer: Engineer | null;
  onEngineerChange: (engineer: Engineer) => void;
  onSave: () => void;
}

export const CandidateEdit: React.FC<CandidateEditProps> = ({
  open,
  onOpenChange,
  engineer,
  onEngineerChange,
  onSave
}) => {
  if (!engineer) return null;

  const handleChange = (field: keyof Engineer, value: any) => {
    onEngineerChange({ ...engineer, [field]: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="japanese-text">技術者情報編集</DialogTitle>
          <DialogDescription className="japanese-text">
            技術者の情報を編集します
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="japanese-text">区分</Label>
            <RadioGroup 
              value={engineer.companyType}
              onValueChange={(value) => handleChange('companyType', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="自社" id="edit-own-company" />
                <Label htmlFor="edit-own-company" className="japanese-text">自社</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="他社" id="edit-other-company" />
                <Label htmlFor="edit-other-company" className="japanese-text">他社</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="japanese-text">氏名</Label>
              <Input 
                value={engineer.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="japanese-text"
              />
            </div>

            <div className="space-y-2">
              <Label className="japanese-text">所属会社</Label>
              <Input 
                value={engineer.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">メールアドレス</Label>
              <Input 
                value={engineer.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">電話番号</Label>
              <Input 
                value={engineer.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">日本語レベル</Label>
              <Select
                value={engineer.japaneseLevel}
                onValueChange={(value) => handleChange('japaneseLevel', value)}
              >
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="日本語レベルを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="不問" className="japanese-text">不問</SelectItem>
                  <SelectItem value="日常会話レベル" className="japanese-text">日常会話レベル</SelectItem>
                  <SelectItem value="ビジネスレベル" className="japanese-text">ビジネスレベル</SelectItem>
                  <SelectItem value="ネイティブレベル" className="japanese-text">ネイティブレベル</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">保有スキル</Label>
              <Input 
                value={engineer.skills && engineer.skills.join(', ')}
                onChange={(e) => handleChange('skills', e.target.value.split(', '))}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">経験年数</Label>
              <Input 
                value={engineer.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">希望条件</Label>
              <Input 
                value={engineer.desiredConditions}
                onChange={(e) => handleChange('desiredConditions', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">稼働可能時期</Label>
              <Input 
                value={engineer.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">登録日</Label>
              <Input 
                value={engineer.registeredAt}
                readOnly
                disabled
                className="japanese-text bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">更新日</Label>
              <Input 
                value={new Date().toISOString().split('T')[0]} 
                readOnly
                disabled
                className="japanese-text bg-muted"
              />
              <p className="text-xs text-muted-foreground japanese-text">保存時に自動で更新されます</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="japanese-text">ステータス</Label>
            <Select
              value={engineer.status}
              onValueChange={(value) => handleChange('status', value)}
            >
              <SelectTrigger className="japanese-text">
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
          
          <div className="space-y-2">
            <Label className="japanese-text">推薦文</Label>
            <Textarea 
              value={engineer.recommendation || ''}
              onChange={(e) => handleChange('recommendation', e.target.value)}
              className="min-h-[150px] japanese-text" 
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="japanese-text">
              キャンセル
            </Button>
            <Button onClick={onSave} className="japanese-text">
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
