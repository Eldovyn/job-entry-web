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

const getAccountActivePage = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/job-entry/account-active/page-verification`, {
            headers: { "Content-Type": "application/json" }, params: { token }
        });
        return response.data?.data;
    } catch (error) {
        return null;
    }
}

const getAccountActiveEmail = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/job-entry/account-active/validation/email-verification`, {
            headers: { "Content-Type": "application/json" }, params: { token }
        });
        return response.data?.data;
    } catch (error) {
        return null;
    }
}

const getForgotPasswordSent = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/job-entry/forgot-password/sent`, {
            headers: { "Content-Type": "application/json" }, params: { token }
        });
        return response.data?.data;
    } catch (error) {
        return null;
    }
}

const getResetPassword = async (token: string) => {
    try {
        const response = await axiosInstance.get(`/job-entry/reset-password`, {
            headers: { "Content-Type": "application/json" }, params: { token }
        });
        return response.data?.data;
    } catch (error) {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const accessToken = request.cookies.get("accessToken")?.value;

    if (url.pathname === '/account-active' || url.pathname === '/account-active/sent') {
        const token = url.searchParams.get("token");
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (url.pathname === '/account-active/sent') {
            const getAccountActive = await getAccountActivePage(token || "");
            if (!getAccountActive) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        if (url.pathname === '/account-active') {
            const getAccountActive = await getAccountActiveEmail(token || "");
            if (!getAccountActive) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }
    }

    if (url.pathname === '/forgot-password/sent' || url.pathname === '/reset-password') {
        const token = url.searchParams.get("token");
        if (!token) {
            return NextResponse.redirect(new URL("/forgot-password", request.url));
        }

        if (url.pathname === '/reset-password') {
            const data = await getResetPassword(token || "");
            if (!data) {
                return NextResponse.redirect(new URL("/forgot-password", request.url));
            }
        }

        if (url.pathname === '/forgot-password/sent') {
            const data = await getForgotPasswordSent(token || "");
            if (!data) {
                return NextResponse.redirect(new URL("/forgot-password", request.url));
            }
        }
    }

    if (url.pathname.startsWith('/admin/dashboard') || url.pathname === '/form' || url.pathname === '/form/is-submitted' || url.pathname === '/profile/user' || url.pathname === '/') {
        if (!accessToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const userData = await getUserData(accessToken);
        if (!userData) {
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("accessToken");
            return response;
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