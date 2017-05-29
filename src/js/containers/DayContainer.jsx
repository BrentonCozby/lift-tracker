import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePlan } from '../actions/programs.js'

import Day from '../components/Day.jsx'

class DayContainer extends Component {

    updatePlan = (e) => {
        this.props.updatePlan(e.target.dataset.dbref, e.target.value)
    }

    render() {
        return (
            <Day
                updatePlan={this.updatePlan}
                programId={this.props.programId}
                weekIndex={this.props.weekIndex}
                dayIndex={this.props.dayIndex}
                exercises={this.props.exercises}
                sets={this.props.sets}
                reps={this.props.reps}
                rest={this.props.rest}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {

    }
}

export default connect(mapStateToProps, {
    updatePlan
})(DayContainer)
