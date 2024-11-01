'use client'
import React, {useState, useEffect} from 'react'


const ClientOnly = ({children}) => {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => setIsClient(true))
  return (
    <div>
      {isClient ? <div>{children} </div> : null}
    </div>
  )
}

export default ClientOnly
