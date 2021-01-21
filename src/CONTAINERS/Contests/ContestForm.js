import React from 'react'

import Card from '../../UI/Card'
import Input from '../../UI/Input'
import classes from '../../CSS/Contests.module.css'

import {VALIDATOR_REQUIRE} from '../../UTIL/validators'
const ContestForm = () => {

	const inputHandler = (id, value, isValid) => {
		console.log("VALUES", id, value, isValid)
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
	                    placeholder = "Game Id"
	                    onInput = {inputHandler}
	                    errortext = "Required"
	                    validators = {[VALIDATOR_REQUIRE()]}
	                    label = "Game ID *"
	                    setlabel = {true}
	                    Inputstyles = {classes.Inputid}
	                />	
	                <Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "title"
	                    placeholder = "Title"
	                    onInput = {inputHandler}
	                    errortext = "Required"
	                    label = "Title *"
	                    validators = {[VALIDATOR_REQUIRE()]}
	                    setlabel = {true}
	                    Inputstyles = {classes.Inputid}
	                />	
				</div>
				<div className = {classes.FormGroup}>
					<Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "name"
	                    label = "Contest Name *"
	                    placeholder = "Contest Name"
	                    onInput = {inputHandler}
	                    errortext = "Required"
	                    validators = {[VALIDATOR_REQUIRE()]}
	                    setlabel = {true}
	                   	Inputstyles = {classes.Inputid}
	                />	

					<Input 
						inputtype = "select"
						id = "status"
						onInput = {inputHandler}
						errortext = "Required"
						validators = {[VALIDATOR_REQUIRE()]}
						setlabel = {true}
						label = "Status *"
						Inputstyles = {classes.Inputid}
						options = {[{value: "#", text: "Select Status"},{value: "draft", text: "Draft"}, {value: "live", text: "Live"}, {value: "schedule", text: "Schedule"}, {value: "paused", text: "Paused"}]}
					/>
	                
				</div>
				<div className = {classes.FormGroup}>


					<Input 
						inputtype = "select"
						id = "country"
						onInput = {inputHandler}
						errortext = "Required"
						validators = {[VALIDATOR_REQUIRE()]}
						setlabel = {true}
						label = "Country *"
						Inputstyles = {classes.Inputid}
						options = {[{value: "#", text: "Select Country"},{value: "in", text: "India"},{value: "us", text: "US"},{value: "row", text: "ROW"}]}
					/>

					<Input 
						inputtype = "select"
						id = "language"
						onInput = {inputHandler}
						errortext = "Required"
						validators = {[VALIDATOR_REQUIRE()]}
						setlabel = {true}
						label = "Language *"
						Inputstyles = {classes.Inputid}
						options = {[{value: "#", text: "Select Language"},{value: "en", text: "English"},{value: "hi", text: "Hindi"},{value: "gu", text: "Gujarati"}]}
					/>
				</div>

				<div className = {classes.FormGroup}>
					<Input 
						inputtype = "date"
						id = "game_start_date"
						type = "date"
						onInput = {inputHandler}
						errortext = "Required"
						validators = {[]}
						setlabel = {true}
						label = "Game Start Date *"
						Inputstyles = {classes.Datepicker}
					/>
					<Input 
						inputtype = "date"
						type = "date"
						id = "geme_end_date"
						onInput = {inputHandler}
						errortext = "Required"
						validators = {[]}
						setlabel = {true}
						label = "Game End Date *"
						Inputstyles = {classes.Datepicker}
					/>
				</div>
			</Card>
		</div>
	)
}

export default ContestForm;