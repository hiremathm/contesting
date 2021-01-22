import axios from '../../AXIOS_CONFIG/Axios'

export const getContests = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get('/contests')	
			if(response.status === 200){
				dispatch({
					type: 'GET_CONTESTS', payload: response.data.data.items
				})
			}else{
				throw new Error("Opps! Something went wrong.")
			}			
		}catch(error){
			throw new Error(error.message)
		}
	}
}


export const postContest = (body) => {
	return async (dispatch) => {
		try {
			const url = '/contests' 
			const response = await axios.post(url, {body: body })	
			if(response.status === 200){
				// dispatch({
				// 	type: 'GET_CONTESTS', payload: response.data.data.items
				// })

				console.log("RESPONSE", response)
			}else{
				console.log("Opps! Something went wrong.")
			}			

			console.log("body ", body)
		}catch(error){
			console.log(error.message)
		}
	}
}