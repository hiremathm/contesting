import React, {useState, useCallback} from 'react'
import { css } from "@emotion/core";

import { useDispatch } from 'react-redux'
import FadeLoader from "react-spinners/FadeLoader"


import Button from '../../UI/Button'
import Form from '../../UI/Form'
import Input from '../../UI/Input'
import Backdrop from '../../UI/Backdrop'

import classes from '../../CSS/Contests.module.css'

import { useForm } from '../../CUSTOM_HOOKS/formHook'

import { postQuestionAnswers } from '../../REDUX_STORE/ACTIONS/QuestionAction'

const QuestionNew = (props) => {
	const dispatch = useDispatch()
	const [isLoading, setLoading] = useState(false)
	const [warning, setWarning] = useState(false)

	const [answerFieldList, pushToAnswerField] = useState([])
	const [counter, setCounter] = useState(0)
	const obj = {
		value: '',
		isValid: ''
	}
	const [formState, inputHandler, setFormData] = useForm({
		question_id: obj,
		question: obj,
		answer_id_0: obj,
		right_answer: {value: '', isValid: true}
	}, false)
	

	const override = css`
		display: block;
		margin: 0 auto;
		height: 15;
		width: 5;
	`;

	const addAnwerFields = useCallback(() => {
		if(counter !== 4){
			setCounter(prevState => prevState + 1)

			pushToAnswerField(prevState => [
					...prevState, 
					<>
						<Input
		                	inputtype = "textarea" 
		                    type = "text-area"
		                    id = {`answer_id_${prevState.length}`}
		                    placeholder = "Answer"
		                    errortext = "Required"
		                    label = {`Answer ${prevState.length + 1} *`}
		                    setlabel = {true}
		                    onInput = {inputHandler}
		                    Inputstyles = {classes.Description}
		                	key = {prevState.length}
		                	validators = {[]}
		                />
		                <label id = "is_right_answer">
		               	<input
		                    type = "radio"
		                    id = "right_answer"
		                    htmlFor = "is_right_answer"
		                    onChange = {() => inputHandler('right_answer', `answer_id_${prevState.length}`, true)}
		                	name = "right_answer"
		                	className = {classes.Radio}
		                />Right Answer
		                </label>
	                </>
				]
			)
		}else{
			setWarning(true)
			setTimeout(() => {
				setWarning(false)
			}, 2000)
		}
	},[pushToAnswerField, inputHandler,counter])

	const submitHandler = (event) => {
		event.preventDefault()
		setFormData(formState, true)
		console.log("FORMDATA", formState)
		const { inputs } = formState

		setLoading(true)

		let answers_attributes = []

		for(var i = 0; i < counter; i++){
			console.log("counter", i)
			let answer = inputs[`answer_id_${i}`].value
			answers_attributes.push({
				contest_id: `${props.match.params.id}`,
				question_id: `${inputs.question_id.value}`, 
				body: answer, 
				is_right_answer: true, 
				status: "",
				ml_texts_attributes: [
					{
						body: answer, 
						language: "english", 
						language_code: "en",
						status: ""
					}
				]
			})
		}

		const formData = {
			questions: [
				{
					question_id: `${inputs.question_id.value}`, 
					contest_id: `${props.match.params.id}`, 
					status:"", 
					ml_texts_attributes: [
						{
							body: `${inputs.question.value}`, 
							language_code: "en", 
							language: "english",
							status: ""
						}
					], 
					answers_attributes: answers_attributes
				}
			]
		}



		dispatch(postQuestionAnswers(formData, props.match.params.id))
		setTimeout(() => {
			setLoading(false)
			props.history.push(`/contests/${props.match.params.id}`)
		}, 5000)

	}

	return (
		<Form>
			<>
			<div>{isLoading && <FadeLoader color="#ff0055" loading={isLoading} size={5} css={override}/>}</div>
			<Backdrop show = {isLoading}/>

			<div className = {classes.AddAnswersHeader}>
				<p>Create New Question</p>
				<Button size = "small" onClick = {() => addAnwerFields()}>
					+ Add Answers
				</Button>
			</div>
			

			<hr/>
			{warning && <p className = {classes.Warning}>You have added maximum number of answers.</p>}

			<form onSubmit = {submitHandler}>
				<div className = {classes.FormGroup}>
					<Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "question_id"
	                    placeholder = "Question Id"
	                    errortext = "Required"
	                    label = "Question Id *"
	                    setlabel = {true}
	                    onInput = {inputHandler}
	                    Inputstyles = {classes.Inputid}
						validators = {[]}
	                />	
	                <Input
	                	inputtype = "input" 
	                    type = "text"
	                    id = "question"
	                    placeholder = "Question"
	                    errortext = "Required"
	                    label = "Question *"
	                    setlabel = {true}
	                    onInput = {inputHandler}
	                    Inputstyles = {classes.Inputid}
	                	validators = {[]}
	                />	
				</div>

				{/*<div className = {classes.FormGroup} >
									<Input
					                	inputtype = "textarea" 
					                    type = "text-area"
					                    id = "answer_id_0"
					                    placeholder = "Answer"
					                    errortext = "Required"
					                    label = "Answer 0"
					                    setlabel = {true}
					                    onInput = {inputHandler}
					                    Inputstyles = {classes.Description}
					                	validators = {[]}
					                	onChange = {() => {}}
					                />
				                </div>
				
				                <div className = {classes.FormGroup} >
									<Input
					                	inputtype = "textarea" 
					                    type = "text-area"
					                    id = "answer_id_1"
					                    placeholder = "Answer"
					                    errortext = "Required"
					                    label = "Answer 1"
					                    setlabel = {true}
					                    onInput = {inputHandler}
					                    validators = {[]}
					                    Inputstyles = {classes.Description}
					                />
				                </div>
				
				                <div className = {classes.FormGroup}>
				
					               <input
					                    type = "radio"
					                    id = "right_answer"
					                    onChange = {() => inputHandler('right_answer', 'answer_id_0', true)}
					                    className = {classes.Radio}
					                	name = "right_answer"
					                	value = "answer_id_0"
					                />
				
					               <input
					                    type = "radio"
					                    id = "right_answer"
					                    onChange = {() => inputHandler('right_answer', 'answer_id_1', true)}
					                    className = {classes.Radio}
					                	name = "right_answer"
					                	value = "answer_id_0"
					                />
				                </div>*/}

				{answerFieldList.map((anwerList, index) => <div key = {index} className = {classes.InputField}>{anwerList}</div>)}

				<hr/>
				<div className = {classes.FormGroup}>
					<Button disabled = {!formState.formIsValid}>
						Submit
					</Button>
				</div>
			</form>
			</>
		</Form>
	)
}

export default QuestionNew;