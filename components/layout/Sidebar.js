"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, BookOpen, Users,
    ShieldCheck, CreditCard, ChevronDown, Menu, X, LogOut,
    ReceiptText, FileText, Percent, Mail, User
} from 'lucide-react';
import { useLayout } from "../../context/LayoutContext";
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const pathname = usePathname();
    const [openMenuId, setOpenMenuId] = useState(null);
    const { isCollapsed, setIsCollapsed } = useLayout();
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { user } = useSelector((state) => state.auth || {});

    useEffect(() => {
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Mobile par navigate karne par sidebar band ho jaye
    useEffect(() => {
        if (isMobile) {
            const timer = setTimeout(() => {
                setIsCollapsed(true);
                setOpenMenuId(null);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [pathname, isMobile, setIsCollapsed]);

    const handleLogout = useCallback(() => {
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
        if (typeof window !== 'undefined') localStorage.removeItem('user');
        window.location.replace("/login");
    }, []);

    const handleprofile = useCallback(() => {
        window.location.replace("/profile");
    }, []);

    const toggleMenu = useCallback((id) => {
        if (isCollapsed) setIsCollapsed(false);
        setOpenMenuId(prev => (prev === id ? null : id));
    }, [isCollapsed, setIsCollapsed]);

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', href: '/', icon: <LayoutDashboard size={20} /> },
        {
            id: 'customers', name: 'Customers', icon: <Users size={20} />,
            subParts: [{ id: 'customer-list', name: 'List', href: '/customer/list' }, { id: 'customer-group', name: 'Group', href: '/customer/group' }]
        },
        { id: 'admin', name: 'Admin', icon: <ShieldCheck size={20} />, subParts: [{ id: 'admin-list', name: 'List', href: '/admin/list' }] },
        { id: 'courses', name: 'Courses', icon: <BookOpen size={20} />, subParts: [{ id: 'courses-list', name: 'List', href: '/courses/list' }] },
        { id: 'transaction', name: 'Transaction', icon: <CreditCard size={20} />, subParts: [{ id: 'transaction-list', name: 'List', href: '/transaction/list' }] },
        {
            id: 'General', name: 'General', icon: <ReceiptText size={20} />,
            subParts: [
                { id: 'blog-link', name: 'Blogs', href: '/blog' },
                { id: 'backlinks-link', name: 'Backlinks', href: '/backlinks' },
                { id: 'banner-link', name: 'Banner', href: '/banners' }
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
        { id: 'Enquiry', name: 'Enquiry', icon: <Mail size={20} />, subParts: [{ id: 'Enquiry-list', name: 'Contacts', href: '/contact' },{
            id:'Enquiry-help', name: 'Enquiries', href: '/enquiries-needhelp'
        }]
     }
    ];

    const filteredMenuItems = useMemo(() => {
        if (!mounted || !user) return [];
        if (user?.role === 'SUPERADMIN') return menuItems;
        return menuItems.filter(item => user?.permissions?.includes(item.id));
    }, [user, menuItems, mounted]);

    if (!mounted) return null;

    return (
        <>
            {/* Mobile Hamburger Button (Fixed Position) */}
            {isMobile && isCollapsed && (
                <button
                    onClick={() => setIsCollapsed(false)}
                    className="fixed top-4 left-4 z-[100] p-3 bg-white shadow-xl rounded-xl border md:hidden"
                >
                    <Menu size={22} className="text-gray-700" />
                </button>
            )}

            <aside className={`
                fixed left-0 top-0 h-screen bg-white z-[95] transition-all duration-300 ease-in-out flex flex-col
                shadow-2xl md:shadow-none md:border-r md:border-gray-100
                ${isMobile ? (!isCollapsed ? 'w-full translate-x-0 p-6' : 'w-0 -translate-x-full overflow-hidden') : (isCollapsed ? 'w-20 p-4' : 'w-64 p-4')}
            `}>
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6 px-2 h-16 flex-shrink-0">
                    {(!isCollapsed || isMobile) && (
                        <div className="flex items-center gap-3 text-primary">
                            <Image src="/assets/logo.png" alt="UrsSkill" width={32} height={32} className="object-contain" priority />
                            <h1 className="text-xl font-bold text-gray-800 tracking-tight">UrsSkill</h1>
                        </div>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`p-2 hover:bg-neutral rounded-lg text-gray-500 transition-all ${isCollapsed && !isMobile ? 'mx-auto' : ''}`}
                    >
                        {isMobile && !isCollapsed ? <X size={24} className="text-gray-700" /> : <Menu size={20} />}
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
                                        className={`w-full flex items-center p-3 rounded-xl text-gray-500 hover:bg-neutral transition-all group ${isCollapsed && !isMobile ? 'justify-center' : 'justify-between'} ${openMenuId === item.id ? 'text-primary' : ''}`}
                                    >
                                        <div className={`flex items-center gap-3 min-w-0 ${isCollapsed && !isMobile ? 'w-full justify-center' : ''}`}>
                                            <span className={`flex justify-center flex-shrink-0 ${isCollapsed && !isMobile ? '' : 'min-w-[24px]'} ${openMenuId === item.id ? 'text-primary' : ''}`}>
                                                {item.icon}
                                            </span>
                                            {(!isCollapsed || isMobile) && <span className="text-sm font-semibold text-gray-700">{item.name}</span>}
                                        </div>
                                        {(!isCollapsed || isMobile) && (
                                            <ChevronDown size={16} className={`transition-transform duration-300 ${openMenuId === item.id ? 'rotate-180 text-primary' : ''}`} />
                                        )}
                                    </button>

                                    {/* Smooth Sub-menu Transition */}
                                    <div className={`
                                        grid transition-all duration-300 ease-in-out
                                        ${((!isCollapsed || isMobile) && openMenuId === item.id) ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'}
                                    `}>
                                        <div className="overflow-hidden">
                                            <div className="ml-9 space-y-1 border-l-2 border-primary/10 pl-4">
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
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`flex items-center p-3 rounded-xl transition-all min-w-0 ${isCollapsed && !isMobile ? 'justify-center' : 'justify-start gap-3'} ${pathname === item.href ? 'bg-primary-light text-black font-bold shadow-sm' : 'text-gray-500 hover:bg-neutral'}`}
                                >
                                    <span className={`flex justify-center flex-shrink-0 ${isCollapsed && !isMobile ? '' : 'min-w-[24px]'}`}>
                                        {item.icon}
                                    </span>
                                    {(!isCollapsed || isMobile) && <span className="text-sm font-semibold">{item.name}</span>}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                        onClick={handleprofile}
                        className={`w-full flex items-center p-3 rounded-xl text-black hover:bg-red-50 transition-all font-bold ${isCollapsed && !isMobile ? 'justify-center' : 'justify-start gap-3'}`}
                    >
                        <User size={20} />
                        {(!isCollapsed || isMobile) && <span className="text-sm">Profile</span>}
                    </button>
                </div>

                {/* Logout Button */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold ${isCollapsed && !isMobile ? 'justify-center' : 'justify-start gap-3'}`}
                    >
                        <LogOut size={20} />
                        {(!isCollapsed || isMobile) && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;