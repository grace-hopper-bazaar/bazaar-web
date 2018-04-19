import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleProductListing from './SingleProductListing'
import { getAllProducts } from '../store/allProducts'
import Sidebar from './Sidebar'

class AllProductsListing extends Component {
	constructor() {
		super()
		this.filterProducts = this.filterProducts.bind(this)
	}

	filterProducts() {
		const { products, filters } = this.props
		let filteredProducts = products
		if (filters.searchString !== '') {
			filteredProducts = products.filter(product =>
				product.title.toLowerCase().includes(filters.searchString)
			)
		}
		return filteredProducts
	}

	async componentDidMount() {
		await this.props.getAllProducts()
	}

	render() {
		const products = this.filterProducts()
		return (
			<div id="all-products-container">
				<Sidebar />
				<div>
					{products.map(product => {
						return <SingleProductListing key={product.id} product={product} />
					})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ products, filters }) => ({ products, filters })

const mapDispatchToProps = dispatch => ({
	getAllProducts: () => dispatch(getAllProducts())
})

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToProps)(
	AllProductsListing
)

export default ConnectedAllProducts
