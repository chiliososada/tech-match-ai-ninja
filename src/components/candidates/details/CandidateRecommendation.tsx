
import React from 'react';
import { Engineer } from '../types';

interface CandidateRecommendationProps {
  engineer: Engineer;
}

export const CandidateRecommendation: React.FC<CandidateRecommendationProps> = ({ engineer }) => {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2 japanese-text">推薦文</h4>
      <div className="bg-muted p-4 rounded-md">
        <p className="text-sm japanese-text whitespace-pre-wrap">{engineer.recommendation || '未設定'}</p>
      </div>
    </div>
  );
};
