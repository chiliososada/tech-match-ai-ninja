
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';
import { Engineer } from './types';

interface CandidateEditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engineer: Engineer | null;
  onEngineerChange: (engineer: Engineer) => void;
  onSave: () => void;
  isOwnCompany: boolean;
}

export const CandidateEdit: React.FC<CandidateEditProps> = ({
  open,
  onOpenChange,
  engineer,
  onEngineerChange,
  onSave,
  isOwnCompany
}) => {
  const [localEngineer, setLocalEngineer] = useState<Engineer | null>(engineer);

  useEffect(() => {
    setLocalEngineer(engineer);
  }, [engineer]);

  if (!localEngineer) return null;

  const handleChange = (field: keyof Engineer, value: any) => {
    setLocalEngineer({ ...localEngineer, [field]: value });
  };

  const handleSave = () => {
    if (localEngineer) {
      onEngineerChange(localEngineer);
      onSave();
    }
  };

  const handleSkillsChange = (value: string) => {
    const skillsArray = value.split(',').map(skill => skill.trim());
    handleChange('skills', skillsArray);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="japanese-text">技術者情報編集</DialogTitle>
          <DialogDescription className="japanese-text">
            技術者の情報を編集します
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="japanese-text">氏名</Label>
              <Input 
                value={localEngineer.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="japanese-text"
              />
            </div>

            {!isOwnCompany && (
              <div className="space-y-2">
                <Label className="japanese-text">所属会社</Label>
                <Input 
                  value={localEngineer.companyName || ''}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="japanese-text"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="japanese-text">国籍</Label>
              <Select
                value={localEngineer.nationality || "未設定"}
                onValueChange={(value) => handleChange('nationality', value)}
              >
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="国籍を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="未設定">選択してください</SelectItem>
                  <SelectItem value="日本">日本</SelectItem>
                  <SelectItem value="中国">中国</SelectItem>
                  <SelectItem value="インド">インド</SelectItem>
                  <SelectItem value="ベトナム">ベトナム</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">年齢</Label>
              <Input 
                value={localEngineer.age || ''}
                onChange={(e) => handleChange('age', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">性別</Label>
              <Select
                value={localEngineer.gender || "未設定"}
                onValueChange={(value) => handleChange('gender', value)}
              >
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="性別を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="未設定">選択してください</SelectItem>
                  <SelectItem value="男性">男性</SelectItem>
                  <SelectItem value="女性">女性</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                  <SelectItem value="回答しない">回答しない</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">最寄駅</Label>
              <Input 
                value={localEngineer.nearestStation || ''}
                onChange={(e) => handleChange('nearestStation', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">学歴</Label>
              <Input 
                value={localEngineer.education || ''}
                onChange={(e) => handleChange('education', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">来日年度</Label>
              <Input 
                value={localEngineer.arrivalYear || ''}
                onChange={(e) => handleChange('arrivalYear', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">メールアドレス</Label>
              <Input 
                value={localEngineer.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">電話番号</Label>
              <Input 
                value={localEngineer.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">保有スキル</Label>
              <Input 
                value={Array.isArray(localEngineer.skills) ? localEngineer.skills.join(', ') : ''}
                onChange={(e) => handleSkillsChange(e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">技術キーワード</Label>
              <Input 
                value={Array.isArray(localEngineer.technicalKeywords) ? localEngineer.technicalKeywords.join(', ') : localEngineer.technicalKeywords || ''}
                onChange={(e) => handleChange('technicalKeywords', e.target.value.split(',').map(kw => kw.trim()))}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">資格</Label>
              <Input 
                value={Array.isArray(localEngineer.certifications) ? localEngineer.certifications.join(', ') : localEngineer.certifications || ''}
                onChange={(e) => handleChange('certifications', e.target.value.split(',').map(cert => cert.trim()))}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">日本語レベル</Label>
              <Select
                value={localEngineer.japaneseLevel || "未設定"}
                onValueChange={(value) => handleChange('japaneseLevel', value)}
              >
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="日本語レベルを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="未設定">選択してください</SelectItem>
                  <SelectItem value="不問">不問</SelectItem>
                  <SelectItem value="日常会話レベル">日常会話レベル</SelectItem>
                  <SelectItem value="ビジネスレベル">ビジネスレベル</SelectItem>
                  <SelectItem value="ネイティブレベル">ネイティブレベル</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">英語レベル</Label>
              <Select
                value={localEngineer.englishLevel || "未設定"}
                onValueChange={(value) => handleChange('englishLevel', value)}
              >
                <SelectTrigger className="japanese-text">
                  <SelectValue placeholder="英語レベルを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="未設定">選択してください</SelectItem>
                  <SelectItem value="不問">不問</SelectItem>
                  <SelectItem value="日常会話レベル">日常会話レベル</SelectItem>
                  <SelectItem value="ビジネスレベル">ビジネスレベル</SelectItem>
                  <SelectItem value="ネイティブレベル">ネイティブレベル</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">経験年数</Label>
              <Input 
                value={localEngineer.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">業務範囲</Label>
              <Input 
                value={localEngineer.workScope || ''}
                onChange={(e) => handleChange('workScope', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">業務経験</Label>
              <Input 
                value={localEngineer.workExperience || ''}
                onChange={(e) => handleChange('workExperience', e.target.value)}
                className="japanese-text"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">稼働可能時期</Label>
              <Input 
                value={localEngineer.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                className="japanese-text"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="japanese-text">自己アピール</Label>
            <Textarea 
              value={localEngineer.selfPromotion || ''}
              onChange={(e) => handleChange('selfPromotion', e.target.value)}
              className="japanese-text"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="japanese-text">備考</Label>
            <Textarea 
              value={localEngineer.remarks}
              onChange={(e) => handleChange('remarks', e.target.value)}
              className="japanese-text"
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="japanese-text">
              キャンセル
            </Button>
            <Button onClick={handleSave} className="japanese-text">
              <Save className="mr-2 h-4 w-4" />
              保存
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

