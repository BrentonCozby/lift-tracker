import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setProgramValue } from '../../../actions-and-reducers/programs/programs-actions.js'

class Day extends Component {

    static propTypes = {
        setProgramValue: PropTypes.func,
        dayIndex: PropTypes.number,
        userId: PropTypes.string,
        programId: PropTypes.string,
        dbref: PropTypes.string,
        sets: PropTypes.number,
        reps: PropTypes.string,
        rest: PropTypes.string,
        exercises: PropTypes.array
    }

    setDifficulty = e => {
        this.props.setProgramValue(
            this.props.userId,
            this.props.programId,
            e.target.dataset.dbref,
            e.target.value
        )
    }

    render() {
        const {
            dayIndex,
            dbref,
            sets,
            reps,
            rest,
            exercises
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
                            <td className="exercise-weight">{exercise.weight}</td>
                            <td className="exercise-difficulty">
                                <select
                                    value={exercise.difficulty}
                                    data-dbref={`${dbref}/exercises/${index}/difficulty`}
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
        userId: state.user.uid,
        programId: state.programs.current.id
    }
}

const actions = {
    setProgramValue
}

export default connect(mapStateToProps, actions)(Day)
