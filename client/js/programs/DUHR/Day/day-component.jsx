import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateProgram } from 'actions-and-reducers/programs/programs-action-creators.js'
import { updateDateCompleted, setExerciseWeight } from '../DUHR-actions.js'

class Day extends Component {

    static propTypes = {
        updateProgram: PropTypes.func,
        updateDateCompleted: PropTypes.func,
        setExerciseWeight: PropTypes.func,
        dayIndex: PropTypes.number,
        uid: PropTypes.string,
        programId: PropTypes.string,
        dbref: PropTypes.string,
        sets: PropTypes.number,
        reps: PropTypes.string,
        rest: PropTypes.string,
        exercises: PropTypes.array,
    }

    state = {
        currentDay: {},
    }

    setDifficulty = e => {
        if (!this.props.uid) {
            return
        }

        this.props.updateProgram({
            uid: this.props.uid,
            programId: this.props.programId,
            location: e.target.dataset.dbref,
            data: { difficulty: e.target.value },
        })

        this.props.updateDateCompleted({
            uid: this.props.uid,
            programId: this.props.programId,
            location: this.props.dbref,
        })
    }

    setWeight = e => {
        if (!this.props.uid) {
            return
        }

        this.props.setExerciseWeight({
            uid: this.props.uid,
            programId: this.props.programId,
            location: e.target.dataset.dbref,
            newWeight: e.target.value,
        })
    }

    render() {
        const {
            dayIndex,
            dbref,
            sets,
            reps,
            rest,
            exercises,
        } = this.props

        return (
            <table className="DUHR-day">
                <thead>
                    <tr>
                        <th className="day-number" colSpan="3">
                            Day {dayIndex + 1}
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="3" className="sets-reps-rest">
                            <div>
                                <em style={{fontSize: '11px'}}>
                                    <b style={{letterSpacing: '1px'}}>SETS</b>:
                                    &nbsp;&nbsp;{sets}
                                </em>
                                <em style={{fontSize: '11px'}}>
                                    <b style={{letterSpacing: '1px'}}>REPS</b>:
                                    &nbsp;&nbsp;{reps}
                                </em>
                                <em style={{fontSize: '11px'}}>
                                    <b style={{letterSpacing: '1px'}}>REST</b>:
                                    &nbsp;&nbsp;{rest}
                                </em>
                            </div>
                        </td>
                    </tr>
                    <tr className="labels">
                        <th>Exercise</th>
                        <th>Weight</th>
                        <th>Difficuty</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises && exercises.map((exercise, index) => (
                        <tr key={index}>
                            <td className="exercise-name">
                                {exercise.name}
                            </td>
                            <td className="exercise-weight">
                                <input
                                    type="text"
                                    data-dbref={`${dbref}/exercises/${index}`}
                                    value={exercise.weight}
                                    onChange={this.setWeight}
                                />
                            </td>
                            <td className="exercise-difficulty">
                                <select
                                    value={exercise.difficulty}
                                    data-dbref={`${dbref}/exercises/${index}`}
                                    onChange={this.setDifficulty}>
                                    <option value="">--</option>
                                    <option value="easy">Easy</option>
                                    <option value="ok">Ok</option>
                                    <option value="difficult">Difficult</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        uid: state.user.uid,
        programId: state.programs.current.id,
    }
}

const actions = {
    updateProgram,
    updateDateCompleted,
    setExerciseWeight,
}

export default connect(mapStateToProps, actions)(Day)
