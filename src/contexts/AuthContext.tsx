
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{error: Error | null}>;
  signUp: (email: string, password: string, userData?: { first_name?: string; last_name?: string }) => Promise<{error: Error | null}>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 设置认证状态监听器（最先执行）
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('认证状态变化:', event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (loading) {
          setLoading(false);
        }

        // 根据不同的认证事件显示不同的提示
        if (event === 'SIGNED_IN') {
          toast({
            title: "登录成功",
            description: "欢迎回来",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "已退出登录",
          });
        } else if (event === 'USER_UPDATED') {
          toast({
            title: "用户信息已更新",
          });
        }
      }
    );

    // 然后检查现有会话
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
      if (currentSession) {
        console.log('找到现有会话:', currentSession.user.id);
      } else {
        console.log('没有找到现有会话');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        const error = new Error("邮箱和密码不能为空");
        console.error('登录错误:', error);
        return { error };
      }

      console.log('尝试以邮箱登录:', email);
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
        console.error('注册错误:', error);
        return { error };
      }

      // 验证邮箱格式
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        const error = new Error("请输入有效的邮箱地址");
        console.error('注册错误:', error);
        return { error };
      }

      // 验证密码长度
      if (password.length < 6) {
        const error = new Error("密码长度至少6个字符");
        console.error('注册错误:', error);
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
      } else {
        console.log('Google登录重定向已发起:', data);
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

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
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
