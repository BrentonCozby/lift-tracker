import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
    listenForCurrentProgramEdit,
    stopListeningToCurrentProgram
} from '../../actions-and-reducers/programs/programs-action-creators.js'
import { calcNextWeights } from './DUHR-actions.js'
import Week from './Week/week-component.jsx'
import OneRepMaxes from './OneRepMaxes/one-rep-maxes-component.jsx'

class Program extends Component {

    static propTypes = {
        currentProgram: PropTypes.object,
        uid: PropTypes.string,
        listenForCurrentProgramEdit: PropTypes.func,
        stopListeningToCurrentProgram: PropTypes.func,
        calcNextWeights: PropTypes.func
    }

    state = {
        isListening: false
    }

    componentWillMount() {
        this.props.listenForCurrentProgramEdit({
            uid: this.props.uid,
            programId: this.props.currentProgram.id
        })
    }

    componentDidUpdate() {
        if(this.props.currentProgram) {
            const plan = [...this.props.currentProgram.plan]
            this.props.calcNextWeights(this.props.uid, this.props.currentProgram.id, plan)

            if(!this.state.programId) {
                this.props.listenForCurrentProgramEdit({
                    uid: this.props.uid,
                    programId: this.props.currentProgram.id
                })
                this.setState({programId: this.props.currentProgram.id})
            }
        }
    }

    componentWillUnmount(){
        this.props.stopListeningToCurrentProgram({uid: this.props.uid})
    }

    render() {
        const { currentProgram = {} } = this.props
        const { plan } = currentProgram

        return (
            <div className="DUHR">
                <OneRepMaxes currentProgram={currentProgram} />
                {plan && plan.map((week, index) => (
                    <Week
                        dbref={`plan/${index}`}
                        weekIndex={index}
                        days={week}
                        key={index}
                    />
                ))}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        currentProgram: state.programs.current,
        uid: state.user.uid
    }
}

const actions = {
    listenForCurrentProgramEdit,
    stopListeningToCurrentProgram,
    calcNextWeights
}

export default connect(mapStateToProps, actions)(Program)
