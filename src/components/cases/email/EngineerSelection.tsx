
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, User } from 'lucide-react';
import { Engineer } from './types';

interface EngineerSelectionProps {
  selectedEngineers: Engineer[];
  openEngineerDialog: () => void;
  removeSelectedEngineer: (engineerId: string) => void;
  applyEngineerToTemplate: () => void;
  selectedCasesLength: number;
}

export const EngineerSelection: React.FC<EngineerSelectionProps> = ({
  selectedEngineers,
  openEngineerDialog,
  removeSelectedEngineer,
  applyEngineerToTemplate,
  selectedCasesLength
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <Label className="japanese-text text-lg font-medium">技術者を選択</Label>
        <Button 
          onClick={openEngineerDialog} 
          variant="outline" 
          size="sm" 
          className="japanese-text"
        >
          <Search className="mr-2 h-4 w-4" />
          技術者を検索
        </Button>
      </div>

      {selectedEngineers.length > 0 ? (
        <div className="border rounded-md p-4 space-y-3">
          {selectedEngineers.map(engineer => (
            <div 
              key={engineer.id} 
              className="flex justify-between items-center bg-muted/50 p-2 rounded-md"
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium japanese-text">{engineer.name}</p>
                  <p className="text-xs text-muted-foreground japanese-text">
                    {engineer.skills.join(", ")} | {engineer.experience}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSelectedEngineer(engineer.id)}
                className="h-8 w-8 p-0"
              >
                &times;
              </Button>
            </div>
          ))}

          <Button 
            onClick={applyEngineerToTemplate} 
            className="w-full japanese-text mt-2"
            variant="secondary"
            disabled={selectedCasesLength === 0}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            選択した技術者を本文に反映
          </Button>
        </div>
      ) : (
        <div className="border rounded-md p-4 flex flex-col items-center justify-center h-[200px] text-center">
          <User className="h-12 w-12 text-muted-foreground opacity-50 mb-2" />
          <p className="text-muted-foreground japanese-text">技術者が選択されていません</p>
          <p className="text-xs text-muted-foreground japanese-text mt-1">
            「技術者を検索」ボタンをクリックして技術者を選択してください
          </p>
        </div>
      )}
    </div>
  );
};
