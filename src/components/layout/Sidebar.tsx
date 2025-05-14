
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  FileText, 
  Users, 
  BarChart3,
  Inbox,
  Settings,
  ListCheck
} from 'lucide-react';

type SidebarItem = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  {
    icon: <BarChart3 className="h-5 w-5" />,
    label: 'ダッシュボード',
    href: '/',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: '案件管理',
    href: '/cases',
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: '人材管理',
    href: '/candidates',
  },
  {
    icon: <ListCheck className="h-5 w-5" />,
    label: '案件とのマッチング',
    href: '/matching',
  },
  {
    icon: <Inbox className="h-5 w-5" />,
    label: 'メール連携',
    href: '/email',
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: '設定',
    href: '/settings',
  },
];

export function Sidebar() {
  return (
    <div className="h-screen flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight text-custom-blue-700">Tech Recruiter AI</h1>
      </div>
      <div className="flex-1 px-4 space-y-2 overflow-y-auto py-2">
        {sidebarItems.map((item, i) => (
          <NavLink
            key={i}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              )
            }
          >
            {item.icon}
            <span className="japanese-text">{item.label}</span>
          </NavLink>
        ))}
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-custom-blue-200 flex items-center justify-center text-custom-blue-700 font-medium">
            TR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Tech Recruiter</p>
            <p className="text-xs text-muted-foreground truncate">tech.recruiter@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
