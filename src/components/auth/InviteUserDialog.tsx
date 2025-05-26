
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { UserPlus } from 'lucide-react';

interface InviteUserDialogProps {
  tenantId?: string;
}

export function InviteUserDialog({ tenantId }: InviteUserDialogProps) {
  const { currentTenant, inviteUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [isInviting, setIsInviting] = useState(false);

  const targetTenantId = tenantId || currentTenant?.id;

  const handleInvite = async () => {
    if (!email.trim() || !targetTenantId) return;

    setIsInviting(true);
    const { error } = await inviteUser(email, role, targetTenantId);

    if (!error) {
      setIsOpen(false);
      setEmail('');
      setRole('member');
    }

    setIsInviting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="japanese-text">
          <UserPlus className="h-4 w-4 mr-2" />
          邀请用户
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="japanese-text">邀请用户</DialogTitle>
          <DialogDescription className="japanese-text">
            邀请新用户加入当前工作空间
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inviteEmail" className="japanese-text">邮箱地址</Label>
            <Input
              id="inviteEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inviteRole" className="japanese-text">角色</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">成员</SelectItem>
                <SelectItem value="admin">管理员</SelectItem>
                <SelectItem value="viewer">查看者</SelectItem>
                <SelectItem value="test_user">测试用户</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleInvite}
            disabled={isInviting || !email.trim()}
            className="japanese-text"
          >
            {isInviting ? '发送中...' : '发送邀请'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
