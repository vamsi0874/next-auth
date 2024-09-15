

// import NextAuth from "next-auth"
// import authConfig from "./auth.config"

// import { 
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   publicRoutes,
//   authRoutes 
// } from '@/routes'


// const { auth } = NextAuth(authConfig)

//  export default auth((req) =>{
//   const { nextUrl } = req
//   const isLoggedIn = !!req.auth
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  
//   if (isApiAuthRoute) {
//     return
//   }

//   // If the user is logged in and trying to access the login page, redirect them
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
//     }
//     return
//   }

//   // If the user is not logged in and trying to access a non-public route, redirect to login
  
//   if (!isLoggedIn && !isPublicRoute) {

//     let callbackUrl = nextUrl.pathname
//     if(nextUrl.search){
//       callbackUrl+= nextUrl.search
//     }

//     const encodedCallbackUrl = encodeURIComponent(callbackUrl)
//     return Response.redirect(new URL(`/auth/login?${encodedCallbackUrl}`, nextUrl))
//   }
  

//   return
// })

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//   ],
// }

// import { NextResponse } from "next/server";
// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

// import { 
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   publicRoutes,
//   authRoutes 
// } from '@/routes';

// const authMiddleware = async (req:any) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req.auth; // Detecting login status
//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   console.log("User Authentication Status:", isLoggedIn); // Debugging login status

//   // Allow access to API auth routes without restrictions
//   if (isApiAuthRoute) {
//     return NextResponse.next();
//   }

//   // Prevent redirect loop for authenticated users accessing login pages
//   if (isAuthRoute && isLoggedIn) {
//     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//   }

//   // If not logged in and trying to access a protected route
//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }
//     const encodedCallbackUrl = encodeURIComponent(callbackUrl);

//     // Avoid multiple redirects to login page
//     if (nextUrl.pathname === '/auth/login') {
//       return NextResponse.next(); // Already on login page, no need to redirect again
//     }

//     return NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
//     );
//   }

//   // Allow access to public or authenticated routes
//   return NextResponse.next();
// };

// export default authMiddleware;

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//   ],
// };
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes
} from '@/routes';

// Middleware function
export async function middleware(req: any) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  console.log("User Authentication Status:", isLoggedIn); // Debugging login status

  // Allow access to API auth routes without restrictions
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from login pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/settings', req.url)); // Redirect to /settings after login
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', req.url);
    if (nextUrl.search) {
      loginUrl.search = nextUrl.search;
    }
    if (nextUrl.pathname === '/auth/login') {
      return NextResponse.next(); // Prevent redirect loop on login page
    }
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to public or authenticated routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
