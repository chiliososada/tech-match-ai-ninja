
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Shield, Mail, Play, History, Link } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Email() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "設定を保存しました",
      description: "メール連携の設定が正常に保存されました。",
    });
  };
  
  const handleTestRun = () => {
    toast({
      title: "テスト実行中",
      description: "メール連携のテスト実行を開始しました。",
    });
    // テスト実行のロジックを実装
    setTimeout(() => {
      toast({
        title: "テスト実行完了",
        description: "メール連携のテスト実行が成功しました。5件のメールを処理しました。",
      });
    }, 2000);
  };
  
  const openLogHistory = () => {
    toast({
      title: "実行ログを表示中",
      description: "直近の実行ログを取得しています。",
    });
    // 実際には別ページやモーダルでログを表示する処理
  };
  
  const openSettingsHistory = () => {
    toast({
      title: "設定履歴を表示中",
      description: "過去の設定履歴を取得しています。",
    });
    // 設定履歴を表示する処理
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">メール連携</h2>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="japanese-text flex items-center" 
              onClick={openSettingsHistory}
            >
              <History className="mr-1 h-4 w-4" />
              設定履歴
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="japanese-text flex items-center" 
              onClick={openLogHistory}
            >
              <Link className="mr-1 h-4 w-4" />
              実行ログ
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="japanese-text flex items-center" 
              onClick={handleTestRun}
            >
              <Play className="mr-1 h-4 w-4" />
              テスト実行
            </Button>
          </div>
        </div>

        <Tabs defaultValue="execution" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="execution" className="japanese-text">実行条件</TabsTrigger>
            <TabsTrigger value="filter" className="japanese-text">フィルター条件</TabsTrigger>
            <TabsTrigger value="security" className="japanese-text">セキュリティ設定</TabsTrigger>
          </TabsList>

          {/* Tab 1: Frequency and Execution Conditions */}
          <TabsContent value="execution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center japanese-text">
                  <Clock className="mr-2 h-5 w-5" />
                  抽取頻度と実行条件
                </CardTitle>
                <CardDescription className="japanese-text">
                  メール取得の頻度や実行条件を設定します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="japanese-text">開始執行時間</Label>
                    <Input type="time" id="start-time" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interval" className="japanese-text">取込間隔</Label>
                    <Select defaultValue="60">
                      <SelectTrigger id="interval">
                        <SelectValue placeholder="取込間隔を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15分ごと</SelectItem>
                        <SelectItem value="30">30分ごと</SelectItem>
                        <SelectItem value="60">1時間ごと</SelectItem>
                        <SelectItem value="180">3時間ごと</SelectItem>
                        <SelectItem value="360">6時間ごと</SelectItem>
                        <SelectItem value="720">12時間ごと</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="active-hours" className="japanese-text">稼働時間帯</Label>
                    <div className="flex space-x-2">
                      <Input type="time" id="active-hours-start" className="w-full" />
                      <span className="flex items-center">～</span>
                      <Input type="time" id="active-hours-end" className="w-full" />
                    </div>
                    <p className="text-xs text-muted-foreground japanese-text">
                      深夜帯実行を避けるために指定可能
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="next-execution" className="japanese-text">次回実行予定</Label>
                    <Input type="text" id="next-execution" value="2025-05-15 15:00" disabled 
                      className="bg-muted" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-emails" className="japanese-text">実行最大件数/回</Label>
                  <Input type="number" id="max-emails" placeholder="100" />
                  <p className="text-xs text-muted-foreground japanese-text">
                    1回の実行で処理する最大メール数
                  </p>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <Label className="japanese-text font-medium">機能名称と用途</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="border rounded-md p-3 bg-muted/50">
                      <div className="flex items-center mb-2">
                        <Play className="h-4 w-4 mr-2" />
                        <span className="font-medium japanese-text">手動実行ボタン</span>
                      </div>
                      <p className="text-xs text-muted-foreground japanese-text">
                        テスト実行用 - 現在の設定でメール連携処理を手動で実行します
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-muted/50">
                      <div className="flex items-center mb-2">
                        <History className="h-4 w-4 mr-2" />
                        <span className="font-medium japanese-text">設定の保存履歴</span>
                      </div>
                      <p className="text-xs text-muted-foreground japanese-text">
                        自動保存された過去の設定履歴を確認・復元できます
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-muted/50">
                      <div className="flex items-center mb-2">
                        <Link className="h-4 w-4 mr-2" />
                        <span className="font-medium japanese-text">最終実行ログ確認</span>
                      </div>
                      <p className="text-xs text-muted-foreground japanese-text">
                        直近の実行結果や処理状況を確認できます
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Email Filter Conditions */}
          <TabsContent value="filter" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center japanese-text">
                  <Mail className="mr-2 h-5 w-5" />
                  対象メール・フィルター条件
                </CardTitle>
                <CardDescription className="japanese-text">
                  処理対象とするメールの条件を設定します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Allowed Domains */}
                <div className="space-y-2">
                  <Label htmlFor="allowed-domains" className="japanese-text">対象ドメイン（許可リスト）</Label>
                  <Input id="allowed-domains" placeholder="@abc.co.jp, @xyz-tech.com" />
                  <p className="text-xs text-muted-foreground japanese-text">
                    このドメインのみ処理対象
                  </p>
                </div>
                
                {/* Blocked Domains */}
                <div className="space-y-2">
                  <Label htmlFor="blocked-domains" className="japanese-text">無視するドメイン（拒否リスト）</Label>
                  <Input id="blocked-domains" placeholder="@newsletter.com, @noreply.x" />
                  <p className="text-xs text-muted-foreground japanese-text">
                    無視する送信元
                  </p>
                </div>
                
                {/* Ignored Keywords */}
                <div className="space-y-2">
                  <Label htmlFor="ignored-keywords" className="japanese-text">無視キーワード（件名）</Label>
                  <Input id="ignored-keywords" placeholder="広告, キャンペーン" />
                  <p className="text-xs text-muted-foreground japanese-text">
                    件名に含まれる場合はスキップ
                  </p>
                </div>
                
                {/* Error Handling */}
                <div className="border-t pt-4">
                  <h3 className="text-md font-medium mb-3 japanese-text">エラー処理と通知設定</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="error-email" className="japanese-text">エラー通知先メールアドレス</Label>
                      <Input id="error-email" placeholder="system-alert@yourcompany.co.jp" />
                      <p className="text-xs text-muted-foreground japanese-text">
                        処理失敗時に通知送信
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="error-threshold" className="japanese-text">エラー件数アラート閾値</Label>
                      <Input type="number" id="error-threshold" placeholder="10" />
                      <p className="text-xs text-muted-foreground japanese-text">
                        過剰な失敗時の監視目的
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Connection and Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center japanese-text">
                  <Shield className="mr-2 h-5 w-5" />
                  接続・セキュリティ設定
                </CardTitle>
                <CardDescription className="japanese-text">
                  メールアカウントの接続とセキュリティ設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-provider" className="japanese-text">メールプロバイダー</Label>
                  <Select defaultValue="gmail">
                    <SelectTrigger id="email-provider">
                      <SelectValue placeholder="メールプロバイダーを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="outlook">Microsoft 365 / Outlook</SelectItem>
                      <SelectItem value="yahoo">Yahoo Mail</SelectItem>
                      <SelectItem value="imap">汎用 IMAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="japanese-text">メールアドレス</Label>
                  <Input type="email" id="email" placeholder="example@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="japanese-text">アプリパスワード</Label>
                  <Input type="password" id="password" placeholder="••••••••" />
                  <p className="text-xs text-muted-foreground japanese-text">
                    メールプロバイダーで生成したアプリパスワードを入力してください。
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Button className="w-full japanese-text" onClick={handleSave}>設定を保存</Button>
      </div>
    </MainLayout>
  );
}

export default Email;
