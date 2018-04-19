import React from 'react'
import Routes from './Routes'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AllProductsListing from './AllProductsListing'

const Main = () => {
  return (
    <div className="container-fluid">
      <Navbar />
      <Sidebar />
      <AllProductsListing />
      <Routes />
    </div>
  )
}

export default Main
