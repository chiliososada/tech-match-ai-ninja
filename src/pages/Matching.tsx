
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function Matching() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">案件とのマッチング</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="japanese-text">案件とのマッチング</CardTitle>
            <CardDescription className="japanese-text">
              AIによる候補者と案件のマッチング結果
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                <div className="japanese-text">候補者</div>
                <div className="japanese-text">案件</div>
                <div className="japanese-text">マッチング度</div>
                <div className="japanese-text">マッチング理由</div>
                <div className="japanese-text">ステータス</div>
              </div>
              <div className="divide-y">
                <div className="grid grid-cols-5 gap-4 p-4 items-center">
                  <div className="font-medium japanese-text">鈴木太郎</div>
                  <div className="japanese-text text-sm">Java開発エンジニア</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                      92%
                    </span>
                  </div>
                  <div className="japanese-text text-sm">スキル・経験年数・単価が一致</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 japanese-text">
                      提案済み
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 p-4 items-center">
                  <div className="font-medium japanese-text">田中花子</div>
                  <div className="japanese-text text-sm">フロントエンドエンジニア</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                      89%
                    </span>
                  </div>
                  <div className="japanese-text text-sm">React経験が案件要件に一致</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 japanese-text">
                      未提案
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 p-4 items-center">
                  <div className="font-medium japanese-text">佐藤一郎</div>
                  <div className="japanese-text text-sm">インフラエンジニア</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 japanese-text">
                      94%
                    </span>
                  </div>
                  <div className="japanese-text text-sm">AWS/Dockerの経験が豊富</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 japanese-text">
                      選考中
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4 p-4 items-center">
                  <div className="font-medium japanese-text">山田健太</div>
                  <div className="japanese-text text-sm">バックエンドエンジニア</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 japanese-text">
                      75%
                    </span>
                  </div>
                  <div className="japanese-text text-sm">Python経験あるが、年数不足</div>
                  <div>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 japanese-text">
                      未提案
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Matching;
