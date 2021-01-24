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
		case 'FILTER_CONTESTS':
		console.log("ACTION", action)
			const allContest  = [...state.contests]
			
			const filteredContests = allContest.filter(contest => contest.title.includes(action.payload))
			console.log("filteredContests", filteredContests)
			return {
				...state,
				contests: filteredContests
			}


		default: 
			return state
	}
}

export default ContestReducer;