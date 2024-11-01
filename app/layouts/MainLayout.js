'use client'
import React, { useEffect, useState } from 'react'
import TopMenu from './components/TopMenu'
import MainHeader from './components/MainHeader'
import SubMenu from './components/Submenu'
import Footer from './components/Footer'
import Loading from '../components/loading'

const MainLayout = ({children}) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() =>{
    window.addEventListener("storage", function () {
      let res = localStorage.getItem('isLoading')
      res === 'false' ? setIsLoading(false) : setIsLoading(true)
    })
  })

  return (
    <div className='min-w-[1050px] max-w-[1300px] mx-auto' id='MainLayout' >
      {isLoading ? <Loading /> : <div></div>}
        <TopMenu />
        <MainHeader />
        <SubMenu />

        {children}

        <Footer />
    </div>
  )
}

export default MainLayout
