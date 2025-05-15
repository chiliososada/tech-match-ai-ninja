
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, List } from 'lucide-react';
import { BatchMatchingTab1 } from '@/components/batch-matching/BatchMatchingTab1';
import { BatchMatchingTab2 } from '@/components/batch-matching/BatchMatchingTab2';
import { BatchMatchingTab3 } from '@/components/batch-matching/BatchMatchingTab3';

export function BatchMatching() {
  const [activeTab, setActiveTab] = useState<"case-to-candidate" | "candidate-to-case" | "matching-history">("case-to-candidate");

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">一括マッチング</h2>
        </div>

        <Tabs defaultValue="case-to-candidate" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="case-to-candidate" className="japanese-text">
              <FileText className="mr-2 h-4 w-4" />
              案件から技術者を探す
            </TabsTrigger>
            <TabsTrigger value="candidate-to-case" className="japanese-text">
              <Users className="mr-2 h-4 w-4" />
              技術者から案件を探す
            </TabsTrigger>
            <TabsTrigger value="matching-history" className="japanese-text">
              <List className="mr-2 h-4 w-4" />
              マッチング結果履歴
            </TabsTrigger>
          </TabsList>
          
          {/* Case to Candidate Tab */}
          <TabsContent value="case-to-candidate">
            <BatchMatchingTab1 />
          </TabsContent>
          
          {/* Candidate to Case Tab */}
          <TabsContent value="candidate-to-case">
            <BatchMatchingTab2 />
          </TabsContent>

          {/* Matching History Tab */}
          <TabsContent value="matching-history">
            <BatchMatchingTab3 />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default BatchMatching;
