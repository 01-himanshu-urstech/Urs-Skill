'use client';
import Link from 'next/link';
import { useState } from 'react';
import { 
  User, LogOut, Handshake, Phone, Info, ChevronLeft 
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

const SideHoverNav = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const menuItems = [
    { label: 'B2B Partnership', href: '/b2b', icon: <Handshake size={14} /> },
    { label: 'About', href: '/about', icon: <Info size={14} /> },
    { label: 'Contact', href: '/contact', icon: <Phone size={14} /> },
  ];

  return (
    <>
      {/* 1. RIGHT TRIGGER ZONE: Compact 240px Height */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed right-0 top-1/3 -translate-y-1/2 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isHovered ? 'w-[180px]' : 'w-8'
        }`}
      >
        {/* ULTRA-COMPACT DRAWER: Minimalist height for premium feel */}
        <div className={`h-[200px] bg-gradient-to-bl from-[#1E40AF] to-[#8B19E6] shadow-[-10px_10px_30px_rgba(0,0,0,0.2)] rounded-l-3xl flex flex-col overflow-hidden transition-all duration-700 border-l border-white/20 ${
          isHovered ? 'px-4 py-5 opacity-100' : 'px-0 py-4 opacity-80 backdrop-blur-md'
        }`}>
          
          {/* COLLAPSED STATE: Minimal Label */}
          {!isHovered && (
            <div className="h-full flex items-center justify-center cursor-pointer">
              <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/80 [writing-mode:vertical-lr] flex items-center gap-1.5">
                 Menu
                 <ChevronLeft size={10} className="rotate-90 opacity-40" />
              </span>
            </div>
          )}

          {/* EXPANDED STATE: Tightened Navigation */}
          <div className={`h-full flex flex-col transition-all duration-700 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
            <div className="mb-3 px-1 border-b border-white/10 pb-2">
               <h2 className="text-[10px] font-black text-white tracking-widest uppercase">Urs Skill</h2>
            </div>

            <nav className="flex flex-col gap-0.5">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 p-2 rounded-lg text-white/70 font-bold text-[9px] hover:bg-white/10 hover:text-white transition-all group"
                >
                  <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-1">
               {isAuthenticated ? (
                 <>
                    <Link href="/profile" className="flex items-center gap-2 p-2 rounded-lg text-white/90 font-bold text-[8px] bg-white/5 hover:bg-white/10">
                       <User size={12} /> Profile
                    </Link>
                    <button 
                      onClick={() => dispatch(logout())}
                      className="text-white/40 font-bold text-[8px] hover:text-red-300 text-left pl-2 transition-colors"
                    >
                       Logout
                    </button>
                 </>
               ) : (
                 <Link 
                   href="/login" 
                   className="flex items-center justify-center w-full py-2 bg-white text-[#7C3AED] rounded-lg font-black text-[8px] uppercase tracking-wider hover:scale-[1.02] transition-transform"
                 >
                    Login
                 </Link>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* ULTRA-LIGHT DIMMER */}
      <div 
        className={`fixed inset-0 bg-black/5 z-[90] transition-opacity duration-700 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} 
      />
    </>
  );
};

export default SideHoverNav;