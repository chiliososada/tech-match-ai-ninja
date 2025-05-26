
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
        console.log('認証状態変化:', event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // 延迟获取用户资料和租户信息
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 100);
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
            title: "ログイン成功",
            description: "お帰りなさい",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "ログアウトしました",
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
      console.log('ユーザープロファイル取得開始:', userId);
      
      // 先尝试直接从 auth.users 获取基本信息，避免 RLS 问题
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // 创建基本的 profile 对象，包含所有字段
        const basicProfile: UserProfile = {
          id: authUser.id,
          first_name: authUser.user_metadata?.first_name || '',
          last_name: authUser.user_metadata?.last_name || '',
          avatar_url: authUser.user_metadata?.avatar_url || '',
          job_title: authUser.user_metadata?.job_title || '', // 添加这个字段
          company: authUser.user_metadata?.company || '', // 添加这个字段
          role: 'member' // 默认角色
        };
        
        setProfile(basicProfile);
        console.log('基本プロファイル設定完了:', basicProfile);
        
        // 尝试获取详细的 profile 数据（如果 RLS 允许）
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (!profileError && profileData) {
            setProfile(profileData);
            console.log('詳細プロファイル設定完了:', profileData);
          } else if (profileError) {
            console.log('詳細プロファイル取得エラー（基本プロファイルを使用）:', profileError.message);
          }
        } catch (error) {
          console.log('プロファイルアクセスエラー（基本情報のみ使用）:', error);
        }

        // 尝试获取租户信息
        try {
          const { data: tenantsData, error: tenantsError } = await supabase
            .rpc('get_user_tenants');

          if (!tenantsError && tenantsData) {
            const tenantIds = tenantsData.map((t: any) => t.tenant_id);
            const { data: fullTenants, error: fullTenantsError } = await supabase
              .from('tenants')
              .select('*')
              .in('id', tenantIds);

            if (!fullTenantsError && fullTenants) {
              setTenants(fullTenants);
              
              const defaultTenant = tenantsData.find((t: any) => t.is_default);
              if (defaultTenant) {
                const currentTenantData = fullTenants.find(t => t.id === defaultTenant.tenant_id);
                setCurrentTenant(currentTenantData || null);
              } else if (fullTenants.length > 0) {
                setCurrentTenant(fullTenants[0]);
              }
            }
          }
        } catch (error) {
          console.log('テナント情報取得エラー:', error);
          // 创建默认的个人租户信息
          const defaultTenant: Tenant = {
            id: 'default',
            name: 'パーソナルワークスペース',
            type: 'individual',
            is_active: true,
            subscription_plan: 'free'
          };
          setTenants([defaultTenant]);
          setCurrentTenant(defaultTenant);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('ユーザー情報取得時にエラーが発生:', error);
      setLoading(false);
      
      toast({
        title: "プロファイル読み込みエラー",
        description: "ユーザー情報の取得に失敗しました",
        variant: "destructive",
      });
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        const error = new Error("メールアドレスとパスワードを入力してください");
        return { error };
      }

      console.log('ログイン試行:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('ログインエラー:', error);
        return { error };
      }
      
      console.log('ログイン成功:', data.user?.id);
      return { error: null };
    } catch (error) {
      console.error('予期しないログインエラー:', error);
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
        const error = new Error("メールアドレスとパスワードを入力してください");
        return { error };
      }

      console.log('アカウント作成試行:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });
      
      if (error) {
        console.error('アカウント作成エラー:', error);
        return { error };
      } else {
        console.log('アカウント作成成功:', data.user?.id);
        toast({
          title: "アカウント作成成功",
          description: data.session ? "ログインしました" : "メールアドレスを確認して登録を完了してください",
        });
      }
      
      return { error: null };
    } catch (error) {
      console.error('予期しないアカウント作成エラー:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      console.log('ログアウト試行');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('ログアウトエラー:', error);
        toast({
          title: "ログアウト失敗",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('予期しないログアウトエラー:', error);
      toast({
        title: "ログアウト失敗",
        description: "予期しないエラーが発生しました。しばらくしてからお試しください",
        variant: "destructive",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Google ログイン試行');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) {
        console.error('Google ログインエラー:', error);
        toast({
          title: "Google ログイン失敗",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('予期しない Google ログインエラー:', error);
      toast({
        title: "Google ログイン失敗",
        description: "予期しないエラーが発生しました。しばらくしてからお試しください",
        variant: "destructive",
      });
    }
  };

  const switchTenant = async (tenantId: string) => {
    try {
      const tenant = tenants.find(t => t.id === tenantId);
      if (tenant) {
        setCurrentTenant(tenant);
        toast({
          title: "テナント切り替え成功",
          description: `${tenant.name} に切り替えました`,
        });
      }
    } catch (error) {
      console.error('テナント切り替えエラー:', error);
      toast({
        title: "テナント切り替え失敗",
        description: "予期しないエラーが発生しました。しばらくしてからお試しください",
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
        console.error('テナント作成エラー:', error);
        return { error };
      }

      if (user) {
        await fetchUserProfile(user.id);
      }

      toast({
        title: "テナント作成成功",
        description: `${name} が正常に作成されました`,
      });

      return { error: null };
    } catch (error) {
      console.error('予期しないテナント作成エラー:', error);
      return { error: error as Error };
    }
  };

  const inviteUser = async (email: string, role: string, tenantId: string) => {
    try {
      const validRoles = ['owner', 'admin', 'member', 'viewer', 'test_user', 'developer'];
      if (!validRoles.includes(role)) {
        const error = new Error("無効な役割です");
        return { error };
      }

      const token = crypto.randomUUID();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const { error } = await supabase
        .from('invitations')
        .insert({
          tenant_id: tenantId,
          email,
          role: role as 'owner' | 'admin' | 'member' | 'viewer' | 'test_user' | 'developer',
          invited_by: user?.id,
          token,
          expires_at: expiresAt.toISOString(),
        });

      if (error) {
        console.error('招待作成エラー:', error);
        return { error };
      }

      toast({
        title: "招待送信成功",
        description: `${email} に招待を送信しました`,
      });

      return { error: null };
    } catch (error) {
      console.error('予期しない招待エラー:', error);
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
    throw new Error('useAuth は AuthProvider 内で使用する必要があります');
  }
  return context;
};
