import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";

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
				<li className = {classes.NavigationItem} onClick = {props.clicked}>
					<NavLink to= "/authentication" exact>
						<IoLogInOutline style = {{color: 'white', height: '30px', width: '40px' }} />
					</NavLink>
				</li>
			</>
			) : (
			<>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/contests" exact>Contests</NavLink></li>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/slots" exact>Slots</NavLink></li>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/winners" exact>Winners</NavLink></li>
				<li className = {classes.NavigationItem} onClick = {props.clicked}><NavLink to= "/reports" exact>Reports</NavLink></li>
				<li className = {`${classes.NavigationItem} ${classes.LogoutLink}`} onClick = {props.clicked}><NavLink to= "/logout" onClick = {logoutAuth}exact>
			    <IoLogOutOutline style = {{color: 'white', height: '30px', width: '40px' }} />
					</NavLink>
				</li>
			</>
			)}
		</ul>
	)
}

export default NavigationItems;