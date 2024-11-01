import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import {NextResponse} from 'next/server'


export  default async function middleWare(req) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({req, res})
    const {data} = await supabase.auth.getSession()

    if(data?.session && req.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    if(!data?.session && (
        req.nextUrl.pathname.startsWith('/CheckOut') || req.nextUrl.pathname.startsWith('/Success') || req.nextUrl.pathname.startsWith('/orders') || req.nextUrl.pathname.startsWith('/address')

    )) {
        return NextResponse.redirect(new URL('/auth', req.url))
    }
    return res
}