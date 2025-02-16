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

    if (url.pathname === "/form") {
        if (!accessToken) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        const userData = await getUserData(accessToken);
        if (!userData) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        const q = url.searchParams.get("q") || "";

        const formData = await getForm(accessToken, q);
        if (!formData) {
            url.search = "";
            url.pathname = userData.is_admin ? "/admin/dashboard/batch" : "/";
            return NextResponse.redirect(url);
        }
    }

    if (url.pathname === "/") {
        if (!accessToken) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        const userData = await getUserData(accessToken);
        if (!userData) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
    }

    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        if (!accessToken) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        const userData = await getUserData(accessToken);
        if (!userData) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        if (url.pathname.startsWith("/admin/dashboard") && !userData.is_admin) {
            url.pathname = "/";
            return NextResponse.redirect(url);
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
