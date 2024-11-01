'use client'
import Link from 'next/link'
import React, {useState} from 'react'
import {BiLoaderCircle} from 'react-icons/bi'
import {AiOutlineSearch}  from 'react-icons/ai'
import debounce from 'debounce'


const MainHeader = () => {
    const  [items, setItems] = useState(false);
    const [isSearching, setIsSearching] = useState(null)

   const handleSearch = debounce(async (event) => {
    if(event.target.value == '') {
        setItems([])
        return
    }
    setIsSearching(true)
    try {
        const res = await fetch(`/api/products/searchByName/${event.target.value}`)
        const data = await res.json()
        if(data) {
            setItems(data)
            setIsSearching(false)
            return
        }
        setItems([])
        setIsSearching(false)
    } catch (error) {
        console.log(error)
        alert(error)
        
    }
   },  500)

   
  return (
   <>
    <div className='border-b' id='MainHEader'>
        
        <div className='flex items-center justify-between w-full mx-auto max-w-[1200px]'>
            <div className='flex items-center w-full bg-white'>
                <div className='flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 max-auto'>
                <Link href='/' >
                <img src='/images/logo.svg' width='120' />
                </Link>
                <div className='w-full'>
                <div className='relative'>
                    <div className='flex items-center'>
                        <div className='relative flex items-center border-2 border-gray-900 w-full p-2'>
                            <button className='flex items-center'>
                                <AiOutlineSearch size={22} />
                            </button>
                            <input onChange={handleSearch} placeholder='Search Products' type='text' className='pl-3 focus:outline-none text-sm w-full ' />
                        {
                            isSearching ? <BiLoaderCircle className='animate-spin mr-2' size={22} /> : null
                        }
                        {
                            items.length > 0 ? <div className='absolute bg-white max-w-[910] h-auto w-full z- 20 left-0 top-12 border p-1'> 
                                {
                                    items.map(item => (
                                        <div className='p-1' key={item.id}>
                                            <Link href={`/product/${item?.id}`}
                                            className='flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 px-2'
                                            >
                                                <div className='flex items-center'>
                                                    <img  className='rounded-md' width='40' src={item?.url+'/40'} />
                                                    <div className='truncate mt-2'>{item?.title} </div>
                                                </div>
                                                <div className='truncate'>£ {(item?.price/100).toFixed(2)} </div>
                                            </Link>
                                             </div>
                                    ))
                                }
                                </div> : null
                        }
                        </div>
                    </div>

                </div>
                </div>
                </div>
                
            <button className='flex items-center bg-blue-600 px-14 ml-2 text-sm font-semibold text-white p-[11px]'>Search</button>
               <div className='text-xs px-2 hover:text-blue-500 cursor-pointer'>Advanced</div>
            </div>
        
 
        </div>
         </div>
      </>
  )
}

export default MainHeader