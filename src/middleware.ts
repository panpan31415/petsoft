import { NextResponse } from "next/server";

export function middleware(req: Request) {
    console.log("url", req.url);
    return NextResponse.next();
}
