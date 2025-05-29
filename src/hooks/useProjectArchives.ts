
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface ProjectArchive {
  id: string;
  original_project_id: string;
  project_data: any;
  archive_reason?: string;
  archived_by?: string;
  archived_at: string;
  tenant_id: string;
}

export const useProjectArchives = () => {
  const [archives, setArchives] = useState<ProjectArchive[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentTenant, user } = useAuth();

  // Fetch archived projects for current tenant
  const fetchArchives = async () => {
    if (!currentTenant?.id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_archives')
        .select('*')
        .eq('tenant_id', currentTenant.id)
        .order('archived_at', { ascending: false });

      if (error) throw error;
      setArchives(data || []);
    } catch (error) {
      console.error('Error fetching archived projects:', error);
      toast({
        title: "エラー",
        description: "アーカイブ案件の取得に失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Restore project from archive
  const restoreProject = async (archiveId: string) => {
    if (!currentTenant?.id || !user?.id) return false;

    try {
      // Get the archived project data
      const { data: archiveData, error: fetchError } = await supabase
        .from('project_archives')
        .select('*')
        .eq('id', archiveId)
        .eq('tenant_id', currentTenant.id)
        .single();

      if (fetchError) throw fetchError;

      // Restore the project as active
      const { error: restoreError } = await supabase
        .from('projects')
        .update({ 
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', archiveData.original_project_id)
        .eq('tenant_id', currentTenant.id);

      if (restoreError) throw restoreError;

      // Remove from archives
      const { error: deleteError } = await supabase
        .from('project_archives')
        .delete()
        .eq('id', archiveId)
        .eq('tenant_id', currentTenant.id);

      if (deleteError) throw deleteError;

      toast({
        title: "成功",
        description: "案件が正常に復元されました",
      });

      await fetchArchives(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error restoring project:', error);
      toast({
        title: "エラー",
        description: "案件の復元に失敗しました",
        variant: "destructive",
      });
      return false;
    }
  };

  // Permanently delete archived project
  const deleteArchive = async (archiveId: string) => {
    if (!currentTenant?.id) return false;

    try {
      const { error } = await supabase
        .from('project_archives')
        .delete()
        .eq('id', archiveId)
        .eq('tenant_id', currentTenant.id);

      if (error) throw error;

      toast({
        title: "成功",
        description: "アーカイブが正常に削除されました",
      });

      await fetchArchives(); // Refresh the list
      return true;
    } catch (error) {
      console.error('Error deleting archive:', error);
      toast({
        title: "エラー",
        description: "アーカイブの削除に失敗しました",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (currentTenant?.id) {
      fetchArchives();
    }
  }, [currentTenant?.id]);

  return {
    archives,
    loading,
    fetchArchives,
    restoreProject,
    deleteArchive,
  };
};
