// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-16 bg-[#0a0a0f] px-6 md:px-12 lg:px-24 pt-10 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Logo + Attribution */}
                <div className="flex items-center space-x-3">
                    <img src="/images/logo.png" alt="SettleX Logo" className="h-8" />
                    <span className="text-gray-500 text-sm">
            Powered by QuickNode
          </span>
                </div>

                {/* Useful Links */}
                <div className="flex space-x-8 mt-6 md:mt-0">
                    <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-2">Useful Links</h4>
                        <ul className="space-y-1 text-gray-300 text-sm">
                            <li>
                                <Link href="/docs" passHref>
                                    <span className="hover:text-teal-400">Docs</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" passHref>
                                    <span className="hover:text-teal-400">Terms of Service</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" passHref>
                                    <span className="hover:text-teal-400">Privacy Policy</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-2">Socials</h4>
                        <ul className="space-y-1 text-gray-300 text-sm">
                            <li>
                                <a
                                    href="https://twitter.com/YourProjectHandle"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-400"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/YourProjectChannel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-400"
                                >
                                    Telegram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/your-org/settlex"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-teal-400"
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-600 text-xs">
                © 2025 SettleX. All rights reserved.
            </div>
        </footer>
    );
}
