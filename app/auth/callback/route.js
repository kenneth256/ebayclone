import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}
 

 export async function POST(req) {
     const supabase = createServerComponentClient({cookies })

     try {
        const {data: {user}} = await supabase.auth.getUser();
        if(!user) throw Error()
            const body = await req.json()
            const res = await prisma.addresses.create({
                data: {
                    user_id: user?.id,
                    name: body.name,
                    addresses: body.address,
                    zipcode: body.zipcode,
                    city: body.city,
                    country: body.country
                }
            })

     } catch (error) {
        console.log(error)
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', {status: 400})
     }
 }