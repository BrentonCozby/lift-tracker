import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import escape from 'escape-html'
import { setOneRepMax, setExerciseName } from '../../../../actions/DUHR.js'
import { updateProgram } from '../../../../actions/programs.js'
import View from './view.jsx'

class OneRepMaxesContainer extends Component {

    state = {
        isExpanded: false
    }

    expand = () => {
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    setOneRepMax = e => {
        const programWithoutId = {...this.props.currentProgram}
        delete programWithoutId.id

        const params = {
            userId: this.props.userId,
            programId: this.props.currentProgram.id,
            currentProgram: programWithoutId,
            newMax: +e.target.value,
            location: +e.target.dataset.location
        }

        this.props.setOneRepMax(params)
    }

    setExerciseName = e => {
        const programWithoutId = {...this.props.currentProgram}
        delete programWithoutId.id

        const params = {
            userId: this.props.userId,
            programId: this.props.currentProgram.id,
            currentProgram: programWithoutId,
            newName: escape(e.target.value),
            location: +e.target.dataset.location
        }

        this.props.setExerciseName(params)
    }

    addExercise = () => {
        const updatedProgram = {...this.props.currentProgram}
        // delete the id because we don't want to store that in the database
        delete updatedProgram.id

        // add new exercise to one rep maxes
        updatedProgram.oneRepMaxes.push({name: '', oneRepMax: 0})

        // add new exercise to each day in the plan
        updatedProgram.plan.forEach((week, weekIndex) => {
            week.forEach((day, dayIndex) => {
                const diff = day.exercises[0].diff
                updatedProgram.plan[weekIndex][dayIndex].exercises.push({
                    diff: diff,
                    difficulty: '',
                    name: '',
                    weight: 0
                })
            })
        })

        this.props.updateProgram(this.props.userId, this.props.currentProgram.id, null, updatedProgram)
    }

    render() {
        const { currentProgram } = this.props

        const maxesContainerClasses = classnames({
            'one-rep-maxes-container': true,
            'expanded': this.state.isExpanded
        })

        return (
            <View
                expand={this.expand}
                setOneRepMax={this.setOneRepMax}
                addExercise={this.addExercise}
                setExerciseName={this.setExerciseName}
                oneRepMaxes={currentProgram && currentProgram.oneRepMaxes}
                maxesContainerClasses={maxesContainerClasses}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userId: state.user.uid
    }
}

export default connect(mapStateToProps, {
    setOneRepMax,
    setExerciseName,
    updateProgram
})(OneRepMaxesContainer)
