import Axios from 'axios'

export const AUTHENTICATION = 'AUTHENTICATION'
export const LOGOUT = 'LOGOUT'

export const login = (email, password) => {
	return async (dispatch, getState) => {
		const response = await fetch(
	      	'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYKf9Bsifod7s9S8GFbarUwQJ0t8XzZs4',
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	},
		        body: JSON.stringify({
		          	email: email,
		          	password: password,
		          	returnSecureToken: true
		        })
      		}
    	);

		if(!response.ok){
			const errorResponse = await response.json()
			const errorId = errorResponse.error.message
			 if(errorId === 'EMAIL_NOT_FOUND'){
				throw new Error('Invalid Email or Password')
			 }else if(errorId === 'INVALID_PASSWORD'){
			 	throw new Error('Invalid Email or Password')
			 }else if(errorId === 'USER_DISABLED'){
			 	throw new Error('Your account is Inactive')
			 }
		}

		const responseData = await response.json()
		dispatch(authenticate(responseData.idToken, responseData.localId, parseInt(responseData.expiresIn) * 100))
		const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 100);
		saveData(responseData.idToken, responseData.localId, expiryDate)
	}
}

export const signup = (email, password) => {
	return async dispatch => {
		const response = await fetch(
	      	'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYKf9Bsifod7s9S8GFbarUwQJ0t8XzZs4',
	      	{
	        	method: 'POST',
	        	headers: {
	          	'Content-Type': 'application/json'
	        	},
		        body: JSON.stringify({
		          	email: email,
		          	password: password,
		          	returnSecureToken: true
		        })
      		}
    	);

		if(!response.ok){
			const errorResponse = await response.json()
			const errorId = errorResponse.error.message
			 if(errorId === 'EMAIL_EXISTS'){
				throw new Error('The email address is already in use by another account.')
			 }else if(errorId === 'OPERATION_NOT_ALLOWED'){
			 	throw new Error('Password sign-in is disabled for this project')
			 }else if(errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER'){
			 	throw new Error('We have blocked all requests from this device due to unusual activity. Try again later.')
			 }
		}

		const responseData = await response.json()
		dispatch(authenticate(responseData.idToken, responseData.localId, parseInt(responseData.expiresIn * 100)))

		const expiryDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 100);
		saveData(responseData.idToken, responseData.localId, expiryDate)
	}
}

export const authenticate = (token , userId, expiryTime) => {
	return dispatch => {
		dispatch({
			type: AUTHENTICATION,
			token: token,
			userId: userId
		})
	} 
}

export const logout = (token, userId) => {
	localStorage.removeItem('userData')
	return {type: LOGOUT}
}

export const setUser = () => {
	const token = localStorage.getItem('userAuthToken') 

	return async (dispatch, getState) => {
		
		const url = "https://keepnotesec.herokuapp.com/api/users/account"
		try {
			const response = await Axios({
            	method: 'post',
            	url: url,
            	data: {},
            	headers: {"x-auth": token}
        	})

		    const responseData = await response.data
		    dispatch({type: 'SET_USER',payload: responseData})
		}catch(error){
			console.log("ERROR", error)
		}
	}
}

const saveData = (token, userId, expiryDate) => {
	localStorage.setItem('userData', JSON.stringify({token: token, userId: userId, expiryDate: expiryDate}))
}