import React, {useEffect, useState} from 'react'
import { css } from "@emotion/core";
import {useDispatch, connect} from 'react-redux'
import FadeLoader from "react-spinners/FadeLoader"

import Card from '../../UI/Card'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import classes from '../../CSS/Contests.module.css'
import Backdrop from '../../UI/Backdrop'

import {VALIDATOR_REQUIRE} from '../../UTIL/validators'

import { useForm } from '../../CUSTOM_HOOKS/formHook'

// actions 
import { updateContest } from '../../REDUX_STORE/ACTIONS/ContestAction'

const ContestEditForm = React.memo((props) => {
	const {id} = props.match.params
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

	const [formState, inputHandler, setFormData] = useForm({
		game_id: obj,
		title: obj,
		contest_name: obj, 
		status: obj,
		regions: obj, 
		language: obj,
		start_date: obj,
		end_date: obj,
		Language: obj,
		question_languages: obj,
		description: obj
	}, false)
	
	const [isLoading, setIsLoading]= useState(false)
	const [errorText, setErrorText]= useState()

	const dispatch = useDispatch()

	const submitHandler = async (e) => {
		e.preventDefault()
		
		try {
			setIsLoading(true)
			
			const formData = {
				game_id: formState.inputs.game_id.value,
				title: formState.inputs.title.value,
				contest_name: formState.inputs.contest_name.value, 
				status: formState.inputs.status.value,
				language: formState.inputs.language.value,
				banner: "https://daex9l847wg3n.cloudfront.net/contesting_images/contests/test/67748/test-contesting_img2-1611282476.jpg",
				language_code: formState.inputs.language_code.value,
				start_date: formState.inputs.start_date.value,
				end_date: formState.inputs.end_date.value,
				question_languages: [formState.inputs.question_languages.value],
				regions: [formState.inputs.regions.value],
				description: formState.inputs.description.value
			}

	 		await dispatch(updateContest(formData, props.match.params.id))
			
			setTimeout(() => {
				setIsLoading(false)
				props.history.push("/contests")
			}, 1000)

		}catch(error){
			setErrorText(error.message)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const contest = props.contests.contests.find(contest => contest.contest_id === parseInt(id))
		const editForm = {
			inputs: {
				game_id: {value: contest.game_id, isValid: true},
				title: {value: contest.title, isValid: true},
				contest_name: {value: contest.contest_name, isValid: true}, 
				status: {value: contest.status, isValid: true},
				language: {value: contest.language_code, isValid: true},
				banner: {value: contest.banner, isValid: true},
				language_code: {value: contest.language_code, isValid: true},
				start_date: {value: contest.start_date, isValid: true},
				end_date: {value: contest.end_date, isValid: true},
				question_languages: {value: [contest.question_languages], isValid: true},
				regions: {value: [contest.regions], isValid: true},
				description: {value: contest.description, isValid: true},
			}
		}
		setFormData(editForm, true)
	}, [id, setFormData, props.contests.contests])

	return (
		<div className = {classes.ContestForm}>
			<Card cardstyles = {classes.ContestFormCard}>
				<p>Edit Contest</p>
				
				<form onSubmit = {submitHandler}>
					<hr/>
					{errorText && <p style = {{fontSize: "16px", color: "red", textAlign: "center", margin: "10px"}}>{errorText}</p>}
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
		                    value = {formState.inputs.game_id.isValid && formState.inputs.game_id.value}
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
		                    value = {formState.inputs.title.isValid && formState.inputs.title.value}
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
		                   	value = {formState.inputs.contest_name.isValid && formState.inputs.contest_name.value}
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
							value = {formState.inputs.status.isValid && formState.inputs.status.value}
							options = {[{value: "#", text: "Select Status"},{value: "draft", text: "Draft"}, {value: "live", text: "Live"}, {value: "schedule", text: "Schedule"}, {value: "paused", text: "Paused"},{value: "completed", text: "Completed"}]}
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
							value = {formState.inputs.regions.isValid && formState.inputs.regions.value[0]}
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
							value = {formState.inputs.question_languages.isValid && formState.inputs.question_languages.value}
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
							value = {formState.inputs.start_date.isValid && formState.inputs.start_date.value.split("T")[0]}
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
							value = {formState.inputs.end_date.isValid && formState.inputs.end_date.value.split("T")[0]}
							Inputstyles = {classes.Datepicker}
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
							label = "Winner Declared At *"
							value = {formState.inputs.end_date.isValid && formState.inputs.end_date.value.split("T")[0]}
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
		                    label = "Description *"
		                    setlabel = {true}
		                    Inputstyles = {classes.Description}
							value = {formState.inputs.description.isValid && formState.inputs.description.value.split("T")[0]}
		                />	
					</div>
					<div className = {classes.FormGroup}>
						<Button>
							Submit
						</Button>
					</div>
				</form>
			</Card>
		</div>
	)
})

const mapStateToProps = (state) => {
    return {contests: state.contests}
}

export default connect(mapStateToProps)(ContestEditForm);