
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { Plus, Upload } from 'lucide-react';

export function AddTalentTab() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, this would submit the form data to an API
    toast({
      title: "技術者情報が登録されました",
      description: "新しい技術者情報が正常に登録されました",
      variant: "default",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="japanese-text">人才追加</CardTitle>
        <CardDescription className="japanese-text">
          新しい技術者の情報を登録します
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium japanese-text">基本情報</h3>
              <p className="text-sm text-muted-foreground japanese-text">技術者の基本情報を入力してください</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="japanese-text">氏名</Label>
                <Input id="name" placeholder="例: 山田 太郎" className="japanese-text" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="japanese-text">年齢</Label>
                <Input id="age" type="number" placeholder="例: 30" className="japanese-text" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="japanese-text">メールアドレス</Label>
                <Input id="email" type="email" placeholder="例: yamada@example.com" className="japanese-text" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="japanese-text">電話番号</Label>
                <Input id="phone" placeholder="例: 090-1234-5678" className="japanese-text" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="japanese-text">勤務地</Label>
                <Input id="location" placeholder="例: 東京" className="japanese-text" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience" className="japanese-text">経験年数</Label>
                <Select required>
                  <SelectTrigger id="experience" className="japanese-text">
                    <SelectValue placeholder="経験年数を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3年</SelectItem>
                    <SelectItem value="3-5">3-5年</SelectItem>
                    <SelectItem value="5-10">5-10年</SelectItem>
                    <SelectItem value="10+">10年以上</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="japanese-text">ステータス</Label>
                <Select required>
                  <SelectTrigger id="status" className="japanese-text">
                    <SelectValue placeholder="ステータスを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waiting">待機中</SelectItem>
                    <SelectItem value="project">案件中</SelectItem>
                    <SelectItem value="negotiating">交渉中</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rate" className="japanese-text">希望単価（万円）</Label>
                <div className="flex items-center gap-2">
                  <Input id="minRate" type="number" placeholder="最小" className="japanese-text" required />
                  <span>～</span>
                  <Input id="maxRate" type="number" placeholder="最大" className="japanese-text" required />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium japanese-text">スキル情報</h3>
              <p className="text-sm text-muted-foreground japanese-text">技術者のスキルに関する情報を入力してください</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills" className="japanese-text">主要スキル</Label>
                <Input id="skills" placeholder="例: Java, Spring, AWS" className="japanese-text" required />
                <p className="text-xs text-muted-foreground japanese-text">カンマ区切りで複数入力可能</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projects" className="japanese-text">主な案件経歴</Label>
                <Textarea 
                  id="projects" 
                  placeholder="例: クラウド移行プロジェクト（6ヶ月）: AWS, Docker, Terraform を使用" 
                  className="japanese-text resize-y h-32" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label className="japanese-text">対応可能な技術領域</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="frontend" />
                    <Label htmlFor="frontend" className="japanese-text">フロントエンド</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="backend" />
                    <Label htmlFor="backend" className="japanese-text">バックエンド</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="infrastructure" />
                    <Label htmlFor="infrastructure" className="japanese-text">インフラ</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mobile" />
                    <Label htmlFor="mobile" className="japanese-text">モバイル</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="data" />
                    <Label htmlFor="data" className="japanese-text">データ分析</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ai" />
                    <Label htmlFor="ai" className="japanese-text">AI/機械学習</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium japanese-text">添付ファイル</h3>
              <p className="text-sm text-muted-foreground japanese-text">技術者のレジュメなどの書類をアップロードしてください</p>
            </div>
            
            <div className="grid gap-4">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="mb-2 text-sm text-muted-foreground japanese-text">
                  ファイルをドラッグ＆ドロップするか、クリックしてアップロード
                </p>
                <Button variant="secondary" className="japanese-text">
                  <Plus className="mr-2 h-4 w-4" />
                  ファイルを選択
                </Button>
                <p className="mt-2 text-xs text-muted-foreground japanese-text">
                  PDF, Word, Excel形式のファイル（最大10MB）
                </p>
              </div>
              
              <div>
                <Label htmlFor="notes" className="japanese-text">備考</Label>
                <Textarea 
                  id="notes" 
                  placeholder="その他、特記事項があれば入力してください" 
                  className="japanese-text resize-y h-20" 
                />
              </div>
            </div>
          </div>
          
          <CardFooter className="flex justify-end px-0">
            <Button type="submit" className="japanese-text">
              <Plus className="mr-2 h-4 w-4" />
              技術者情報を登録
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddTalentTab;
