'use client';
import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors backdrop-blur " +
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-accent-10 bg-gradient-to-b from-accent-10 to-accent-30 rounded-xl relative overflow-hidden group shadow-lg shadow-black/50 hover:shadow-none" +
                    "border border-t-0 border-b-2 border-accent-40 font-light text-accent hover:bg-primary/90 hover:translate-y-0.5 hover:shadow-",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline:
                    "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-full w-fit px-6 py-2 text-base",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            >
                {props.children}
                {/* Reflection spans */}
                <span className="absolute top-0 left-0 h-full w-5 animate-[reflect_5s_ease-in-out_infinite]
                bg-gradient-to-r from-accent-40 via-transparent to-accent-80 blur-sm skew-x-[-20deg] delay-[20ms] ease-in
                group-hover:animate-none group-hover:left-[120%] group-hover:transition-all group-hover:duration-300 group-hover:delay-[20ms]"/>
                <span className="absolute top-0 -right-3 h-full w-5 bg-gradient-to-r from-accent-40 via-transparent to-accent-80
                blur-sm skew-x-[-20deg] transition-all duration-[400ms] delay-[20ms] ease-in group-hover:left-full"/>
            </Comp>
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
