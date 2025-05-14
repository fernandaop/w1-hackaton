
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
  ChartPie
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  // Helper function to check if a route is active
  const isActive = (path: string) => location.pathname.includes(path);

  // Get the nav link classes with active state
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  const mainNavItems = [
    { name: 'Início', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart },
    { name: 'Simulador', path: '/simulator', icon: ChartPie },
    { name: 'Calendário', path: '/calendar', icon: Calendar },
  ];

  const secondaryNavItems = [
    { name: 'Relatórios', path: '/reports', icon: FileText },
    { name: 'Clientes', path: '/clients', icon: Users },
    { name: 'Ajuda', path: '/help', icon: HelpCircle },
    { name: 'Configurações', path: '/settings', icon: Settings },
  ];

  return (
    <SidebarComponent
      className={cn("border-r border-border bg-card transition-all", 
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent className="p-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs font-semibold text-muted-foreground", 
            collapsed && "sr-only"
          )}>
            Principal
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md w-full", 
                        isActive(item.path) ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
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

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn("text-xs font-semibold text-muted-foreground mt-6", 
            collapsed && "sr-only"
          )}>
            Utilitários
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 p-2 rounded-md w-full", 
                        isActive(item.path) ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"
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

        {/* User info at the bottom */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t border-border mt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-w1.purple flex items-center justify-center text-white font-medium">
                AC
              </div>
              <div>
                <p className="text-sm font-medium">André Costa</p>
                <p className="text-xs text-muted-foreground">Cliente Premium</p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </SidebarComponent>
  );
}
