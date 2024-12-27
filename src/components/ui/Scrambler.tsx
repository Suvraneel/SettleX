"use client";
import React, { useEffect, useRef } from 'react';

/**
 * TextScramble Component
 *
 * @version 1.0.0
 * @author [@Suvraneel](https://github.com/Suvraneel)
 * @description A React component that displays an array of phrases with a scrambling text effect.
 * @param {Object} props - The component props
 * @param {string[]} props.phrases - An array of phrases to be scrambled and displayed
 * @returns {JSX.Element} The rendered component
 * @example <TextScramble phrases={['Hello Sinners', 'Welcome to Hell', 'feat. Diablo']} />
 *
 */
const TextScramble: React.FC<{ phrases: string[] }> = ({ phrases }) => {
    const elRef = useRef<HTMLDivElement>(null);
    const chars = '!<>-_\\/[]{}—=+*^$&@?#________';
    let resolve: () => void = () => {};
    let queue: { from: string, to: string, start: number, end: number, char?: string }[] = [];
    let frameRequest: number = 0;
    let frame: number = 0;

    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const setText = (newText: string) => {
        const el = elRef.current;
        if (!el) return;

        const oldText = el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise<void>((res) => (resolve = res));
        queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(frameRequest);
        frame = 0;
        update();
        return promise;
    };

    const update = () => {
        const el = elRef.current;
        if (!el) return;

        let output = '';
        let complete = 0;
        for (let i = 0, n = queue.length; i < n; i++) {
            // eslint-disable-next-line prefer-const
            let { from, to, start, end, char } = queue[i];
            if (frame >= end) {
                complete++;
                output += to;
            } else if (frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = randomChar();
                    queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        el.innerHTML = output;
        if (complete === queue.length) {
            resolve();
        } else {
            frameRequest = requestAnimationFrame(update);
            frame++;
        }
    };

    useEffect(() => {
        let counter = 0;
        const next = () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setText(phrases[counter]).then(() => {
                setTimeout(next, 800);
            });
            counter = (counter + 1) % phrases.length;
        };
        next();
    }, [phrases]);

    return <span ref={elRef} className="text"></span>;
};

export default TextScramble;