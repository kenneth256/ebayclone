import Link from 'next/link'
import React from 'react'

const Product = ({product}) => {
  return (
    <>
    <Link  href={`/product/${product.id}`} className='max-w-[200px] p-1.5 border rounded mx-auto border-gray-50 hover:border-gray-200 hover:shadow-xl'>
    {
        product?.url ?  <img className='rounded cursor-pointer' src={product.url+'/190'} /> : null
    }
    <div className='pt-2 px-1'>
    <div className='text-[15px] hover:underline cursor-pointer font-semibold'>  {product?.title}</div>
    <div className='font-extrabold' > £{(product?.price/100).toFixed(2)}</div>
    <div className='relative flex items-center text-center text-[12px] text-gray-500 '>
       <div className='line-through'>£ {((product?.price * 1.2)/100).toFixed(2)} </div>
       <div className='px-2'>-</div>
       <div className='line-through'>20%</div>
    </div>
    </div>
    </Link>
    </>
  )
}

export default Product
