import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers'
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
 

 export async function GET() {
     const supabase = createServerComponentClient({cookies })

     try {
        const {data: {user}} = await supabase.auth.getUser();
        if(!user) throw Error()
            const orders = await prisma.orders.findMany({
        where: {user_id: user?.id},
        orderBy: {id: 'desc'},
        include: {
            orderItem: {
                includes: {
                    product: true  
                }
            }
        }

        })
        await prisma.$disconnect();
        return NextResponse.json(orders)
            
     } catch (error) {
        console.log(error)
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', {status: 400})
     }
 }