'use client';
import React, {useEffect} from 'react';
import {useTheme} from "next-themes";
import "@theme-toggles/react/css/Within.css"
import {Within} from "@theme-toggles/react";

function ThemeToggle() {
    const {setTheme} = useTheme();
    const [toggleIsDark, setToggleIsDark] = React.useState(true);

    const toggleTheme = () => {
        setToggleIsDark(!toggleIsDark);
    }

    useEffect(() => {
        setTheme(toggleIsDark ? 'dark' : 'light');
    }, [toggleIsDark]);

    return (
        <Within className='scale-150'
                toggled={toggleIsDark} toggle={toggleTheme} duration={1000} placeholder={'Toggle Theme'}
                aria-label={'Toggle Theme'} title={'Toggle Theme'} tabIndex={0}
                type="button" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
    );
}

export default ThemeToggle;