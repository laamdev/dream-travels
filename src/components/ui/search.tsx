import * as React from "react";

import { cn } from "@/lib/utils";

const Search = ({
  className,
  type,
  onSearch,
  ...props
}: React.ComponentProps<"input"> & {
  onSearch?: () => void;
}) => {
  return (
    <div className="relative flex items-center w-full">
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground bg-white placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-12 w-full min-w-0 rounded-full border px-6 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-32",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <button
        onClick={onSearch}
        className="absolute right-[3px] h-[calc(100%-6px)] px-6 bg-black text-white hover:text-white/80 rounded-full hover:bg-black/80 transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export { Search };
