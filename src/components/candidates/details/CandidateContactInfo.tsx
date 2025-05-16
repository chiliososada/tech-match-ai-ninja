
import React from 'react';
import { Engineer } from '../types';

interface CandidateContactInfoProps {
  engineer: Engineer;
}

export const CandidateContactInfo: React.FC<CandidateContactInfoProps> = ({ engineer }) => {
  return (
    <>
      <div>
        <h4 className="text-sm font-medium japanese-text">メールアドレス</h4>
        <p>{engineer.email || '未設定'}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium japanese-text">電話番号</h4>
        <p>{engineer.phone || '未設定'}</p>
      </div>
    </>
  );
};
