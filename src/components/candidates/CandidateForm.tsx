
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Save, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

interface NewEngineerType {
  name: string;
  skills: string;
  japaneseLevel: string;
  experience: string;
  availability: string;
  status: string;
  desiredConditions: string;
  companyType: string;
  companyName: string;
  source: string;
  registeredAt: string;
  updatedAt: string;
}

interface CandidateFormProps {
  initialData: NewEngineerType;
  onSubmit: (e: React.FormEvent) => void;
  onDataChange: (data: NewEngineerType) => void;
  recommendationTemplate: string;
  recommendationText: string;
  onRecommendationTemplateChange: (value: string) => void;
  onRecommendationTextChange: (value: string) => void;
  onGenerateRecommendation: () => void;
}

export const CandidateForm: React.FC<CandidateFormProps> = ({
  initialData,
  onSubmit,
  onDataChange,
  recommendationTemplate,
  recommendationText,
  onRecommendationTemplateChange,
  onRecommendationTextChange,
  onGenerateRecommendation
}) => {
  const [formData, setFormData] = useState<NewEngineerType>(initialData);

  const handleChange = (field: keyof NewEngineerType, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">新規技術者登録</CardTitle>
          <CardDescription className="japanese-text">
            自社や協力会社の技術者情報を登録します
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="japanese-text">区分</Label>
              <RadioGroup 
                value={formData.companyType}
                onValueChange={(value) => handleChange('companyType', value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="自社" id="own-company" />
                  <Label htmlFor="own-company" className="japanese-text">自社</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="他社" id="other-company" />
                  <Label htmlFor="other-company" className="japanese-text">他社</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="japanese-text">氏名 <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="例: 山田太郎"
                  className="japanese-text"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName" className="japanese-text">所属会社 <span className="text-red-500">*</span></Label>
                <Input 
                  id="companyName" 
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="例: テックイノベーション株式会社"
                  className="japanese-text"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills" className="japanese-text">保有スキル <span className="text-red-500">*</span></Label>
                <Input 
                  id="skills" 
                  value={formData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  placeholder="例: Java, Spring Boot, AWS（カンマ区切り）"
                  className="japanese-text"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="japanese" className="japanese-text">日本語レベル <span className="text-red-500">*</span></Label>
                <Select
                  value={formData.japaneseLevel}
                  onValueChange={(value) => handleChange('japaneseLevel', value)}
                >
                  <SelectTrigger className="japanese-text">
                    <SelectValue placeholder="日本語レベルを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="不問">不問</SelectItem>
                    <SelectItem value="日常会話レベル">日常会話レベル</SelectItem>
                    <SelectItem value="ビジネスレベル">ビジネスレベル</SelectItem>
                    <SelectItem value="ネイティブレベル">ネイティブレベル</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience" className="japanese-text">経験年数 <span className="text-red-500">*</span></Label>
                <Input 
                  id="experience" 
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  placeholder="例: 5年"
                  className="japanese-text"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availability" className="japanese-text">稼働可能時期</Label>
                <Input 
                  id="availability" 
                  value={formData.availability}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  placeholder="例: 即日、1ヶ月後、応相談"
                  className="japanese-text"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="japanese-text">ステータス</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger className="japanese-text">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="案件探し中">案件探し中</SelectItem>
                    <SelectItem value="提案中">提案中</SelectItem>
                    <SelectItem value="稼働中">稼働中</SelectItem>
                    <SelectItem value="非稼働">非稼働</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="desired-conditions" className="japanese-text">希望条件</Label>
              <Input 
                id="desired-conditions" 
                value={formData.desiredConditions}
                onChange={(e) => handleChange('desiredConditions', e.target.value)}
                placeholder="例: 東京/リモート, 60~80万円"
                className="japanese-text"
              />
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">推薦文生成</CardTitle>
          <CardDescription className="japanese-text">
            候補者の自動生成された推薦文
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recommendation-template" className="japanese-text">テンプレート</Label>
            <Textarea 
              id="recommendation-template" 
              className="min-h-[150px] japanese-text"
              value={recommendationTemplate}
              onChange={(e) => onRecommendationTemplateChange(e.target.value)}
              placeholder="[名前]、[スキル]、[経験]などのプレースホルダーを使用してください"
            />
            <p className="text-xs text-muted-foreground japanese-text">
              推薦文のテンプレートを編集できます。[名前]、[スキル]、[経験]などのプレースホルダーを使用します。
            </p>
          </div>
          
          <Button 
            onClick={onGenerateRecommendation} 
            variant="outline" 
            className="w-full japanese-text"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            AIで推薦文を生成
          </Button>
          
          <div className="space-y-2">
            <Label htmlFor="generated-recommendation" className="japanese-text">生成された推薦文</Label>
            <Textarea 
              id="generated-recommendation"
              className="min-h-[150px] japanese-text" 
              value={recommendationText}
              onChange={(e) => onRecommendationTextChange(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={onSubmit} type="submit" className="japanese-text">
            <Save className="mr-2 h-4 w-4" />
            技術者と推薦文を登録
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
