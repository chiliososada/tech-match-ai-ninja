
import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  company: string | null;
}

export function Profile() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    avatar_url: '',
    job_title: '',
    company: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      setLoading(true);
      
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile({
          first_name: data.first_name,
          last_name: data.last_name,
          avatar_url: data.avatar_url,
          job_title: data.job_title,
          company: data.company,
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      toast({
        title: "获取个人资料失败",
        description: "无法加载用户个人资料信息",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setUpdating(true);
      
      if (!user) return;

      const updates = {
        id: user.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        job_title: profile.job_title,
        company: profile.company,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "更新成功",
        description: "您的个人资料已更新",
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast({
        title: "更新失败",
        description: "更新个人资料时出错",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  }

  const getInitials = () => {
    return `${profile.first_name?.charAt(0) || ''}${profile.last_name?.charAt(0) || ''}`;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight japanese-text">个人档案</h2>
          <Button variant="outline" onClick={signOut} className="japanese-text">退出登录</Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} />
                ) : null}
                <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="japanese-text">个人信息</CardTitle>
                <CardDescription className="japanese-text">
                  更新您的个人资料信息
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="japanese-text">姓</Label>
                <Input
                  id="first_name"
                  value={profile.first_name || ''}
                  onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                  placeholder="姓"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name" className="japanese-text">名</Label>
                <Input
                  id="last_name"
                  value={profile.last_name || ''}
                  onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                  placeholder="名"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="japanese-text">电子邮箱</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
              />
              <p className="text-sm text-muted-foreground japanese-text">
                邮箱地址不可更改
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="job_title" className="japanese-text">职位</Label>
                <Input
                  id="job_title"
                  value={profile.job_title || ''}
                  onChange={(e) => setProfile({...profile, job_title: e.target.value})}
                  placeholder="招聘顾问 / 人事经理"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="japanese-text">公司</Label>
                <Input
                  id="company"
                  value={profile.company || ''}
                  onChange={(e) => setProfile({...profile, company: e.target.value})}
                  placeholder="公司名称"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={updateProfile} 
              disabled={updating} 
              className="japanese-text"
            >
              {updating ? '保存中...' : '保存更改'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}

export default Profile;
