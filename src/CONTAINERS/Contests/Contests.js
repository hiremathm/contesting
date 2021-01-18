import React from 'react'
import { connect } from 'react-redux'
import {Col, Row, Container} from 'react-bootstrap'

import Card from '../../UI/Card'
import Button from '../../UI/Button'
import Table from '../../UI/Table'
// Actions
import {getContests} from '../../REDUX_STORE/ACTIONS/ContestAction'

import classes from '../../CSS/Contests.module.css'

class Contests extends React.Component {
	componentDidMount = () => {
		this.props.dispatch(getContests())
	}

	render (){
	// const data = this.props.contests.contests.map((contest, id) => {
 //  		return (
 //  			{title: contest.title.toUpperCase(), game_id: contest.contest_unique_id, id, winners: contest.no_of_winners, status: contest.status.toUpperCase(), date: new Date(contest.winners_declared_at).toDateString()}
 //  		)
 //  	})

		return (
		<Container>
			<Card cardstyles = {classes.Contests}>
				<Row lg={12} md={12} sm={12} xs={12}>
					<Col lg={12} md={12} sm={12} xs = {12}>
						<div className = {classes.ButtonStyle}>
							<h3>All Contests</h3>
							<Button size = "small" onClick = {() => this.props.history.push("/contests/new")}>+ Add Contest</Button>
						</div>
						<Table rows = {this.props.contests.contests.slice(0, 10)} cols = {["#","Title","Game ID","Winners","Status","Declaration Date","Actions"]}/>
					</Col>
				</Row>
			</Card>
		</Container>
		)
	}
}

const mapStateToProps = (state) => {
    return {contests: state.contests}
}

export default connect(mapStateToProps)(Contests);