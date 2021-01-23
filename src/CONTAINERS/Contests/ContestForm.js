import React, {useState} from 'react'
import { css } from "@emotion/core";
import {useDispatch} from 'react-redux'
import FadeLoader from "react-spinners/FadeLoader"

import Card from '../../UI/Card'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import classes from '../../CSS/Contests.module.css'
import Backdrop from '../../UI/Backdrop'

import {VALIDATOR_REQUIRE} from '../../UTIL/validators'

import { useForm } from '../../CUSTOM_HOOKS/formHook'

// actions 
import { postContest } from '../../REDUX_STORE/ACTIONS/ContestAction'

const ContestForm = (props) => {
	const override = css`
		display: block;
		margin: 0 auto;
		height: 15;
		width: 5;
	`;

	const obj = {
			value: '',
			isValid: ''
		}

	const [formState, inputHandler] = useForm({
		game_id: obj,
		title: obj,
		name: obj, 
		status: obj,
		country: obj, 
		language: obj,
		game_start_date: obj,
		game_end_date: obj
	}, false)

	const [isLoading, setIsLoading]= useState(false)
	const dispatch = useDispatch()

	const submitHandler = (e) => {
		e.preventDefault()
		setIsLoading(true)
		const formData = {
			game_id: formState.inputs.game_id.value,
			title: formState.inputs.title.value,
			contest_name: formState.inputs.name.value, 
			status: formState.inputs.status.value,
			language: "english",
			banner: "https://daex9l847wg3n.cloudfront.net/contesting_images/contests/test/67748/test-contesting_img2-1611282476.jpg",
			language_code: formState.inputs.language.value,
			start_date: formState.inputs.game_start_date.value.toLocaleString()+ "T00:00:00Z",
			end_date: formState.inputs.game_end_date.value.toLocaleString() + "T00:00:00Z",
			question_languages: [formState.inputs.language.value],
			regions: ["IN"],
			description: formState.inputs.description.value
		}
 		dispatch(postContest(formData))
		setTimeout(() => {
			setIsLoading(false)
			props.history.push("/contests")
		}, 5000)
	}

	return (
		<div className = {classes.ContestForm}>
			<Card cardstyles = {classes.ContestFormCard}>
				<p>Create New Contest</p>
				
				<form onSubmit = {submitHandler}>
					<hr/>

					<div>{isLoading && <FadeLoader color="#ff0055" loading={isLoading} size={5} css={override}/>}</div>
					<Backdrop show = {isLoading}/>

					<div className = {classes.FormGroup}>
						<Input
		                	inputtype = "input" 
		                    type = "text"
		                    id = "game_id"
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
							inputtype = "input"
							id = "game_start_date"
							type = "date"
							onInput = {inputHandler}
							errortext = "Required"
							validators = {[]}
							setlabel = {true}
							label = "Game Start Date *"
							Inputstyles = {classes.Datepicker}
							name = "date"
						/>
						<Input 
							inputtype = "input"
							type = "date"
							id = "game_end_date"
							onInput = {inputHandler}
							errortext = "Required"
							validators = {[]}
							name = "date"
							setlabel = {true}
							label = "Game End Date *"
							Inputstyles = {classes.Datepicker}
						/>
					</div>

					<div className = {classes.FormGroup}>
						<Input
		                	inputtype = "textarea" 
		                    type = "textarea"
		                    id = "description"
		                    placeholder = "Description"
		                    onInput = {inputHandler}
		                    errortext = "Required"
		                    validators = {[VALIDATOR_REQUIRE()]}
		                    label = "Game ID *"
		                    setlabel = {true}
		                    Inputstyles = {classes.Description}
		                />	
					</div>
					<div className = {classes.FormGroup}>
						<Button disabled = {!formState.formIsValid}>
							Submit
						</Button>
					</div>
				</form>
			</Card>
		</div>
	)
}

export default ContestForm;