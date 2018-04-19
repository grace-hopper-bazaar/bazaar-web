import React from 'react'
import Search from './Search'
import Category from './Category'
import Price from './Price'

const Sidebar = () => {
	return (
		<div className="sidenav">
			<Search />
			<Category />
			<Price />
		</div>
	)
}

export default Sidebar
