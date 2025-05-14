
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Users, 
  BarChart,
  Calendar,
  Search
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart, current: location.pathname.includes('/dashboard') },
    { name: 'Simulador', href: '/simulator', icon: Users, current: location.pathname.includes('/simulator') },
    { name: 'Calendário', href: '/calendar', icon: Calendar, current: location.pathname.includes('/calendar') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-w1.dark border-b border-border flex h-16">
      <div className={cn(
        "flex flex-1 items-center justify-between px-4", 
        !collapsed && "md:pl-4 md:pr-6",
        collapsed && "md:px-6"
      )}>
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hidden md:flex" />
          
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          )}

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-w1.primary rounded-md w-8 h-8 flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">W1</span>
            </div>
            <span className="font-display font-semibold text-xl hidden sm:block">W1 Consult</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md flex items-center",
                item.current
                  ? "bg-primary-foreground text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="flex items-center border-b p-3">
                <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
              <div className="p-2">
                <p className="text-xs text-muted-foreground p-2">Resultados recentes</p>
                <div className="text-sm p-2 hover:bg-muted rounded-md cursor-pointer">
                  Dashboard de patrimônio
                </div>
                <div className="text-sm p-2 hover:bg-muted rounded-md cursor-pointer">
                  Simulação de Holdings
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button size="sm" className="bg-w1.purple hover:bg-purple-600">
            Assistente Virtual
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-40 flex flex-col animate-fade-in">
          <nav className="flex flex-col p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-md flex items-center",
                  item.current
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
