import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import {cn} from "@/lib/utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

function Switch({className, ...props}: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `peer inline-flex h-8 w-16 shrink-0 items-center 
        rounded-full border border-transparent shadow-xs 
        transition-all outline-none 
        data-[state=checked]:bg-primary 
        data-[state=unchecked]:bg-input 
        dark:data-[state=unchecked]:bg-input/80
        focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
        disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          `pointer-events-none block size-7 rounded-full bg-background 
          transition-transform ring-0 
          data-[state=unchecked]:translate-x-0 
          data-[state=checked]:translate-x-8 
          dark:data-[state=unchecked]:bg-foreground 
          dark:data-[state=checked]:bg-primary-foreground`,
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export {Switch};
