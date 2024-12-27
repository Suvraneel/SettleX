"use client";

import { ThemeProvider } from "next-themes"
import {ComponentProps} from "react";

export function NextThemeProvider({
                                  children,
                                  ...props
                              }: ComponentProps<typeof ThemeProvider>) {
    return <ThemeProvider {...props}>{children}</ThemeProvider>
}
