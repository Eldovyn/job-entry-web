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

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const accessToken = request.cookies.get("accessToken")?.value;

    const protectedRoutes = ["/profile", "/admin/dashboard", "/admin/dashboard/profile", "/admin/dashboard/batch"];
    const authPages = ["/register", "/login"];

    const redirectToLogin = () => {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.set("accessToken", "");
        console.warn("Token removed, redirecting to /login");
        return response;
    };

    if (url.pathname === "/form" || url.pathname === "/") {
        if (!accessToken) return redirectToLogin();

        const userData = await getUserData(accessToken);
        if (!userData) return redirectToLogin();
    }

    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        if (!accessToken) return redirectToLogin();

        const userData = await getUserData(accessToken);
        if (!userData) return redirectToLogin();

        if (url.pathname.startsWith("/admin/dashboard") && !userData.is_admin) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    }

    if (authPages.includes(url.pathname) && accessToken) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
