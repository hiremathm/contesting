import { useCallback, useReducer } from 'react'

const formReducer = (state, action) => {
	switch(action.type){
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for(const inputId in state.inputs){
				if(!state.inputs[inputId]){
					continue
				}
				if(inputId === action.inputId){
					formIsValid = formIsValid && action.isValid
				}else{
					formIsValid = formIsValid && state.inputs[inputId].isValid
				}
			}

			let updatedState = {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid
					}
				},
				formIsValid
			}

			return updatedState;
		default: 
			return state
	}
}

export const useForm = (initialInputs, initialFormValidity) => {
	const [formState, dispatchForm] = useReducer(
		formReducer, { inputs: initialInputs, formIsValid: initialFormValidity }
	)

	const inputHandler = useCallback((inputId, value, isValid) => {
		dispatchForm({
			type: 'INPUT_CHANGE',
			value,isValid,inputId
		})
		// console.log("formState", formState)
	}, [])

	const setFormData = useCallback((inputs, formIsValid) => {
		// console.log("INPUTS", inputs, formIsValid)
		dispatchForm({
			type: 'SET_DATA',
			inputs, formIsValid 
		})
	}, [])

	return [formState, inputHandler, setFormData]
}