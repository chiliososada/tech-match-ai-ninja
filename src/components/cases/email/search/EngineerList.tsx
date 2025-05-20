
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
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
  return (
    <div className="space-y-2">
      {paginatedEngineers.map(engineer => {
        const isSelected = selectedEngineers.some(e => e.id === engineer.id);
        
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
                <span className={`japanese-text px-2 py-0.5 rounded-full text-xs 
                  ${engineer.status === "稼働可能" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                  {engineer.status}
                </span>
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

