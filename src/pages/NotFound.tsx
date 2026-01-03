import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-5xl font-bold text-primary">404</span>
        </div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Page Not Found</h1>
        <p className="mb-6 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          to="/dashboard" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Home size={18} />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
