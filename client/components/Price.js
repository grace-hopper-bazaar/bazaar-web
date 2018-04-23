import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter } from '../store/filters'

class Price extends Component {
  constructor() {
    super()
    this.state = { price: 100 }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    event.persist()
    await this.setState({ price: event.target.valueAsNumber })
    this.props.addFilter('price', this.state.price)
  }

  render() {
    return (
      <form>
        <label>
          <h5>Filter by Price:</h5>
          <h6>{`Up to $${this.state.price}`}</h6>
        </label>
        <div id="slider-div">
          $1{' '}
          <input
            type="range"
            name="price"
            max="100"
            min="0"
            step="20"
            onChange={this.handleChange}
            value={this.state.price}
          />{' '}
          $100
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
