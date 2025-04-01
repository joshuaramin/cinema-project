import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const apkey: any = process.env.NEXT_PUBLIC_X_API_KEY;
  const authToken = req.cookies.get("access_token");

  const requestHeaders = new Headers(req.headers);

  requestHeaders.set("x-api-key", apkey);


  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })


  if (!authToken) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }


  req.headers.set('x-api-key', apkey)

  return response

}


export const config = {
  matcher: '/central/:path*'
}