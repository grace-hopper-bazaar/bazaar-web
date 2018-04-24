import { expect } from 'chai'
import { getAllProducts } from './allProducts'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunks from 'redux-thunk'
import { createMemoryHistory } from 'history'

const history = createMemoryHistory()
const mockAxios = new MockAdapter(axios)
const middlewares = [thunks.withExtraArgument({ axios, history })]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  const initialState = { products: [] }

  beforeEach(() => {
    //mockAxios.reset()
    store = mockStore(initialState)
  })

  describe('allProducts', () => {
    it('dispatches the GOT PRODUCTS action', async () => {
      const fakeProducts = [{ id: 1 }, { id: 2 }]
      mockAxios.onGet('/api/products').reply(200, fakeProducts)
      await store.dispatch(getAllProducts())
      const [getProductsAction] = store.getActions()
      expect(getProductsAction.type).to.be.equal('GOT_ALL_PRODUCTS')
    })
  })
})
