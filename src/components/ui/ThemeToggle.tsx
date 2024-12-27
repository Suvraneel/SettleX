'use client';
import React, {useEffect} from 'react';
import {useTheme} from "next-themes";
import "@theme-toggles/react/css/Within.css"
import {Within} from "@theme-toggles/react";

function ThemeToggle() {
    const {systemTheme, resolvedTheme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }

    useEffect(() => {
        setTheme(systemTheme || 'light');
    }, [systemTheme]);

    return (
        <Within className='scale-150 transform-gpu'
                toggled={resolvedTheme === 'dark'} toggle={toggleTheme} duration={750} placeholder={'Toggle Theme'}
                aria-label={'Toggle Theme'} title={'Toggle Theme'} tabIndex={0}
                type="button" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
    );
}

export default ThemeToggle;