import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setProgramValue } from '../../../../actions/programs.js'

import View from './view.jsx'

class DayContainer extends Component {

    render() {
        return (
            <View
                setProgramValue={this.props.setProgramValue}
                dayIndex={this.props.dayIndex}
                userId={this.props.userId}
                programId={this.props.programId}
                dbref={this.props.dbref}
                sets={this.props.sets}
                reps={this.props.reps}
                rest={this.props.rest}
                exercises={this.props.exercises}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userId: state.user.uid,
        programId: state.programs.current.id
    }
}

export default connect(mapStateToProps, {
    setProgramValue
})(DayContainer)
