"use client";
import Image from "next/image";
import {FloatingNav} from "@components/ui/floating-navbar";
import {BrandGithub, BrandTelegram, BrandX, FileText} from "@mynaui/icons-react";
import Link from "next/link";

const navItems = [
    {name: "X", link: "https://x.com/settleX_build", icon: <BrandX className="h-5 w-5"/>},
    {name: "Telegram", link: "/", icon: <BrandTelegram className="h-5 w-5"/>},
    {name: "Github", link: "https://github.com/SettleX-Labs/", icon: <BrandGithub className="h-5 w-5"/>},
    // {name: "Slack", link: "/", icon: <BrandSlack className="h-5 w-5"/>},
    {name: "White Paper", link: "/", icon: <FileText className="h-5 w-5"/>},
];

function Header() {
    return (
        <>
            <Link href={"/"} passHref>
                <div className="h-24 w-24 lg:h-40 lg:w-40 fixed top-24 sm:top-6 lg:top-5 left-12 self-start z-50">
                    <Image className="dark:hidden"
                           src="./SettleXClr.svg"
                           alt="SettleX-logo"
                           fill loading="lazy" decoding="async"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                           style={{objectFit: "contain"}}
                    />
                    <Image className="hidden dark:block"
                           src="./SettleXClrInv.svg"
                           alt="SettleX-logo"
                           fill loading="lazy" decoding="async"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                           style={{objectFit: "contain"}}
                    />
                </div>
            </Link>
            <FloatingNav navItems={navItems}/>
        </>
    );
}

export default Header;