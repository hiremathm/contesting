import React,{useCallback, useEffect, useState} from 'react'

import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import Layout from './UI/Layout'
import Contests from './CONTAINERS/Contests/Contests'
import ContestForm from './CONTAINERS/Contests/ContestForm'
import ContestEditForm from './CONTAINERS/Contests/ContestEditForm'

import Winners from './CONTAINERS/Winners/Winners'
import Slots from './CONTAINERS/Slots/Slots'
import Reports from './CONTAINERS/Reports/Reports'
import Auth from './CONTAINERS/Auth/Auth'

// auth context 
import { AuthContext } from './CONTEXTS/AuthContext'

// lazy loading
// const Contests = React.lazy(() => import('./CONTAINERS/Contests'))

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
		  		<Switch>
				    {isLoggedIn ? (
				    	<>
							<Route path = "/contests" component = {Contests} exact/>
							<Route path = "/contests/new" component = {ContestForm} exact />
							<Route path = "/contests/edit/:id" component = {ContestEditForm} exact />
							<Route path = "/slots" component = {Slots} exact/>		    	
							<Route path = "/winners" component = {Winners} exact/>		    	
							<Route path = "/reports" component = {Reports} exact/>	
							{<Redirect to = "/contests" />}
				    	</>
				    	) : (
				    	<>
							<Route path = "/authentication" component = {Auth} exact />
							<Redirect to = "/authentication" />
				    	</>
				    	)}
			    </Switch>
		    </Layout>
		    </div>
	    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;