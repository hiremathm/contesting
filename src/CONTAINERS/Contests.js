import React from 'react'
import { connect } from 'react-redux'

class Contests extends React.Component {
	render (){
		return (
			<div>This is shivakumara contesting enginee page</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {user: state.user}
}

export default connect(mapStateToProps)(Contests);