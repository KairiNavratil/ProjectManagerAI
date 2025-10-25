import { Sparkles, LayoutDashboard, Users, FileText, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Team", path: "/team" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-primary rounded-lg group-hover:shadow-glow transition-all duration-300">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              FlowAI
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "transition-all duration-200",
                      isActive && "bg-sidebar-accent text-accent-foreground"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
