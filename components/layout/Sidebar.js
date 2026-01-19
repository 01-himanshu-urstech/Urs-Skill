"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, Users,
    ShieldCheck, CreditCard, ChevronDown, Menu, X, LogOut,
    ReceiptText, FileText, Percent, Mail
} from 'lucide-react';
import { useLayout } from "../../context/LayoutContext";
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const pathname = usePathname();
    const [openMenus, setOpenMenus] = useState({});
    const { isCollapsed, setIsCollapsed } = useLayout();
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // ✅ 1. Accessing Redux Auth State
    const { user } = useSelector((state) => state.auth || {});

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) {
            const timer = setTimeout(() => {
                setIsCollapsed(true);
                setOpenMenus({});
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [pathname, isMobile, setIsCollapsed]);

    const handleLogout = useCallback(() => {
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
        window.location.replace("/login");
    }, []);

    const toggleMenu = useCallback((id) => {
        if (isCollapsed) setIsCollapsed(false);
        setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
    }, [isCollapsed, setIsCollapsed]);

    // ✅ 2. Menu Configuration (IDs match Database permission strings)
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', href: '/', icon: <LayoutDashboard size={20} /> },
        {
            id: 'customers', name: 'Customers', icon: <Users size={20} />,
            subParts: [{ id: 'customer-list', name: 'List', href: '/customer/list' }, { id: 'customer-group', name: 'Group', href: '/customer/group' }]
        },
        {
            id: 'admins', name: 'Admin', icon: <ShieldCheck size={20} />,
            subParts: [{ id: 'admin-list', name: 'List', href: '/admin/list' }]
        },
        {
            id: 'courses', name: 'Courses', icon: <BookOpen size={20} />,
            subParts: [{ id: 'course-list', name: 'List', href: '/courses/list' }]
        },
        {
            id: 'transaction', name: 'Transaction', icon: <CreditCard size={20} />,
            subParts: [{ id: 'transaction-list', name: 'List', href: '/transaction/list' }]
        },
        {
            id: 'General', name: 'General', icon: <ReceiptText size={20} />,
            subParts: [
                { id: 'blogs', name: 'Blogs', href: '/blog' },
                { id: 'backlinks', name: 'Backlinks', href: '/backlinks' },
                { id: 'banners', name: 'Banner', href: '/banners' }
            ]
        },
        {
            id: 'logs', name: 'Logs', icon: <FileText size={20} />,
            subParts: [
                { id: 'customer-logs', name: 'Customer Logs', href: '/logs/customer-logs' },
                { id: 'admin-logs', name: 'Admin Logs', href: '/logs/admin-logs' },
                { id: 'all-logs', name: 'All Logs', href: '/logs/all-logs' }
            ]
        },
        {
            id: 'coupons', name: 'Coupons', icon: <Percent size={20} />,
            subParts: [
                { id: 'coupon-list', name: 'List', href: '/coupon/list' },
                { id: 'coupon-add', name: 'Add', href: '/coupon/add' }
            ]
        },
        {
            id: 'Enquiry', name: 'Enquiry', icon: <Mail size={20} />,
            subParts: [
                { id: 'contacts', name: 'Contacts', href: '/contact' }
            ]
        }
    ];

    // ✅ 3. Permission Filter Logic
    const filteredMenuItems = useMemo(() => {
        if (!mounted || !user) return [];
        if (user?.role === 'SUPERADMIN') return menuItems;
        return menuItems.filter(item => user?.permissions?.includes(item.id));
    }, [user, menuItems, mounted]);

    if (!mounted) return null;

    if (isMobile && isCollapsed) {
        return (
            <button
                onClick={() => setIsCollapsed(false)}
                className="fixed top-4 left-4 z-[100] p-3 bg-white/95 backdrop-blur-sm shadow-xl rounded-xl border hover:bg-white md:hidden"
            >
                <Menu size={22} className="text-gray-700" />
            </button>
        );
    }

    return (
        <>
            {isMobile && !isCollapsed && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden" onClick={() => setIsCollapsed(true)} />
            )}

            <aside className={`
                fixed left-0 top-0 h-screen bg-white z-[95] transition-all duration-300 flex flex-col
                shadow-2xl md:shadow-none md:border-r md:border-gray-100
                ${isMobile ? (!isCollapsed ? 'w-screen h-screen p-6 border-0' : 'w-0 -translate-x-full') : (isCollapsed ? 'w-20 p-4' : 'w-64 p-4')}
                md:${isCollapsed ? 'w-20' : 'w-64'}
            `}>
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6 px-2 h-16 flex-shrink-0">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3 text-primary min-w-0">
                            <Image src="/assets/logo.png" alt="UrsSkill" width={32} height={32} className="object-contain" priority />
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight truncate">UrsSkill</h1>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`p-2 hover:bg-neutral rounded-lg text-gray-500 transition-all ${isCollapsed ? 'mx-auto' : ''} ${isMobile && !isCollapsed ? 'bg-white/90 backdrop-blur-sm shadow-md rounded-xl' : ''}`}
                    >
                        {isMobile && !isCollapsed ? <X size={20} className="text-gray-700" /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 no-scrollbar pb-4 px-1">
                    {filteredMenuItems.map((item) => (
                        <div key={item.id}>
                            {item.subParts ? (
                                <>
                                    <button
                                        onClick={() => toggleMenu(item.id)}
                                        className={`w-full flex items-center p-3 rounded-xl text-gray-500 hover:bg-neutral transition-all group ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                                        title={isCollapsed ? item.name : ""}
                                    >
                                        <div className={`flex items-center gap-3 min-w-0 ${isCollapsed ? 'w-full justify-center' : ''}`}>
                                            <span className={`flex justify-center flex-shrink-0 ${isCollapsed ? '' : 'min-w-[24px]'} ${openMenus[item.id] ? 'text-primary' : ''}`}>
                                                {item.icon}
                                            </span>
                                            {!isCollapsed && <span className="text-sm font-semibold text-gray-700 truncate">{item.name}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <ChevronDown size={16} className={`transition-transform duration-200 flex-shrink-0 ${openMenus[item.id] ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>
                                    {!isCollapsed && openMenus[item.id] && (
                                        <div className="ml-9 mt-1 space-y-1 border-l-2 border-primary-light pl-4 animate-in fade-in slide-in-from-top-1 duration-200">
                                            {item.subParts.map(sub => (
                                                <Link
                                                    key={sub.id}
                                                    href={sub.href}
                                                    className={`block py-2 text-sm transition-all ${pathname === sub.href ? 'text-black font-bold' : 'text-gray-400 hover:text-primary'}`}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    title={isCollapsed ? item.name : ""}
                                    className={`flex items-center p-3 rounded-xl transition-all min-w-0 ${isCollapsed ? 'justify-center' : 'justify-start gap-3'} ${pathname === item.href ? 'bg-primary-light text-black font-bold shadow-sm' : 'text-gray-500 hover:bg-neutral'}`}
                                >
                                    <span className={`flex justify-center flex-shrink-0 ${isCollapsed ? '' : 'min-w-[24px]'}`}>
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && <span className="text-sm font-semibold truncate">{item.name}</span>}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex-shrink-0 space-y-1">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}
                        title={isCollapsed ? "Logout" : ""}
                    >
                        <span className="flex justify-center flex-shrink-0">
                            <LogOut size={20} />
                        </span>
                        {!isCollapsed && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;