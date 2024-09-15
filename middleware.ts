

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

import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { 
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes 
} from '@/routes';

const authMiddleware = async (req:any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow access to API auth routes without restrictions
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Redirect logged-in users away from the login page
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Allow access to public routes or authenticated routes
  return NextResponse.next();
};

export default authMiddleware;

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
