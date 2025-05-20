
import React from 'react';
import { Mail as MailIcon, FileText as FileTextIcon } from 'lucide-react';

// 案件のステータスに応じた色を返す関数
export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "募集中":
      return "bg-green-100 text-green-800 border-green-200";
    case "募集終了":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      // Default to 募集中 for any other values
      return "bg-green-100 text-green-800 border-green-200";
  }
};

// 案件のソースに応じたアイコンを返す関数
export const getSourceIcon = (source: string) => {
  if (source === "mail") {
    return <MailIcon className="h-4 w-4 mr-1 text-blue-600" />;
  } else {
    return <FileTextIcon className="h-4 w-4 mr-1 text-purple-600" />;
  }
};

// 工程データの初期値を設定する関数
export const getDefaultProcesses = () => {
  return [
    "要件定義", 
    "基本設計", 
    "詳細設計", 
    "製造／開発", 
    "単体テスト", 
    "結合テスト", 
    "総合テスト／システムテスト", 
    "UAT／受け入れテスト", 
    "運用・保守",
    "アジャイル開発"
  ];
};

// 有効なステータス値を取得する関数
export const getValidStatusValues = () => {
  return ["募集中", "募集終了"];
};

// ステータス値を正規化する関数（有効でない値を有効な値に変換）
export const normalizeStatus = (status: string) => {
  const validStatuses = getValidStatusValues();
  if (validStatuses.includes(status)) {
    return status;
  }
  // Default to "募集中" for invalid statuses
  return "募集中";
};
