import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BarChart,
  Users,
  Calendar,
  Settings,
  HelpCircle,
  FileText,
  Home,
  ChartPie,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  const isActive = (path: string) => location.pathname.includes(path);

  const mainNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart },
    { name: 'Simulador', path: '/simulator', icon: ChartPie },
    { name: 'Calendário', path: '/calendar', icon: Calendar },
  ];

  const secondaryNavItems = [
    { name: 'Consultor Virtual', path: '/chatbot', icon: Users },
    { name: 'Adicionar Dados', path: '/post-registration', icon: FileText },
  ];

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
  };

  return (
    <SidebarComponent
      className={cn("border-r border-border bg-white shadow-md transition-all", collapsed ? "w-16" : "w-64")}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="p-3 flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs font-semibold text-muted-foreground mb-2", collapsed && "sr-only")}>
            Navegação
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md w-full transition-colors",
                        isActive(item.path)
                          ? "bg-muted text-primary font-semibold ring-1 ring-primary"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs font-semibold text-muted-foreground mb-2", collapsed && "sr-only")}>
            Ferramentas
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md w-full transition-colors",
                        isActive(item.path)
                          ? "bg-muted text-primary font-semibold ring-1 ring-primary"
                          : "hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto border-t border-border pt-4 px-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-w1.purple flex items-center justify-center text-white font-bold shadow">
                {getInitials(userName || "Usuário")}
              </div>
              <div>
                <p className="text-sm font-medium leading-tight">{userName || "Usuário"}</p>
                <p className="text-xs text-muted-foreground">Bem-vindo(a)</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </SidebarComponent>
  );
}
