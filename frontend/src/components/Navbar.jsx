
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* Brand Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="1.8"
                            className="h-6 w-6"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <path d="M14 2v6h6M8 13h8M8 17h8" />
                        </svg>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                            DocuFlow <span className="text-blue-600">AI</span>
                        </span>
                        <span className="text-[10px] font-medium tracking-[2px] text-slate-400">
                            SMART DOCUMENT TOOLS
                        </span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center gap-9 font-medium md:flex">
                    <Link
                        to="/"
                        className="text-sm text-slate-700 transition hover:text-blue-600"
                    >
                        Upload
                    </Link>

                    <a
                        href="#about"
                        className="text-sm text-slate-700 transition hover:text-blue-600"
                    >
                        About
                    </a>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <a
                        href="#signin"
                        className="hidden text-sm font-semibold text-slate-700 transition hover:text-blue-600 sm:block"
                    >
                        Sign In
                    </a>

                    <Link
                        to="/"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 hover:shadow-lg"
                    >
                        Get Started
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
