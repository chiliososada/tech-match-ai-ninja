
import { MailCase } from '../types';

/**
 * Processes case data for display
 */
export const processCaseData = (
  cases: MailCase[],
  companyFilter: string,
  techFilter: string,
  page: number,
  itemsPerPage: number
) => {
  // Start with all cases
  let filteredCases = [...cases];
  
  // Filter by company if not "all"
  if (companyFilter && companyFilter !== "all") {
    filteredCases = filteredCases.filter(caseItem => 
      caseItem.company && caseItem.company.toLowerCase() === companyFilter.toLowerCase()
    );
  }
  
  // Filter by tech keywords
  if (techFilter && techFilter.trim() !== "") {
    const keywords = techFilter.toLowerCase().split(/\s+/);
    filteredCases = filteredCases.filter(caseItem => 
      keywords.some(keyword => 
        (caseItem.skills && caseItem.skills.some(skill => skill.toLowerCase().includes(keyword))) ||
        (caseItem.title && caseItem.title.toLowerCase().includes(keyword))
      )
    );
  }
  
  // Get a unique list of companies
  const companyList = Array.from(
    new Set(
      cases
        .map(item => item.company)
        // Filter out null, undefined or empty companies
        .filter(company => company !== null && company !== undefined && company.trim() !== "")
    )
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    paginatedCases,
    totalPages,
    companyList
  };
};

/**
 * Processes engineer data for display
 */
export const processEngineerData = (
  engineerFilter: string,
  engineerCompanyFilter: string,
  currentPage: number,
  itemsPerPage: number
) => {
  // Mock data for engineers
  const mockEngineers = Array(20).fill(null).map((_, index) => ({
    id: `eng-${index + 1}`,
    name: `エンジニア${index + 1}`,
    skills: [`JavaScript`, `React`, `Node.js`].map(skill => `${skill}${index % 3}`),
    company: index % 2 === 0 ? '自社' : '他社',
    experience: `${3 + index % 5}年`,
    avatar: `/avatar-${(index % 5) + 1}.png`,
    email: `engineer${index + 1}@example.com`
  }));
  
  // Filter engineers based on criteria
  let filteredEngineers = [...mockEngineers];
  
  if (engineerFilter && engineerFilter.trim() !== "") {
    const keywords = engineerFilter.toLowerCase().split(/\s+/);
    filteredEngineers = filteredEngineers.filter(engineer => 
      keywords.some(keyword => 
        engineer.name.toLowerCase().includes(keyword) ||
        engineer.skills.some(skill => skill.toLowerCase().includes(keyword))
      )
    );
  }
  
  // Filter by company type if not "all"
  if (engineerCompanyFilter && engineerCompanyFilter !== "all") {
    filteredEngineers = filteredEngineers.filter(engineer => 
      engineer.company.toLowerCase() === engineerCompanyFilter.toLowerCase()
    );
  }
  
  // Calculate pagination
  const totalEngineerPages = Math.ceil(filteredEngineers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEngineers = filteredEngineers.slice(startIndex, startIndex + itemsPerPage);
  
  return {
    paginatedEngineers,
    totalEngineerPages,
    filteredEngineers
  };
};
