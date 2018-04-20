// ACTION TYPES

const ADD_FILTER = 'ADD_FILTER'
const REMOVE_FILTER = 'REMOVE_FILTER'
const RESET_FILTERS = 'RESET_FILTERS'

// INITIAL STATE
const initialFilters = {
	searchString: '',
	category: '',
	price: { min: 0, max: 1000 }
}

// ACTION CREATORS

export const addFilter = filter => {
	return { type: ADD_FILTER, filter }
}

export const removeFilter = filter => {
	return { type: REMOVE_FILTER, filter }
}

export const resetFilters = () => {
	return { type: RESET_FILTERS }
}

//REDUCER
export default (state = initialFilters, action) => {
	switch (action.type) {
		case REMOVE_FILTER:
			return { ...state, [action.filter]: '' }
		case ADD_FILTER:
			return { ...state, searchString: action.filter.toLowerCase() }
		case RESET_FILTERS:
			return initialFilters
		default:
			return state
	}
}
