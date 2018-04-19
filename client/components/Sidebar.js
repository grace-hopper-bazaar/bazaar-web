import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterProductsByName } from '../store/allProducts'

class Sidebar extends Component {
	constructor() {
		super()
		this.state = {
			searchProduct: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.filterProductsByName(this.state.searchProduct)
		console.log('products: ', this.props.products)
	}

	render() {
		return (
			<div className="sidenav">
				<section>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="searchProduct">
							<h5>Search</h5>
						</label>
						<input
							type="text"
							name="searchProduct"
							placeholder="Enter product name"
							onChange={this.handleChange}
						/>
						<button className="btn btn-primary" type="submit">
							Submit
						</button>
					</form>
				</section>

				<section>
					<form>
						<label htmlFor="filterByCategory">
							<h5>Filter by Category</h5>
						</label>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="defaultCheck1"
							/>
							<label className="form-check-label">Milk Chocolate</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="defaultCheck2"
							/>
							<label className="form-check-label">Dark Chocolate</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="defaultCheck3"
							/>
							<label className="form-check-label">White Chocolate</label>
						</div>
					</form>
				</section>
				<section>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="filterByPrice">
							<h5>Filter by Price</h5>
						</label>
						<input
							type="text"
							name="filterByPrice"
							placeholder="Min Price"
							onChange={this.handleChange}
						/>
						<input
							type="text"
							name="filterByPrice"
							placeholder="Max Price"
							onChange={this.handleChange}
						/>
						<button className="btn btn-primary" type="submit">
							Submit
						</button>
					</form>
				</section>
			</div>
		)
	}
}

const mapStateToProps = ({ products }) => ({ products })

const mapDispatchToProps = dispatch => ({
	filterProductsByName: searchString =>
		dispatch(filterProductsByName(searchString))
})

const ConnectedSideBar = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

export default ConnectedSideBar
