import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
            {/* Top Section: Links & Newsletter */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Column 1: Brand & About */}
                <div className="space-y-4">
                    <Link href="/" className="font-bold text-2xl text-emerald-500 tracking-tight">
                        StartupForge
                    </Link>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        The ultimate launchpad for startups and talent. We forge connections that build the future of innovation.
                    </p>
                </div>

                {/* Column 2: Platform Links */}
                <div>
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/startups" className="hover:text-emerald-500 transition-colors">Browse Startups</Link>
                        </li>
                        <li>
                            <Link href="/opportunities" className="hover:text-emerald-500 transition-colors">Find Opportunities</Link>
                        </li>
                        <li>
                            <Link href="/pricing" className="hover:text-emerald-500 transition-colors">Pricing Plans</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Company Links */}
                <div>
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="#" className="hover:text-emerald-500 transition-colors">About Us</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-emerald-500 transition-colors">Contact Support</Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</Link>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Newsletter Subscription */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Updated</h3>
                    <p className="text-sm text-slate-400">Subscribe to get the latest tech opportunities.</p>
                    <div className="join w-full">
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="input input-bordered input-sm join-item w-full bg-slate-800 border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-xs"
                        />
                        <button className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-none join-item normal-case px-4 text-xs">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Copyright & Socials */}
            <div className="border-t border-slate-800 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} StartupForge. All rights reserved.</p>

                    {/* Social Icons (Simulated with SVGs) */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-emerald-500 transition-colors" aria-label="Twitter">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-emerald-500 transition-colors" aria-label="GitHub">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.48 text-fill-.009-.004-.359-.016-.705-1.001.217-1.212.263-1.226.263l-.545-.327c-.244-.406-.59-.516-.59-.516l-.417-.286c-.137.098-.024.286-.024.286l.288.428c.3.518.708.412.879.315.03-.217.117-.366.213-.451-1.782-.203-3.656-.891-3.656-3.97 0-.877.312-1.595.824-2.15-.083-.203-.357-1.02.078-2.12 0 0 .675-.216 2.2.82A7.633 7.633 0 0112 6.5c.68.003 1.365.092 2 .27 1.523-1.036 2.197-.82 2.197-.82.436 1.1.162 1.917.08 2.12.513.555.822 1.273.822 2.15 0 3.08-1.878 3.764-3.665 3.962.288.248.546.738.546 1.487 0 1.074-.01 1.938-.01 2.2 0 .266.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;