import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter } from '../store/filters'

class Price extends Component {
  constructor() {
    super()
    this.state = { price: 100 }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({ price: this.props.filters.price })
  }

  handleChange(event) {
    this.setState({ price: event.target.valueAsNumber }, () => {
      return this.props.addFilter('price', this.state.price)
    })
  }

  render() {
    return (
      <form>
        <label className="side-cont">
          <h5>Filter by Price:</h5>
          <h6 className="text-warning">{`Up to $${this.state.price}`}</h6>
        </label>
        <div id="slider-div">
          <h5>$</h5>
          <input
            type="range"
            id="slider"
            name="price"
            max="100"
            min="0"
            step="20"
            onChange={this.handleChange}
            value={this.state.price}
          />
          <h5>$$$$</h5>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ filters }) => ({ filters })
const mapDispatchToProps = dispatch => ({
  addFilter: (filterType, filter) => dispatch(addFilter(filterType, filter))
})
const ConnectedPrice = connect(mapStateToProps, mapDispatchToProps)(Price)

export default ConnectedPrice
