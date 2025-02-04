import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { axiosInstance } from './lib/axios';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const accessToken = request.cookies.get('accessToken')?.value;

    if (url.pathname === '/' || url.pathname === '/profile') {
        if (accessToken) {
            try {
                const response = await axiosInstance.get(`/job-entry/@me`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                const data = response.data
                if (data.data.is_admin) {
                    url.pathname = '/admin/dashboard/add-batch';
                    return NextResponse.redirect(url);
                }
            } catch (error) {
                url.pathname = '/login';
                return NextResponse.redirect(url);
            }
        } else {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname === '/admin/dashboard/add-batch') {
        if (accessToken) {
            try {
                const response = await axiosInstance.get(`/job-entry/@me`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                const data = response.data
                if (!data.data.is_admin) {
                    url.pathname = '/';
                    return NextResponse.redirect(url);
                }
            } catch (error) {
                url.pathname = '/login';
                return NextResponse.redirect(url);
            }
        } else {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname === '/register' || url.pathname === '/login') {
        if (accessToken) {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname === '/account-active/sent') {
        const token = url.searchParams.get('token');
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

    if (url.pathname === '/forgot-password/sent') {
        const token = url.searchParams.get('token');
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

    if (url.pathname === '/reset-password') {
        const token = url.searchParams.get('token');
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