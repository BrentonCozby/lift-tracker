import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    stopListeningToCurrentProgram,
    nullifyCurrentProgram,
    saveNewProgram,
    getProgramTitles
} from '../../actions/programs.js'

import View from './view.jsx'

class ProgramsList extends Component {

    componentWillMount() {
        this.props.stopListeningToCurrentProgram(this.props.userId)
        this.props.nullifyCurrentProgram()

        if (this.props.isLoggedIn) {
            this.props.getProgramTitles()
        }
    }

    saveNewProgram = (program) => {
        this.props.saveNewProgram(program)
    }

    render() {
        return (
            <View
                programTitles={this.props.programTitles || []}
                saveNewProgram={this.saveNewProgram}
                isLoggedIn={this.props.isLoggedIn}
                isAdmin={this.props.isAdmin}
            />
        )
    }
}

const mapStateToProps = state => ({
    programTitles: state.programs.titles,
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.isAdmin,
    userId: state.user.uid
})

const actions = {
    stopListeningToCurrentProgram,
    nullifyCurrentProgram,
    saveNewProgram,
    getProgramTitles
}

export default connect(mapStateToProps, actions)(withRouter(ProgramsList))
