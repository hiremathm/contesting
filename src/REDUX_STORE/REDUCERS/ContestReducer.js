const initialState = {
	contests: []
}

const ContestReducer = (state =  initialState, action) => {
	switch(action.type){
		case 'GET_CONTESTS':
			const updatedState =  {
				...state,
				contests: action.payload
			}

			return updatedState;
		default: 
			return state
	}
}

export default ContestReducer;