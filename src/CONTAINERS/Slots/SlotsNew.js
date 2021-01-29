import React, {useState} from 'react'
import { css } from "@emotion/core";
import {useDispatch, useSelector} from 'react-redux'
import FadeLoader from "react-spinners/FadeLoader"

import Card from '../../UI/Card'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import classes from '../../CSS/Contests.module.css'
import Backdrop from '../../UI/Backdrop'

import {VALIDATOR_REQUIRE} from '../../UTIL/validators'

import { useForm } from '../../CUSTOM_HOOKS/formHook'

// actions 
import { postSlots } from '../../REDUX_STORE/ACTIONS/SlotAction'

const SlotFrom = React.memo((props) => {
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
		title: obj,
		status: obj,
		country: obj, 
		start_date: obj,
		end_date: obj,
		contest_id: obj

	}, false)

	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState()
	
	const dispatch = useDispatch()

	const contests = useSelector(state => state.contests.contests) 

	const getRows = () => {
		let allContest = []
		contests.forEach(contest => {
			allContest.push(
				{
					value: contest.contest_id,
					text: contest.contest_name.toUpperCase()
				}
			)
		})
		return allContest
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		
		try {
			
			setIsLoading(true)
			
			const formData = {
				slots: {
					title: formState.inputs.title.value,
					contest_id: formState.inputs.contest_id.value, 
					status: formState.inputs.status.value,
					start_date: formState.inputs.start_date.value,
					country: [formState.inputs.country.value],
					end_date: formState.inputs.end_date.value,
					question_ids: ["216"]
				}
			}

			console.log("formdata", formData)
	 		
	 		await dispatch(postSlots(formData))
			
			setTimeout(() => {
				setIsLoading(false)
				props.history.push("/slots")
			}, 3000)

		}catch(error){
			setErrorText(error.message)
			setIsLoading(false)

			setTimeout(() => {
				setErrorText(null)
			}, 2000)
		}
	}

	return (
		<div className = {classes.ContestForm}>
			<Card cardstyles = {classes.ContestFormCard}>
				<p>Create New Slot</p>
				
				<form onSubmit = {submitHandler}>
					<hr/>
					
					{errorText && <p style = {{fontSize: "16px", color: "red", textAlign: "center", margin: "10px"}}>{errorText}</p>}
				<div>{isLoading && <FadeLoader color="#ff0055" loading={isLoading} size={5} css={override}/>}</div>
					<Backdrop show = {isLoading}/>


					<div className = {classes.FormGroup}>
						<Input
		                	inputtype = "input" 
		                    type = "text"
		                    id = "title"
		                    label = "Title *"
		                    placeholder = "Title"
		                    onInput = {inputHandler}
		                    errortext = "Required"
		                    validators = {[VALIDATOR_REQUIRE()]}
		                    setlabel = {true}
		                   	Inputstyles = {classes.Inputid}
		                />	

						<Input 
							inputtype = "select"
							id = "contest_id"
							onInput = {inputHandler}
							errortext = "Required"
							validators = {[VALIDATOR_REQUIRE()]}
							setlabel = {true}
							label = "Contest *"
							Inputstyles = {classes.Inputid}
							options = {[{value: "#", text: "Select Contest"},...getRows()]}
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
							options = {[{value: "#", text: "Select Country"},{value: "India", text: "India"},{value: "US", text: "US"},{value: "Row", text: "ROW"}]}
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
							options = {[{value: "#", text: "Select Status"},{value: "draft", text: "Draft"}, {value: "live", text: "Live"}, {value: "schedule", text: "Schedule"}, {value: "paused", text: "Paused"}, {value: "completed", text: "Completed"}]}
						/>

					</div>

					<div className = {classes.FormGroup}>
						<Input 
							inputtype = "input"
							id = "start_date"
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
							id = "end_date"
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
						<Button disabled = {!formState.formIsValid}>
							Submit
						</Button>
					</div>
				</form>
			</Card>
		</div>
	)
})

export default SlotFrom;