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
		override: css`
			display: block;
			text-align: center;
		`
	}

	componentDidMount = () => {
		this.props.dispatch(getContests())
		this.setState({
			show: true
		})
		setTimeout(() => {
			this.setState({
				show: false
			})
		}, 3000)
	}
	
	removeContest = (id) => {
    	this.props.dispatch(removeContest(id))
	}

	editContest = (id) => {
		console.log("edit item", id)
	}

	render (){
		// console.log("COMPONENT RENDERED")
		return (
		<Container>
			<Card cardstyles = {classes.Contests}>
				<div>{this.state.show && <PulseLoader color="#ff0055" loading={this.state.show} size={15} css={this.state.override}/>}</div>
				
				{!this.state.show && <Row lg={12} md={12} sm={12} xs={12}>
					<Col lg={12} md={12} sm={12} xs = {12}>
						<div className = {classes.ButtonStyle}>
							<h3>All Contests</h3>
							<Button size = "small" onClick = {() => this.props.history.push("/contests/new")}>+ Add Contest</Button>
						</div>
						<Table 
							edit = {this.editContest}
							remove = {this.removeContest} 
							rows = {this.props.contests.contests.slice(0, 10)} 
							cols = {["#","Title","Game ID","Winners","Status","Declaration Date","Actions"]}
						/>
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