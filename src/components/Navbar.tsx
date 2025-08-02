'use client'
import Link from 'next/link';
import Image from 'next/image';
import {Button} from "@components/ui/button";

export default function Navbar(props: { showWallet?: boolean; handleFocus?: () => void }) {
    return (
        <nav
            className="w-full fixed top-5 left-0 z-50 px-6 md:px-12 flex items-center justify-between overflow-clip">
            <div className="w-full h-full py-1 flex flex-row items-center justify-between gap-4 md:gap-8 relative">
                {/* Logo */}
                <Link href="/" passHref>
                    <Image src="/SettleXWht.svg" alt="SettleX Logo" height={32} width={56}/>
                </Link>

                <div id="nav-links"
                     className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/15 border border-white/20 px-6 py-3 rounded-lg backdrop-blur">
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
                        <li>
                            <Link href="bridge" passHref>
                                <span className="hover:text-accent">Bridge</span>
                            </Link>
                        </li>
                        {/*<BridgeDialog/>*/}
                        <li>
                            <Link href="#contact" passHref>
                                <span className="hover:text-accent">Contact</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {props.showWallet ?
                    <appkit-button/> :
                    <Button onClick={props.handleFocus}>Join Waitlist</Button>
                }
            </div>
        </nav>
    );
}
