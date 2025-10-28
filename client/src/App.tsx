import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Logbook from "@/pages/Logbook";
import Handover from "@/pages/Handover";
import Reports from "@/pages/Reports";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/logbook" component={Logbook} />
      <Route path="/handover" component={Handover} />
      <Route path="/reports" component={Reports} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Switch>
          <Route path="/" component={Login} />
          <Route>
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <header className="flex items-center justify-between p-4 border-b">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div className="text-sm font-medium">
                      Digital Shift Handover Platform
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto p-6">
                    <Switch>
                      <Route path="/dashboard" component={Dashboard} />
                      <Route path="/logbook" component={Logbook} />
                      <Route path="/handover" component={Handover} />
                      <Route path="/reports" component={Reports} />
                      <Route component={NotFound} />
                    </Switch>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </Route>
        </Switch>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
