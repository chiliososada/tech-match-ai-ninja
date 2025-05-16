
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  onGoogleLogin: () => void;
}

export function LoginForm({ onGoogleLogin }: LoginFormProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateInputs = () => {
    const newErrors: {email?: string; password?: string} = {};
    let isValid = true;

    if (!email) {
      newErrors.email = "邮箱不能为空";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "请输入有效的邮箱地址";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "密码不能为空";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "密码长度至少6个字符";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('尝试登录:', email);
      const { error } = await signIn(email, password);
      
      if (error) {
        console.error("登录错误:", error);
        
        // 根据错误类型显示不同的错误信息
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "登录失败",
            description: "邮箱或密码错误，请重试",
            variant: "destructive",
          });
        } else {
          toast({
            title: "登录失败",
            description: error.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('意外的登录错误:', error);
      toast({
        title: "登录失败",
        description: "发生未知错误，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="japanese-text">电子邮箱</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({...errors, email: undefined});
            }}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="japanese-text">密码</Label>
          <Input 
            id="password" 
            type="password"
            placeholder="••••••••" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({...errors, password: undefined});
            }}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          className="w-full japanese-text" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "登录中..." : "登录"}
        </Button>
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground japanese-text">或</span>
          </div>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onGoogleLogin} 
          className="w-full flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          <FcGoogle className="h-5 w-5" />
          <span className="japanese-text">使用谷歌账号登录</span>
        </Button>
      </CardFooter>
    </form>
  );
}
