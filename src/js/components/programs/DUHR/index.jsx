import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    listenForCurrentProgramEdit,
    stopListeningToCurrentProgram
} from '../../../actions/programs.js'
import {
    calcNextWeights
} from '../../../actions/DUHR.js'

import View from './view.jsx'

class Program extends Component {

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

    componentWillUnmount(){
        this.props.stopListeningToCurrentProgram(this.props.userId)
    }

    render() {
        const { userId, currentProgram } = this.props

        return (
            <View
                currentProgram={this.props.currentProgram}
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
    calcNextWeights
})(Program)
