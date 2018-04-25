import { expect } from 'chai'
import { addFilter, removeFilter, resetFilters } from './filters'
import { mockStore, history } from './testConfig'

describe('filter action creators', () => {
  let store
  const initialState = {
    searchString: '',
    category: {
      'Milk Chocolate': true,
      'Dark Chocolate': true,
      'White Chocolate': true
    },
    price: 100
  }

  beforeEach(() => {
    store = mockStore(initialState)
  })

  describe('addFilter', () => {
    it('dispatches the ADD FILTER action', async () => {
      await store.dispatch(addFilter('price, 50'))
      const [getFilterAction] = store.getActions()
      expect(getFilterAction.type).to.be.equal('ADD_FILTER')
    })
  })
})
