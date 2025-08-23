import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {useTheme} from "@/providers/ThemeProvider";
import {ArrowLeft, Moon, Sun} from "lucide-react";
import {useState} from "react";
import {EmailAction} from "./EmailAction";
import {emailData as initialEmailData} from "@/config/emailConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";

const EmailPage = () => {
  const {theme, setTheme} = useTheme();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [emailList, setEmailList] = useState(initialEmailData);
  const [primaryEmail, setPrimaryEmail] = useState<string>(
    initialEmailData.find((e) => e.isPrimary)?.email || "hello@example.com",
  );
  const [backupEmail, setBackupEmail] = useState<string>(
    "Allow all verified emails",
  );
  const [keepPrivate, setKeepPrivate] = useState<boolean>(true);

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
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto mt-4 p-4">
          {/* Emails */}
          <div className="space-y-8 mb-8">
            <div className="ml-6 mb-5">
              <h1 className="text-xl font-semibold text-foreground">Emails</h1>
              <p className="text-md text-muted-foreground">
                Emails you can use to sign in to your account.
              </p>
            </div>

            <Card className="border border-border bg-card rounded-[1.75rem] gap-4 p-4 overflow-hidden">
              {emailList.map((email: any, index: number) => (
                <EmailAction
                  key={`${email.email}-${index}`}
                  email={email.email}
                  isPrimary={email.isPrimary}
                  isVerified={email.isVerified}
                  description={email.description}
                  onManage={() => console.log("Manage", email.email)}
                  onRemove={() => console.log("Remove", email.email)}
                />
              ))}
            </Card>
          </div>

          {/* Email Settings */}
          <div className="space-y-8 mb-8">
            <div className="ml-6 mb-5">
              <h1 className="text-xl font-semibold text-foreground">
                Email Settings
              </h1>
              <p className="text-md text-muted-foreground">
                Configure how emails are used in relation to your account.
              </p>
            </div>

            <Card className="border border-border bg-card rounded-[1.75rem] gap-4 p-4 overflow-hidden">
              {/* Primary Email */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-border border-b">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-foreground">
                    Primary email address
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Select an email to be used for account-related notifications
                    and can be used for password reset.
                  </p>
                </div>

                <div className="w-full md:w-[250px]">
                  <Select
                    value={primaryEmail}
                    onValueChange={(val) => {
                      setPrimaryEmail(val);
                      setEmailList((prev) =>
                        prev.map((email) => ({
                          ...email,
                          isPrimary: email.email === val,
                        })),
                      );
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {emailList.map((email) => (
                        <SelectItem key={email.email} value={email.email}>
                          {email.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Backup Email */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-border border-b">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-foreground">
                    Backup email address
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your backup email address will be used as an additional
                    destination for security-relevant account notifications and
                    can also be used for password resets.
                  </p>
                </div>

                <div className="w-full md:w-[250px]">
                  <Select value={backupEmail} onValueChange={setBackupEmail}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Allow all verified emails">
                        Allow all verified emails
                      </SelectItem>
                      <SelectItem value="hello@example.com">
                        hello@example.com
                      </SelectItem>
                      <SelectItem value="alternative@example.com">
                        alternative@example.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Keep Private */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
                <div className="flex-1">
                  <h3 className="text-base font-medium text-foreground">
                    Keep my email addresses private
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll remove your public profile email when performing
                    web-based operations and sending email on your behalf.
                  </p>
                </div>

                <div className="w-full md:w-[250px] flex md:justify-end md:pr-4">
                  <Switch
                    checked={keepPrivate}
                    onCheckedChange={setKeepPrivate}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPage;
