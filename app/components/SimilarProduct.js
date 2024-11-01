'use client'
import React, {useEffect, useState} from 'react'
import Product from './Product'
import { BiLoader } from 'react-icons/bi'


const SimilarProduct = () => {
   const  [similarProducts, setSimilarProducts] = useState([])
   
   const getSimilarProducts = async() => {
  
    try {
      const response = await fetch('/api/products/get-random')
      const data = await response.json();
      if(data) {
        setSimilarProducts(data)
        return
      }
      setSimilarProducts([])
     
    } catch (error) {
      console.error(error)
      alert(error)
      
    }
   }

   useEffect(() => {
    getSimilarProducts()
   }, [])

  return (
    <>
      <div>
        <div className='border-b py-1 max-w-[1200px] mx-auto '/>
        <div className='max-w-[1200px] mx-auto '>
            <div className='font-bold text-2xl py-2 mt-4'>
                Similar Products
            </div>
            {
               similarProducts.length > 0 ? (
                <div className='grid grid-cols-5 gap-4'>
                    {
                        similarProducts.map(product => (
                            <Product  key={product.id} product={product} />
                        ))
                    }
                </div>
               ) : <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center gap-4 font-semibold '>
                    <BiLoader size={30} className='text-blue-400 animate-spin' />
                    Loading Products......
                    </div>

               </div>
            }
        </div>
      </div>
    </>
  )
}

export default SimilarProduct
