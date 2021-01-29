const initialState = {
	slots: []
}
const SlotReducer = (state = initialState, action) => {
	switch(action.type){
		case 'GET_SLOTS': 
			return {
				...state,
				slots: action.payload
			}
		default: 
			return state
	}
}

export default SlotReducer;