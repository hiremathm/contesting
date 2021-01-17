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