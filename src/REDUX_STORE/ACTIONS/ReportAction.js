export const setReport = (payload) => {
	return {
		type: 'SET_REPORTS',
		payload
	}
}

// export const getReport = () => {
// 	return {
// 		type: 'GET_REPORTS'
// 	}
// }

export const fetchReport = (formdata) => {
	return async (dispatch) => {
		const url = `http://34.204.190.112:6060//contest/user_contest_details?${formdata}` 
		const response = await fetch(url,{
        	method: 'GET',
        	headers: {
          	'Content-Type': 'application/json'
        	}
  		})	


		if(!response.ok){
			const errorResponse = await response.json()
			throw new Error(errorResponse.error)
		}	

		let data = await response.json()
		data = data.data
		dispatch(setReport(data))
	}
}