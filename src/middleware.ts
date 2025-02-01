import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { axiosInstance } from './lib/axios';

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

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

    return NextResponse.next();
}