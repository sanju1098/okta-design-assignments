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
import React from "react";

interface EmailActionProps {
  email: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  description?: string;
  className?: string;
  onManage?: () => void;
  onRemove?: () => void;
}

export const EmailAction = React.memo(function EmailAction({
  email,
  isPrimary = false,
  isVerified = false,
  description,
  className,
  onManage,
  onRemove,
}: EmailActionProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 border-border border-b last:border-b-0 hover:bg-hover/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:scale-[1.02] cursor-pointer group",
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="font-medium text-foreground truncate" title={email}>
            {email}
          </span>
          <div className="flex items-center gap-2 flex-shrink-0">
            {isPrimary && (
              <Badge variant="default" aria-label="Primary email">
                PRIMARY
              </Badge>
            )}
            {isVerified ? (
              <Badge variant="secondary" aria-label="Verified email">
                VERIFIED
              </Badge>
            ) : (
              <Badge variant="destructive" aria-label="Unverified email">
                UNVERIFIED
              </Badge>
            )}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            aria-label={`More options for ${email}`}
            className="h-8 w-8 ml-4 flex-shrink-0 hover:bg-hover rounded-md 
            data-[state=open]:border-[#868584] data-[state=open]:bg-[#e7e5e4] dark:data-[state=open]:bg-transparent"
            title="More options"
          >
            <MoreHorizontal aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-32 bg-popover border border-border shadow-lg z-50"
        >
          <DropdownMenuItem
            onClick={onManage}
            className="cursor-pointer flex items-center gap-2"
            aria-label={`Manage email ${email}`}
          >
            <Settings2
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            Manage
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onRemove}
            className="cursor-pointer flex items-center gap-2"
            aria-label={`Remove email ${email}`}
          >
            <Trash2 className="h-4 w-4 text-destructive" aria-hidden="true" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
