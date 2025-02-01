import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { axiosInstance } from './lib/axios';

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    if (pathname === '/login' || pathname === '/register') {
        const accessToken = request.cookies.get('accessToken');
        if (accessToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (pathname === '/' || pathname == '/profile') {
        const accessToken = request.cookies.get('accessToken');
        if (!accessToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (pathname === '/account-active/sent') {
        const token = searchParams.get('token');
        if (token) {
            try {
                const response = await axiosInstance.get(`/job-entry/account-active/page-verification`, { params: { token } });
            } catch (error) {
                return NextResponse.redirect(new URL('/register', request.url));
            }
        } else {
            return NextResponse.redirect(new URL('/register', request.url));
        }
    }

    if (pathname === '/forgot-password/sent') {
        const token = searchParams.get('token');
        if (token) {
            try {
                const response = await axiosInstance.get(`/job-entry/page/reset-password`, { params: { token } });
            } catch (error) {
                return NextResponse.redirect(new URL('/forgot-password', request.url));
            }
        } else {
            return NextResponse.redirect(new URL('/forgot-password', request.url));
        }
    }

    if (pathname === '/reset-password') {
        const token = searchParams.get('token');
        if (token) {
            try {
                const response = await axiosInstance.get(`/job-entry/reset-password`, { params: { token } });
            } catch (error) {
                return NextResponse.redirect(new URL('/forgot-password', request.url));
            }
        } else {
            return NextResponse.redirect(new URL('/forgot-password', request.url));
        }
    }

    return NextResponse.next();
}