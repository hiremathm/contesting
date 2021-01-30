import React, {useState, useCallback} from 'react'
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
import { postWinners } from '../../REDUX_STORE/ACTIONS/WinnerAction'
import { getQuestions } from '../../REDUX_STORE/ACTIONS/QuestionAction'

const WinnerNew = React.memo((props) => {
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
		contest_id: obj,
		question_id: obj
	}, false)

	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState()
	const [winnerFieldList, pushToWinnerField] = useState([])
	const [warning, setWarning] = useState(false)
	const [counter, setCounter] = useState(0)

	const dispatch = useDispatch()

	const state = useSelector(state => state) 
	
	const contests = state.contests.contests
	const questions = state.questions.questions
	
	const constructQuestions = useCallback((key, value, isValid) => {
		if(value){
			inputHandler(key, value, isValid)
			dispatch(getQuestions(value))
		}
	},[dispatch, inputHandler])

	const getRows = useCallback(() => {
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
	},[contests])

	const getQuestionRows = useCallback(() => {
		let allQuestions = []
		questions.forEach(question => {
			allQuestions.push(
				{
					value: question.id,
					text: question.question_id	
				}
			)
		})
		return allQuestions;
	}, [questions])

	const submitHandler = async (e) => {
		e.preventDefault()
		const { inputs } = formState

		try {
			
			setIsLoading(true)
			let winners = []

			for(var i = 0; i < counter; i++){
				const name = inputs[`winner_${i}`].value
				const mobile_num = inputs[`mobile_number_${i}`].value
				winners.push({ name, mobile_num })
			}

			const formData = {
				winners:{
					contest_id: inputs.contest_id.value, 
					question_id: inputs.question_id.value, 
					regions:[], 
					status:"", 
					no_of_winners: winners.length, 
					winners
				}
			}

	 		await dispatch(postWinners(formData))
			
			setTimeout(() => {
				setIsLoading(false)
				props.history.push("/")
			}, 2000)

		}catch(error){
			setErrorText(error.message)
			setIsLoading(false)

			setTimeout(() => {
				setErrorText(null)
			}, 2000)
		}
	}

	const addWinnerFields = useCallback(() => {
		if(counter !== 5){
			setCounter(prevState => prevState + 1)

			pushToWinnerField(prevState => [
					...prevState, 
					<>
						<Input
		                	inputtype = "input" 
		                    type = "text"
		                    id = {`winner_${prevState.length}`}
		                    placeholder = "Name"
		                    errortext = "Required"
		                    label = {`Winner ${prevState.length + 1} *`}
		                    setlabel = {true}
		                    onInput = {inputHandler}
		                    Inputstyles = {classes.Inputid}
		                	key = {prevState.length}
		                	validators = {[]}
		                />
						<Input
		                	inputtype = "input" 
		                    type = "text"
		                    id = {`mobile_number_${prevState.length}`}
		                    placeholder = "Mobile Number"
		                    errortext = "Required"
		                    label = {`Mobile Number`}
		                    setlabel = {true}
		                    onInput = {inputHandler}
		                	key = {prevState.length + 1}
		                    Inputstyles = {classes.Inputid}
		                	validators = {[]}
		                />
	                </>
				]
			)
		}else{
			setWarning(true)
			setTimeout(() => {
				setWarning(false)
			}, 2000)
		}
	},[pushToWinnerField, inputHandler, counter])



	return (
		<div className = {classes.ContestForm}>
			<Card cardstyles = {classes.ContestFormCard}>
				
				<div>{isLoading && <FadeLoader color="#ff0055" loading={isLoading} size={5} css={override}/>}</div>
				
				<Backdrop show = {isLoading}/>

				<div className = {classes.AddAnswersHeader}>
					<p>Create New Winners</p>
					<Button size = "small" onClick = {() => addWinnerFields()}>
						+ Add Winners
					</Button>
				</div>
				

				<hr/>
				{warning && <p className = {classes.Warning}>You have added maximum number of winners.</p>}

				<form onSubmit = {submitHandler}>
					
					{errorText && <p style = {{fontSize: "16px", color: "red", textAlign: "center", margin: "10px"}}>{errorText}</p>}
				
					<div className = {classes.FormGroup}>
						<Input 
							inputtype = "select"
							id = "contest_id"
							onInput = {constructQuestions}
							errortext = "Required"
							validators = {[VALIDATOR_REQUIRE()]}
							setlabel = {true}
							label = "Contest *"
							Inputstyles = {classes.Inputid}
							options = {[{value: "#", text: "Select Contest"},...getRows()]}
						/>

						<Input 
							inputtype = "select"
							id = "question_id"
							onInput = {inputHandler}
							errortext = "Required"
							validators = {[VALIDATOR_REQUIRE()]}
							setlabel = {true}
							label = "Question *"
							Inputstyles = {classes.Inputid}
							options = {[{value: "#", text: "Select Question"},...getQuestionRows()]}
						/>

					</div>
					
					{winnerFieldList.map((winnerList, index) => <div key = {index} className = {classes.InputField}>{winnerList}</div>)}

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

export default WinnerNew;