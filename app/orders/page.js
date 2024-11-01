"use client";

import React, {useState} from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";
import { useUser } from "../context/user";
import { toast } from "react-toastify";
import useIsLoading from "../hooks/useIsLoading";
import { useEffect } from "react";
import moment from "moment/moment";

const Page = () => {
  const user = useUser()
  const [orders, setOrders] = useState([])


  const getOrder = async () => {
    try {
      if(!user && !user.id) {
        return
      }
      const response = await fetch("/api/orders")
      const result = await response.json();
      setOrders(result)
      useIsLoading(false)
    } catch (error) {
      toast.error('something went wrong!', {autoClose: 3000})
      useIsLoading(false)
    }
  }
useEffect(()=> {
  useIsLoading(true)
  getOrder()
},[user])

  return (
    <>
      <MainLayout>
        <div className="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
          <div className="bg-white w-full p-6 min-h-[150x]">
            <div className="flex items-center text-xl ">
                <CiDeliveryTruck className="text-green-400" size={35} />
                <span className="font-bold">Orders</span>
            </div>
            {
                orders.length < 1 ? (<div className="flex items-center justify-center">You have no order history </div>) : null
            }
            {
                orders.map(order => (
                    <div key={order?.id} className="text-sm pl-[50px] ">
                         <div className="border-b py-1">
                            <div className="pt-2">
                                 <span className="font-bold mr-2 ">
                                    Stripe ID: 
                                 </span>
                                 {order?.stripe_Id}
                                </div>
                                <div className="pt-2">
                                 <span className="font-bold mr-2 ">
                                    Delivery Address: 
                                 </span>
                                  {order?.name}, {order?.address}, {order?.zipcode},
                                   {order?.city}, {order?.country}
                                </div>

                                <div className="pt-2">
                                  <span>Total: </span>
                                  £ {
                                    order?.total/100
                                  }
                                  </div>
                                  <div className="pt-2">
                                  <span>Order Created: </span>
                                  {moment(order?.created_at).calender()
                                    
                                  }
                                  </div>
                                  <div className="pt-2">
                                  <span>Delivery Time: </span>
                                  {moment(order?.created_at).add(3, 'days').calendar()
                                    
                                  }
                                  </div>
                               
                                 <div className="flex items-center gap-4 ">
                                    {
                                        order?.orderItem.map(item => (
                                        <div key={item?.id} className="flex items-center"> 
                                        <Link href={`/product/${item.product_id}`} className='py-1 hover:underline text-blue-500 font-bold' >
                                         <img className="rounded" width='120' src={item.product.url+'/120'} />
                                         {item.product.title}
                                        </Link>
                                        </div>    
                                        ) )
                                    }
                                </div>
                            </div>
                        </div>
                ))
            }
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Page;
