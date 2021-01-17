import React, {useState} from 'react'
import { connect } from 'react-redux'
import {Table, Modal} from 'react-bootstrap'
import {Col, Row, Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

import Card from '../UI/Card'
import Button from '../UI/Button'

// Actions
import {getContests} from '../REDUX_STORE/ACTIONS/ContestAction'

// components
import MyComponent from '../COMPONENTS/Table'

import tableClasses from '../CSS/Table.module.css'
import classes from '../CSS/Contests.module.css'

class Contests extends React.Component {
	constructor(props){
		super(props)
		this.state = {show: false}
	}
	componentDidMount = () => {
		this.props.dispatch(getContests())
	}

	setShow = (value) => {
		this.setState({show: value})
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
						<Button size = "small" onClick = {() => this.setShow(true)}>+ Add Contest</Button>
						<Modal
					        show={this.state.show}
					        onHide={() => this.setShow(false)}
					        dialogClassName="modal-90w"
					        aria-labelledby="example-custom-modal-styling-title"
					      >
					        <Modal.Header closeButton>
					          <Modal.Title id="example-custom-modal-styling-title">
					            Custom Modal Styling
					          </Modal.Title>
					        </Modal.Header>
					        <Modal.Body>
					          <p>
					            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
					            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
					            ipsam atque a dolores quisquam quisquam adipisci possimus
					            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
					            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
					            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
					            deleniti rem!
					          </p>
					        </Modal.Body>
					    </Modal>

						{<Table className = {tableClasses.Table}>
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
										<td>{new Date(contest.winners_declared_at).toDateString()}</td>
										<td>actions</td>
							    	</tr>
							  	
							  )}
						  </tbody>
						</Table>}

						{/*(this.props.contests.contests.length > 0) && <MyComponent data = {data}/>*/}
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