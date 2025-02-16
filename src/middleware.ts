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

    const protectedRoutes = ["/profile", "/admin/dashboard", "/admin/dashboard/profile", "/admin/dashboard/batch"];
    const authPages = ["/register", "/login"];
    const tokenRequiredRoutes = {
        "/account-active": "/register",
        "/account-active/sent": "/register",
        "/forgot-password/sent": "/forgot-password",
        "/reset-password": "/forgot-password",
    };

    const redirectToLogin = () => {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.set("accessToken", "");
        return response;
    };

    if (!accessToken) return redirectToLogin();

    const userData = await getUserData(accessToken);
    if (!userData) return redirectToLogin();

    if (url.pathname === "/") {
        if (userData.is_admin) {
            return NextResponse.redirect(new URL("/admin/dashboard/add-batch", request.url));
        }
        return NextResponse.next();
    }

    if (url.pathname === "/form") {
        const q = url.searchParams.get("q");

        if (!q) return NextResponse.redirect(new URL("/", request.url));

        const formIsSubmitted = await getFormIsSubmitted(accessToken, q);
        if (formIsSubmitted) {
            return NextResponse.redirect(new URL(`/form/is-submitted?q=${q}`, request.url));
        }

        return NextResponse.next();
    }

    if (url.pathname === "/form/is-submitted") {
        const q = url.searchParams.get("q");

        if (!q) return NextResponse.redirect(new URL("/", request.url));

        const formIsSubmitted = await getFormIsSubmitted(accessToken, q);

        if (!formIsSubmitted) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    }

    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        if (url.pathname.startsWith("/admin/dashboard/add-batch") && !userData.is_admin) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    if (authPages.includes(url.pathname) && accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    for (const [route, fallback] of Object.entries(tokenRequiredRoutes)) {
        if (url.pathname === route) {
            const token = url.searchParams.get("token");
            if (!token) {
                return NextResponse.redirect(new URL(fallback, request.url));
            }

            try {
                await axiosInstance.get(`/job-entry${route.replace("/account-active", "/account-active/email-verification")}`, {
                    params: { token },
                });
            } catch (error) {
                return NextResponse.redirect(new URL(fallback, request.url));
            }
        }
    }

    return NextResponse.next();
}
