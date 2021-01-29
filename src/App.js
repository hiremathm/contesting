import React,{useCallback, useEffect, useState} from 'react'

import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Layout from './UI/Layout'

// COMPONENTS
// Contests
import Contests from './CONTAINERS/Contests/Contests'
import ContestForm from './CONTAINERS/Contests/ContestForm'
import ContestEditForm from './CONTAINERS/Contests/ContestEditForm'
import ContestShow from './CONTAINERS/Contests/ContestShow'

// Questions
import QuestionNew from './CONTAINERS/Questions/QuestionNew'
// Slots
import Slots from './CONTAINERS/Slots/Slots'
import SlotsNew from './CONTAINERS/Slots/SlotsNew'

// Winners
import Winners from './CONTAINERS/Winners/Winners'

// Reports
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
			<Layout>
				{
					isLoggedIn ? (
					<>
						<Switch>
							{/*contest routes*/}
							<Route path = "/contests" component = {Contests} exact/>
							<Route path = "/contests/new" component = {ContestForm} exact />
							<Route path = "/contests/edit/:id" component = {ContestEditForm} exact />
							<Route path = "/contests/:id" component = {ContestShow} exact/>

							{/*question routes*/}
							<Route path = "/contests/:id/questions/new" component = {QuestionNew} exact />
							
							{/*slot routes*/}
							<Route path = "/slots" component = {Slots} exact/>		    	
							<Route path = "/slots/new" component = {SlotsNew} exact />
							
							{/*winner routes*/}
							<Route path = "/winners" component = {Winners} exact/>		    	
							
							{/*report routes*/}
							<Route path = "/reports" component = {Reports} exact/>	
							<Redirect to = "/contests" />
						</Switch>
		    		</>
		    	) : (
		    		<>
		    			<Switch>
							<Route path = "/authentication" component = {Auth} exact />
							<Redirect to = "/authentication" />
						</Switch>
		    		</>
	    		)}
    		</Layout>
	    </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;