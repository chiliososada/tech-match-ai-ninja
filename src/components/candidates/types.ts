
export interface Engineer {
  id: string;
  name: string;
  skills?: string[];
  japaneseLevel: string;
  experience: string;
  availability: string;
  status: string;
  desiredConditions: string;
  companyType: string;
  companyName?: string;
  source: string;
  recommendation?: string;
  email?: string;
  phone?: string;
  registeredAt: string;
  updatedAt: string;
}

export interface CategoryType {
  id: string;
  name: string;
}

export interface FiltersType {
  name: string;
  companyType: string;
  companyName: string;
  skills: string;
  experience: string;
  japaneseLevel: string;
  desiredConditions: string;
  status: string;
}

export interface NewEngineerType {
  name: string;
  skills: string;
  japaneseLevel: string;
  experience: string;
  availability: string;
  status: string;
  desiredConditions: string;
  companyType: string;
  companyName: string;
  source: string;
  registeredAt: string;
  updatedAt: string;
}
