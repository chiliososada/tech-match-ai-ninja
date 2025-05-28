
import { DatabaseEngineer } from '@/hooks/useEngineers';
import { Engineer } from '@/components/candidates/types';

// 将数据库engineer转换为UI engineer格式
export const transformDatabaseToUIEngineer = (dbEngineer: DatabaseEngineer): Engineer => {
  return {
    id: dbEngineer.id,
    name: dbEngineer.name,
    skills: dbEngineer.skills || [],
    japaneseLevel: dbEngineer.japanese_level || '',
    englishLevel: dbEngineer.english_level || '',
    experience: dbEngineer.experience,
    availability: dbEngineer.availability || '',
    status: dbEngineer.current_status ? [dbEngineer.current_status] : ['available'],
    remarks: dbEngineer.remarks || '',
    companyType: dbEngineer.company_type,
    companyName: dbEngineer.company_name || '',
    source: dbEngineer.source || 'manual',
    technicalKeywords: dbEngineer.technical_keywords || [],
    selfPromotion: dbEngineer.self_promotion || '',
    workScope: dbEngineer.work_scope || '',
    workExperience: dbEngineer.work_experience || '',
    nationality: dbEngineer.nationality || '',
    age: dbEngineer.age || '',
    gender: dbEngineer.gender || '',
    nearestStation: dbEngineer.nearest_station || '',
    education: dbEngineer.education || '',
    arrivalYear: dbEngineer.arrival_year || '',
    certifications: dbEngineer.certifications || [],
    email: dbEngineer.email || '',
    phone: dbEngineer.phone || '',
    registeredAt: new Date(dbEngineer.created_at).toLocaleDateString('ja-JP'),
    updatedAt: new Date(dbEngineer.updated_at).toLocaleDateString('ja-JP')
  };
};

// 将UI engineer转换为数据库格式
export const transformUIToDatabaseEngineer = (uiEngineer: any) => {
  return {
    name: uiEngineer.name,
    skills: Array.isArray(uiEngineer.skills) ? uiEngineer.skills : uiEngineer.skills?.split(',').map((s: string) => s.trim()) || [],
    japanese_level: uiEngineer.japaneseLevel,
    english_level: uiEngineer.englishLevel,
    experience: uiEngineer.experience,
    availability: uiEngineer.availability,
    current_status: uiEngineer.status,
    remarks: uiEngineer.remarks,
    company_name: uiEngineer.companyName,
    technical_keywords: Array.isArray(uiEngineer.technicalKeywords) ? uiEngineer.technicalKeywords : uiEngineer.technicalKeywords?.split(',').map((s: string) => s.trim()) || [],
    self_promotion: uiEngineer.selfPromotion,
    work_scope: uiEngineer.workScope,
    work_experience: uiEngineer.workExperience,
    nationality: uiEngineer.nationality,
    age: uiEngineer.age,
    gender: uiEngineer.gender,
    nearest_station: uiEngineer.nearestStation,
    education: uiEngineer.education,
    arrival_year: uiEngineer.arrivalYear,
    certifications: Array.isArray(uiEngineer.certifications) ? uiEngineer.certifications : uiEngineer.certifications?.split(',').map((s: string) => s.trim()) || [],
    email: uiEngineer.email,
    phone: uiEngineer.phone
  };
};
