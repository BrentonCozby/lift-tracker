import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveNewProgram } from '../actions/programs.js'
import DUHR from '../../../program-data/DUHR.js'

import ProgramsList from '../components/ProgramsList.jsx'

class ProgramsListContainer extends Component {

    saveNewProgram = (program) => {
        this.props.saveNewProgram(DUHR)
    }

    render() {
        return (
            <ProgramsList
                programTitles={this.props.programTitles || []}
                saveNewProgram={this.saveNewProgram}
                isLoggedIn={this.props.isLoggedIn}
                isAdmin={this.props.isAdmin}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        programTitles: state.programs.titles,
        isLoggedIn: Boolean(state.user.uid),
        isAdmin: state.user.isAdmin
    }
}

export default connect(mapStateToProps, {
    saveNewProgram
})(ProgramsListContainer)
