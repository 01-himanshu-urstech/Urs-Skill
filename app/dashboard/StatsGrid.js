"use client";
import { Users, BookOpen, Newspaper, Ticket, TrendingUp, Loader2 } from 'lucide-react';
import {
    useGetCustomersQuery,
    useGetCoursesQuery,
    useGetAllBlogsQuery,
    useGetCouponsQuery
} from '../../redux/service/adminApi';
import PermissionGuardian from "../../components/auth/PermissionGuardian";

export default function StatsGrid() {
    //    Fetching multiple APIs to derive stats
    const { data: customers, isLoading: loadCust } = useGetCustomersQuery();
    const { data: courses, isLoading: loadCour } = useGetCoursesQuery();
    const { data: blogs, isLoading: loadBlog } = useGetAllBlogsQuery();
    const { data: coupons, isLoading: loadCoup } = useGetCouponsQuery();

    const isLoading = loadCust || loadCour || loadBlog || loadCoup;

    const stats = [
        {
            title: 'Total Customers',
            value: customers?.data?.customers?.length || 0,
            icon: <Users size={22} />,
            color: 'from-blue-500 to-indigo-600',
            trend: '+12%', // Static for now as no time-series API
            label: 'Registered Users'
        },
        {
            title: 'Live Courses',
            value: courses?.data?.courses?.length || 0,
            icon: <BookOpen size={22} />,
            color: 'from-emerald-500 to-teal-600',
            trend: '+2',
            label: 'Active Curriculum'
        },
        {
            title: 'Published Blogs',
            value: blogs?.data?.blogs?.length || 0,
            icon: <Newspaper size={22} />,
            color: 'from-orange-500 to-amber-600',
            trend: 'New',
            label: 'Articles Online'
        },
        {
            title: 'Active Coupons',
            value: coupons?.data?.coupons?.filter(c => c.status === 'ACTIVE').length || 0,
            icon: <Ticket size={22} />,
            color: 'from-purple-500 to-pink-600',
            trend: 'Live',
            label: 'Promo Rules'
        },
    ];

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
                <div key={idx} className="group relative bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">
                    {/* Glassmorphism Effect */}
                    <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-[0.05] group-hover:scale-150 transition-transform duration-700`} />

                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-xl transform group-hover:rotate-6 transition-transform ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="flex items-center gap-1 text-[10px]      text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                <TrendingUp size={12} /> {stat.trend}
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-3xl      text-gray-800 tracking-tighter mb-1">
                            {stat.value.toString().padStart(2, '0')}
                        </h3>
                        <p className="text-[10px]      text-gray-400 uppercase tracking-[2px]">
                            {stat.title}
                        </p>
                        <p className="text-[9px] text-gray-300 font-bold uppercase mt-2 group-hover:text-gray-400 transition-colors">
                            {stat.label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-gray-100 h-48 animate-pulse shadow-sm">
                    <div className="flex justify-between mb-8">
                        <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
                        <div className="w-12 h-6 bg-gray-50 rounded-full" />
                    </div>
                    <div className="w-20 h-8 bg-gray-100 rounded-lg mb-2" />
                    <div className="w-32 h-3 bg-gray-50 rounded-full" />
                </div>
            ))}
        </div>
    );
}


// "use client";
// import { Users, BookOpen, Newspaper, Ticket, TrendingUp } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import {
//     useGetCustomersQuery,
//     useGetCoursesQuery,
//     useGetAllBlogsQuery,
//     useGetCouponsQuery
// } from '../../redux/service/adminApi';

// export default function StatsGrid() {
//     const { admin, isAuthenticated } = useSelector((state) => state.auth);

//     // ✅ Superadmin check: Agar role SUPERADMIN hai ya permissions mein "ALL" hai
//     const isSuperAdmin = admin?.role === 'SUPERADMIN' || admin?.permissions?.includes('ALL');
//     const perms = admin?.permissions || [];

//     // ✅ Logic: Superadmin ko hamesha TRUE milega
//     const hasPermission = (p) => isSuperAdmin || perms.includes(p);

//     // ✅ API Hooks with fixed keys matching your DB
//     const { data: custData, isLoading: loadCust } = useGetCustomersQuery(undefined, { skip: !hasPermission('customers') });
//     const { data: courData, isLoading: loadCour } = useGetCoursesQuery(undefined, { skip: !hasPermission('courses') });
//     const { data: blogData, isLoading: loadBlog } = useGetAllBlogsQuery(undefined, { skip: !hasPermission('blogs') });
//     const { data: coupData, isLoading: loadCoup } = useGetCouponsQuery(undefined, { skip: !hasPermission('coupons') });

//     const isLoading = (hasPermission('customers') && loadCust) ||
//         (hasPermission('courses') && loadCour) ||
//         (hasPermission('blogs') && loadBlog) ||
//         (hasPermission('coupons') && loadCoup);

//     // ✅ Stats array matching your API response structure
//     const stats = [
//         {
//             show: hasPermission('customers'),
//             title: 'Total Customers',
//             value: custData?.data?.customers?.length || 0,
//             icon: <Users size={22} />,
//             color: 'from-blue-500 to-indigo-600',
//             label: 'Registered Users'
//         },
//         {
//             show: hasPermission('courses'),
//             title: 'Live Courses',
//             value: courData?.data?.courses?.length || 0,
//             icon: <BookOpen size={22} />,
//             color: 'from-emerald-500 to-teal-600',
//             label: 'Active Curriculum'
//         },
//         {
//             show: hasPermission('blogs'),
//             title: 'Published Blogs',
//             value: blogData?.data?.blogs?.length || 0,
//             icon: <Newspaper size={22} />,
//             color: 'from-orange-500 to-amber-600',
//             label: 'Articles Online'
//         },
//         {
//             show: hasPermission('coupons'),
//             title: 'Active Coupons',
//             value: coupData?.data?.coupons?.filter(c => c.status === 'ACTIVE').length || 0,
//             icon: <Ticket size={22} />,
//             color: 'from-purple-500 to-pink-600',
//             label: 'Promo Rules'
//         },
//     ].filter(item => item.show);

//     if (isLoading) return <LoadingSkeleton />;

//     // Agar Superadmin hai phir bhi stats khali hain, toh iska matlab API response structure check karna hoga
//     if (stats.length === 0 && isAuthenticated) return null;

//     return (
//         <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${stats.length} gap-6 mb-10`}>
//             {stats.map((stat, idx) => (
//                 <div key={idx} className="group relative bg-white p-7 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-500/5 hover:shadow-2xl transition-all duration-500 overflow-hidden">
//                     <div className="flex justify-between items-start mb-6">
//                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-xl ${stat.color}`}>
//                             {stat.icon}
//                         </div>
//                     </div>
//                     <div className="relative z-10">
//                         <h3 className="text-3xl font-bold text-gray-800 tracking-tighter mb-1">
//                             {stat.value.toString().padStart(2, '0')}
//                         </h3>
//                         <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[2px]">{stat.title}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// function LoadingSkeleton() {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//             {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-gray-100 h-44 animate-pulse" />
//             ))}
//         </div>
//     );
// }