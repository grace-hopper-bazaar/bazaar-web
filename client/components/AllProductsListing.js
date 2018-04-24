import React, { Component } from 'react'
import { connect } from 'react-redux'
import SingleProductListing from './SingleProductListing'
import { getAllProducts } from '../store/allProducts'
import Sidebar from './Sidebar'
import { addCart } from '../store/allCart'

class AllProductsListing extends Component {
  constructor() {
    super()
    this.filterProducts = this.filterProducts.bind(this)
  }

  /* Time complexity of filter function is O(n * m)... can we do this better? */
  filterProducts() {
    const { products, filters } = this.props
    let searchString = filters.searchString
      ? filters.searchString.toLowerCase()
      : ''
    return products.filter(product => {
      if (!product.title.toLowerCase().includes(searchString)) {
        return false
      }
      for (let i = 0; i < product.categories.length; i++) {
        if (filters.category[product.categories[i].name]) {
          break
        } else if (i === product.categories.length - 1) {
          return false
        }
      }
      if (product.price > filters.price) {
        return false
      }
      return true
    })
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
            return <SingleProductListing key={product.id} product={product} addCart={this.props.addCart} />
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ products, filters }) => ({ products, filters })

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts()),
  addCart: (item) => dispatch(addCart(item))
})

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToProps)(
  AllProductsListing
)

export default ConnectedAllProducts
