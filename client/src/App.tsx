import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { NotificationProvider, NotificationToast } from "@/components/EnterpriseNotifications";
import { AuditProvider } from "@/components/EnterpriseAudit";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Layout } from "@/components/Layout";
import { EnterpriseHeader } from "@/components/EnterpriseHeader";
import { EnterpriseAdminPanel } from "@/components/EnterpriseAdmin";
import { DemoOverview } from "@/pages/DemoOverview";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import EnhancedLogin from "@/pages/EnhancedLogin";
import Dashboard from "@/pages/Dashboard";
import EnhancedDashboard from "@/pages/EnhancedDashboard";
import AdvancedDashboard from "@/pages/AdvancedDashboard";
import Logbook from "@/pages/Logbook";
import Handover from "@/pages/Handover";
import EnhancedHandover from "@/pages/EnhancedHandover";
import Reports from "@/pages/Reports";
import EnhancedReports from "@/pages/EnhancedReports";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={EnhancedLogin} />
        <Route path="/demo" component={DemoOverview} />
        <Route path="/dashboard" component={EnhancedDashboard} />
        <Route path="/advanced" component={AdvancedDashboard} />
        <Route path="/logbook" component={Logbook} />
        <Route path="/handover" component={EnhancedHandover} />
        <Route path="/reports" component={EnhancedReports} />
        <Route path="/admin" component={EnterpriseAdminPanel} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <NotificationProvider>
            <AuditProvider>
              <Toaster />
              <NotificationToast />
              <Router />
            </AuditProvider>
          </NotificationProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
