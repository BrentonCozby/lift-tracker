import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import sanitizeHtml from 'sanitize-html'

import { setOneRepMax, setExerciseName } from '../DUHR-actions.js'
import { updateProgram } from '../../../actions-and-reducers/programs/programs-action-creators.js'

class OneRepMaxes extends Component {

    static propTypes = {
        setOneRepMax: PropTypes.func,
        setExerciseName: PropTypes.func,
        updateProgram: PropTypes.func,
        currentProgram: PropTypes.object,
        userId: PropTypes.string
    }

    state = {
        isExpanded: false
    }

    expand = () => {
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    setOneRepMax = e => {
        const programWithoutId = { ...this.props.currentProgram }
        // delete the id because we don't want to store that in the database
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
            newName: sanitizeHtml(e.target.value),
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

        this.props.updateProgram({
            userId: this.props.userId,
            programId: this.props.currentProgram.id,
            data: updatedProgram
        })
    }

    deleteExercise = e => {
        const confirmDelete = confirm(`Delete exercise "${e.target.dataset.name}"?`)

        if (!confirmDelete) {
            return
        }

        const updatedProgram = { ...this.props.currentProgram }
        // delete the id because we don't want to store that in the database
        delete updatedProgram.id

        // add new exercise to one rep maxes
        updatedProgram.oneRepMaxes.splice(+e.target.dataset.location, 1)

        // add new exercise to each day in the plan
        updatedProgram.plan.forEach((week, weekIndex) => {
            week.forEach((day, dayIndex) => {
                updatedProgram.plan[weekIndex][dayIndex].exercises
                    .splice(+e.target.dataset.location, 1)
            })
        })

        this.props.updateProgram({
            userId: this.props.userId,
            programId: this.props.currentProgram.id,
            data: updatedProgram
        })
    }

    render() {
        const {
            currentProgram = {}
        } = this.props

        const { oneRepMaxes } = currentProgram

        const maxesContainerClasses = classnames({
            'one-rep-maxes-container': true,
            'expanded': this.state.isExpanded
        })

        return (
            <div className="DUHR-one-rep-maxes">
                <h3 className="title" onClick={this.expand}>one rep maxes</h3>
                <div className={maxesContainerClasses}>
                    {oneRepMaxes && oneRepMaxes.map((max, maxIndex) => (
                        <div key={maxIndex} className="form-input">
                            <input
                                className="name"
                                type="text"
                                value={max.name}
                                onChange={this.setExerciseName}
                                data-location={maxIndex}
                            />
                            <input
                                className="weight"
                                type="number"
                                value={max.oneRepMax}
                                onChange={this.setOneRepMax}
                                data-location={maxIndex}
                            />
                            <button
                                className="delete"
                                data-location={maxIndex}
                                data-name={max.name}
                                onClick={this.deleteExercise}>
                                ×
                            </button>
                        </div>
                    ))}
                    <div className="form-input">
                        <button onClick={this.addExercise} className="add-exercise">+ Add Exercise</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userId: state.user.uid
    }
}

const actions = {
    setOneRepMax,
    setExerciseName,
    updateProgram
}

export default connect(mapStateToProps, actions)(OneRepMaxes)
