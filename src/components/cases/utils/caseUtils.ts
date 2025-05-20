
import { MailCase } from "../email/types";
import { parse, isValid } from 'date-fns';

// Filter cases based on various criteria
export const filterCases = (
  cases: MailCase[], 
  companyType: string,
  statusFilter: string,
  searchTerm: string,
  dateRange: string
) => {
  return cases.filter(item => {
    // Filter by company type using some mock logic
    const matchesCompanyType = companyType === 'own' 
      ? parseInt(item.id) % 2 === 1  // odd IDs for 自社
      : parseInt(item.id) % 2 === 0;  // even IDs for 他社
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Improved date matching
    let matchesDate = true;
    if (dateRange) {
      // If dateRange is specified, check if the startDate exists
      if (!item.startDate) {
        matchesDate = false;
      } else {
        // Parse both dates to compare them
        try {
          const filterDate = parse(dateRange, 'yyyy-MM-dd', new Date());
          const itemDate = parse(item.startDate, 'yyyy-MM-dd', new Date());
          
          if (isValid(filterDate) && isValid(itemDate)) {
            // For "immediate" and "thisMonth", cases on or after the specified date should match
            matchesDate = itemDate >= filterDate;
          } else {
            // If date parsing fails, fall back to string comparison
            matchesDate = item.startDate >= dateRange;
          }
        } catch (e) {
          // If parsing fails, use string comparison as fallback
          matchesDate = item.startDate >= dateRange;
        }
      }
    }

    return matchesCompanyType && matchesStatus && matchesSearch && matchesDate;
  });
};

// Filter mail cases based on various criteria
export const filterMailCases = (
  cases: MailCase[],
  companyType: string,
  companyFilter: string,
  techKeyword: string,
  emailDateFrom: string,
  emailDateTo: string
) => {
  return cases.filter(item => {
    if (item.source !== "mail") return false;
    
    // Filter by company type
    const matchesCompanyType = companyType === 'own' 
      ? parseInt(item.id) % 2 === 1  // odd IDs for 自社
      : parseInt(item.id) % 2 === 0;  // even IDs for 他社
    
    // 会社フィルター
    const matchesCompany = companyFilter === "all" || item.company === companyFilter;
    
    // 技術キーワードフィルター
    const matchesTech = techKeyword === "" ||
      (item.keyTechnologies && item.keyTechnologies.toLowerCase().includes(techKeyword.toLowerCase()));
    
    // 日付範囲フィルター
    let matchesDateRange = true;
    if (emailDateFrom || emailDateTo) {
      if (item.receivedDate) {
        const itemDate = new Date(item.receivedDate).toISOString().split('T')[0];
        if (emailDateFrom && itemDate < emailDateFrom) {
          matchesDateRange = false;
        }
        if (emailDateTo && itemDate > emailDateTo) {
          matchesDateRange = false;
        }
      } else {
        // 日付がない項目は日付フィルターを使用時に除外
        if (emailDateFrom || emailDateTo) {
          matchesDateRange = false;
        }
      }
    }
    
    return matchesCompanyType && matchesCompany && matchesTech && matchesDateRange;
  });
};

// Get paginated data
export const getPaginatedData = <T>(data: T[], currentPage: number, itemsPerPage: number) => {
  return data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
};

// Calculate total pages
export const calculateTotalPages = (dataLength: number, itemsPerPage: number) => {
  return Math.ceil(dataLength / itemsPerPage);
};

// Process email stats
export const processEmailStats = (filteredMailCases: MailCase[]) => {
  // 会社ごとの案件数
  const companyCounts = filteredMailCases.reduce((acc, cur) => {
    const company = cur.company || "不明";
    acc[company] = (acc[company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 送信者ごとの案件数
  const senderCounts = filteredMailCases.reduce((acc, cur) => {
    const sender = cur.sender || "不明";
    acc[sender] = (acc[sender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 日付ごとの案件数
  const dateCounts = filteredMailCases.reduce((acc, cur) => {
    if (cur.receivedDate) {
      const date = new Date(cur.receivedDate).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: filteredMailCases.length,
    companies: companyCounts,
    senders: senderCounts,
    dates: dateCounts
  };
};
