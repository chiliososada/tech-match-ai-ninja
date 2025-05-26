
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

import { AuthHeader } from '@/components/auth/AuthHeader';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { AuthLoader } from '@/components/auth/AuthLoader';

export function Auth() {
  const { user, loading, signInWithGoogle } = useAuth();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    console.log('OAuth リダイレクト状況をチェック中');
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    if (accessToken) {
      console.log('URLでアクセストークンを発見');
      toast({
        title: "認証成功",
        description: "ログイン中です...",
      });
    }
    
    const url = new URL(window.location.href);
    const errorDescription = url.searchParams.get('error_description');
    if (errorDescription) {
      console.error('OAuth エラー:', errorDescription);
      toast({
        title: "ログイン失敗",
        description: errorDescription,
        variant: "destructive",
      });
    }
  }, []);

  if (user && !loading) {
    console.log("ユーザーは認証済み、リダイレクト先:", from);
    return <Navigate to={from} replace />;
  }

  if (loading) {
    return <AuthLoader />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-auto">
        <AuthHeader />
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="japanese-text">ログイン</TabsTrigger>
            <TabsTrigger value="register" className="japanese-text">アカウント登録</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm onGoogleLogin={signInWithGoogle} />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm onGoogleLogin={signInWithGoogle} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default Auth;
