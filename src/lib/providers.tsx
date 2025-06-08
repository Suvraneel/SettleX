"use client";

import {ThemeProvider} from "next-themes"
import {ComponentProps} from "react";
import {ParallaxProvider} from "react-scroll-parallax";

export function Providers({
                              children,
                              ...props
                          }: ComponentProps<typeof ThemeProvider>) {
    return (
        <ThemeProvider {...props}>
            <ParallaxProvider>
                {children}
            </ParallaxProvider>
        </ThemeProvider>
    )
}
