import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { User } from "payload";

export async function middleware(request: NextRequest) {
    console.log("middleware is running");
    const url = new URL(request.url);
    const pathName = url.pathname.toLowerCase();
    const regex = /admin|payload/;
    const pathMatches =
        regex.test(pathName) || regex.test(request.nextUrl.pathname);

    if (!pathMatches) return NextResponse.next();

    const cookieStore = cookies();
    const token = cookieStore.get("payload-token")?.value;

    // Fetch user details
    const meReq = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
        {
            headers: {
                Authorization: `JWT ${token}`,
            },
        }
    );

    const { user }: { user: User } = (await meReq.json()) || {};

    // Check if user does not have the required role
    const userHasNoAdminRole = !user?.roles?.includes("admin");

    if (pathMatches && userHasNoAdminRole) {
        // Redirect to home if conditions are met
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Continue with the normal flow if conditions are not met
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin"],
};