import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { TabsWithContext, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "@/hooks/toast";
import { Mail as MailIcon, FileText as FileTextIcon } from 'lucide-react'; // Fix import of icons

// Import components
import { CaseList } from '@/components/cases/list/CaseList';
import { CaseUploadTab } from '@/components/cases/tabs/CaseUploadTab';
import { EmailStatsTab } from '@/components/cases/tabs/EmailStatsTab';
import { EmailOptimizationCard } from '@/components/cases/tabs/EmailOptimizationCard';
import { EmailSender } from '@/components/cases/EmailSender';
import { MailCase } from '@/components/cases/email/types'; // Import MailCase type

// Import utilities
import { 
  filterCases, 
  filterMailCases, 
  getPaginatedData, 
  calculateTotalPages,
  processEmailStats 
} from '@/components/cases/utils/caseUtils';

// 案件のサンプルデータ（案件詳細を追加）
const caseData = [
  {
    id: "1",
    title: "Java開発エンジニア",
    skills: ["Java", "Spring Boot", "SQL"],
    location: "東京（リモート可）",
    budget: "60~80万円",
    status: "募集中",
    source: "mail",
    company: "テクノソリューション株式会社",
    receivedDate: "2025-05-10T09:30:00",
    sender: "tanaka@technosolution.co.jp",
    senderName: "田中 一郎",
    createdAt: "2025-05-10",
    startDate: "2025-07-01",
    keyTechnologies: "Java, SpringBoot, AWS",
    foreignerAccepted: true,
    freelancerAccepted: false,
    desiredBudget: "70万円",
    detailDescription: `
金融系システムの新規開発プロジェクトにおけるJavaエンジニアの募集案件です。

【業務内容】
- 既存金融システムのリプレイスプロジェクト
- 要件定義からテストまでの一連の開発作業
- チームでの協業によるアジャイル開発

【必要スキル・経験】
- Java開発の経験3年以上
- Spring Bootを用いた開発経験
- データベース（Oracle、PostgreSQL等）の設計・実装経験
- Git等のバージョン管理システムの使用経験

【歓迎スキル】
- クラウド環境（特にAWS）での開発経験
- マイクロサービスアーキテクチャの経験
- CI/CDパイプラインの構築・運用経験

【プロジェクト概要】
- プロジェクト期間：2025年7月〜2026年3月（予定）
- 開発環境：Java 17, Spring Boot 3.x, PostgreSQL, AWS
- チーム構成：PM 1名、PL 1名、エンジニア 5名

【その他条件】
- 週3回のオンサイト勤務（場所：東京都千代田区）
- リモートワーク併用可能
- 稼働時間：140〜180時間/月
- 単価：スキル・経験に応じて60〜80万円
- 面談：2回（オンライン可）

【案件の魅力】
最新の技術スタックを使った大規模リプレイスプロジェクトで、技術的な成長が見込めます。また、アジャイル開発を取り入れており、短いサイクルでの成果を実感できる環境です。チームメンバーも経験豊富なエンジニアが多く、知識の共有が活発に行われています。
    `,
    experience: "3年以上",
    workType: "週3回オンサイト/リモート併用可",
    duration: "2025年7月〜2026年3月（予定）",
    japanese: "ビジネスレベル",
    priority: "高",
    manager: "佐藤 太郎",
    managerEmail: "sato@technosolution.co.jp",
  },
  {
    id: "2",
    title: "フロントエンドエンジニア",
    skills: ["React", "TypeScript", "Next.js"],
    location: "大阪",
    budget: "55~70万円",
    status: "募集中",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
    senderName: null,
    createdAt: "2025-05-10",
    keyTechnologies: "React, TypeScript, Next.js",
    detailDescription: `
ECサイトのフロントエンド開発を担当するエンジニアを募集しています。

【業務内容】
- ECサイトのフロントエンド開発
- 既存機能の改善・新機能の追加
- パフォーマンスチューニング
- コードレビュー

【必要スキル・経験】
- React、TypeScriptでの開発経験2年以上
- GitHubを用いたバージョン管理の経験
- レスポンシブデザインの実装経験

【歓迎スキル】
- Next.jsでの開発経験
- GraphQLの使用経験
- CIツールの使用経験
- パフォーマンス最適化の経験

【開発環境】
- 言語：TypeScript
- フレームワーク：React、Next.js
- 状態管理：Redux Toolkit
- スタイリング：Tailwind CSS
- その他：Storybook、Jest

【その他条件】
- 稼働時間：160〜180時間/月
- 単価：55〜70万円（スキル見合い）
- 勤務地：大阪市内（リモート勤務は要相談）
- 面談回数：1〜2回
`,
    experience: "2年以上",
    workType: "オンサイト（リモート勤務は要相談）",
    duration: "3ヶ月〜（延長の可能性あり）",
    japanese: "不問",
    priority: "中",
    manager: null,
    managerEmail: null,
  },
  {
    id: "3",
    title: "インフラエンジニア",
    skills: ["AWS", "Docker", "Kubernetes"],
    location: "名古屋",
    budget: "65~90万円",
    status: "選考中",
    source: "mail",
    company: "クラウドテック株式会社",
    receivedDate: "2025-05-08T14:15:00",
    sender: "suzuki@cloudtech.jp",
    senderName: "鈴木 次郎",
    createdAt: "2025-05-08",
    keyTechnologies: "AWS, Docker, Kubernetes"
  },
  {
    id: "4",
    title: "QAエンジニア",
    skills: ["テスト自動化", "Selenium"],
    location: "リモート",
    budget: "50~65万円",
    status: "提案済",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
    senderName: null,
    createdAt: "2025-05-07",
    keyTechnologies: "Selenium, Jenkins, Python"
  },
  {
    id: "5",
    title: "PHP開発エンジニア",
    skills: ["PHP", "Laravel", "MySQL"],
    location: "東京",
    budget: "55~75万円",
    status: "募集中",
    source: "mail",
    company: "ウェブシステム株式会社",
    receivedDate: "2025-05-12T11:20:00",
    sender: "yamada@websystem.co.jp",
    senderName: "山田 三郎",
    createdAt: "2025-05-12",
    keyTechnologies: "PHP, Laravel, MySQL"
  },
  {
    id: "6",
    title: "Android開発エンジニア",
    skills: ["Kotlin", "Java", "Android SDK"],
    location: "福岡",
    budget: "60~75万円",
    status: "募集中",
    source: "mail",
    company: "モバイルソリューション株式会社",
    receivedDate: "2025-05-11T10:15:00",
    sender: "watanabe@mobile-solution.jp",
    senderName: "渡辺 四郎",
    createdAt: "2025-05-11",
    keyTechnologies: "Kotlin, Android, Firebase"
  },
  {
    id: "7",
    title: "データサイエンスト",
    skills: ["Python", "R", "機械学習"],
    location: "東京",
    budget: "70~90万円",
    status: "募集中",
    source: "mail",
    company: "AIソリューション株式会社",
    receivedDate: "2025-05-09T15:45:00",
    sender: "saito@ai-solution.co.jp",
    senderName: "斉藤 五郎",
    createdAt: "2025-05-09",
    keyTechnologies: "Python, R, TensorFlow"
  },
  {
    id: "8",
    title: "セキュリティエンジニア",
    skills: ["ネットワークセキュリティ", "CISSP"],
    location: "大阪",
    budget: "65~85万円",
    status: "選考中",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
    senderName: null,
    createdAt: "2025-05-08",
    keyTechnologies: "CISSP, Firewall, SIEM"
  },
  {
    id: "9",
    title: "UI/UXデザイナー",
    skills: ["Figma", "Adobe XD", "Sketch"],
    location: "東京",
    budget: "55~70万円",
    status: "提案済",
    source: "mail",
    company: "デザインスタジオ株式会社",
    receivedDate: "2025-05-07T09:10:00",
    sender: "tanaka@design-studio.jp",
    senderName: "田中 六郎",
    createdAt: "2025-05-07",
    keyTechnologies: "Figma, Adobe XD, Sketch"
  },
  {
    id: "10",
    title: "DevOpsエンジニア",
    skills: ["Jenkins", "AWS", "Terraform"],
    location: "名古屋",
    budget: "65~85万円",
    status: "募集中",
    source: "mail",
    company: "クラウドマネジメント株式会社",
    receivedDate: "2025-05-06T13:25:00",
    sender: "nakamura@cloud-mgmt.co.jp",
    senderName: "中村 七郎",
    createdAt: "2025-05-06",
    keyTechnologies: "Jenkins, AWS, Terraform"
  },
  {
    id: "11",
    title: "Goバックエンド開発者",
    skills: ["Go", "PostgreSQL", "gRPC"],
    location: "リモート",
    budget: "70~90万円",
    status: "募集中",
    source: "manual",
    company: null,
    receivedDate: null,
    sender: null,
    senderName: null,
    createdAt: "2025-05-05",
    keyTechnologies: "Go, PostgreSQL, gRPC"
  },
  {
    id: "12",
    title: "Rubyエンジニア",
    skills: ["Ruby", "Rails", "PostgreSQL"],
    location: "福岡",
    budget: "55~75万円",
    status: "選考中",
    source: "mail",
    company: "ウェブアプリケーション株式会社",
    receivedDate: "2025-05-04T11:05:00",
    sender: "kobayashi@webapps.co.jp",
    senderName: "小林 八郎",
    createdAt: "2025-05-04",
    keyTechnologies: "Ruby, Rails, PostgreSQL"
  }
];

// 案件のステータスに応じた色を返す関数
const getStatusBadgeColor = (status: string) => {
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
const getSourceIcon = (source: string) => {
  return source === "mail" ? (
    <MailIcon className="h-4 w-4 mr-1 text-blue-600" />
  ) : (
    <FileTextIcon className="h-4 w-4 mr-1 text-purple-600" />
  );
};

interface CasesProps {
  companyType?: 'own' | 'other';
}

export function Cases({ companyType = 'own' }: CasesProps) {
  // State for filtering and pagination
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [techKeyword, setTechKeyword] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [startDateFrom, setStartDateFrom] = useState("");
  const [startDateTo, setStartDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [casesCurrentPage, setCasesCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [companyFilter, setCompanyFilter] = useState("all");
  const location = useLocation();
  const [statusFilter, setStatusFilter] = useState("all");
  
  // 新しい日付範囲フィルター
  const [emailDateFrom, setEmailDateFrom] = useState("");
  const [emailDateTo, setEmailDateTo] = useState("");
  
  // 選択された案件のステート
  type CaseDataType = typeof caseData[0];
  const [selectedCase, setSelectedCase] = useState<CaseDataType | null>(null);
  // 編集モードのステート
  const [editMode, setEditMode] = useState(false);
  // 編集中の案件データ
  const [editingCaseData, setEditingCaseData] = useState<CaseDataType | null>(null);
  
  // Company type from URL for backward compatibility
  const urlCompanyType = location.pathname.includes('/company/other') ? 'other' : 'own';
  const effectiveCompanyType = urlCompanyType || companyType;
  
  // Page title based on company type
  const pageTitle = effectiveCompanyType === 'own' ? '自社案件管理' : '他社案件管理';
  
  // 会社のリストを取得
  const companyList = Array.from(new Set(caseData.filter(item => item.company).map(item => item.company)));
  
  // フィルタリングされた案件を取得
  const filteredCases = filterCases(
    caseData,
    effectiveCompanyType,
    statusFilter,
    searchTerm,
    dateRange
  );

  const totalCasesPages = calculateTotalPages(filteredCases.length, itemsPerPage);

  // ケース選択ハンドラー
  const handleCaseSelect = (caseItem: CaseDataType) => {
    setSelectedCase(caseItem);
    setEditingCaseData(null);
    setEditMode(false);
  };

  // 編集モードトグルハンドラー
  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (!editMode && selectedCase) {
      setEditingCaseData({...selectedCase});
    } else {
      setEditingCaseData(null);
    }
  };

  // 編集変更ハンドラー
  const handleEditChange = (field: string, value: any) => {
    if (editingCaseData) {
      setEditingCaseData({
        ...editingCaseData,
        [field]: value
      });
    }
  };

  // 編集保存ハンドラー
  const handleSaveEdit = () => {
    if (editingCaseData) {
      toast({
        title: "案件情報が更新されました",
        description: "変更が保存されました"
      });
      setSelectedCase(editingCaseData);
      setEditMode(false);
    }
  };

  // メール案件のフィルタリング
  const filteredMailCases = filterMailCases(
    caseData,
    effectiveCompanyType,
    companyFilter,
    techKeyword,
    emailDateFrom,
    emailDateTo
  );
  
  // ページネーション用のメール案件取得
  const paginatedMailCases = getPaginatedData(filteredMailCases, currentPage, itemsPerPage);
  const totalPages = calculateTotalPages(filteredMailCases.length, itemsPerPage);
  
  // メール案件の統計情報を取得
  const emailStats = processEmailStats(filteredMailCases);
  
  // 日付フィルターをリセットする関数
  const resetDateFilters = () => {
    setEmailDateFrom("");
    setEmailDateTo("");
    setStartDateFrom("");
    setStartDateTo("");
    setDateRange("");
    toast({
      title: "フィルターをリセットしました",
      description: "日付フィルターがクリアされました",
    });
  };

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">{pageTitle}</h2>
        </div>

        <TabsWithContext defaultValue="list" contextId={effectiveCompanyType} className="space-y-6">
          {/* For own company, show only two tabs */}
          {effectiveCompanyType === 'own' ? (
            <TabsList>
              <TabsTrigger contextId={effectiveCompanyType} value="list" className="japanese-text">案件一覧</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="upload" className="japanese-text">案件アップロード</TabsTrigger>
            </TabsList>
          ) : (
            /* For other company, show all tabs */
            <TabsList>
              <TabsTrigger contextId={effectiveCompanyType} value="list" className="japanese-text">案件一覧</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="upload" className="japanese-text">案件アップロード</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="stats" className="japanese-text">メール案件統計</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="send" className="japanese-text">一括送信</TabsTrigger>
            </TabsList>
          )}
          
          <TabsContent contextId={effectiveCompanyType} value="list" className="space-y-6">
            <CaseList 
              filteredCases={filteredCases}
              selectedCase={selectedCase}
              setSelectedCase={(caseItem: any) => handleCaseSelect(caseItem)}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              dateRange={dateRange}
              setDateRange={setDateRange}
              resetDateFilters={resetDateFilters}
              casesCurrentPage={casesCurrentPage}
              setCasesCurrentPage={setCasesCurrentPage}
              totalCasesPages={totalCasesPages}
              editMode={editMode}
              setEditMode={setEditMode}
              editingCaseData={editingCaseData}
              setEditingCaseData={setEditingCaseData}
              handleEditChange={handleEditChange}
              handleSaveEdit={handleSaveEdit}
            />
          </TabsContent>
          
          <TabsContent contextId={effectiveCompanyType} value="upload" className="space-y-6">
            <CaseUploadTab />
          </TabsContent>
          
          {/* Only show the stats and send tabs for other company */}
          {effectiveCompanyType === 'other' && (
            <>
              <TabsContent contextId={effectiveCompanyType} value="stats" className="space-y-6">
                <EmailStatsTab 
                  filteredMailCases={filteredMailCases}
                  paginatedMailCases={paginatedMailCases}
                  companyFilter={companyFilter}
                  setCompanyFilter={setCompanyFilter}
                  techKeyword={techKeyword}
                  setTechKeyword={setTechKeyword}
                  emailDateFrom={emailDateFrom}
                  setEmailDateFrom={setEmailDateFrom}
                  emailDateTo={emailDateTo}
                  setEmailDateTo={setEmailDateTo}
                  resetDateFilters={resetDateFilters}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  emailStats={emailStats}
                  companyList={companyList}
                />
                <EmailOptimizationCard />
              </TabsContent>

              <TabsContent contextId={effectiveCompanyType} value="send" className="space-y-6">
                <EmailSender 
                  mailCases={filteredMailCases}
                  isOtherCompanyMode={effectiveCompanyType === 'other'}
                  caseData={{
                    paginatedCases: paginatedMailCases,
                    totalPages,
                    companyList
                  }}
                  engineerData={{
                    paginatedEngineers: [],
                    totalEngineerPages: 0,
                    filteredEngineers: []
                  }}
                  emailState={{
                    selectAll: false,
                    selectedCases: [],
                    companyFilter,
                    setCompanyFilter,
                    techFilter: techKeyword,
                    setTechFilter: setTechKeyword,
                    currentPage,
                    setCurrentPage,
                    selectedTemplate: "",
                    setSelectedTemplate: () => {},
                    subject: "",
                    setSubject: () => {},
                    emailBody: "",
                    setEmailBody: () => {},
                    sending: false,
                    setSending: () => {},
                    setSelectedCases: () => {},
                    setSelectAll: () => {}
                  }}
                  engineerState={{
                    selectedEngineers: [],
                    setSelectedEngineers: () => {},
                    isEngineerDialogOpen: false,
                    setIsEngineerDialogOpen: () => {},
                    engineerFilter: "",
                    setEngineerFilter: () => {},
                    engineerCompanyFilter: "all",
                    setEngineerCompanyFilter: () => {},
                    engineerCurrentPage: 1,
                    setEngineerCurrentPage: () => {}
                  }}
                />
              </TabsContent>
            </>
          )}
        </TabsWithContext>
      </div>
    </MainLayout>
  );
}

export default Cases;
