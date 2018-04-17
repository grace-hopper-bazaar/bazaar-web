import React, { Component } from "react";
import { connect } from "react-redux";
import SingleProductListing from "./SingleProductListing";

export default class AllProductsListing extends Component {
  /*   componentDidMount () {
    this.props.getAllProducts()
  } */

  render() {
    //const products = this.props.products
    const products = [
      {
        id: 1,
        title: 'Product Name1',
        description: 'Product Description',
        price: 25,
        rating: 5,
        imageUrl: 'https://i.imgur.com/r1Tji2T.jpg'
      },
      {
        id: 2,
        title: 'Product Name2',
        description: 'Product Description',
        price: 25,
        rating: 5,
        imageUrl: 'https://i.imgur.com/r1Tji2T.jpg'
      },
      {
        id: 3,
        title: 'Product Name3',
        description: 'Product Description',
        price: 25,
        rating: 5,
        imageUrl: 'https://i.imgur.com/r1Tji2T.jpg'
      }
    ]
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
