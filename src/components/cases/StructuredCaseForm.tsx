
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function StructuredCaseForm() {
  const [caseData, setCaseData] = useState({
    title: 'Java開発エンジニア',
    skills: 'Java, Spring Boot, SQL',
    experience: '5年以上',
    location: '東京都',
    workType: 'リモート可（週3出社）',
    duration: '6ヶ月〜',
    budget: '60万円〜80万円',
    japanese: 'ビジネスレベル',
    priority: '高',
    description: '金融系システムの新規開発プロジェクト...'
  });

  const handleChange = (field: string, value: string) => {
    setCaseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Case data saved:', caseData);
    // Here you would usually save this to your database
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="japanese-text">案件タイトル</Label>
          <Input 
            id="title" 
            value={caseData.title} 
            onChange={(e) => handleChange('title', e.target.value)} 
            className="japanese-text"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills" className="japanese-text">必要スキル</Label>
          <Input 
            id="skills" 
            value={caseData.skills} 
            onChange={(e) => handleChange('skills', e.target.value)} 
            className="japanese-text"
            placeholder="カンマで区切って入力"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience" className="japanese-text">必要経験</Label>
          <Select value={caseData.experience} onValueChange={(value) => handleChange('experience', value)}>
            <SelectTrigger className="japanese-text">
              <SelectValue placeholder="経験年数を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="不問" className="japanese-text">不問</SelectItem>
              <SelectItem value="1年以上" className="japanese-text">1年以上</SelectItem>
              <SelectItem value="3年以上" className="japanese-text">3年以上</SelectItem>
              <SelectItem value="5年以上" className="japanese-text">5年以上</SelectItem>
              <SelectItem value="10年以上" className="japanese-text">10年以上</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="japanese-text">勤務地</Label>
          <Input 
            id="location" 
            value={caseData.location} 
            onChange={(e) => handleChange('location', e.target.value)} 
            className="japanese-text"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="workType" className="japanese-text">勤務形態</Label>
          <Input 
            id="workType" 
            value={caseData.workType} 
            onChange={(e) => handleChange('workType', e.target.value)} 
            className="japanese-text"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="japanese-text">期間</Label>
          <Input 
            id="duration" 
            value={caseData.duration} 
            onChange={(e) => handleChange('duration', e.target.value)} 
            className="japanese-text"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget" className="japanese-text">単価</Label>
          <Input 
            id="budget" 
            value={caseData.budget} 
            onChange={(e) => handleChange('budget', e.target.value)} 
            className="japanese-text"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="japanese" className="japanese-text">日本語レベル</Label>
          <Select value={caseData.japanese} onValueChange={(value) => handleChange('japanese', value)}>
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

        <div className="space-y-2">
          <Label htmlFor="priority" className="japanese-text">優先度</Label>
          <Select value={caseData.priority} onValueChange={(value) => handleChange('priority', value)}>
            <SelectTrigger className="japanese-text">
              <SelectValue placeholder="優先度を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="低" className="japanese-text">低</SelectItem>
              <SelectItem value="中" className="japanese-text">中</SelectItem>
              <SelectItem value="高" className="japanese-text">高</SelectItem>
              <SelectItem value="緊急" className="japanese-text">緊急</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="japanese-text">案件詳細</Label>
        <Textarea 
          id="description" 
          value={caseData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={5}
          className="japanese-text"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="japanese-text">案件を保存</Button>
      </div>
    </form>
  );
}

export default StructuredCaseForm;
