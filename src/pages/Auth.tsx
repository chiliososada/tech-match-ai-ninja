
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
  
  // 获取预期目标路径，默认为"/"
  const from = location.state?.from?.pathname || "/";

  // 检查OAuth登录重定向
  useEffect(() => {
    console.log('检查OAuth重定向状态');
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    
    if (accessToken) {
      console.log('在URL中发现访问令牌');
      toast({
        title: "身份验证成功",
        description: "正在登录中...",
      });
    }
    
    // 检查URL中是否有错误信息
    const url = new URL(window.location.href);
    const errorDescription = url.searchParams.get('error_description');
    if (errorDescription) {
      console.error('OAuth错误:', errorDescription);
      toast({
        title: "登录失败",
        description: errorDescription,
        variant: "destructive",
      });
    }
  }, []);

  // 如果用户已认证，重定向到预期目标
  if (user && !loading) {
    console.log("用户已认证，重定向到:", from);
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
