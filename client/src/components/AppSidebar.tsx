import { useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, BookOpen, ClipboardCheck, FileBarChart, Settings, LogOut, Brain, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const menuItems = [
  {
    title: "nav.dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Advanced Analytics",
    url: "/advanced",
    icon: Brain,
    badge: "NEW",
  },
  {
    title: "nav.logbook",
    url: "/logbook",
    icon: BookOpen,
  },
  {
    title: "nav.handover",
    url: "/handover",
    icon: ClipboardCheck,
  },
  {
    title: "nav.reports",
    url: "/reports",
    icon: FileBarChart,
  },
  {
    title: "nav.demo",
    url: "/demo",
    icon: Zap,
    badge: "DEMO",
  },
  {
    title: "nav.administration",
    url: "/admin",
    icon: Settings,
    requiresAdmin: true,
  },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const userRole = localStorage.getItem("userRole") || "User";
  const userName = localStorage.getItem("userName") || "Guest";
  const { t } = useLanguage();

  const handleLogout = () => {
    // TODO: remove mock functionality - implement real logout
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setLocation("/");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-semibold">
            Shift Handover
          </SidebarGroupLabel>
          <div className="px-2 py-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">{userName}</p>
              <Badge variant="secondary" className="text-xs">{userRole}</Badge>
            </div>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems
                .filter(item => !item.requiresAdmin || userRole === "Admin" || userRole === "Supervisor")
                .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <a href={item.url} onClick={(e) => {
                      e.preventDefault();
                      setLocation(item.url);
                    }}>
                      <item.icon />
                      <span>{item.title.startsWith('nav.') ? t(item.title as any) : item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} data-testid="button-logout">
              <LogOut />
              <span>{t('header.logout')}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
