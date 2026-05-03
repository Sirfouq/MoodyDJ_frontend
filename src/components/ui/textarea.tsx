import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "w-full max-w-3xl min-h-[140px] rounded-[20px] px-5 py-3.5 text-lg resize-none border border-transparent bg-white shadow-md transition-all duration-200 cursor-text placeholder:text-lg focus:outline-none focus:shadow-lg focus-within:border-gray-300 hover:shadow-lg hover:border-gray-300",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
