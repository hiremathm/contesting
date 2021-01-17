import React from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import {Col, Row, Container} from 'react-bootstrap'

import Card from '../UI/Card'

import classes from '../CSS/Contests.module.css'

// Actions
import {getContests} from '../REDUX_STORE/ACTIONS/ContestAction'

// components
import MyComponent from '../COMPONENTS/Table'
class Contests extends React.Component {

	componentDidMount = () => {
		this.props.dispatch(getContests())
	}

	render (){
	const data = this.props.contests.contests.map((contest, id) => {
  		return (
  			{title: contest.title.toUpperCase(), game_id: contest.contest_unique_id, id, winners: contest.no_of_winners, status: contest.status.toUpperCase(), date: new Date(contest.winners_declared_at).toDateString()}
  		)
  	})

		return (
		<Container>
			<Card cardstyles = {classes.Contests}>
				<Row lg={12} md={12} sm={12} xs={12}>
					<Col lg={12} md={12} sm={12} xs = {12}>
						{/*<Table>
						  <thead>
						    <tr>
						      <th>#</th>
						      <th>Title</th>
						      <th>Game ID</th>
						      <th>Winners</th>
						      <th>Status</th>
						      <th>Daclaration Date</th>
						      <th>Actions</th>
						    </tr>
						  </thead>
						  <tbody>
							  {(this.props.contests.contests.length > 0) && this.props.contests.contests.map((contest, index) => 
							    	<tr key = {index}>
										<td>{index}</td>
										<td>{contest.title.toUpperCase()}</td>
										<td>{contest.contest_unique_id}</td>
										<td>{contest.no_of_winners}</td>
										<td>{contest.status}</td>
										<td>{contest.winners_declared_at}</td>
										<td>actions</td>
							    	</tr>
							  	
							  )}
						  </tbody>
						</Table>*/}
						{(this.props.contests.contests.length > 0) && <MyComponent data = {data}/>}
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