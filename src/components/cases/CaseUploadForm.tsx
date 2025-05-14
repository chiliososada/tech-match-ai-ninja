
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, Upload } from 'lucide-react';
import { toast } from 'sonner';

export function CaseUploadForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false);
        toast.success('ファイルがアップロードされました', {
          description: `${file.name} がアップロードされました。処理中...`
        });
      }, 1500);
    }
  };

  const handleDescriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      setIsUploading(true);
      // Simulate processing
      setTimeout(() => {
        setIsUploading(false);
        toast.success('案件情報が処理されました', {
          description: '入力された案件情報が構造化されました'
        });
        setDescription('');
      }, 2000);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="japanese-text">ファイルをアップロード</CardTitle>
          <CardDescription className="japanese-text">
            案件情報のファイル（Excel、PDF、Word）をアップロードしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 border-border"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="w-8 h-8 mb-3 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold japanese-text">クリックしてファイルをアップロード</span>
                </p>
                <p className="text-xs text-muted-foreground japanese-text">
                  Excel、PDF、またはWord形式
                </p>
              </div>
              <Input
                id="dropzone-file"
                type="file"
                accept=".xlsx,.xls,.pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <form onSubmit={handleDescriptionSubmit}>
          <CardHeader>
            <CardTitle className="japanese-text">案件情報を入力</CardTitle>
            <CardDescription className="japanese-text">
              口頭の案件情報を入力して、構造化されたデータに変換します
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="case-description" className="japanese-text">案件の説明</Label>
                <Textarea
                  id="case-description"
                  placeholder="例：「Java、SpringBootの経験者を募集しています。勤務地は東京、期間は6ヶ月～、単価は60〜80万円です。」"
                  className="min-h-[120px] japanese-text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isUploading}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full japanese-text" 
              disabled={!description.trim() || isUploading}
            >
              {isUploading ? (
                <>処理中...</>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  分析して構造化
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default CaseUploadForm;
