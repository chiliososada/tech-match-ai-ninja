
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Engineer } from '../types';

interface EngineerListProps {
  paginatedEngineers: Engineer[];
  selectedEngineers: Engineer[];
  toggleEngineerSelection: (engineer: Engineer) => void;
  filteredEngineersLength: number;
}

export const EngineerList: React.FC<EngineerListProps> = ({
  paginatedEngineers,
  selectedEngineers,
  toggleEngineerSelection,
  filteredEngineersLength
}) => {
  // Updated function to determine badge variant based on status
  const getBadgeVariant = (status: string) => {
    if (status === "提案中") return "proposed";
    if (status === "事前面談") return "preliminary";
    if (status === "面談") return "interview";
    if (status === "結果待ち") return "waiting";
    if (status === "営業終了") return "completed";
    return "default"; // fallback
  };
  
  return (
    <div className="space-y-2">
      {paginatedEngineers.map(engineer => {
        const isSelected = selectedEngineers.some(e => e.id === engineer.id);
        const badgeVariant = getBadgeVariant(engineer.status);
        
        return (
          <div 
            key={engineer.id}
            onClick={() => toggleEngineerSelection(engineer)}
            className={`p-3 rounded-md flex items-center justify-between cursor-pointer border 
              ${isSelected ? 'bg-primary/10 border-primary' : 'hover:bg-muted'}`}
          >
            <div className="space-y-1">
              <p className="font-medium japanese-text">{engineer.name}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="japanese-text mr-2">スキル:</span>
                <span className="japanese-text">{engineer.skills && engineer.skills.join(", ")}</span>
              </div>
              <div className="flex items-center text-xs">
                <span className="japanese-text mr-2">経験:</span>
                <span className="japanese-text">{engineer.experience}</span>
                <span className="mx-2">|</span>
                <Badge variant={badgeVariant as any} className="japanese-text text-xs font-medium">
                  {engineer.status}
                </Badge>
                {engineer.companyType && (
                  <>
                    <span className="mx-2">|</span>
                    <span className="japanese-text">{engineer.companyType}</span>
                  </>
                )}
              </div>
            </div>
            
            <Checkbox 
              checked={isSelected}
              className="pointer-events-none"
            />
          </div>
        );
      })}
      
      {filteredEngineersLength === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground japanese-text">検索条件に一致する技術者がいません</p>
        </div>
      )}
    </div>
  );
};
