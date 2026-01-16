'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import SearchBar from '@/components/ui/SearchBar';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`
          sticky top-0 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-white/70 backdrop-blur-md shadow-md border-b border-white/30'
            : 'bg-white border-b border-gray-200'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">

            {/* Logo */}
            <Logo />

            {/* Center Search */}
            <div className="hidden md:flex flex-1 justify-center px-4">
              <div className="w-full max-w-md">
                <SearchBar />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="hidden md:inline-flex items-center px-4 py-1.5 rounded-lg bg-purple-700 text-white text-sm font-medium hover:bg-purple-900 transition"
              >
                B2B Partnership
              </Link>
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center px-4 py-1.5 rounded-lg bg-purple-700 text-white text-sm font-medium hover:bg-purple-900 transition"
              >
                Get in Touch
              </Link>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="
                p-2 rounded-lg
                transition-all duration-200
                hover:bg-gray-100
                hover:scale-110
                active:scale-95
              "
              >
                <Menu className="w-5 h-5 text-gray-700 transition-transform duration-200 hover:rotate-5 hover:cursor-pointer" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/40
            backdrop-blur-[2px]
            transition-opacity duration-300
            animate-fadeIn
          "
          onClick={() => setIsSidebarOpen(false)}
        />
      )}


      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="
                p-2 rounded-lg
                transition-all duration-200
                hover:bg-gray-100
                hover:rotate-90
                hover:scale-110
                active:scale-95
              "
          >
            <X className="w-6 h-6 text-gray-700 hover:cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <Link href="/about" onClick={() => setIsSidebarOpen(false)}>
            About Us
          </Link>
          <Link href="/contact" onClick={() => setIsSidebarOpen(false)}>
            Contact Us
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
