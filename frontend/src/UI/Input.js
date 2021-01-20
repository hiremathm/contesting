import React, {useReducer, useEffect} from 'react'

import classes from '../CSS/Input.module.css'
import { validate } from '../UTIL/validators'

const inputReducer = (state, action) => {
	switch(action.type){
		case 'CHANGE':
			return {
				...state,
				value: action.value,
				isValid: validate(action.value, action.validators)
			}
		case 'TOUCH':
			return {
				...state,
				isTouched: true
			}
		default: 
			return state
	}
}

const Input = (props) => {

	const initialState = {value: '', isValid: false, isTouched: false}

	const [inputState, dispatch] = useReducer(inputReducer, initialState)

	let inputElement = null;
	
	const inputChangeHandler = event => {
		console.log("EVENT", event.target.name, event.target.value)
		dispatch({
			type: 'CHANGE',
			value: event.target.value,
			validators: props.validators
		})
	}

	const touchHandler = () => {
		dispatch({
			type: 'TOUCH'
		})
	}

	switch(props.inputtype){
		case ('input') : 
			inputElement = <input  
				type = {props.type} 
				id = {props.id}
				name = {props.name}
				placeholder = {props.placeholder}
				className={props.Inputstyles ? props.Inputstyles : classes.InputElement}
				onChange = {inputChangeHandler}
				value = {inputState.value}
				onBlur = {touchHandler}
			/>
			
			break;
		case ('textarea') : 
			inputElement = <textarea  className = {classes.InputElement} {...props} />
			break;
		case ('select') :
			inputElement = <select className={props.Inputstyles ? props.Inputstyles : classes.InputElement} 
					onChange = {inputChangeHandler}
					onBlur = {touchHandler}
				>
				{
					props.options.map(option => {
						return <option key = {option.value} value = {option.value} >{option.text}</option> 					
					})
				} 
			</select>
			break;
		default:
			inputElement = <input className = {classes.InputElement} {...props} />
	}

	const {id, onInput} = props
	const {value, isValid} = inputState
	
	console.log("INPUTSSTATE", inputState)

	useEffect(() => {
		onInput(id, value, isValid)
	}, [id, value, isValid, onInput])

	return (
		<div className = {classes.Input}>
			{props.setlabel && <label className = {classes.Label} >{props.label}</label>}
			{inputElement}
			{!inputState.isValid && inputState.isTouched && <p>{props.errortext}</p>}
		</div>
	)
}

export default Input;