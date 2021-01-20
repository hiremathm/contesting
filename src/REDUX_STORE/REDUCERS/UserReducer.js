import {AUTHENTICATION, LOGOUT} from '../ACTIONS/UserAction'

const initialState = {
	token: null,
	userId: null
}

const userReducer = (state = initialState, action) => {
	switch(action.type){
		case AUTHENTICATION: 
			return {
				token: action.token,
				userId: action.userId
			}
		case LOGOUT: 
			return initialState
		default: 
		return state;
	}
}

export default userReducer;