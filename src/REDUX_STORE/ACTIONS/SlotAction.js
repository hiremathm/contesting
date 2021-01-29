import axios from '../../AXIOS_CONFIG/Axios'

export const getSlots = () => {
	return async (dispatch) => {
		const response = await axios.get(`/slots`)	
		
		if(response.status === 200){
			dispatch({
				type: 'GET_SLOTS', payload: response.data.data.items
			})
		}else{
			throw new Error("Opps! Something went wrong, Please try after sometime.")
		}				
	}
}


export const postSlots = (formdata) => {
	return async (dispatch) => {
		const url = `http://34.204.190.112:6060/slots` 
		const response = await fetch(url,{
        	method: 'POST',
        	headers: {
          	'Content-Type': 'application/json'
        	},
        	body: JSON.stringify(formdata)
  		})	

			

		if(!response.ok){
			const errorResponse = await response.json()
			throw new Error(errorResponse.error)
		}		
		// dispatch(getSlots())	
	}
}