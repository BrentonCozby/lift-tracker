import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    listenForCurrentProgramEdit,
    stopListeningCurrentProgramEdit
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

    render() {
        return (
            <ProgramDetail {...this.props.currentProgram} programId={this.id} />
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
    stopListeningCurrentProgramEdit
})(ProgramDetailContainer)
