import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex outline-none h-10 rounded-md font-medium px-3 w-full border border-gray-200 focus:border-primary! transition-all dark:border-opacity-10 bg-white dark:bg-grayDarker",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
