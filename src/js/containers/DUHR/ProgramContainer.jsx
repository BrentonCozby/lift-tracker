import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    listenForCurrentProgramEdit,
    stopListeningToCurrentProgram,
    nullifyCurrentProgram,
    setProgramValue
} from '../../actions/programs.js'
import {
    calcNextWeights
} from '../../actions/DUHR.js'

import Program from '../../components/DUHR/Program.jsx'

class ProgramContainer extends Component {

    state = {
        isListening: false
    }

    componentDidUpdate() {
        if(this.props.currentProgram) {
            const plan = [...this.props.currentProgram.plan]
            this.props.calcNextWeights(this.props.userId, this.props.currentProgram.id, plan)

            if(!this.state.programId) {
                this.props.listenForCurrentProgramEdit(this.props.userId, this.props.currentProgram.id)
                this.setState({programId: this.props.currentProgram.id})
            }
        }
    }

    render() {
        const { userId, currentProgram } = this.props
        return (
            <Program
                {...this.props.currentProgram}
                setProgramValue={this.props.setProgramValue}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        currentProgram: state.programs.current,
        userId: state.user.uid
    }
}

export default connect(mapStateToProps, {
    listenForCurrentProgramEdit,
    stopListeningToCurrentProgram,
    nullifyCurrentProgram,
    setProgramValue,
    calcNextWeights
})(ProgramContainer)
