
import React from 'react';
import { useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { TabsWithContext, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import components
import { CaseList } from '@/components/cases/list/CaseList';
import { CaseUploadTab } from '@/components/cases/tabs/CaseUploadTab';
import { EmailStatsTab } from '@/components/cases/tabs/EmailStatsTab';
import { EmailSenderContainer } from '@/components/cases/EmailSenderContainer';
import { CasesHeader } from '@/components/cases/CasesHeader';
import { CaseArchiveTab } from '@/components/cases/tabs/CaseArchiveTab';

// Import utilities and hooks
import { 
  filterCases, 
  filterMailCases, 
  getPaginatedData, 
  calculateTotalPages,
  processEmailStats 
} from '@/components/cases/utils/caseUtils';
import { useCaseFilters } from '@/components/cases/hooks/useCaseFilters';
import { usePagination } from '@/components/cases/hooks/usePagination';
import { useCaseSelection } from '@/components/cases/hooks/useCaseSelection';
import { caseData, getCompanyList } from '@/components/cases/data/caseData';
import { normalizeStatus } from '@/components/cases/utils/statusUtils';

interface CasesProps {
  companyType?: 'own' | 'other';
}

export function Cases({ companyType = 'own' }: CasesProps) {
  // Use custom hooks for state management
  const {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    techKeyword,
    setTechKeyword,
    dateRange,
    setDateRange,
    startDateFrom,
    setStartDateFrom,
    startDateTo,
    setStartDateTo,
    statusFilter,
    setStatusFilter,
    companyFilter,
    setCompanyFilter,
    emailDateFrom,
    setEmailDateFrom,
    emailDateTo,
    setEmailDateTo,
    resetDateFilters
  } = useCaseFilters();

  // Add state for foreigner filter
  const [foreignerFilter, setForeignerFilter] = React.useState("all");

  const {
    currentPage,
    setCurrentPage,
    casesCurrentPage,
    setCasesCurrentPage,
    itemsPerPage
  } = usePagination();

  // Add state for sorting
  const [sortField, setSortField] = React.useState("startDate");
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  // Normalize case statuses in the data
  const normalizedCaseData = React.useMemo(() => {
    return caseData.map(item => ({
      ...item,
      status: normalizeStatus(item.status)
    }));
  }, [caseData]);

  const {
    selectedCase,
    setSelectedCase,
    editMode,
    setEditMode,
    editingCaseData,
    setEditingCaseData,
    toggleEditMode,
    handleEditChange,
    handleSaveEdit
  } = useCaseSelection(normalizedCaseData);

  const location = useLocation();
  
  // Company type from URL for backward compatibility
  const urlCompanyType = location.pathname.includes('/company/other') ? 'other' : 'own';
  const effectiveCompanyType = urlCompanyType || companyType;
  
  // Page title based on company type
  const pageTitle = effectiveCompanyType === 'own' ? '自社案件管理' : '他社案件管理';
  
  // Add logging to help debug
  console.log('Cases component rendering with path:', location.pathname);
  console.log('Company type from URL:', urlCompanyType);
  console.log('Effective company type:', effectiveCompanyType);
  
  // Get company list
  const companyList = getCompanyList();
  
  // Filtered cases for the list view - this is our MAIN source of truth
  const filteredCases = React.useMemo(() => {
    return filterCases(
      normalizedCaseData,
      effectiveCompanyType,
      statusFilter,
      searchTerm,
      dateRange,
      foreignerFilter
    );
  }, [
    normalizedCaseData,
    effectiveCompanyType,
    statusFilter,
    searchTerm,
    dateRange,
    foreignerFilter
  ]);

  // Handle sorting
  const handleSort = (field: string, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  // Apply sorting to the filtered cases
  const sortedCases = React.useMemo(() => {
    if (sortField !== "startDate") return filteredCases;
    
    return [...filteredCases].sort((a, b) => {
      const dateA = a.startDate || '';
      const dateB = b.startDate || '';
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      const comparison = dateA.localeCompare(dateB);
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredCases, sortField, sortDirection]);

  const totalCasesPages = calculateTotalPages(filteredCases.length, itemsPerPage);

  // Paginated cases for the list view
  const paginatedCases = getPaginatedData(sortedCases, casesCurrentPage, itemsPerPage);
  
  // For email sender and stats - use the same filteredCases as the main source of truth
  // but apply additional email-specific filters
  const filteredMailCases = React.useMemo(() => {
    return filterMailCases(
      filteredCases, // Use already filtered cases as the base
      effectiveCompanyType,
      companyFilter,
      techKeyword,
      emailDateFrom,
      emailDateTo
    );
  }, [
    filteredCases, 
    effectiveCompanyType, 
    companyFilter, 
    techKeyword, 
    emailDateFrom, 
    emailDateTo
  ]);
  
  // Email stats for visualization
  const emailStats = processEmailStats(filteredMailCases);

  // Get all unique start dates for filtering
  const uniqueStartDates = React.useMemo(() => {
    const dates = new Set<string>();
    filteredCases.forEach(item => {
      if (item.startDate) {
        dates.add(item.startDate);
      }
    });
    return Array.from(dates).sort();
  }, [filteredCases]);

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <CasesHeader pageTitle={pageTitle} />

        <TabsWithContext defaultValue="list" contextId={effectiveCompanyType} className="space-y-6">
          {/* For own company, show all tabs including the new archive tab */}
          {effectiveCompanyType === 'own' ? (
            <TabsList>
              <TabsTrigger contextId={effectiveCompanyType} value="list" className="japanese-text">案件一覧</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="upload" className="japanese-text">案件アップロード</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="archive" className="japanese-text">案件アーカイブ</TabsTrigger>
            </TabsList>
          ) : (
            /* For other company, show all tabs including email tabs */
            <TabsList>
              <TabsTrigger contextId={effectiveCompanyType} value="list" className="japanese-text">案件一覧</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="upload" className="japanese-text">案件アップロード</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="archive" className="japanese-text">案件アーカイブ</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="stats" className="japanese-text">メール案件統計</TabsTrigger>
              <TabsTrigger contextId={effectiveCompanyType} value="send" className="japanese-text">一括送信</TabsTrigger>
            </TabsList>
          )}
          
          <TabsContent contextId={effectiveCompanyType} value="list" className="space-y-6">
            <CaseList 
              filteredCases={paginatedCases}
              selectedCase={selectedCase}
              setSelectedCase={setSelectedCase}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              foreignerFilter={foreignerFilter}
              setForeignerFilter={setForeignerFilter}
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
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </TabsContent>
          
          <TabsContent contextId={effectiveCompanyType} value="upload" className="space-y-6">
            <CaseUploadTab />
          </TabsContent>

          {/* New Archive Tab */}
          <TabsContent contextId={effectiveCompanyType} value="archive" className="space-y-6">
            <CaseArchiveTab cases={normalizedCaseData} companyType={effectiveCompanyType} />
          </TabsContent>
          
          {/* Only show the stats and send tabs for other company */}
          {effectiveCompanyType === 'other' && (
            <>
              <TabsContent contextId={effectiveCompanyType} value="stats" className="space-y-6">
                <EmailStatsTab 
                  filteredMailCases={filteredMailCases}
                  paginatedMailCases={getPaginatedData(filteredMailCases, currentPage, itemsPerPage)}
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
                  totalPages={calculateTotalPages(filteredMailCases.length, itemsPerPage)}
                  emailStats={emailStats}
                  companyList={companyList}
                />
              </TabsContent>

              <TabsContent contextId={effectiveCompanyType} value="send" className="space-y-6">
                <EmailSenderContainer 
                  mailCases={filteredCases} // Pass the same filtered cases as the source of truth
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
