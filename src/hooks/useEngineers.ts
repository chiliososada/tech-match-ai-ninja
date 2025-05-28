
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
  const { currentTenant } = useAuth();

  const companyTypeMapping = {
    'own': '自社',
    'other': '他社'
  };

  // 获取engineers数据
  const fetchEngineers = async () => {
    if (!currentTenant) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('engineers')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .eq('company_type', companyTypeMapping[companyType])
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEngineers(data || []);
    } catch (error: any) {
      console.error('Error fetching engineers:', error);
      toast.error('人材データの取得に失敗しました');
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
      const newEngineer = {
        ...engineerData,
        company_type: companyTypeMapping[companyType],
        source: 'manual',
        tenant_id: currentTenant.id,
        skills: engineerData.skills ? engineerData.skills.split(',').map((s: string) => s.trim()) : [],
        technical_keywords: engineerData.technicalKeywords ? engineerData.technicalKeywords.split(',').map((s: string) => s.trim()) : [],
        certifications: engineerData.certifications ? engineerData.certifications.split(',').map((s: string) => s.trim()) : [],
        current_status: engineerData.status || 'available'
      };

      const { data, error } = await supabase
        .from('engineers')
        .insert([newEngineer])
        .select()
        .single();

      if (error) throw error;
      
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
      const updatedEngineer = {
        ...engineerData,
        skills: Array.isArray(engineerData.skills) ? engineerData.skills : engineerData.skills?.split(',').map((s: string) => s.trim()) || [],
        technical_keywords: Array.isArray(engineerData.technical_keywords) ? engineerData.technical_keywords : engineerData.technical_keywords?.split(',').map((s: string) => s.trim()) || [],
        certifications: Array.isArray(engineerData.certifications) ? engineerData.certifications : engineerData.certifications?.split(',').map((s: string) => s.trim()) || [],
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
    fetchEngineers();
  }, [currentTenant, companyType]);

  return {
    engineers,
    loading,
    createEngineer,
    updateEngineer,
    deleteEngineer,
    refetch: fetchEngineers
  };
};
