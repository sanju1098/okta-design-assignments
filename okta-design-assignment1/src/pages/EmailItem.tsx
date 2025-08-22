import {MoreHorizontal, Settings2, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";

interface EmailItemProps {
  email: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  description?: string;
  className?: string;
  onManage?: () => void;
  onRemove?: () => void;
}

export function EmailItem({
  email,
  isPrimary = false,
  isVerified = false,
  description,
  className,
  onManage,
  onRemove,
}: EmailItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-4 px-6 border-b border-border last:border-b-0 hover:bg-hover/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group",
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-medium text-foreground truncate">{email}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isPrimary && <Badge variant="default">PRIMARY</Badge>}
            {isVerified && <Badge variant="secondary">VERIFIED</Badge>}
            {!isVerified && <Badge variant="destructive">UNVERIFIED</Badge>}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          style={{padding: "0 20px"}}
          className="data-[state=open]:border-2 rounded-md px-[20rem !important]"
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 ml-4 px-5 flex-shrink-0 hover:bg-hover rounded-md
            data-[state=open]:border-[#868584] data-[state=open]:bg-[#e7e5e4] dark:data-[state=open]:bg-transparent"
            title="More options"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-32 bg-popover border border-border shadow-lg z-50"
        >
          <DropdownMenuItem
            onClick={onManage}
            className="cursor-pointer flex items-center gap-2"
          >
            <Settings2 className="h-4 w-4 text-muted-foreground" />
            Manage
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onRemove}
            className="cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
