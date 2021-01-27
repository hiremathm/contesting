import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader"
import { css } from "@emotion/core";

import {getQuestions, removeQuestion} from '../../REDUX_STORE/ACTIONS/QuestionAction'

import Button from '../../UI/Button'
import Card from '../../UI/Card'
import Table from '../../UI/Table'
import classes from '../../CSS/Contests.module.css'

const ContestShow = React.memo((props) => {
	const [isLoading, setLoading] = useState(false)	
	// const dispatch = useDispatch()
	const {id} = props.match.params
	
	const { getQuestions, removeQuestion } = props

	const override = css`
			display: block;
			text-align: center;
		`
	useEffect(() => {
		console.log("COMPONENT DID MOUNT", id)
		setLoading(true)
		getQuestions(id)
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [getQuestions, id, setLoading])

	// const questions = useSelector(state => state.questions.questions)
	
	const questions = props.questions

	const getRows = (constest_id) => {
		let allQuestions = []
		if(questions.length > 0){

		}else{
			allQuestions.push([
				<p>No Questions found.</p>
			])
		}
		questions.forEach((question, index) => allQuestions.push(
			[
				question.question_id, 
				question.id, 
				constest_id, 
				<>
					<NavLink to="#">
                    	<MdModeEdit 
                      		style = {{cursor: 'pointer'}} 
                      		size = "2em" 
                      		color = "green"
                    	/>
                  	</NavLink>
                  	<MdDeleteForever 
	                    style = {{marginLeft: "5px", cursor: 'pointer' }} 
	                    size = "2em" 
	                    color = "red" 
	                    onClick = {() => removeQuestion(question.id, constest_id)}
	                />
	            </>	
			]
		))
		return allQuestions
	}

	return (
		<Card cardstyles = {classes.ContestForm}>
			
			<div>{isLoading && <PulseLoader color="#ff0055" loading={isLoading} size={15} css={override}/>}</div>

			<Button size = "small" onClick = {() => props.history.push(`/contests/${id}/questions/new`)}>Add Questions</Button>

			{!isLoading && questions.length > 0 ? (
				<Table 
					cols = {["#","Question","Unique Id","Contest Id","Actions"]}
					rows = {getRows(id)}
				/>
			) : (
				<div className = {classes.NoRecordsFound}>No Records found!</div>
			)}
		</Card>
	)
})

const mapStateToProps = (state) => {
	return {
		questions: state.questions.questions
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getQuestions: (id) => dispatch(getQuestions(id)),
		removeQuestion: (id, constest_id) => dispatch(removeQuestion(id, constest_id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ContestShow);