
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
  generatePaginationRange
} from '@/components/ui/pagination';
import { Engineer } from './types';

interface EngineerSearchDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  paginatedEngineers: Engineer[];
  selectedEngineers: Engineer[];
  toggleEngineerSelection: (engineer: Engineer) => void;
  engineerFilter: string;
  setEngineerFilter: (filter: string) => void;
  engineerCurrentPage: number;
  setEngineerCurrentPage: (page: number) => void;
  totalEngineerPages: number;
  filteredEngineersLength: number;
}

export const EngineerSearchDialog: React.FC<EngineerSearchDialogProps> = ({
  isOpen,
  setIsOpen,
  paginatedEngineers,
  selectedEngineers,
  toggleEngineerSelection,
  engineerFilter,
  setEngineerFilter,
  engineerCurrentPage,
  setEngineerCurrentPage,
  totalEngineerPages,
  filteredEngineersLength
}) => {
  // Helper functions for pagination
  const goToPrevPage = () => {
    if (engineerCurrentPage > 1) {
      setEngineerCurrentPage(engineerCurrentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (engineerCurrentPage < totalEngineerPages) {
      setEngineerCurrentPage(engineerCurrentPage + 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="japanese-text">技術者を検索して選択</DialogTitle>
          <DialogDescription className="japanese-text">
            案件に紹介する技術者を検索して選択してください
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="名前やスキルで検索" 
              value={engineerFilter}
              onChange={(e) => setEngineerFilter(e.target.value)}
              className="japanese-text"
            />
          </div>
          
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
                      <span className="japanese-text">{engineer.skills.join(", ")}</span>
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
          
          {totalEngineerPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={goToPrevPage}
                      className={engineerCurrentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {generatePaginationRange(engineerCurrentPage, totalEngineerPages).map((item, index) => {
                    if (item === 'ellipsis') {
                      return (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    
                    return (
                      <PaginationItem key={item}>
                        <PaginationLink 
                          isActive={engineerCurrentPage === item}
                          onClick={() => setEngineerCurrentPage(item)}
                        >
                          {item}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={goToNextPage}
                      className={engineerCurrentPage === totalEngineerPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="japanese-text"
            >
              キャンセル
            </Button>
            <Button 
              onClick={() => setIsOpen(false)}
              className="japanese-text"
            >
              {selectedEngineers.length}名の技術者を選択
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
