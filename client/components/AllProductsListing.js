import React, { Component } from "react"
import { connect } from "react-redux"
import SingleProductListing from "./SingleProductListing"
import axios from 'axios'

export default class AllProductsListing extends Component {
  constructor() {
    super()
    this.state = {
      products: []
    }
  }

  async componentDidMount () {
    // this.props.getAllProducts()
    const {data} = await axios.get('/api/products')
     this.setState({
       products: data
     })
  }

  render() {
    //const products = this.props.products
    console.log(this.state.products)
    const products = this.state.products
    return (
      <div>
        {
          products.map(product => (
            <SingleProductListing key={product.id} product={product} />
          ))
        }

    </div>
    )

  }
}

/* const mapStateToProps = (state) => (
  {
    products: state.products
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    getAllProducts: () => dispatch(getAllProducts())
  }
)

const ConnectedAllProducts = connect(mapStateToProps, mapDispatchToProps)(AllProductsListing);
 */
