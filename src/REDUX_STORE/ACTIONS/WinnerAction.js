export const postWinners = (formdata) => {
	return async (dispatch) => {
		const url = `http://34.204.190.112:6060/winners` 
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
	}
}