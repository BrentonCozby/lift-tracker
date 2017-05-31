import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    listenForCurrentProgramEdit,
    stopListeningCurrentProgramEdit,
    updateProgram,
    setProgramValue
} from '../actions/programs.js'

import ProgramDetail from '../components/ProgramDetail.jsx'

class ProgramDetailContainer extends Component {

    componentDidMount() {
        this.id = this.props.match.params.id
        this.props.listenForCurrentProgramEdit(this.id)
    }

    componentWillUnmount() {
        this.props.stopListeningCurrentProgramEdit(this.id)
    }

    calcNextWeights = (plan) => {
        const _this = this

        let updates = {}

        // calculate the next weeks' weights from the previous week
        plan.forEach((week, weekIndex) => {
            week.forEach((day, dayIndex) => {
                if(day.exercises.some(e => !e.difficulty)) {
                    // skip creating next day and delete it if exists
                    const dbref = `${weekIndex + 1}/${dayIndex}`
                    updates[dbref] = null
                    return false
                }

                const nextDay = {...day}
                nextDay.exercises = []

                // create the next day, with calculated weights from same day last week
                day.exercises.forEach((currentExercise, exerciseIndex) => {
                    const newNextExercise = {
                        diff: currentExercise.diff,
                        name: currentExercise.name,
                        difficulty: undefined
                    }

                    if(weekIndex === plan.length - 2) {
                        newNextExercise.difficulty = ''
                    }
                    else if(plan[weekIndex + 1][dayIndex]) {
                        plan[weekIndex + 1][dayIndex].exercises.forEach(nextExercise => {
                            if(nextExercise.name === currentExercise.name) {
                                newNextExercise.difficulty = nextExercise.difficulty
                            }
                        })
                    }

                    newNextExercise.weight = (() => {
                        switch(currentExercise.difficulty) {
                            case 'easy':
                                return +currentExercise.weight + +currentExercise.diff
                            case 'ok':
                                return +currentExercise.weight
                            case 'difficult':
                                return +currentExercise.weight - +currentExercise.diff
                        }
                    })()

                    nextDay.exercises.push(newNextExercise)
                })

                // rotate exercises
                const temp = nextDay.exercises.shift()
                nextDay.exercises.push(temp)

                // add nextDay to updates object
                const dbref = `${weekIndex + 1}/${dayIndex}`
                updates[dbref] = nextDay
            })
        })

        // update the program with the next days
        _this.props.updateProgram(`${this.id}/plan/`, updates)
    }

    componentDidUpdate() {
        const plan = [...this.props.currentProgram.plan]
        this.calcNextWeights(plan)
    }

    render() {
        return (
            <ProgramDetail
                {...this.props.currentProgram}
                dbref={this.id}
                setProgramValue={this.props.setProgramValue}
                calcFirstWeights={this.calcFirstWeights}
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
    listenForCurrentProgramEdit,
    stopListeningCurrentProgramEdit,
    updateProgram,
    setProgramValue
})(ProgramDetailContainer)
