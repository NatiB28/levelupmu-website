import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Rankings from "./pages/Rankings";
import CharacterSearch from "./pages/CharacterSearch";
import DonationShop from "./pages/DonationShop";
import Downloads from "./pages/Downloads";
import Community from "./pages/Community";
import Forum from "./pages/Forum";
import Info from "./pages/Info";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/rankings" component={Rankings} />
      <Route path="/character-search" component={CharacterSearch} />
      <Route path="/donation" component={DonationShop} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/community" component={Community} />
      <Route path="/forum" component={Forum} />
      <Route path="/info" component={Info} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
