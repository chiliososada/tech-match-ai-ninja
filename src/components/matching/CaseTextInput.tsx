
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Wand2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface CaseTextInputProps {
  onStructuredData: (data: any) => void;
}

export function CaseTextInput({ onStructuredData }: CaseTextInputProps) {
  const [caseText, setCaseText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerateStructure = () => {
    if (!caseText.trim()) {
      toast({
        title: "テキストが入力されていません",
        description: "案件情報を入力してください",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing - in a real app, this would call an API
    setTimeout(() => {
      // Extract data from text using simple parsing
      // This is a simplified example - in a real app, you'd use NLP or an AI service
      const extractedData = {
        skills: extractSkills(caseText),
        experience: extractExperience(caseText),
        budget: extractBudget(caseText),
        location: extractLocation(caseText),
        workType: extractWorkType(caseText),
      };
      
      onStructuredData(extractedData);
      setIsProcessing(false);
      
      toast({
        title: "構造化完了",
        description: "案件情報が構造化されました",
      });
    }, 1500);
  };
  
  // Simple extraction functions (these would be more sophisticated in a real app)
  const extractSkills = (text: string) => {
    const skills = ['Java', 'Python', 'React', 'AWS', 'Docker', 'TypeScript', 'JavaScript'];
    return skills.filter(skill => text.includes(skill)).join(', ');
  };
  
  const extractExperience = (text: string) => {
    if (text.includes('10年')) return '10';
    if (text.includes('5年')) return '5';
    if (text.includes('3年')) return '3';
    return '1';
  };
  
  const extractBudget = (text: string) => {
    // Look for patterns like "60~80万円" or "60万円"
    const budgetMatch = text.match(/(\d+)\s*[~～]\s*(\d+)\s*万円/) || text.match(/(\d+)\s*万円/);
    if (budgetMatch) {
      if (budgetMatch.length > 2) {
        return `${budgetMatch[1]}~${budgetMatch[2]}`;
      } else {
        return budgetMatch[1];
      }
    }
    return '50~80';
  };
  
  const extractLocation = (text: string) => {
    if (text.includes('東京')) return '東京';
    if (text.includes('大阪')) return '大阪';
    if (text.includes('名古屋')) return '名古屋';
    return '東京';
  };
  
  const extractWorkType = (text: string) => {
    if (text.includes('フルリモート')) return 'フルリモート';
    if (text.includes('リモート')) return 'リモート可';
    return 'オンサイト';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="japanese-text">案件テキスト入力</CardTitle>
        <CardDescription className="japanese-text">
          案件の説明テキストを入力して、構造化データに変換します
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="case-text" className="japanese-text">案件の説明文</Label>
            <Textarea
              id="case-text"
              placeholder="例：「Java、SpringBootの経験者を募集しています。勤務地は東京、期間は6ヶ月～、単価は60〜80万円です。」"
              className="min-h-[120px] japanese-text"
              value={caseText}
              onChange={(e) => setCaseText(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateStructure} 
          disabled={isProcessing || !caseText.trim()}
          className="w-full japanese-text"
        >
          {isProcessing ? (
            <>処理中...</>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              構造化データを生成
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CaseTextInput;
