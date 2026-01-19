// middleware.js (Root directory mein honi chahiye)
import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('auth-token');
    const { pathname } = request.nextUrl;

    // 1. Agar user root '/' par hai aur token nahi hai -> Login par bhejo
    if (pathname === '/') {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Agar token hai, toh Next.js app/page.js dikhayega
    }

    // 2. Agar token nahi hai aur user dashboard pages par hai -> Login par bhejo
    if (!token && pathname !== '/login' && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 3. Agar token hai aur user login page par jana chahta hai -> Dashboard bhejo
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    // Matcher ensure karta hai ki static files block na hon
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};