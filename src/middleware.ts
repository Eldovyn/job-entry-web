import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "./lib/axios";

async function getUserData(accessToken: string) {
    try {
        const response = await axiosInstance.get(`/job-entry/@me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data?.data;
    } catch (error) {
        return null;
    }
}

async function getForm(accessToken: string, q: string) {
    try {
        const response = await axiosInstance.get(`/job-entry/form`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { q },
        });
        return response.data?.data;
    } catch (error) {
        return null;
    }
}

async function getFormIsSubmitted(accessToken: string, q: string) {
    try {
        const response = await axiosInstance.get(`/job-entry/form/is-submitted`, {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: { q },
        });
        return response.data?.data;
    } catch (error) {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const accessToken = request.cookies.get("accessToken")?.value;

    if (url.pathname.startsWith('/admin/dashboard') || url.pathname === '/form' || url.pathname === '/form/is-submitted' || url.pathname === '/profile/user' || url.pathname === '/') {
        if (!accessToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const userData = await getUserData(accessToken);
        if (!userData) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (url.pathname === "/" || url.pathname === "/profile/user") {
            if (userData.is_admin) {
                return NextResponse.redirect(new URL("/admin/dashboard/add-batch", request.url));
            }
        }

        if (url.pathname.startsWith("/admin/dashboard")) {
            if (!userData.is_admin) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        if (url.pathname === "/form") {
            const q = url.searchParams.get("q");
            const form = await getForm(accessToken, q || "");
            const isSubmitted = await getFormIsSubmitted(accessToken, q || "");
            if (isSubmitted && form) {
                return NextResponse.redirect(new URL(`/form/is-submitted?q=${isSubmitted.batch_form_id}`, request.url));
            }
            if (!form) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }

        if (url.pathname === "/form/is-submitted") {
            const q = url.searchParams.get("q");
            const form = await getFormIsSubmitted(accessToken, q || "");
            if (!form) {
                return NextResponse.redirect(new URL("/", request.url));
            }
        }
        return NextResponse.next();
    }

    if (url.pathname === '/login' || url.pathname === '/register') {
        if (accessToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }
}