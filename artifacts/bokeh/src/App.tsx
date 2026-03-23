import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Auth Pages
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Onboarding from "@/pages/auth/Onboarding";

// Main Pages
import Dashboard from "@/pages/Dashboard";
import Discover from "@/pages/Discover";
import Projects from "@/pages/projects/Projects";
import ProjectDetail from "@/pages/projects/ProjectDetail";
import Messages from "@/pages/Messages";
import Booking from "@/pages/Booking";
import Notifications from "@/pages/Notifications";
import Clients from "@/pages/Clients";
import Settings from "@/pages/Settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/onboarding" component={Onboarding} />
      
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/discover" component={Discover} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/messages" component={Messages} />
      <Route path="/booking" component={Booking} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/clients" component={Clients} />
      <Route path="/settings" component={Settings} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Ensure pure dark mode on body
  document.body.classList.add("dark");
  document.documentElement.classList.add("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
