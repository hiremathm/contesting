import React,{useCallback, useEffect, useState} from 'react'

import {BrowserRouter, Route, Redirect} from 'react-router-dom'

import Layout from './UI/Layout'
import Contests from './CONTAINERS/Contests'
import Winners from './CONTAINERS/Winners'
import Slots from './CONTAINERS/Slots'
import Reports from './CONTAINERS/Reports'
import Auth from './CONTAINERS/Auth/Auth'

// auth context 
import { AuthContext } from './CONTEXTS/AuthContext'

// dispatch action
// import { useDispatch } from 'react-redux'

const App = () => {
	// const dispatch = useDispatch()

	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const login = useCallback(() => {
		setIsLoggedIn(true)
	}, [setIsLoggedIn])

	const logout = useCallback(() => {
		setIsLoggedIn(false)
		// localStorage.removeItem('userAuthToken')
		// dispatch(logout())
	}, [setIsLoggedIn])

	useEffect(() => {
		const userData = localStorage.getItem('userData')
		if(userData){
			// dispatch(setUser())
			setIsLoggedIn(true)
		}else{
			setIsLoggedIn(false)
		}
	}, [setIsLoggedIn])

  return (
  	<AuthContext.Provider value = {{isLoggedIn, login, logout}}>
	  	<BrowserRouter>
		  	<div>
			    <Layout>
			    {isLoggedIn ? (
			    	<>
						<Route path = "/contests" component = {Contests} exact/>		    	
						<Route path = "/slots" component = {Slots} exact/>		    	
						<Route path = "/winners" component = {Winners} exact/>		    	
						<Route path = "/reports" component = {Reports} exact/>	
						<Redirect to = "contests"/>
			    	</>
			    	) : (
			    	<>
						<Route path = "/authentication" component = {Auth} exact />
						<Redirect to = "/authentication" />
			    	</>
			    	)}
			    </Layout>
		    </div>
	    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;