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
import { fetchReport } from '../../REDUX_STORE/ACTIONS/ReportAction'
import { getQuestions } from '../../REDUX_STORE/ACTIONS/QuestionAction'

import {CSVLink} from 'react-csv';

const Reports = React.memo((props) => {
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
		question_id: obj,
		type: obj,
		start_date: obj,
		end_date: obj
	}, false)

	const [isLoading, setIsLoading] = useState(false)
	const [errorText, setErrorText] = useState()
	const [isDownloadable, setDownload] = useState(false)
	const dispatch = useDispatch()

	const state = useSelector(state => state) 
	
	const contests = state.contests.contests
	const questions = state.questions.questions
	const reports = state.reports.reports

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

			const formData = `contest_id=${inputs.contest_id.value}&question_id=${inputs.question_id.value}&start_date=${Date.parse(inputs.start_date.value)}&end_date=${Date.parse(inputs.end_date.value)}&flag=${inputs.type.value}`
					
			console.log("formData", formData)

	 		await dispatch(fetchReport(formData))
			
			setTimeout(() => {
				setIsLoading(false)
				setDownload(true)
			}, 2000)

		}catch(error){
			setErrorText(error.message)
			setIsLoading(false)

			setTimeout(() => {
				setErrorText(null)
			}, 2000)
		}
	}

	const formatCsvData = (type) => {
		console.log("formState", formState)
		let names = ['Question','What is your name?']
		let values = ['Answer','My name is Shivakumar']
		let headers = ['User Id','Mobile Number','Answer']
		let headerValues = ['1','1234567899990','My name is Aishwarya']
		let csvData = [names, values, headers, headerValues]
		return csvData
	}

	return (
		<div className = {classes.ContestForm}>
			<Card cardstyles = {classes.ContestFormCard}>
				
				<div>{isLoading && <FadeLoader color="#ff0055" loading={isLoading} size={5} css={override}/>}</div>
				
				<Backdrop show = {isLoading}/>

				<div className = {classes.AddAnswersHeader}>
					<p>Reports Console</p>
				</div>
				
				<hr/>

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
							label = "Game Title *"
							Inputstyles = {classes.Datepicker}
							options = {[{value: "#", text: "Select Game"},...getRows()]}
						/>

						<Input 
							inputtype = "select"
							id = "question_id"
							onInput = {inputHandler}
							errortext = "Required"
							validators = {[VALIDATOR_REQUIRE()]}
							setlabel = {true}
							label = "Question *"
							Inputstyles = {classes.Datepicker}
							options = {[{value: "#", text: "Select Question"},...getQuestionRows()]}
						/>

						<Input 
							inputtype = "select"
							id = "type"
							onInput = {inputHandler}
							errortext = "Required"
							validators = {[VALIDATOR_REQUIRE()]}
							setlabel = {true}
							label = "Reports Type *"
							Inputstyles = {classes.Datepicker}
							options = {[{value: "#", text: "Select Reports type"},{value: "true", "text":"Winners"},{value: "all", text: "All"}]}
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
							label = "Start Date *"
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
							label = "End Date *"
							Inputstyles = {classes.Datepicker}
						/>
					</div>
					
					<div className = {classes.FormGroup}>
						<Button disabled = {!formState.formIsValid}>
							Submit
						</Button>
					</div>

					<div className = {classes.FormGroup}>
                    	{isDownloadable && <div>Download as <CSVLink filename={`Winners report from ${formState.inputs.start_date.value} to ${formState.inputs.end_date.value}.csv`} data={formatCsvData()}>CSV</CSVLink></div>}
					</div>
				</form>
			</Card>
		</div>
	)
})

export default Reports;