import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
     className={cn(
          "flex outline-none h-10 rounded-md font-medium p-3 w-full text-sm border border-gray-200 focus:border-primary! transition-all dark:border-opacity-10 bg-white dark:bg-grayDarker min-h-20 resize-none",
          className
        )}
      {...props}
    />
  )
}

export { Textarea }
