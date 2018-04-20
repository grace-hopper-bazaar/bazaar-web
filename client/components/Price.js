import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter } from '../store/filters'

class Price extends Component {
	constructor() {
		super()
		this.state = { price: 0 }
	}

	render() {
		return (
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
		)
	}
}

const mapStateToProps = ({ filters }) => ({ filters })
const mapDispatchToProps = dispatch => ({
	addFilter: filter => dispatch(addFilter(filter)),
	removeFilter: filter => dispatch(removeFilter(filter))
})
const ConnectedPrice = connect(mapStateToProps, mapDispatchToProps)(Price)

export default ConnectedPrice
