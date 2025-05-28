

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface DatabaseEngineer {
  id: string;
  name: string;
  skills: string[] | null;
  japanese_level: string | null;
  english_level: string | null;
  experience: string;
  availability: string | null;
  current_status: string | null;
  remarks: string | null;
  company_type: string;
  company_name: string | null;
  source: string | null;
  technical_keywords: string[] | null;
  self_promotion: string | null;
  work_scope: string | null;
  work_experience: string | null;
  nationality: string | null;
  age: string | null;
  gender: string | null;
  nearest_station: string | null;
  education: string | null;
  arrival_year: string | null;
  certifications: string[] | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  tenant_id: string;
}

export const useEngineers = (companyType: 'own' | 'other') => {
  const [engineers, setEngineers] = useState<DatabaseEngineer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentTenant } = useAuth();

  const companyTypeMapping = {
    'own': '自社',
    'other': '他社'
  };

  // Helper function to ensure array format
  const ensureArray = (value: any): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
    return [];
  };

  // 获取engineers数据
  const fetchEngineers = async () => {
    if (!currentTenant) {
      console.log('No current tenant, skipping engineer fetch');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching engineers for tenant:', currentTenant.id, 'companyType:', companyTypeMapping[companyType]);
      
      const { data, error } = await supabase
        .from('engineers')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .eq('company_type', companyTypeMapping[companyType])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching engineers:', error);
        throw error;
      }
      
      console.log('Successfully fetched engineers:', data?.length || 0);
      setEngineers(data || []);
    } catch (error: any) {
      console.error('Error fetching engineers:', error);
      setError(error.message || 'データの取得に失敗しました');
      toast.error('人材データの取得に失敗しました: ' + (error.message || ''));
    } finally {
      setLoading(false);
    }
  };

  // 新增engineer
  const createEngineer = async (engineerData: any) => {
    if (!currentTenant) {
      toast.error('テナント情報が見つかりません');
      return null;
    }

    try {
      console.log('Creating engineer with data:', engineerData);
      
      // 数据库状态值映射 - 确保只使用数据库允许的日文状态值
      let dbStatus = '提案中'; // 默认状态使用数据库允许的日文值
      
      if (engineerData.status) {
        // 数据库允许的状态值
        const validStatuses = ['提案中', '事前面談', '面談', '結果待ち', '契約中', '営業終了', 'アーカイブ'];
        if (validStatuses.includes(engineerData.status)) {
          dbStatus = engineerData.status;
        } else {
          // 如果是其他值，都设为默认的 提案中
          dbStatus = '提案中';
        }
      }
      
      const newEngineer = {
        name: engineerData.name,
        skills: ensureArray(engineerData.skills),
        japanese_level: engineerData.japaneseLevel || null,
        english_level: engineerData.englishLevel || null,
        experience: engineerData.experience,
        availability: engineerData.availability || null,
        current_status: dbStatus, // 使用映射后的日文状态
        remarks: engineerData.remarks || null,
        company_type: companyTypeMapping[companyType],
        company_name: engineerData.companyName || null,
        source: 'manual',
        technical_keywords: ensureArray(engineerData.technicalKeywords),
        self_promotion: engineerData.selfPromotion || null,
        work_scope: engineerData.workScope || null,
        work_experience: engineerData.workExperience || null,
        nationality: engineerData.nationality || null,
        age: engineerData.age || null,
        gender: engineerData.gender || null,
        nearest_station: engineerData.nearestStation || null,
        education: engineerData.education || null,
        arrival_year: engineerData.arrivalYear || null,
        certifications: ensureArray(engineerData.certifications),
        email: engineerData.email || null,
        phone: engineerData.phone || null,
        tenant_id: currentTenant.id
      };

      console.log('Processed engineer data for insert:', newEngineer);

      const { data, error } = await supabase
        .from('engineers')
        .insert([newEngineer])
        .select()
        .single();

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }
      
      console.log('Successfully created engineer:', data);
      await fetchEngineers(); // 重新获取数据
      toast.success('技術者情報を登録しました');
      return data;
    } catch (error: any) {
      console.error('Error creating engineer:', error);
      toast.error('技術者情報の登録に失敗しました: ' + error.message);
      return null;
    }
  };

  // 更新engineer
  const updateEngineer = async (id: string, engineerData: any) => {
    try {
      // 确保状态值符合数据库约束
      let dbStatus = engineerData.current_status || '提案中';
      const validStatuses = ['提案中', '事前面談', '面談', '結果待ち', '契約中', '営業終了', 'アーカイブ'];
      if (!validStatuses.includes(dbStatus)) {
        dbStatus = '提案中';
      }

      const updatedEngineer = {
        ...engineerData,
        current_status: dbStatus,
        skills: ensureArray(engineerData.skills),
        technical_keywords: ensureArray(engineerData.technical_keywords),
        certifications: ensureArray(engineerData.certifications),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('engineers')
        .update(updatedEngineer)
        .eq('id', id);

      if (error) throw error;
      
      await fetchEngineers(); // 重新获取数据
      toast.success('技術者情報を更新しました');
      return true;
    } catch (error: any) {
      console.error('Error updating engineer:', error);
      toast.error('技術者情報の更新に失敗しました');
      return false;
    }
  };

  // 删除engineer
  const deleteEngineer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('engineers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await fetchEngineers(); // 重新获取数据
      toast.success('技術者を削除しました');
      return true;
    } catch (error: any) {
      console.error('Error deleting engineer:', error);
      toast.error('技術者の削除に失敗しました');
      return false;
    }
  };

  useEffect(() => {
    console.log('useEngineers effect triggered - currentTenant:', currentTenant?.id, 'companyType:', companyType);
    fetchEngineers();
  }, [currentTenant, companyType]);

  return {
    engineers,
    loading,
    error,
    createEngineer,
    updateEngineer,
    deleteEngineer,
    refetch: fetchEngineers
  };
};

