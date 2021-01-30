const initialState = {
	reports: []
}
const ReportReducer = (state = initialState, action) => {
	switch(action.type){
		case 'SET_REPORTS': 
			return {
				...state,
				reports: action.payload
			}
		case 'GET_REPORTS':
			return {...state}
		default: 
			return state
	}
}

export default ReportReducer;