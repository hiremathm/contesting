import React from 'react'
import { connect } from 'react-redux'
import PulseLoader from "react-spinners/PulseLoader"
import { css } from "@emotion/core";
import {NavLink} from 'react-router-dom'
import { MdDeleteForever, MdModeEdit } from "react-icons/md";


import Button from '../../UI/Button'
import Card from '../../UI/Card'
import Table from '../../UI/Table'

import classes from '../../CSS/Contests.module.css'


import {getSlots} from '../../REDUX_STORE/ACTIONS/SlotAction'

class Slots extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			show: false,
			
			override: css`
				display: block;
				text-align: center;
			`
		}
	}

	componentDidMount = () => {
		this.props.getSlots()
		this.setState({
			show: true,
		})
		setTimeout(() => {
			this.setState({
				show: false
			})
		}, 1000)
	}

	
	getRows = () => {
		let allSlots = []
		this.props.slots.slots.forEach((slot, index) => allSlots.push(
			[
				slot.title, 
				slot.contest_name, 
				slot.start_date,
				slot.end_date,
				slot.status, 
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
	                />
	            </>	
			]
		))
	
		return allSlots
	}

	render (){
		return (
			<Card cardstyles = {classes.ContestForm}>
				<div>{this.state.show && <PulseLoader color="#ff0055" loading={this.state.show} size={15} css={this.state.override}/>}</div>
				
				{
					!this.state.show && (
						<>
							<Button size = "small" onClick = {() => this.props.history.push(`/slots/new`)}> + Add Slot</Button>
						
							{
								this.props.slots ? (
									<Table 
										rows = {this.getRows()}
										cols = {["#","Slot Title","Contest Title","Start Date","End Date","Status","Actions"]}
									/>
								):(
									<div className = {classes.NoRecordsFound}>No Records found!</div>
								)
							}
						</>
					)
				}
			</Card>
		)
	}
}


const mapStateToProps = (state) => {
    return {slots: state.slots}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getSlots: () => dispatch(getSlots())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Slots)