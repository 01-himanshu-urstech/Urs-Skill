'use client';

import Link from 'next/link';

const UpperNavbar = () => {
    const scrollToNeedHelp = (e) => {
        e.preventDefault();
        const element = document.getElementById('need-help');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="w-full bg-gray-100 border-b border-gray-300 text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-8">

                    {/* Left */}
                    <div className="flex items-center space-x-4">
                        <Link href="/contact" className="hover:text-blue-900">
                            {/* Contact Us */}
                        </Link>
                        <Link href="/seller" className="hover:text-blue-900">
                            {/* Become a Seller */}
                        </Link>
                    </div>

                    {/* Center */}
                    <div className="hidden md:flex">
                        <Link
                            href="/badges"
                            className="px-3 py-1 rounded-md text-white hover:bg-green-700 transition"
                        >
                            {/* Explore Badges */}
                        </Link>
                    </div>

                    {/* Right */}
                    <div className="flex items-center space-x-4">
                        {/* <span className="cursor-pointer hover:text-blue-900">English</span>
                        <span className="cursor-pointer hover:text-blue-900">Currency: USD</span> */}
                        <Link href="/login" className="hover:text-blue-900">
                            {/* Sign In */}
                        </Link>
                        <a
                            href="#need-help"
                            onClick={scrollToNeedHelp}
                            className="  hidden md:inline-flex items-center px-1.5 py-0 rounded-lg
                        bg-gradient-to-r from-purple-600 to-purple-700
                        text-white text-xs 
                        shadow-md
                        transition-all duration-300 ease-out
                        hover:from-purple-700 hover:to-purple-800
                        hover:shadow-lg hover:-translate-y-[1px]
                        active:translate-y-0 active:scale-95"
                        >
                            Get a query contact us
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UpperNavbar;
