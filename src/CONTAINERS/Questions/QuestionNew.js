import React, {useState} from 'react'


import Button from '../../UI/Button'

import Form from '../../UI/Form'
import Input from '../../UI/Input'

import classes from '../../CSS/Contests.module.css'


const QuestionNew = () => {
	const [answerFieldList, pushToAnswerField] = useState([])
	const inputHandler = () => {

	}

	const addAnwerFields = () => {
		pushToAnswerField(prevState => [
				...prevState, 
				<>
					<Input
	                	inputtype = "textarea" 
	                    type = "text-area"
	                    id = "answer_id"
	                    placeholder = "Answer"
	                    errortext = "Required"
	                    label = "Answer *"
	                    setlabel = {true}
	                    onInput = {inputHandler}
	                    Inputstyles = {classes.Description}
	                	key = {prevState.length + 2}
	                	validators = {[]}
	                />

	               <Input
	                	inputtype = "input" 
	                    type = "radio"
	                    id = "right_answer"
	                    label = "Right Answer"
	                    setlabel = {true}
	                    validators = {[]}
	                    onInput = {inputHandler}
	                    Inputstyles = {classes.Radio}
	                	key = {prevState.length + 1}
	                	checked={true}
	                	name = "right_answer"

	                />
                </>
			]
		)
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
			<form onSubmit = {inputHandler}>
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
	                />	
				</div>

				{answerFieldList.map((anwerList, index) => <div key = {index} className = {classes.InputField}>{anwerList}</div>)}
			</form>
		</Form>
	)
}

export default QuestionNew;