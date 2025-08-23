import {Home} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center px-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold">404</h1>
        </div>
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            The page you're looking for seems not to exist.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/")}
            className="group px-8 py-6 border-2 rounded-lg font-semibold hover:shadow-lg flex items-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
