import React from 'react'
import Routes from './Routes'
import Navbar from './Navbar'
import AllProductsListing from './AllProductsListing'

const Main = () => {
  return (
    <div id='main' className='fill-xy column'>
      <Navbar />
      <AllProductsListing />
      <Routes />
    </div>
  )
}

export default Main
