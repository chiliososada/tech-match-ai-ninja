
import { MailCase, Engineer, SAMPLE_ENGINEERS } from '../types';

export const processCaseData = (
  mailCases: MailCase[],
  companyFilter: string,
  techFilter: string,
  currentPage: number,
  itemsPerPage: number
) => {
  // 会社のリストを取得
  const companyList = Array.from(new Set(mailCases.filter(item => item.company).map(item => item.company)));
  
  // フィルタリングされた案件を取得
  const filteredCases = mailCases.filter(item => {
    const matchesCompany = companyFilter === "all" || item.company === companyFilter;
    const matchesTech = techFilter === "" || 
                       (item.keyTechnologies && item.keyTechnologies.toLowerCase().includes(techFilter.toLowerCase()));
    return matchesCompany && matchesTech;
  });
  
  // ページネーションで表示するケース
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);

  return {
    companyList,
    filteredCases,
    paginatedCases,
    totalPages
  };
};

export const processEngineerData = (
  engineerFilter: string,
  engineerCompanyFilter: string,
  engineerCurrentPage: number,
  engineerItemsPerPage: number
) => {
  // エンジニアのフィルタリング
  const filteredEngineers = SAMPLE_ENGINEERS.filter(engineer => {
    const searchTerm = engineerFilter.toLowerCase();
    const matchesCompanyType = engineerCompanyFilter === "all" || 
                              (engineerCompanyFilter === "own" && engineer.companyType === '自社') || 
                              (engineerCompanyFilter === "other" && engineer.companyType === '他社');
    
    return (
      (engineer.name.toLowerCase().includes(searchTerm) ||
       engineer.skills.some(skill => skill.toLowerCase().includes(searchTerm))) &&
      matchesCompanyType
    );
  });

  // エンジニアのページネーション
  const paginatedEngineers = filteredEngineers.slice(
    (engineerCurrentPage - 1) * engineerItemsPerPage,
    engineerCurrentPage * engineerItemsPerPage
  );

  const totalEngineerPages = Math.ceil(filteredEngineers.length / engineerItemsPerPage);

  return {
    filteredEngineers,
    paginatedEngineers,
    totalEngineerPages
  };
};
