
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { CompanyTypeDropdown } from '../CompanyTypeDropdown';

interface EngineerSearchFormProps {
  engineerFilter: string;
  setEngineerFilter: (filter: string) => void;
  engineerCompanyFilter?: string;
  setEngineerCompanyFilter?: (filter: string) => void;
  showCompanyType?: boolean;
}

export const EngineerSearchForm: React.FC<EngineerSearchFormProps> = ({
  engineerFilter,
  setEngineerFilter,
  engineerCompanyFilter = 'all',
  setEngineerCompanyFilter,
  showCompanyType = false
}) => {
  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="名前やスキルで検索" 
          value={engineerFilter}
          onChange={(e) => setEngineerFilter(e.target.value)}
          className="japanese-text"
        />
      </div>
      
      {showCompanyType && setEngineerCompanyFilter && (
        <CompanyTypeDropdown 
          value={engineerCompanyFilter}
          onChange={setEngineerCompanyFilter}
        />
      )}
    </div>
  );
};

