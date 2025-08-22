import {Button} from "@/components/ui/button";
import {useTheme} from "@/providers/ThemeProvider";
import {ArrowLeft, Moon, Sun} from "lucide-react";
import {useState} from "react";

const EmailPage = () => {
  const {theme, setTheme} = useTheme();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Your personal account
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className={`transition-all duration-300 ${isAnimating ? "scale-95 rotate-180" : "scale-100 rotate-0"} hover:scale-105 hover:rotate-12`}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>

            {/* Body */}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPage;
