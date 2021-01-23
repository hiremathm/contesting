import React from 'react'

import classes from '../CSS/Toolbar.module.css'


import NavigationItems from './NavigationItems'
import DrawerToggle from './DrawerToggle'

const toolbar = (props) => {
	return (
		<header className = {classes.Toolbar}>
			<DrawerToggle clicked = {props.drawerToggleClicked}/>
			<div className = {classes.homeTab}><img alt = "Contest" src ="https://cdn.xl.thumbs.canstockphoto.com/contest-word-stars-fireworks-exciting-raffle-drawing-news-contest-word-in-3d-letters-to-announce-pictures_csp19094781.jpg " width ="100px" height = "55px" /></div>
			<nav className = {classes.DesktopOnly}>
				<NavigationItems />
			</nav>
		</header>
	)
}

export default toolbar;