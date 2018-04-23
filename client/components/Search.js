import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addFilter, removeFilter } from '../store/filters'

class Search extends Component {
  constructor() {
    super()
    this.state = { searchString: 'Enter product name' }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.setState({ searchString: this.props.filters.searchString })
  }

  handleChange(event) {
    event.persist()
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        if (!event.target.value) {
          this.props.removeFilter('searchString')
        }
        this.props.addFilter('searchString', this.state.searchString)
      }
    )
  }
  render() {
    return (
      <form>
        <label>
          <h5>Search</h5>
        </label>
        <input
          type="text"
          name="searchString"
          placeholder="Enter product name"
          value={this.state.searchString}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

const mapStateToProps = ({ filters }) => ({ filters })
const mapDispatchToProps = dispatch => ({
  addFilter: (filterType, filter) => dispatch(addFilter(filterType, filter)),
  removeFilter: filter => dispatch(removeFilter(filter))
})
const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)

export default ConnectedSearch
