import React from 'react'
import { connect } from 'react-redux'
import {Col, Row, Container} from 'react-bootstrap'
import PulseLoader from "react-spinners/PulseLoader"

import Card from '../../UI/Card'
import Button from '../../UI/Button'
import Table from '../../UI/Table'
// Actions
import {getContests, removeContest} from '../../REDUX_STORE/ACTIONS/ContestAction'

import classes from '../../CSS/Contests.module.css'

import { css } from "@emotion/core";

class Contests extends React.Component {
	state = {
		show: false,
		no_of_records: 5,
		from: 0,
		end: 5,
		page: 1,
		override: css`
			display: block;
			text-align: center;
		`
	}

	componentDidMount = () => {
		this.props.dispatch(getContests())
		this.setState({
			show: true,
		})
		setTimeout(() => {
			this.setState({
				show: false
			})
		}, 1000)
	}
	
	removeContest = (id) => {
    	this.props.dispatch(removeContest(id))
	}

	editContest = (id) => {
		console.log("edit item", id)
	}

	changeRecordsSize = (event) => {
		let no_of_records = event.target.value
		if(no_of_records === "#"){
			no_of_records = 5
		}
		this.setState({
			no_of_records: parseInt(no_of_records),
			page: 1,
			from: 0,
			end: parseInt(no_of_records)
		})
	}

	changePageSize = (value) => {
		if(value === "increment"){
			this.setState(prevState => ({
				page: prevState.page + 1,
				from: prevState.end,
				end: prevState.end + prevState.no_of_records
			}))
		}else{
			this.setState(prevState => ({
				page: prevState.page - 1,
				from: prevState.from - prevState.no_of_records,
				end: prevState.end - prevState.no_of_records
			}))
		}
	}

	render (){
		console.log("STATE", this.state)
		return (
		<Container>
			<Card cardstyles = {classes.Contests}>
				<div>{this.state.show && <PulseLoader color="#ff0055" loading={this.state.show} size={15} css={this.state.override}/>}</div>
				
				{
					!this.state.show && <Row lg={12} md={12} sm={12} xs={12}>
					<Col lg={12} md={12} sm={12} xs = {12}>
						<div className = {classes.ButtonStyle}>
							<Button size = "small" onClick = {() => this.props.history.push("/contests/new")}>+ Add Contest</Button>
							<select onChange = {this.changeRecordsSize}>
								<option value ="#">Records</option>
								<option value ="5">5</option>
								<option value ="10">10</option>
								<option value ="15">15</option>
							</select>

							<input type = "text" placeholder = "Search..."/>
						</div>
						<Table 
							edit = {this.editContest}
							remove = {this.removeContest} 
							rows = {this.props.contests.contests.slice(this.state.from,this.state.end)} 
							cols = {["#","Title","Game ID","Winners","Status","Declaration Date","Actions"]}
						/>
						<div className={classes.PaginationStyle}>
							<Button size = "small" onClick = {() => this.changePageSize("decrement")} disabled={this.state.page === 1}>Previous</Button>
							<Button size = "small" onClick = {() => this.changePageSize("increment")} disabled={Math.ceil((this.props.contests.contests.length/this.state.no_of_records)) === this.state.page}>Next</Button>
						</div>
					</Col>
					</Row>
				}
			</Card>
		</Container>
		)
	}
}

const mapStateToProps = (state) => {
    return {contests: state.contests}
}

export default connect(mapStateToProps)(Contests);