
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CircleDollarSign, 
  Flag, 
  Users, 
  User, 
  Code, 
  FileText, 
  Clock,
  Languages,
  MessageSquare,
  FileCode
} from 'lucide-react';
import { getDefaultProcesses } from './utils/statusUtils';

export function StructuredCaseForm() {
  const [caseData, setCaseData] = useState({
    title: 'Java開発エンジニア',
    company: '株式会社テック',
    manager: '山田太郎',
    managerEmail: 'yamada@example.com',
    skills: ['Java', 'Spring Boot', 'SQL'],
    experience: '5年以上',
    location: '東京都',
    workType: 'リモート可（週3出社）',
    duration: '6ヶ月〜',
    budget: '60万円〜80万円',
    desiredBudget: '65万円〜',
    japanese: 'ビジネスレベル',
    priority: '高',
    status: '募集中',
    startDate: '2025-06-01',
    foreignerAccepted: true,
    freelancerAccepted: true,
    interviewCount: '1',
    processes: ['要件定義', '基本設計'],
    detailDescription: '金融系システムの新規開発プロジェクト...'
  });

  const handleChange = (field: string, value: any) => {
    setCaseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Case data saved:', caseData);
    // Here you would usually save this to your database
  };

  // Helper function to toggle process selection
  const toggleProcess = (process: string) => {
    const currentProcesses = caseData.processes || [];
    const isSelected = currentProcesses.includes(process);
    
    const newProcesses = isSelected 
      ? currentProcesses.filter(p => p !== process)
      : [...currentProcesses, process];
    
    handleChange('processes', newProcesses);
  };

  const processOptions = getDefaultProcesses();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6">
        <div className="flex space-x-2">
          <div className="bg-primary/10 p-2 rounded-md mt-1">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <Label htmlFor="title" className="text-sm font-medium mb-1 japanese-text">案件タイトル</Label>
            <Input 
              id="title" 
              value={caseData.title} 
              onChange={(e) => handleChange('title', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-primary/10 p-2 rounded-md mt-1">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <Label htmlFor="company" className="text-sm font-medium mb-1 japanese-text">会社名</Label>
            <Input 
              id="company" 
              value={caseData.company} 
              onChange={(e) => handleChange('company', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-cyan-100 p-2 rounded-md mt-1">
            <User className="h-4 w-4 text-cyan-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="manager" className="text-sm font-medium mb-1 japanese-text">担当者</Label>
            <Input 
              id="manager" 
              value={caseData.manager} 
              onChange={(e) => handleChange('manager', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-blue-100 p-2 rounded-md mt-1">
            <Users className="h-4 w-4 text-blue-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="managerEmail" className="text-sm font-medium mb-1 japanese-text">連絡先</Label>
            <Input 
              id="managerEmail" 
              value={caseData.managerEmail} 
              onChange={(e) => handleChange('managerEmail', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-indigo-100 p-2 rounded-md mt-1">
            <Code className="h-4 w-4 text-indigo-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="experience" className="text-sm font-medium mb-1 japanese-text">必要経験</Label>
            <Select value={caseData.experience} onValueChange={(value) => handleChange('experience', value)}>
              <SelectTrigger className="japanese-text border-primary/30 focus:border-primary mt-1">
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
        </div>

        <div className="flex space-x-2">
          <div className="bg-purple-100 p-2 rounded-md mt-1">
            <Briefcase className="h-4 w-4 text-purple-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="workType" className="text-sm font-medium mb-1 japanese-text">勤務形態</Label>
            <Input 
              id="workType" 
              value={caseData.workType} 
              onChange={(e) => handleChange('workType', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-amber-100 p-2 rounded-md mt-1">
            <Clock className="h-4 w-4 text-amber-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="duration" className="text-sm font-medium mb-1 japanese-text">期間</Label>
            <Input 
              id="duration" 
              value={caseData.duration} 
              onChange={(e) => handleChange('duration', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-emerald-100 p-2 rounded-md mt-1">
            <Languages className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="japanese" className="text-sm font-medium mb-1 japanese-text">日本語レベル</Label>
            <Select value={caseData.japanese} onValueChange={(value) => handleChange('japanese', value)}>
              <SelectTrigger className="japanese-text border-primary/30 focus:border-primary mt-1">
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

        <div className="flex space-x-2">
          <div className="bg-rose-100 p-2 rounded-md mt-1">
            <Flag className="h-4 w-4 text-rose-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="priority" className="text-sm font-medium mb-1 japanese-text">優先度</Label>
            <Select value={caseData.priority} onValueChange={(value) => handleChange('priority', value)}>
              <SelectTrigger className="japanese-text border-primary/30 focus:border-primary mt-1">
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

        <div className="flex space-x-2">
          <div className="bg-green-100 p-2 rounded-md mt-1">
            <MapPin className="h-4 w-4 text-green-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="location" className="text-sm font-medium mb-1 japanese-text">勤務地</Label>
            <Input 
              id="location" 
              value={caseData.location} 
              onChange={(e) => handleChange('location', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-blue-100 p-2 rounded-md mt-1">
            <Calendar className="h-4 w-4 text-blue-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="startDate" className="text-sm font-medium mb-1 japanese-text">参画期間</Label>
            <Input 
              id="startDate" 
              type="date"
              value={caseData.startDate} 
              onChange={(e) => handleChange('startDate', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-amber-100 p-2 rounded-md mt-1">
            <MessageSquare className="h-4 w-4 text-amber-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="interviewCount" className="text-sm font-medium mb-1 japanese-text">面談回数</Label>
            <Input 
              id="interviewCount"
              type="number"
              min="1" 
              value={caseData.interviewCount} 
              onChange={(e) => handleChange('interviewCount', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-green-100 p-2 rounded-md mt-1">
            <CircleDollarSign className="h-4 w-4 text-green-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="budget" className="text-sm font-medium mb-1 japanese-text">単価</Label>
            <Input 
              id="budget" 
              value={caseData.budget} 
              onChange={(e) => handleChange('budget', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="bg-purple-100 p-2 rounded-md mt-1">
            <CircleDollarSign className="h-4 w-4 text-purple-700" />
          </div>
          <div className="flex-1">
            <Label htmlFor="desiredBudget" className="text-sm font-medium mb-1 japanese-text">希望単価</Label>
            <Input 
              id="desiredBudget" 
              value={caseData.desiredBudget} 
              onChange={(e) => handleChange('desiredBudget', e.target.value)} 
              className="japanese-text border-primary/30 focus:border-primary mt-1"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <div className={`${caseData.foreignerAccepted ? 'bg-green-100' : 'bg-red-100'} p-2 rounded-md mt-1`}>
            <Users className={`h-4 w-4 ${caseData.foreignerAccepted ? 'text-green-700' : 'text-red-700'}`} />
          </div>
          <div className="flex-1">
            <Label htmlFor="foreignerAccepted" className="text-sm font-medium mb-1 japanese-text">外国人採用</Label>
            <Select 
              value={caseData.foreignerAccepted ? "true" : "false"}
              onValueChange={(value) => handleChange('foreignerAccepted', value === "true")}
            >
              <SelectTrigger className="japanese-text border-primary/30 focus:border-primary mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">可能</SelectItem>
                <SelectItem value="false">不可</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex space-x-2">
          <div className={`${caseData.freelancerAccepted ? 'bg-green-100' : 'bg-red-100'} p-2 rounded-md mt-1`}>
            <User className={`h-4 w-4 ${caseData.freelancerAccepted ? 'text-green-700' : 'text-red-700'}`} />
          </div>
          <div className="flex-1">
            <Label htmlFor="freelancerAccepted" className="text-sm font-medium mb-1 japanese-text">個人事業者</Label>
            <Select 
              value={caseData.freelancerAccepted ? "true" : "false"}
              onValueChange={(value) => handleChange('freelancerAccepted', value === "true")}
            >
              <SelectTrigger className="japanese-text border-primary/30 focus:border-primary mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">可能</SelectItem>
                <SelectItem value="false">不可</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 mr-1 text-indigo-700" />
          <Label htmlFor="skills" className="text-sm font-medium mb-1 japanese-text">スキル要件（カンマ区切り）</Label>
        </div>
        <Input 
          id="skills" 
          value={caseData.skills.join(', ')} 
          onChange={(e) => handleChange('skills', e.target.value.split(',').map(s => s.trim()))} 
          className="japanese-text border-primary/30 focus:border-primary mt-1"
          placeholder="カンマ区切りで入力"
        />
      </div>
      
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <FileCode className="h-4 w-4 mr-1 text-purple-600" />
          <Label className="text-sm font-medium mb-1 japanese-text">工程</Label>
        </div>
        <div className="grid grid-cols-2 gap-2 border rounded-md p-3 bg-muted/5 mt-1">
          {processOptions.map((process) => (
            <div key={process} className="flex items-center space-x-2">
              <Checkbox 
                id={`process-${process}`} 
                checked={(caseData.processes || []).includes(process)}
                onCheckedChange={() => toggleProcess(process)}
              />
              <Label htmlFor={`process-${process}`} className="text-sm japanese-text">
                {process}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 mr-1 text-gray-600" />
          <Label htmlFor="detailDescription" className="text-sm font-medium mb-1 japanese-text">案件詳細</Label>
        </div>
        <Textarea 
          id="detailDescription" 
          value={caseData.detailDescription}
          onChange={(e) => handleChange('detailDescription', e.target.value)}
          rows={5}
          className="japanese-text border-primary/30 focus:border-primary mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" className="japanese-text">案件を保存</Button>
      </div>
    </form>
  );
}

export default StructuredCaseForm;
