'use client'
import React, { useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import SimilarProduct from '../components/SimilarProduct'
import CartItem from './cartComponent'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/cart'
import useIsLoading from '../hooks/useIsLoading'
import ClientOnly from '../components/clientOnly'

const Cart = () => {
    const router = useRouter();
    const cart = useCart();

    useEffect(() => {
        useIsLoading(true);
        cart.getCart()
        cart.cartTotal()
        useIsLoading(false)
    }, [cart])
       
    const goToCheckout = () => {
        if(!cart.cartTotal) {
            alert("You don't have any items in the cart.")
            return
        }
        router.push('/checkout')

    }
  return (
   <>
   <MainLayout>
    <div className='max-w-[1200px] mx-auto mb-8 min-h-[300px]'>
        <h2 className='text-2xl font-bold my-4'>Shopping Cart</h2>
        <div className='relative flex items-baseline justify-between gap-2'>
            <ClientOnly>
            <div className='w-[65%]'>
                {cart.getCart().map(product => (
                    <CartItem key={product.id} product={product} /> 
                )) }
            
        </div>
            </ClientOnly>
           
        <div id='GoToCheckout' className='md:w-[33%] absolute top-0 right-0 m-2 ' >
            <ClientOnly>
            <div className='bg-white p-4 border'>
                <button onClick={() => goToCheckout()} className='flex items-center mt-4 w-full justify-center bg-blue-600 text-white font-semibold p-3 rounded-full'>
                    Go to checkout
                </button>
                <div className='flex items-center justify-between mt-4 text-sm mb-1'>
                    <div>
                        Items: ({cart.getCart().length})
                    </div>
                    <div>
                        £{(cart.cartTotal()/100).toFixed(2)}
                    </div>

                </div>
                <div className='flex items-center justify-between mb-4 text-sm '>
                    <div>
                        Shipping
                    </div>
                    <div>
                        Free
                    </div>

                </div>
                <div className='border-b border-gray-300' />
                <div className='flex items-center justify-between mt-4 mb-1 text-lg font-semibold'>
                    <div>Subtotal</div>
                    <div>
                    £ {(cart.cartTotal()/100).toFixed(2)}
                    </div>
                </div>

            </div>
            </ClientOnly>

        </div>
        </div>

    </div>
    <SimilarProduct />
   </MainLayout>
   </>
  )
}

export default Cart
