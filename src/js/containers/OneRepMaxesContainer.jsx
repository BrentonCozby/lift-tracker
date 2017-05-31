import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProgram } from '../actions/programs.js'
import classnames from 'classnames'

import OneRepMaxes from '../components/OneRepMaxes.jsx'

class OneRepMaxesContainer extends Component {

    state = {
        isExpanded: false
    }

    expand = () => {
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    setOneRepMax = (e) => {
        const updated = {...this.props.currentProgram}
        const newMax = e.target.value
        const location = e.target.dataset.location

        // set first week weights from one-rep-maxes
        this.props.currentProgram.plan[0].forEach((day, dayIndex) => {
            day.exercises.forEach((exercise, exerciseIndex) => {
                this.props.currentProgram.oneRepMaxes.forEach((max, maxIndex) => {
                    if(max.name === exercise.name && +location === +maxIndex) {
                        const firstWeight = Math.round(+newMax * +day.firstWeightFactor)
                        updated.oneRepMaxes[maxIndex].oneRepMax = (+newMax === 0) ? '' : +newMax
                        updated.plan[0][dayIndex].exercises[exerciseIndex].weight = firstWeight
                    }
                })
            })
        })

        this.props.updateProgram(this.props.dbref, updated)
    }

    render() {
        const { dbref, currentProgram } = this.props

        const maxesContainerClasses = classnames({
            'one-rep-maxes-container': true,
            'expanded': this.state.isExpanded
        })

        return (
            <OneRepMaxes
                dbref={dbref}
                expand={this.expand}
                setOneRepMax={this.setOneRepMax}
                oneRepMaxes={currentProgram && currentProgram.oneRepMaxes}
                maxesContainerClasses={maxesContainerClasses}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        currentProgram: state.programs.current
    }
}

export default connect(mapStateToProps, {
    updateProgram
})(OneRepMaxesContainer)
