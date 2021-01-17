import {
	createStore, combineReducers, applyMiddleware
} from 'redux'

import ReduxThunk from 'redux-thunk'

import UserReducer from '../REDUCERS/UserReducer'

const configureStore = () => {
	const store = createStore(combineReducers({
		user: UserReducer
	}),applyMiddleware(ReduxThunk))
	return store;
}

export default configureStore;