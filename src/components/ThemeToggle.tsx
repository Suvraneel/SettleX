'use client';
import {useEffect, useState} from 'react';
import {useTheme} from "next-themes";
import "@/styles/Around.css"

function ThemeToggle() {
    const {setTheme} = useTheme();
    const [toggleIsDark, setToggleIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    const toggleTheme = () => {
        setToggleIsDark(!toggleIsDark);
    }

    useEffect(() => {
        setTheme(toggleIsDark ? 'dark' : 'light');
    }, [toggleIsDark]);

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return (
        <button
            className={`theme-toggle ${toggleIsDark && 'theme-toggle--toggled'} scale-[150%] px-2`}
            type="button"
            onClick={toggleTheme}
            tabIndex={0}
            title="Toggle theme"
            aria-label="Toggle theme"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                width="1em"
                height="1em"
                fill="currentColor"
                className="theme-toggle__around"
                viewBox="0 0 32 32"
            >
                <clipPath id="theme-toggle__around__cutout">
                    <path d="M0 0h42v30a1 1 0 00-16 13H0Z"/>
                </clipPath>
                <g clipPath="url(#theme-toggle__around__cutout)">
                    <circle cx="16" cy="16" r="8.4"/>
                    <g>
                        <circle cx="16" cy="3.3" r="2.3"/>
                        <circle cx="27" cy="9.7" r="2.3"/>
                        <circle cx="27" cy="22.3" r="2.3"/>
                        <circle cx="16" cy="28.7" r="2.3"/>
                        <circle cx="5" cy="22.3" r="2.3"/>
                        <circle cx="5" cy="9.7" r="2.3"/>
                    </g>
                </g>
            </svg>
        </button>
    );
}

export default ThemeToggle;