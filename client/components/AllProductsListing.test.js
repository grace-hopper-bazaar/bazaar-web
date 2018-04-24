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
  it('initially renders loading message', () => {
    const lid = shallow(
      <AllProductsListing
        products={[]}
        filters={{
          searchString: '',
          category: {
            'Milk Chocolate': true,
            'Dark Chocolate': true,
            'White Chocolate': true
          },
          price: 100
        }}
      />
    )
    expect(lid.find('p').text()).to.equal('No products found.')
    expect(lid.find('SingleProductListing').length).to.equal(0)
  })
})
