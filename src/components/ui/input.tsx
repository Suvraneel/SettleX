'use client'
import * as React from "react"

import {cn} from "@lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({className, type, ...props}, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex bg-input h-full w-64 sm:w-80 px-4 py-3 rounded-xl border border-input text-base font-light " +
                    "shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground " +
                    "placeholder:text-muted-foreground_60 placeholder:font-light placeholder:text-base " +
                    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus:outline-none" +
                    "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm backdrop-blur",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export {Input}
