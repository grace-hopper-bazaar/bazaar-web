import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter } from '../store/filters'

class Category extends Component {
	constructor() {
		super()
		this.state = {
			category: ''
		}
	}
	render() {
		return (
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
		)
	}
}

const mapStateToProps = ({ filters }) => ({ filters })
const mapDispatchToProps = dispatch => ({
	addFilter: filter => dispatch(addFilter(filter)),
	removeFilter: filter => dispatch(removeFilter(filter))
})
const ConnectedCategory = connect(mapStateToProps, mapDispatchToProps)(Category)

export default ConnectedCategory
