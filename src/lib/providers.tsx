"use client";

import {ThemeProvider} from "next-themes"
import {ComponentProps} from "react";
import {ParallaxProvider} from "react-scroll-parallax";

export function Providers({
                              children
                          }: ComponentProps<typeof ThemeProvider>) {
    return (
        <ParallaxProvider>
            {children}
        </ParallaxProvider>
    )
}
