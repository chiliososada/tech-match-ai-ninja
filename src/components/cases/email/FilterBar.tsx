
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface FilterBarProps {
  companyFilter: string;
  setCompanyFilter: (value: string) => void;
  techFilter: string;
  setTechFilter: (value: string) => void;
  companyList: (string | null)[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  companyFilter,
  setCompanyFilter,
  techFilter,
  setTechFilter,
  companyList
}) => {
  return (
    <div className="mt-4 flex flex-col sm:flex-row gap-4">
      <Select value={companyFilter} onValueChange={setCompanyFilter}>
        <SelectTrigger className="japanese-text w-full sm:w-[200px] bg-white">
          <SelectValue placeholder="会社でフィルター" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          <SelectItem value="all" className="japanese-text">すべての会社</SelectItem>
          {companyList.map((company, index) => (
            <SelectItem key={`${company}-${index}`} value={company as string} className="japanese-text">
              {company as string}
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
    </div>
  );
};

export default FilterBar;
