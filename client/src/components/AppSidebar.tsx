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
import { LayoutDashboard, BookOpen, ClipboardCheck, FileBarChart, LogOut } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Digital Logbook",
    url: "/logbook",
    icon: BookOpen,
  },
  {
    title: "Handover Approval",
    url: "/handover",
    icon: ClipboardCheck,
  },
  {
    title: "Reports & Analytics",
    url: "/reports",
    icon: FileBarChart,
  },
];

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const userRole = localStorage.getItem("userRole") || "User";
  const userName = localStorage.getItem("userName") || "Guest";

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
              {menuItems.map((item) => (
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
                      <span>{item.title}</span>
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
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
