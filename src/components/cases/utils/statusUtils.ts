
import React from 'react';
import { Mail as MailIcon, FileText as FileTextIcon } from 'lucide-react';

// 案件のステータスに応じた色を返す関数
export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "募集中":
      return "bg-green-100 text-green-800";
    case "募集完了":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// 案件のソースに応じたアイコンを返す関数
export const getSourceIcon = (source: string) => {
  return source === "mail" ? (
    <MailIcon className="h-4 w-4 mr-1 text-blue-600" />
  ) : (
    <FileTextIcon className="h-4 w-4 mr-1 text-purple-600" />
  );
};
