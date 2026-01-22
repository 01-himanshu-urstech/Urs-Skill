'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import SearchBar from '@/components/ui/SearchBar';
import { User, LogOut, Search, Phone } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 transition-all duration-500
        ${isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] border-b border-gray-100'
          : 'bg-white border-b border-gray-100'}
      `}
    >
      {/* 1440px MASTER ALIGNMENT: Synced with Hero Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">

          {/* 1. Logo Area */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* 2. Desktop Search: Centered and Compact */}
          <div className="hidden lg:flex flex-1 justify-center max-w-xl mx-auto">
            <div className="w-full">
              <SearchBar />
            </div>
          </div>

          {/* 3. Action Hub: Responsive Logic */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2.5 lg:hidden hover:bg-gray-50 rounded-xl transition-all active:scale-95"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5 text-gray-500" />
            </button>

            {/* Support CTA */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-100
              text-gray-600 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              <Phone size={14} className="text-[#8B19E6]" />
              Support
            </Link>

            {/* Auth Logic: Brand Purple Integration */}
            {!isAuthenticated ? (
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-2.5 rounded-xl bg-[#8B19E6]
                text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#7014ba] 
                hover:shadow-lg hover:shadow-purple-100 transition-all active:scale-95"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-50
                  text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-[#8B19E6] transition-all"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">Account</span>
                </Link>
                <button
                  onClick={() => dispatch(logout())}
                  className="p-2.5 text-gray-400 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE SEARCH: Smooth Expansion */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${showMobileSearch ? 'max-h-24 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
           <div className="pt-2">
            <SearchBar />
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;