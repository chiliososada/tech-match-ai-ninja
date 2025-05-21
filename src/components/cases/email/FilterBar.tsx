
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

interface FilterBarProps {
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
  techFilter: string;
  setTechFilter: (value: string) => void;
  companyList: (string | null)[];
  startDateFilter?: string;
  setStartDateFilter?: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  companyFilter,
  setCompanyFilter,
  techFilter,
  setTechFilter,
  companyList,
  startDateFilter = "",
  setStartDateFilter
}) => {
  // Filter out null, undefined, empty strings and ensure they're unique
  const validCompanyList = React.useMemo(() => {
    // Filter out nulls, empty strings, and ensure they are valid strings
    const filtered = companyList
      .filter(company => 
        company !== null && 
        company !== undefined && 
        company !== "" && 
        typeof company === 'string'
      );
    
    // Remove duplicates using a Set
    return Array.from(new Set(filtered));
  }, [companyList]);

  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-4">
      <Select value={companyFilter} onValueChange={setCompanyFilter}>
        <SelectTrigger className="japanese-text w-full sm:w-[200px] bg-white">
          <SelectValue placeholder="会社でフィルター" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          <SelectItem value="all" className="japanese-text">すべての会社</SelectItem>
          {validCompanyList.length > 0 && validCompanyList.map((company, index) => (
            <SelectItem 
              key={`${company}-${index}`} 
              value={company} 
              className="japanese-text"
            >
              {company}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Input 
        placeholder="技術キーワードでフィルター" 
        value={techFilter}
        onChange={(e) => setTechFilter(e.target.value)}
        className="japanese-text bg-white"
      />
      
      {setStartDateFilter && (
        <div className="relative">
          <div className="absolute left-3 top-3 text-muted-foreground">
            <Calendar className="h-4 w-4" />
          </div>
          <Input 
            type="date" 
            placeholder="参画開始日" 
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
            className="japanese-text pl-10 bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default FilterBar;
