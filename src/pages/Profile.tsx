
import { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TenantSelector } from '@/components/auth/TenantSelector';
import { InviteUserDialog } from '@/components/auth/InviteUserDialog';

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  company: string | null;
}

export function Profile() {
  const { user, profile, currentTenant, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    avatar_url: '',
    job_title: '',
    company: '',
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        avatar_url: profile.avatar_url || '',
        job_title: profile.job_title || '',
        company: profile.company || '',
      });
      setLoading(false);
    }
  }, [profile]);

  async function updateProfile() {
    try {
      setUpdating(true);
      
      if (!user) return;

      const updates = {
        id: user.id,
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        job_title: profileData.job_title,
        company: profileData.company,
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
    return `${profileData.first_name?.charAt(0) || ''}${profileData.last_name?.charAt(0) || ''}`;
  };

  const getRoleBadgeVariant = (role?: string) => {
    switch (role) {
      case 'developer':
        return 'destructive';
      case 'owner':
        return 'default';
      case 'admin':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleDisplayName = (role?: string) => {
    const roleMap = {
      'developer': '开发者',
      'owner': '所有者',
      'admin': '管理员',
      'member': '成员',
      'viewer': '查看者',
      'test_user': '测试用户'
    };
    return roleMap[role as keyof typeof roleMap] || '未知';
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

        <TenantSelector />

        <div className="grid gap-6">
          {/* 用户基本信息 */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {profileData.avatar_url ? (
                    <AvatarImage src={profileData.avatar_url} />
                  ) : null}
                  <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div>
                    <CardTitle className="japanese-text">个人信息</CardTitle>
                    <CardDescription className="japanese-text">
                      更新您的个人资料信息
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getRoleBadgeVariant(profile?.role)} className="japanese-text">
                      {getRoleDisplayName(profile?.role)}
                    </Badge>
                    {profile?.is_test_account && (
                      <Badge variant="outline" className="japanese-text">测试账号</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="japanese-text">姓</Label>
                  <Input
                    id="first_name"
                    value={profileData.first_name || ''}
                    onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                    placeholder="姓"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="japanese-text">名</Label>
                  <Input
                    id="last_name"
                    value={profileData.last_name || ''}
                    onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
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
                    value={profileData.job_title || ''}
                    onChange={(e) => setProfileData({...profileData, job_title: e.target.value})}
                    placeholder="招聘顾问 / 人事经理"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="japanese-text">公司</Label>
                  <Input
                    id="company"
                    value={profileData.company || ''}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
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

          {/* 当前工作空间信息 */}
          {currentTenant && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="japanese-text">当前工作空间</CardTitle>
                    <CardDescription className="japanese-text">
                      工作空间详细信息和成员管理
                    </CardDescription>
                  </div>
                  {profile?.role && ['owner', 'admin'].includes(profile.role) && (
                    <InviteUserDialog />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label className="japanese-text">工作空间名称</Label>
                    <p className="text-sm font-medium">{currentTenant.name}</p>
                  </div>
                  <div>
                    <Label className="japanese-text">类型</Label>
                    <p className="text-sm font-medium">
                      {currentTenant.type === 'enterprise' ? '企业' : '个人'}
                    </p>
                  </div>
                  {currentTenant.domain && (
                    <div>
                      <Label className="japanese-text">域名</Label>
                      <p className="text-sm font-medium">{currentTenant.domain}</p>
                    </div>
                  )}
                  <div>
                    <Label className="japanese-text">订阅计划</Label>
                    <p className="text-sm font-medium">{currentTenant.subscription_plan || 'Free'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;
