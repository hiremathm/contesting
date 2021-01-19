import React from 'react'

import Card from '../../UI/Card'
import Input from '../../UI/Input'

import classes from '../../CSS/Contests.module.css'
const ContestForm = () => {

	const inputHandler = (e) => {
		console.log("E", e)
	}

	return (
		<div className = {classes.ContestForm}>
			<Card cardstyles = {classes.ContestFormCard}>
				<p>Create New Contest</p>
				<hr/>
				<div className = {classes.FormGroup}>
					<Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "gameid"
	                    placeholder = "Game Id *"
	                    onInput = {inputHandler}
	                    errortext = "Required"
	                    validators = {[]}
	                    setlabel = {false}
	                    	                    Inputstyles = {classes.Inputid}
	                />	
	                <Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "title"
	                    placeholder = "Title *"
	                    onInput = {inputHandler}
	                    errortext = "Required"
	                    validators = {[]}
	                    setlabel = {false}
	                    Inputstyles = {classes.Inputid}
	                />	
				</div>
				<div className = {classes.FormGroup}>
					<Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "name"
	                    placeholder = "Contest Name *"
	                    onInput = {inputHandler}
	                    errortext = "Required"
	                    validators = {[]}
	                    setlabel = {false}
	                   	Inputstyles = {classes.Inputid}
	                />	

					<select className = {classes.Inputid} disabled>
						<option value = "#">Status *</option>
						<option value = "draft">Draft</option>
						<option value = "live">LIve</option>
						<option value = "scheduled">Scheduled</option>
					</select>
	                
				</div>
				<div className = {classes.FormGroup}>
					<select className = {classes.Inputid}>
						<option value = "#">Language *</option>
						<option value = "EN">English</option>
						<option value = "HI">Hindi</option>
						<option value = "GU">Gujarati</option>
					</select>
	                <select className = {classes.Inputid}>
						<option value = "#">Country *</option>
						<option value = "IN">India</option>
						<option value = "US">US</option>
						<option value = "ROW">ROW</option>
					</select>
				</div>
			</Card>
		</div>
	)
}

export default ContestForm;