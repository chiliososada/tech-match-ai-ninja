
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
    // Set up the auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Log event for debugging
        console.log('Auth state changed:', event, currentSession?.user?.id);
        
        // Only update loading state if we're not already loaded
        if (loading) {
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
      
      // Log for debugging
      if (currentSession) {
        console.log('Existing session found:', currentSession.user.id);
      } else {
        console.log('No existing session');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "登录失败",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      console.log('Sign in successful:', data.user?.id);
      toast({
        title: "登录成功",
        description: "欢迎回来",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      toast({
        title: "登录失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userData?: { first_name?: string; last_name?: string }
  ) => {
    try {
      console.log('Attempting sign up with:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "注册失败",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      } else {
        console.log('Sign up successful:', data.user?.id);
        toast({
          title: "注册成功",
          description: data.session ? "您已成功登录" : "请检查您的电子邮箱以完成验证",
        });
      }
      
      return { error: null };
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast({
        title: "注册失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      });
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      toast({
        title: "退出失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "已退出登录",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google sign in');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        }
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        toast({
          title: "Google登录失败",
          description: error.message,
          variant: "destructive",
        });
      } else {
        console.log('Google sign in redirect initiated:', data);
      }
    } catch (error) {
      console.error('Unexpected Google sign in error:', error);
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
