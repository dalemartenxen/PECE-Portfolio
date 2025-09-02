import { Router, Route, Switch } from 'wouter';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route>
            <div className="min-h-screen flex items-center justify-center">
              <h1 className="text-2xl font-bold">Page Not Found</h1>
            </div>
          </Route>
        </Switch>
      </Router>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;