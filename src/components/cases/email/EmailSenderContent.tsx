import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

import { CasesList } from './CasesList';
import { EmailSenderLayout } from './EmailSenderLayout';
import { FilterBar } from './FilterBar';
import { MailCase } from './types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { CaseViewDialog } from '../detail/CaseViewDialog';

interface EmailSenderContentProps {
  isOtherCompanyMode: boolean;
  emailState: {
    selectAll: boolean;
    selectedCases: MailCase[];
    companyFilter: string;
    setCompanyFilter: (value: string) => void;
    techFilter: string;
    setTechFilter: (value: string) => void;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    selectedTemplate: string;
    setSelectedTemplate: (template: string) => void;
    subject: string;
    setSubject: (subject: string) => void;
    emailBody: string;
    setEmailBody: (body: string) => void;
    sending: boolean;
    setSending: (sending: boolean) => void;
    signature: string;
    setSignature: (signature: string) => void;
  };
  engineerState: {
    selectedEngineers: any[];
  };
  caseData: {
    paginatedCases: MailCase[];
    totalPages: number;
    companyList: any[];
  };
  handlers: {
    casesHandleSelectAll: () => void;
    casesHandleSelectCase: (id: string, rowId: string) => void;
    templateHandleChange: (templateId: string) => void;
    emailHandleEnhance: () => void;
    emailHandleSend: () => void;
    emailHandleTest?: () => void;
    engineerHandleOpen: () => void;
    engineerHandleRemove: (engineerId: string) => void;
    engineerHandleApply: () => void;
    handleUnselectCase: (caseId: string, rowId: string) => void;
  };
}

export const EmailSenderContent: React.FC<EmailSenderContentProps> = ({
  isOtherCompanyMode,
  emailState,
  engineerState,
  caseData,
  handlers
}) => {
  const [companySearchTerm, setCompanySearchTerm] = React.useState('');
  const [selectedCase, setSelectedCase] = React.useState<MailCase | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = React.useState(false);
  
  // Filter company list based on search term
  const filteredCompanyList = React.useMemo(() => {
    if (!companySearchTerm) return caseData.companyList;
    return caseData.companyList.filter((company) => 
      company && company.toLowerCase().includes(companySearchTerm.toLowerCase())
    );
  }, [caseData.companyList, companySearchTerm]);

  // Handle viewing a case
  const handleViewCase = (caseItem: MailCase) => {
    console.log("Viewing case details:", caseItem);
    setSelectedCase(caseItem);
    setIsDetailDialogOpen(true);
  };
  
  // Handle unselecting a specific row from the selected senders list
  const handleUnselectCase = (caseId: string, rowId: string) => {
    handlers.handleUnselectCase(caseId, rowId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md border-primary/10">
        <CardHeader className="pb-3 bg-muted/30">
          <CardTitle className="japanese-text text-xl font-bold text-primary">一括メール送信</CardTitle>
          <CardDescription className="japanese-text text-md mt-2">
            案件送信者に一括でメールを送信します
          </CardDescription>
          
          {/* Company search input */}
          <div className="mt-4 mb-2">
            <div className="flex items-center border rounded-md border-input bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <Input 
                placeholder="会社名で検索..." 
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 japanese-text"
                value={companySearchTerm}
                onChange={(e) => setCompanySearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <FilterBar 
            companyFilter={emailState.companyFilter}
            setCompanyFilter={emailState.setCompanyFilter}
            techFilter={emailState.techFilter}
            setTechFilter={emailState.setTechFilter}
            companyList={filteredCompanyList}
          />
        </CardHeader>
        <CardContent className="pt-6">
          {/* 送信者一覧 - 送信者を中心にした表示に変更 */}
          <CasesList
            paginatedCases={caseData.paginatedCases}
            selectedCases={emailState.selectedCases}
            handleSelectCase={handlers.casesHandleSelectCase}
            selectAll={emailState.selectAll}
            handleSelectAll={handlers.casesHandleSelectAll}
            currentPage={emailState.currentPage}
            setCurrentPage={emailState.setCurrentPage}
            totalPages={caseData.totalPages}
            showCompanyInfo={isOtherCompanyMode}
            onViewCase={handleViewCase}
          />
          
          <EmailSenderLayout
            emailState={emailState}
            engineerState={engineerState}
            handleTemplateChange={handlers.templateHandleChange}
            handleEnhanceEmail={handlers.emailHandleEnhance}
            handleSendEmail={handlers.emailHandleSend}
            handleTestEmail={handlers.emailHandleTest}
            openEngineerDialog={handlers.engineerHandleOpen}
            removeSelectedEngineer={handlers.engineerHandleRemove}
            applyEngineerToTemplate={handlers.engineerHandleApply}
            isOtherCompanyMode={isOtherCompanyMode}
            handleUnselectCase={handleUnselectCase}
          />
        </CardContent>
      </Card>

      {/* Case detail dialog */}
      <CaseViewDialog
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        caseItem={selectedCase}
      />
    </div>
  );
};
