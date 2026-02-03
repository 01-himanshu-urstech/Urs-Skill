"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLayout } from "../../context/LayoutContext";
import { Menu, Search, X, Command, LayoutDashboard, Ticket, FileText, Users, Image as ImageIcon, Mail } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function MainContentWrapper({ children }) {
    const { isCollapsed, setIsCollapsed } = useLayout();
    const router = useRouter();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    //    DEFINED SEARCHABLE TABS
    const navigationLinks = [
        { title: "Dashboard Overview", path: "/", icon: <LayoutDashboard size={14} /> },
        { title: "Discount Coupons", path: "/coupon", icon: <Ticket size={14} /> },
        { title: "Manage Blogs", path: "/blog", icon: <FileText size={14} /> },
        { title: "Customer List", path: "/customer/list", icon: <Users size={14} /> },
        { title: "Home Banners", path: "/banners", icon: <ImageIcon size={14} /> },
        { title: "Enquiry", path: "/contact", icon: <Mail size={14} /> },
    ];

    //    FILTER LOGIC
    const suggestions = searchQuery.trim() === ""
        ? []
        : navigationLinks.filter(link =>
            link.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const handleNavigation = (path) => {
        router.push(path);
        setSearchQuery("");
        setSearchOpen(false);
        setIsFocused(false);
    };

    // Global search shortcut (Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (window.innerWidth < 768) setSearchOpen(true);
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setSearchQuery("");
                inputRef.current?.blur();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleClickOutside = useCallback((e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setSearchOpen(false);
            setIsFocused(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    return (
        <div className={`flex-1 transition-all duration-300 p-2 md:p-4 min-h-screen max-w-full overflow-x-hidden bg-white ${isCollapsed ? "ml-0 md:ml-20" : "ml-0 md:ml-64"}`}>
            <header className="flex items-center justify-between mb-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm h-14 sticky top-2 z-30">
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => setIsCollapsed(false)} className="md:hidden p-1.5 text-gray-600 hover:bg-neutral rounded-lg mt-1">
                        <Menu size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end relative" ref={searchRef}>
                    {/* PC Search */}
                    <div className={`hidden md:flex items-center flex-1 max-w-md gap-2 rounded-lg px-3 py-1.5 transition-all duration-300 border ${isFocused
                        ? "bg-white border-primary shadow-lg shadow-primary/10 scale-[1.01]"
                        : "bg-gray-50 border-gray-200"
                        }`}>
                        <Search size={16} className={`transition-all duration-300 ${isFocused ? "text-primary scale-110" : "text-gray-400"}`} />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search tabs... (Ctrl+K)"
                            value={searchQuery}
                            onFocus={() => setIsFocused(true)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-black bg-transparent outline-none text-sm w-full text-gray-700"
                        />
                        <div className={`flex items-center gap-1 bg-white border border-gray-200 px-1.5 py-0.5 rounded text-[10px] text-gray-400 transition-all duration-300 ${isFocused ? "opacity-0 translate-x-2" : "opacity-100"}`}>
                            <Command size={10} /> K
                        </div>

                        {/*    SEARCH SUGGESTIONS DROPDOWN */}
                        {isFocused && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-2 border-b border-gray-50 bg-gray-50/50">
                                    <p className="text-[9px]      text-gray-400 uppercase tracking-widest px-2">Quick Results</p>
                                </div>
                                {suggestions.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleNavigation(item.path)}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 text-gray-700 hover:text-primary transition-colors text-left border-b border-gray-50 last:border-0"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:text-primary">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs font-bold">{item.title}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Mobile Search Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => {
                                setSearchOpen(!searchOpen);
                                if (!searchOpen) setTimeout(() => inputRef.current?.focus(), 100);
                            }}
                            className={`p-2 rounded-lg border transition-all duration-300 ${searchOpen ? "bg-primary/5 border-primary text-primary" : "text-gray-600 border-gray-100"}`}
                        >
                            <Search size={18} />
                        </button>
                        {searchOpen && (
                            <div className="absolute left-2 right-2 top-16 z-50 bg-white rounded-xl border border-primary shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex items-center gap-2 p-3">
                                    <Search size={16} className="text-primary" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="text-black flex-1 outline-none text-sm"
                                    />
                                    <button onClick={() => setSearchOpen(false)} className="text-gray-400"><X size={16} /></button>
                                </div>
                                {/* Mobile Suggestions */}
                                {suggestions.length > 0 && (
                                    <div className="bg-gray-50/50 border-t border-gray-100 max-h-60 overflow-y-auto">
                                        {suggestions.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleNavigation(item.path)}
                                                className="w-full flex items-center gap-3 px-4 py-3 active:bg-primary/10 text-gray-700 text-left border-b border-gray-100 last:border-0"
                                            >
                                                {item.icon}
                                                <span className="text-xs font-bold">{item.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Admin Profile */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="text-right hidden xs:block">
                            <p className="text-[11px] font-bold text-gray-800 leading-tight">Admin</p>
                            <p className="text-[10px] text-[#10B981] font-medium leading-tight">Online</p>
                        </div>
                        <div className="w-9 h-9 bg-gray-100 rounded-full border-2 border-primary/10 flex items-center justify-center text-primary font-bold text-xs">AD</div>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-full overflow-x-hidden bg-white">
                {children}
            </main>
        </div>
    );
}