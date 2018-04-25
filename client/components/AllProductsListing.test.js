import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AllProductsListing } from './AllProductsListing'

const adapter = new Adapter()
const disableLifecycleMethods = true
enzyme.configure({
  adapter,
  disableLifecycleMethods
})

describe('AllProductsListing', () => {
  let lid
  let filters = {
    searchString: '',
    category: {
      'Milk Chocolate': true,
      'Dark Chocolate': true,
      'White Chocolate': true
    },
    price: 100
  }
  const products = [
    {
      id: 1,
      title: 'choc',
      description: 'choc',
      price: 10.0,
      inventory: 1,
      image: 'defaultChocolate.jpg',
      rating: 5,
      categories: [{ name: 'Milk Chocolate' }]
    }
  ]
  it('initially renders loading message', () => {
    lid = shallow(<AllProductsListing products={[]} filters={filters} />)
    expect(lid.find('p').text()).to.equal('No products found.')
    expect(lid.find('SingleProductListing').length).to.equal(0)
  })
  it('loads all products and renders SingleProductListing', () => {
    lid = shallow(<AllProductsListing products={products} filters={filters} />)
    expect(lid.find('SingleProductListing').length).to.be.equal(1)
  })
  it('does not render products that have been filtered', () => {
    filters.category['Milk Chocolate'] = false
    lid = shallow(<AllProductsListing products={products} filters={filters} />)
    expect(lid.find('SingleProductListing').length).to.be.equal(0)
    expect(lid.find('p').text()).to.equal('No products found.')
  })
})
