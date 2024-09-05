import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
 const path=request.nextUrl.pathname

//  const publicPaths=['/singup','/login']
//  const isPublicPath=publicPaths.includes(path)

console.log('path---',path)

 const isPublicPath= path==='/signup' || '/login'
 const token=request.cookies.get('token')?.value || ""

 console.log('isPublicPath---',isPublicPath)
 console.log('token---',token)

 if(isPublicPath&&token){
    return NextResponse.redirect(new URL('/',request.nextUrl))
 }

 if(!isPublicPath&& !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
 }
}
    
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    "/profile"
  ],
}