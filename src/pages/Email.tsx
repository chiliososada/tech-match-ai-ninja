
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Inbox } from 'lucide-react';

export function Email() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">メール連携</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="japanese-text">メールアカウント設定</CardTitle>
            <CardDescription className="japanese-text">
              案件情報を自動で取得するメールアカウントを設定します
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
                  <SelectItem value="outlook">Outlook</SelectItem>
                  <SelectItem value="yahoo">Yahoo Mail</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
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
            <Button className="mt-4 w-full japanese-text">
              <Inbox className="mr-2 h-4 w-4" />
              メールアカウントを接続
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="japanese-text">メール取得設定</CardTitle>
            <CardDescription className="japanese-text">
              案件情報を取得するメールの条件を設定します
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search-terms" className="japanese-text">検索キーワード</Label>
              <Input id="search-terms" placeholder="案件, 求人, エンジニア" />
              <p className="text-xs text-muted-foreground japanese-text">
                複数のキーワードはカンマ区切りで入力してください。
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sender-filter" className="japanese-text">送信者フィルター</Label>
              <Input id="sender-filter" placeholder="@client.com, @recruiter.co.jp" />
              <p className="text-xs text-muted-foreground japanese-text">
                特定のドメインやアドレスからのメールのみを取得します。
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="check-frequency" className="japanese-text">チェック頻度</Label>
              <Select defaultValue="60">
                <SelectTrigger id="check-frequency">
                  <SelectValue placeholder="チェック頻度を選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15分ごと</SelectItem>
                  <SelectItem value="30">30分ごと</SelectItem>
                  <SelectItem value="60">1時間ごと</SelectItem>
                  <SelectItem value="360">6時間ごと</SelectItem>
                  <SelectItem value="720">12時間ごと</SelectItem>
                  <SelectItem value="1440">24時間ごと</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-4 w-full japanese-text">設定を保存</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Email;
