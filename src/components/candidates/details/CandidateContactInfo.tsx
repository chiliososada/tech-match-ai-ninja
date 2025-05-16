
import React from 'react';
import { Engineer } from '../types';

interface CandidateContactInfoProps {
  engineer: Engineer;
}

export const CandidateContactInfo: React.FC<CandidateContactInfoProps> = ({ engineer }) => {
  return (
    <div>
      <h4 className="text-sm font-medium japanese-text">連絡先情報が非表示</h4>
      <p className="text-muted-foreground text-sm japanese-text">プライバシー保護のため、連絡先情報は表示されません</p>
    </div>
  );
};
