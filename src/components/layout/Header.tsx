import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Search
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-white dark:bg-w1.dark border-b border-border flex h-16">
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
          </Link>
        </div>

        <div className="flex items-center gap-2">
        </div>
      </div>

    </header>
  );
}
