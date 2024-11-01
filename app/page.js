'use client'

import React, { useEffect, useState } from 'react'
import MainLayout from './layouts/MainLayout'
import CarouselComponent from './components/Carousel'
import Product from './components/Product'
import useIsLoading from './hooks/useIsLoading'

const page = () => {
  const [products, setProducts] = useState([])

  const getProducts = async() =>  {
    useIsLoading(true)
    const response = await fetch('/api/products')
    const data = await response.json()
    console.log(data)
    setProducts(data)
    useIsLoading(false)
  }
  
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <MainLayout>
      <CarouselComponent />
      <div className='max-w-[1200px] mx-auto'>
        <div className='text-2xl font-bold mt-4 px-4'>
          Products
        </div>
        <div className='grid grid-cols-5 gap-4'>
          {
            products.map(product => {
              return (
                <Product key={product.id} product={product} />
              )
            })
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default page
 