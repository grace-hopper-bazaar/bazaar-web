import React from 'react'
import { Link } from 'react-router-dom'
import { AuthLink, Logout } from './auth'

const Navbar = () => (
  <div className="container-nav">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/"><img id="logo" src="/favicon.ico" /></Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/cart">Cart</Link>
      <AuthLink to="/home">Home</AuthLink>
      <AuthLink to="/"><Logout /></AuthLink>
    </nav>
  </div>
)

export default Navbar
