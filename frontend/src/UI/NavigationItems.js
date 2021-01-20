import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'

import { useDispatch } from 'react-redux'

import classes from '../CSS/NavigationItems.module.css'

// authcontext
import {AuthContext} from '../CONTEXTS/AuthContext'

// actions
import {logout} from '../REDUX_STORE/ACTIONS/UserAction'

const NavigationItems = (props) => {
	const auth = useContext(AuthContext)
	const dispatch = useDispatch()
	const logoutAuth = () => {
		dispatch(logout())
		auth.logout()
	}

	return (
		<ul className = {classes.NavigationItems}>
			{!auth.isLoggedIn ? (
			<>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/authentication" exact>Login</NavLink></li>
			</>
			) : (
			<>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/contests" exact>Contests</NavLink></li>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/slots" exact>Slots</NavLink></li>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/winners" exact>Winners</NavLink></li>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/reports" exact>Reports</NavLink></li>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/logout" onClick = {logoutAuth}exact>Logout</NavLink></li>
			</>
			)}
		</ul>
	)
}

export default NavigationItems;