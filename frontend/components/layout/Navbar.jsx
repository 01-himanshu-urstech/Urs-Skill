'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/Logo';
import SearchBar from '@/components/ui/SearchBar';
import { Menu, X, User, LogOut, Handshake } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
                href="/contact"
                className="hidden md:inline-flex items-center px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700
              text-white text-sm font-medium hover:from-purple-700 hover:to-purple-800
                transition"
              >
                Get in Touch
              </Link>

              {!isAuthenticated ? (
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700
              text-white text-sm font-medium hover:from-purple-700 hover:to-purple-800
                transition"
                >
                  Login
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="hidden md:inline-flex items-center gap-1 px-3 text-sm font-medium"
                >
                  <User size={16} />
                  My Profile
                </Link>
              )}

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
                <Menu className="w-5 h-5 text-purple-700" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Top Menu */}
        <div className="flex flex-col p-4 space-y-3">
          <Link
            href="/about"
            onClick={() => setIsSidebarOpen(false)}
            className="
              flex items-center gap-2 px-3 py-2 rounded-md
              transition-all duration-200
              hover:bg-purple-50 hover:text-purple-700
              hover:translate-x-1
            "
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsSidebarOpen(false)}
            className="
              flex items-center gap-2 px-3 py-2 rounded-md
              transition-all duration-200
              hover:bg-purple-50 hover:text-purple-700
              hover:translate-x-1
            "
          >
            Contact Us
          </Link>

          <Link
            href="/"
            onClick={() => setIsSidebarOpen(false)}
            className="
              flex items-center gap-2 px-3 py-2 rounded-md
              transition-all duration-200
              hover:bg-purple-50 hover:text-purple-700
              hover:translate-x-1
            "
          >
            <Handshake size={18} />
            B2B Partnership
          </Link>

          {isAuthenticated && (
            <Link
              href="/profile"
              onClick={() => setIsSidebarOpen(false)}
              className="
                flex items-center gap-2 px-3 py-2 rounded-md
                transition-all duration-200
                hover:bg-purple-50 hover:text-purple-700
                hover:translate-x-1
              "
            >
              <User size={18} />
              My Profile
            </Link>
          )}
        </div>

        {/* Bottom Logout */}
        {isAuthenticated && (
          <div className="absolute bottom-0 w-full p-4 border-t">
            <button
              onClick={() => {
                dispatch(logout());
                setIsSidebarOpen(false);
              }}
              className="  flex items-center gap-2
              text-red-600 font-medium
              transition-all duration-300
              hover:text-red-700
              hover:translate-x-1
              active:scale-95"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Navbar;
