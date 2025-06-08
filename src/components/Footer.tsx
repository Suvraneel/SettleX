// components/Footer.tsx
import Link from 'next/link';
import Image from "next/image";
import {BrandGithub, BrandTelegram, BrandX} from "@mynaui/icons-react";

export default function Footer() {
    return (
        <footer className="mt-16 px-6 md:px-12 lg:px-24 pt-10 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Logo + Attribution */}
                <div className="flex flex-col items-start justify-start text-xs font-light text-muted-foreground">
                    {/* Logo */}
                    <Link href="/" passHref>
                        <div className="relative w-[100px] h-[100px]">
                            <Image
                                src="/SettleXClrInv.svg"
                                alt="SettleX Logo"
                                fill={true}
                                objectFit={"contain"}
                                className="absolute left-0 bottom-0"
                            />
                        </div>
                    </Link>
                    <span className="inline-flex gap-3 items-center">
                        <h5>Backed by: </h5>
                        <Link passHref
                            href='https://www.quicknode.com/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent">
                        <Image
                            src='/brands/quicknode-logo-white.svg'
                            alt={`QuickNode logo`}
                            width={100}
                            height={20}
                            className="object-contain"
                        />
                        </Link>
                        </span>
                    <span className="inline-flex mt-2">
                        <h5>&copy; {new Date().getFullYear()} SettleX. All rights reserved.</h5>
                    </span>
                </div>

                <div className="flex space-x-12 md:space-x-28 mt-6 md:mt-0 text-base font-light text-muted-foreground">
                    {/* Useful Links */}
                    <div>
                        <ul className="flex flex-col items-end justify-start space-y-3">
                            <li>
                                <Link href="/docs" passHref>
                                    <span className="hover:text-accent">Docs</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" passHref>
                                    <span className="hover:text-accent">Terms of Service</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" passHref>
                                    <span className="hover:text-accent">Privacy Policy</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <ul className="flex flex-col items-end justify-start space-y-3">
                            <li className="group hover:text-accent inline-flex items-center space-x-2">
                                <BrandX size={18} className="inline mr-1"/>
                                <Link href={"https://x.com/settleX_build"} target="_blank"
                                      rel="noopener noreferrer">
                                    Twitter
                                </Link>
                            </li>
                            <li className="group hover:text-accent inline-flex items-center space-x-2">
                                <BrandTelegram size={18} className="inline mr-1"/>
                                <Link href={"https://t.me/settlex"} target="_blank"
                                      rel="noopener noreferrer">
                                    Telegram
                                </Link>
                            </li>
                            <li className="group hover:text-accent inline-flex items-center space-x-2">
                                <BrandGithub size={18} className="inline mr-1"/>
                                <Link href={"https://github.com/SettleX-Labs"} target="_blank"
                                      rel="noopener noreferrer">
                                    GitHub
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
