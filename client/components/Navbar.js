import React from 'react'
import { Link } from 'react-router-dom'
import { AuthLink, Logout } from './auth'

const Navbar = () => (
	<div id="nav-container">
		<nav className="row center-y">
			<Link to="/">
				<img id="logo" src="/favicon.ico" />
			</Link>
			<Link to="/login">Login</Link>
			<Link to="/signup">Signup</Link>
			<AuthLink to="/home">Home</AuthLink>
			<AuthLink to="/">
				<Logout />
			</AuthLink>
		</nav>
	</div>
)

export default Navbar
