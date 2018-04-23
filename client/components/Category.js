import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter } from '../store/filters'

class Category extends Component {
  constructor() {
    super()
    this.state = {
      category: {
        'Milk Chocolate': true,
        'Dark Chocolate': true,
        'White Chocolate': true
      }
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({ category: this.props.filters.category })
  }

  handleChange(event) {
    const target = event.target
    const value = target.checked
    const name = target.name
    const oldState = this.state.category

    this.setState({ category: { ...oldState, [name]: value } }, state => {
      return this.props.addFilter('category', state.category)
    })
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
            id="defaultCheck1"
            name="Milk Chocolate"
            checked={this.state.category['Milk Chocolate']}
            onChange={this.handleChange}
          />
          <label className="form-check-label">Milk Chocolate</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="defaultCheck2"
            name="Dark Chocolate"
            checked={this.state.category['Dark Chocolate']}
            onChange={this.handleChange}
          />
          <label className="form-check-label">Dark Chocolate</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="defaultCheck3"
            name="White Chocolate"
            checked={this.state.category['White Chocolate']}
            onChange={this.handleChange}
          />
          <label className="form-check-label">White Chocolate</label>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ filters }) => ({ filters })
const mapDispatchToProps = dispatch => ({
  addFilter: (filterType, filter) => dispatch(addFilter(filterType, filter)),
  removeFilter: filter => dispatch(removeFilter(filter))
})
const ConnectedCategory = connect(mapStateToProps, mapDispatchToProps)(Category)

export default ConnectedCategory
