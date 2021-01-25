import axios from '../../AXIOS_CONFIG/Axios'

export const getQuestions = (contest_id) => {
	return async (dispatch) => {
		const response = await axios.get(`/contest/${contest_id}/questions`)	
	
		if(response.status === 200){
			dispatch({
				type: 'GET_QUESTIONS', payload: response.data.data.questions
			})
		}else{
			throw new Error("Opps! Something went wrong, Please try after sometime.")
		}				
	}
}


export const removeQuestion = (id, constest_id) => {
	return async (dispatch) => {
		try {
			const url = `http://34.204.190.112:6060/questions/${id}?constest_id=${constest_id}` 
			const response = await fetch(url,{
	        	method: 'DELETE',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	}
      		})	

			if(response.status === 200){
				console.log("Response success",await response.json())
			}else{
				console.log("Response failed", await response.json())
			}			
		}catch(error){
			console.log("RESPONSE", error)
		}

		dispatch(getQuestions(constest_id))
	}
}