// import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// export function middleware(req: Request) {
//     if (req.url.endsWith("/app")) {
//         return NextResponse.redirect(new URL("/app/dashboard", req.url));
//     }
// }

export default auth;
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
