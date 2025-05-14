
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileUp, Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ResumeUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendationTemplate, setRecommendationTemplate] = useState(
    `[名前]は[主要スキル]を中心に[経験]年以上の開発経験があり、日本語は[日本語レベル]です。
[得意分野]の強みがあり、[サブスキル]なども習得しています。
[前職での役割]として、[主な業務内容]を担当してきました。
[特徴的な実績]があり、希望条件は[勤務地]で、単価は[単価]です。`
  );

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

  const handleGenerateRecommendation = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('推薦文が生成されました');
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="japanese-text">履歴書をアップロード</CardTitle>
        <CardDescription className="japanese-text">
          PDFまたはWord形式の履歴書をアップロードして、自動的に情報を抽出します。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recommendation-template" className="japanese-text">推薦文テンプレート</Label>
            <Textarea 
              id="recommendation-template"
              className="min-h-[120px] japanese-text"
              value={recommendationTemplate}
              onChange={(e) => setRecommendationTemplate(e.target.value)}
              placeholder="[名前]、[主要スキル]、[経験]などのプレースホルダーを使用してください"
            />
            <p className="text-xs text-muted-foreground japanese-text">
              推薦文のテンプレートをカスタマイズできます。[名前]、[主要スキル]、[経験]などのプレースホルダーを使用してください。
            </p>
          </div>
          
          <Button 
            onClick={handleGenerateRecommendation} 
            disabled={isGenerating || isUploading}
            className="w-full japanese-text"
          >
            {isGenerating ? (
              <span className="japanese-text">生成中...</span>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                AIで推薦文を生成
              </>
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground japanese-text">
          アップロードされた履歴書から、基本情報、技術スタック、プロジェクト経歴、日本語能力などが自動的に抽出されます。
        </p>
      </CardFooter>
    </Card>
  );
}

export default ResumeUpload;
