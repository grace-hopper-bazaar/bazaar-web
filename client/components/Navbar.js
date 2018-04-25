import React from 'react'
import { Link } from 'react-router-dom'
import { AuthLink, Logout } from './auth'
import { connect } from 'react-redux'

const Navbar = props => {
  console.log(props)
  return (
    <div className="container-nav">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src="defaultChocolate.jpg" id="logo" />
        <Link to="/">
          <span id="store-name">Chocolate Bazaar</span>
        </Link>
        <span id="nav-right">
          {!props.user.id ? (
            <span>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </span>
          ) : (
            <span>Welcome, {props.user.email}!</span>
          )}
          <AuthLink to="/home">Home</AuthLink>
          <AuthLink to="/">
            <Logout />
          </AuthLink>
        </span>
      </nav>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({ user })

const ConnectedNavbar = connect(mapStateToProps)(Navbar)

export default ConnectedNavbar
