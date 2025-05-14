
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileUp, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ResumeUpload() {
  const [isUploading, setIsUploading] = useState(false);
  
  // 构造化データ的可编辑表单数据
  const [candidateData, setCandidateData] = useState({
    name: '鈴木太郎',
    japaneseLevel: 'ビジネスレベル',
    email: 'taro.suzuki@example.com',
    phone: '090-1234-5678',
    skills: [
      { name: 'Java', years: '7' },
      { name: 'Spring Boot', years: '5' },
      { name: 'AWS', years: '3' },
      { name: 'Docker', years: '2' }
    ],
    location: '東京, リモート',
    rate: '60万円〜80万円'
  });

  // 处理表单变更
  const handleFormChange = (field: string, value: string) => {
    setCandidateData(prev => ({ ...prev, [field]: value }));
  };

  // 处理技能变更
  const handleSkillChange = (index: number, field: 'name' | 'years', value: string) => {
    setCandidateData(prev => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = { ...updatedSkills[index], [field]: value };
      return { ...prev, skills: updatedSkills };
    });
  };

  // 保存候选人数据
  const handleSaveCandidate = () => {
    toast.success('候補者情報が保存されました', {
      description: `${candidateData.name}さんのプロフィールが登録されました`
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && 
          file.type !== 'application/msword' && 
          file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        toast.error('サポートされていないファイル形式です', {
          description: 'PDFまたはWord (.doc, .docx) ファイルをアップロードしてください。'
        });
        return;
      }
      
      setIsUploading(true);
      // Simulate file processing
      setTimeout(() => {
        setIsUploading(false);
        toast.success('履歴書がアップロードされました', {
          description: `${file.name} の分析が完了しました。`
        });
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="japanese-text">履歴書をアップロード</CardTitle>
          <CardDescription className="japanese-text">
            PDFまたはWord形式の履歴書をアップロードして、自動的に情報を抽出します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="resume-file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 border-border"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold japanese-text">クリックして履歴書をアップロード</span>
                </p>
                <p className="text-xs text-muted-foreground japanese-text">PDF、.doc、または.docx形式</p>
                {isUploading && (
                  <div className="mt-4">
                    <div className="w-8 h-8 border-4 border-t-custom-blue-500 border-custom-blue-200 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <Input
                id="resume-file"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground japanese-text">
            アップロードされた履歴書から、基本情報、技術スタック、プロジェクト経歴、日本語能力などが自動的に抽出されます。
          </p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">構造化データ</CardTitle>
          <CardDescription className="japanese-text">
            AIにより抽出された候補者情報を編集できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="japanese-text">氏名</Label>
                <Input 
                  value={candidateData.name} 
                  className="japanese-text" 
                  onChange={(e) => handleFormChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="japanese-text">日本語レベル</Label>
                <Select 
                  value={candidateData.japaneseLevel}
                  onValueChange={(value) => handleFormChange('japaneseLevel', value)}
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
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="japanese-text">メールアドレス</Label>
                <Input 
                  value={candidateData.email} 
                  onChange={(e) => handleFormChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="japanese-text">電話番号</Label>
                <Input 
                  value={candidateData.phone} 
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">スキル</Label>
              <div className="grid grid-cols-2 gap-2">
                {candidateData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center border rounded-md p-2">
                    <Input 
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      className="border-0 bg-transparent p-0 focus-visible:ring-0"
                    />
                    <span className="mx-2">:</span>
                    <Input
                      value={skill.years}
                      onChange={(e) => handleSkillChange(index, 'years', e.target.value)}
                      className="border-0 bg-transparent p-0 focus-visible:ring-0 w-12 text-right"
                    />
                    <span className="ml-1">年</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="japanese-text">希望条件</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  value={candidateData.location} 
                  className="japanese-text" 
                  onChange={(e) => handleFormChange('location', e.target.value)}
                />
                <Input 
                  value={candidateData.rate} 
                  className="japanese-text" 
                  onChange={(e) => handleFormChange('rate', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveCandidate} className="japanese-text">
            <Save className="mr-2 h-4 w-4" />
            候補者を保存
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResumeUpload;
