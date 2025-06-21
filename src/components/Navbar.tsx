'use client'
import Link from 'next/link';
import Image from 'next/image';
import {Button} from "@components/ui/button";
import BridgeDialog from "@components/BridgeDialog";

export default function Navbar(props: { handleFocus?: () => void }) {
    return (
        <nav
            className="w-full fixed top-5 left-0 z-50 px-6 md:px-12 flex items-center justify-between overflow-clip">

            {/* Logo */}
            <Link href="/" passHref>
                <Image src="/SettleXWht.svg" alt="SettleX Logo" height={32} width={56}/>
            </Link>

            <div
                className="flex items-center justify-center bg-white/15 border border-white/20 px-6 py-3 rounded-lg backdrop-blur">
                {/* Navigation Links */}
                <ul className="hidden md:flex space-x-8 text-sm font-normal">
                    <li>
                        <Link href="#features" passHref>
                            <span className="hover:text-accent">Features</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="#faq" passHref>
                            <span className="hover:text-accent">FAQ’s</span>
                        </Link>
                    </li>
                    <BridgeDialog/>
                    <li>
                        <Link href="#contact" passHref>
                            <span className="hover:text-accent">Contact</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Join Waitlist Button */}
            <Button onClick={props.handleFocus}>Join Waitlist</Button>
        </nav>
    );
}
