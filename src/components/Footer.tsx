// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import {
  BrandGithub,
  BrandLinkedin,
  BrandX,
} from "@mynaui/icons-react";

export default function Footer() {
  return (
    <footer className="mt-10 sm:mt-16 px-6 md:px-12 lg:px-24 pt-10 pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 md:gap-0">
        {/* Logo + Attribution */}
        <div className="flex flex-col items-start justify-start text-xs sm:text-sm font-light text-muted-foreground">
          {/* Logo */}
          <Link href="/" passHref>
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src="/SettleXClrInv.svg"
                alt="SettleX Logo"
                fill={true}
                className="absolute left-0 bottom-0 object-contain"
              />
            </div>
          </Link>
          <span className="inline-flex gap-3 items-center mt-2">
            <h5>Backed by: </h5>
            <Link
              passHref
              href="https://www.quicknode.com/?utm_source=settleX&utm_medium=partner&utm_campaign=SettleX"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              <Image
                src="/brands/quicknode-logo-white.svg"
                alt={`QuickNode logo`}
                width={100}
                height={20}
                sizes="(max-width: 640px) 88px, 100px"
                className="object-contain h-5 w-auto sm:h-6"
              />
            </Link>
          </span>
          <span className="inline-flex mt-2">
            <h5>
              &copy; {new Date().getFullYear()} SettleX. All rights reserved.
            </h5>
          </span>
        </div>

        {/* Links */}
        <div className="w-full md:w-auto grid grid-cols-2 gap-6 mt-2 md:mt-0 text-sm md:text-base font-light text-muted-foreground">
          {/* Useful Links */}
          <div>
            <ul className="flex flex-col items-start md:items-end justify-start space-y-2 md:space-y-3">
              <li>
                <Link href="/docs" passHref>
                  <span className="hover:text-accent py-1 inline-block">Docs</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" passHref>
                  <span className="hover:text-accent py-1 inline-block">Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" passHref>
                  <span className="hover:text-accent py-1 inline-block">Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <ul className="flex flex-col items-start md:items-end justify-start space-y-2 md:space-y-3">
              <li>
                <Link
                  href={"https://x.com/settleX_build"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SettleX on Twitter (X)"
                  className="inline-flex items-center gap-2 hover:text-accent py-1"
                >
                  <BrandX size={18} className="inline" />
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"https://www.linkedin.com/company/settlex"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SettleX on LinkedIn"
                  className="inline-flex items-center gap-2 hover:text-accent py-1"
                >
                  <BrandLinkedin size={20} className="inline" />
                  <span>LinkedIn</span>
                </Link>
              </li>
              <li>
                <Link
                  href={"https://github.com/SettleX-Labs"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SettleX on GitHub"
                  className="inline-flex items-center gap-2 hover:text-accent py-1"
                >
                  <BrandGithub size={18} className="inline" />
                  <span>GitHub</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
