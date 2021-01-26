import React, {useState, useCallback} from 'react'


import Button from '../../UI/Button'

import Form from '../../UI/Form'
import Input from '../../UI/Input'

import classes from '../../CSS/Contests.module.css'

import { useForm } from '../../CUSTOM_HOOKS/formHook'


const QuestionNew = () => {
	const [answerFieldList, pushToAnswerField] = useState([])
	
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

	const addAnwerFields = useCallback(() => {
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
	},[pushToAnswerField, inputHandler])

	const submitHandler = (event) => {
		event.preventDefault()
		setFormData(formState, true)
	}

	return (
		<Form>
			
			<div className = {classes.AddAnswersHeader}>
				<p>Create New Question</p>
				<Button size = "small" onClick = {() => addAnwerFields()}>
					+ Add Answers
				</Button>
			</div>

			<hr/>
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
		</Form>
	)
}

export default QuestionNew;