import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../Components/Loading/Loading'

const HomePage = () => {

      const [loading,setLoading]= useState(true)


    useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000) // 2 seconds fake loading

    return () => clearTimeout(timer) // cleanup
  }, [])


    if(loading) return <Loading/>
    
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default HomePage
