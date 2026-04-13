import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full bg-transparent px-0 py-2 text-base md:text-sm transition-all duration-300 outline-none",
        "placeholder:text-muted-foreground/50 tracking-widest font-sans",
        "border-t-0 border-x-0 border-b border-text/20",
        "focus:border-accent focus:ring-0 focus-visible:ring-0",
        "aria-invalid:border-rose-400 aria-invalid:text-rose-400",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-dotted",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
