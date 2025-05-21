
import React from 'react';
import { Badge } from '@/components/ui/badge';

export const StatusLegend: React.FC = () => {
  // Define status types with their Japanese names and badge variants
  const statusTypes = [
    { name: '稼働可能', variant: 'success' },
    { name: '条件付き', variant: 'warning' },
    { name: '稼働中', variant: 'info' },
    { name: '予約済み', variant: 'secondary' },
  ];

  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-muted-foreground mb-2 japanese-text">ステータス凡例:</p>
      <div className="flex flex-wrap gap-2">
        {statusTypes.map((status, index) => (
          <div key={index} className="flex items-center">
            <Badge 
              variant={status.variant as any} 
              className="japanese-text text-xs font-medium mr-1"
            >
              {status.name}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
