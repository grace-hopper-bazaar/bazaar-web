// ACTION TYPES

const ADD_FILTER = 'ADD_FILTER'
const REMOVE_FILTER = 'REMOVE_FILTER'
const RESET_FILTERS = 'RESET_FILTERS'

// INITIAL STATE
const initialFilters = {
  searchString: '',
  category: {
    'Milk Chocolate': true,
    'Dark Chocolate': true,
    'White Chocolate': true
  },
  price: 100
}

// ACTION CREATORS

export const addFilter = (filterType, filter) => {
  return { type: ADD_FILTER, filterType, filter }
}

export const removeFilter = (filterType, filter) => {
  return { type: REMOVE_FILTER, filterType, filter }
}

export const resetFilters = () => {
  return { type: RESET_FILTERS }
}

//REDUCER
export default (state = initialFilters, action) => {
  switch (action.type) {
    case REMOVE_FILTER:
      return { ...state, [action.filterType]: '' }
    case ADD_FILTER:
      return { ...state, [action.filterType]: action.filter }
    case RESET_FILTERS:
      return initialFilters
    default:
      return state
  }
}
