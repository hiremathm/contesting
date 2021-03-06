import {
	createStore, combineReducers, applyMiddleware
} from 'redux'

import ReduxThunk from 'redux-thunk'

import UserReducer from '../REDUCERS/UserReducer'
import ContestReducer from '../REDUCERS/ContestReducer'
import QuestionReducer from '../REDUCERS/QuestionReducer'
import SlotReducer from '../REDUCERS/SlotReducer'
import ReportReducer from '../REDUCERS/ReportReducer'

const configureStore = () => {
	const store = createStore(combineReducers({
		user: UserReducer,
		contests: ContestReducer,
		questions: QuestionReducer,
		slots: SlotReducer,
		reports: ReportReducer
	}),applyMiddleware(ReduxThunk))
	return store;
}

export default configureStore;