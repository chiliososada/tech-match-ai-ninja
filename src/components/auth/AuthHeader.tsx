
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function AuthHeader() {
  return (
    <CardHeader>
      <CardTitle className="text-center text-2xl font-bold japanese-text">招聘管理系统</CardTitle>
      <CardDescription className="text-center japanese-text">登录或注册账户</CardDescription>
    </CardHeader>
  );
}
