const initialState = {
	questions: []
}

const QuestionReducer = (state =  initialState, action) => {
	switch(action.type){
		case 'GET_QUESTIONS':
			const updatedState =  {
				...state,
				questions: action.payload
			}

			return updatedState;
		case 'FILTER_QUESTIONS':
			const allContest  = [...state.contests]
			
			const filteredQuestions = allContest.filter(contest => contest.title.includes(action.payload))
			return {
				...state,
				questions: filteredQuestions
			}
		default: 
			return state
	}
}

export default QuestionReducer;