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
			const url = 'http://34.204.190.112:6060/contests' 
			const response = await fetch(url,{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	},
		        body: JSON.stringify({
		          	contest: body
		        })
      		})	
			if(response.status === 200){
				console.log("Response in success",await response.json())
			}else{
				console.log("Response failed", await response.json())
			}			
			console.log("body",body)
		}catch(error){
			console.log("RESPONSE", error)
		}
	}
}

export const removeContest = (id) => {
	return async (dispatch) => {
		try {
			const url = `http://34.204.190.112:6060/contests/${id}` 
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

		dispatch(getContests())
	}
}