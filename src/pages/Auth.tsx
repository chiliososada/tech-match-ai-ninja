
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
  
  // Get the intended destination from location state or default to "/"
  const from = location.state?.from?.pathname || "/";

  // Check for redirect from OAuth sign in
  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    if (accessToken) {
      // If we have an access token in the URL, show a toast
      toast({
        title: "身份验证成功",
        description: "正在登录中...",
      });
    }
  }, []);

  // Redirect to intended destination if user is already authenticated
  if (user && !loading) {
    console.log("User authenticated, redirecting to:", from);
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
            <TabsTrigger value="login" className="japanese-text">登录</TabsTrigger>
            <TabsTrigger value="register" className="japanese-text">注册</TabsTrigger>
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
