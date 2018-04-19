import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleProductListing from './SingleProductListing'
import { getAllProducts } from '../store/allProducts'
import Sidebar from './Sidebar'

class AllProductsListing extends Component {
	async componentDidMount() {
		await this.props.getAllProducts()
	}

	render() {
		const products = this.props.products
		return (
			<div id="all-products-container">
				<Sidebar />
				<div>
					{products.map(product => (
						<SingleProductListing key={product.id} product={product} />
					))}
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ products }) => ({ products })

const mapDispatchToProps = dispatch => ({
	getAllProducts: () => dispatch(getAllProducts())
})

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToProps)(
	AllProductsListing
)

export default ConnectedAllProducts
