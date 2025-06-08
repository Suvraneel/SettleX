'use client'
import Link from 'next/link';
import Image from 'next/image';
import {Button} from "@components/ui/button";

export default function Navbar() {
    return (
        <nav
            className="w-full fixed top-0 left-0 z-50 px-6 md:px-12 flex items-center justify-between overflow-clip">

            {/* Logo */}
            <Link href="/" passHref>
                <Image src="/SettleXWht.svg" alt="SettleX Logo" height={32} width={56}/>
            </Link>

            <div className="flex items-center justify-center bg-white/15 border border-white/20 px-6 py-3 rounded-lg backdrop-blur">
                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-8 text-sm font-normal">
                    <li>
                        <Link href="#features" passHref>
                            <span className="hover:text-teal-400">Features</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#blog" passHref>
                            <span className="hover:text-teal-400">Blog</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#faq" passHref>
                            <span className="hover:text-teal-400">FAQ’s</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Join Waitlist Button */}
            <Link href="#join" passHref>
                <Button>Join Waitlist</Button>
            </Link>
        </nav>
    );
}
