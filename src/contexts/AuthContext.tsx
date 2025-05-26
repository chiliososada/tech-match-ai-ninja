
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Tenant {
  id: string;
  name: string;
  type: 'individual' | 'enterprise';
  domain?: string;
  is_active: boolean;
  subscription_plan?: string;
  max_users?: number;
}

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  job_title?: string;
  company?: string;
  role?: 'owner' | 'admin' | 'member' | 'viewer' | 'test_user' | 'developer';
  tenant_id?: string;
  is_test_account?: boolean;
  expires_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  currentTenant: Tenant | null;
  tenants: Tenant[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{error: Error | null}>;
  signUp: (email: string, password: string, userData?: { first_name?: string; last_name?: string }) => Promise<{error: Error | null}>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  switchTenant: (tenantId: string) => Promise<void>;
  createTenant: (name: string, type: 'individual' | 'enterprise', domain?: string) => Promise<{error: Error | null}>;
  inviteUser: (email: string, role: string, tenantId: string) => Promise<{error: Error | null}>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 设置认证状态监听器
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('认证状态变化:', event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // 延迟获取用户资料和租户信息
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setCurrentTenant(null);
          setTenants([]);
        }
        
        if (loading) {
          setLoading(false);
        }

        // 根据事件显示提示
        if (event === 'SIGNED_IN') {
          toast({
            title: "登录成功",
            description: "欢迎回来",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "已退出登录",
          });
        }
      }
    );

    // 检查现有会话
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // 获取用户资料
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('获取用户资料错误:', profileError);
        setLoading(false);
        return;
      }

      setProfile(profileData);

      // 获取用户的租户列表
      const { data: tenantsData, error: tenantsError } = await supabase
        .rpc('get_user_tenants');

      if (tenantsError) {
        console.error('获取租户列表错误:', tenantsError);
      } else if (tenantsData) {
        // 获取完整的租户信息
        const tenantIds = tenantsData.map((t: any) => t.tenant_id);
        const { data: fullTenants, error: fullTenantsError } = await supabase
          .from('tenants')
          .select('*')
          .in('id', tenantIds);

        if (!fullTenantsError && fullTenants) {
          setTenants(fullTenants);
          
          // 设置当前租户（默认租户或第一个租户）
          const defaultTenant = tenantsData.find((t: any) => t.is_default);
          if (defaultTenant) {
            const currentTenantData = fullTenants.find(t => t.id === defaultTenant.tenant_id);
            setCurrentTenant(currentTenantData || null);
          } else if (fullTenants.length > 0) {
            setCurrentTenant(fullTenants[0]);
          }
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('获取用户信息时发生错误:', error);
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        const error = new Error("邮箱和密码不能为空");
        return { error };
      }

      console.log('尝试登录:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('登录错误:', error);
        return { error };
      }
      
      console.log('登录成功:', data.user?.id);
      return { error: null };
    } catch (error) {
      console.error('意外的登录错误:', error);
      return { error: error as Error };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData?: { first_name?: string; last_name?: string }
  ) => {
    try {
      if (!email || !password) {
        const error = new Error("邮箱和密码不能为空");
        return { error };
      }

      console.log('尝试注册:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });
      
      if (error) {
        console.error('注册错误:', error);
        return { error };
      } else {
        console.log('注册成功:', data.user?.id);
        toast({
          title: "注册成功",
          description: data.session ? "您已成功登录" : "请检查您的电子邮箱以完成验证",
        });
      }
      
      return { error: null };
    } catch (error) {
      console.error('意外的注册错误:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      console.log('尝试退出登录');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('退出错误:', error);
        toast({
          title: "退出失败",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('意外的退出错误:', error);
      toast({
        title: "退出失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('尝试Google登录');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) {
        console.error('Google登录错误:', error);
        toast({
          title: "Google登录失败",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('意外的Google登录错误:', error);
      toast({
        title: "Google登录失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const switchTenant = async (tenantId: string) => {
    try {
      const tenant = tenants.find(t => t.id === tenantId);
      if (tenant) {
        setCurrentTenant(tenant);
        
        // 更新用户资料中的默认租户
        const { error } = await supabase
          .from('profiles')
          .update({ tenant_id: tenantId })
          .eq('id', user?.id);

        if (error) {
          console.error('更新默认租户错误:', error);
        } else {
          toast({
            title: "租户切换成功",
            description: `已切换到 ${tenant.name}`,
          });
        }
      }
    } catch (error) {
      console.error('切换租户错误:', error);
      toast({
        title: "切换租户失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      });
    }
  };

  const createTenant = async (name: string, type: 'individual' | 'enterprise', domain?: string) => {
    try {
      const { data, error } = await supabase
        .from('tenants')
        .insert({
          name,
          type,
          domain,
        })
        .select()
        .single();

      if (error) {
        console.error('创建租户错误:', error);
        return { error };
      }

      // 将当前用户添加为租户所有者
      const { error: memberError } = await supabase
        .from('tenant_members')
        .insert({
          tenant_id: data.id,
          user_id: user?.id,
          role: 'owner',
        });

      if (memberError) {
        console.error('添加租户成员错误:', memberError);
        return { error: memberError };
      }

      // 刷新租户列表
      if (user) {
        await fetchUserProfile(user.id);
      }

      toast({
        title: "租户创建成功",
        description: `${name} 已成功创建`,
      });

      return { error: null };
    } catch (error) {
      console.error('意外的创建租户错误:', error);
      return { error: error as Error };
    }
  };

  const inviteUser = async (email: string, role: string, tenantId: string) => {
    try {
      // 生成邀请令牌
      const token = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7天后过期

      const { error } = await supabase
        .from('invitations')
        .insert({
          tenant_id: tenantId,
          email,
          role,
          invited_by: user?.id,
          token,
          expires_at: expiresAt.toISOString(),
        });

      if (error) {
        console.error('创建邀请错误:', error);
        return { error };
      }

      toast({
        title: "邀请发送成功",
        description: `已向 ${email} 发送邀请`,
      });

      return { error: null };
    } catch (error) {
      console.error('意外的邀请错误:', error);
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      currentTenant,
      tenants,
      loading,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      switchTenant,
      createTenant,
      inviteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
};
