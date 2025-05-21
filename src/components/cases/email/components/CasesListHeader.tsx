
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

interface CasesListHeaderProps {
  selectAll: boolean;
  handleSelectAll: () => void;
  disabled: boolean;
  showCompanyInfo: boolean;
}

export const CasesListHeader: React.FC<CasesListHeaderProps> = ({
  selectAll,
  handleSelectAll,
  disabled,
  showCompanyInfo
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-12">
          <Checkbox 
            checked={selectAll && !disabled} 
            onCheckedChange={handleSelectAll}
            disabled={disabled}
          />
        </TableHead>
        <TableHead className="japanese-text">送信者</TableHead>
        <TableHead className="japanese-text">メールアドレス</TableHead>
        <TableHead className="japanese-text">案件名</TableHead>
        {showCompanyInfo && (
          <TableHead className="japanese-text">会社名</TableHead>
        )}
        <TableHead className="japanese-text">キー技術</TableHead>
        {showCompanyInfo && (
          <TableHead className="japanese-text">
            <div>登録方式</div>
            <div className="text-xs text-muted-foreground">登録時間</div>
          </TableHead>
        )}
        <TableHead className="japanese-text w-20">操作</TableHead>
      </TableRow>
    </TableHeader>
  );
};
