import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentProgram } from '../actions/programs.js'

import ProgramDetail from '../components/ProgramDetail.jsx'
import DUHR from '../containers/DUHR/ProgramContainer.jsx'

class ProgramDetailContainer extends Component {

    componentWillMount() {
        this.props.setCurrentProgram(this.props.userId, this.props.programId)
    }

    renderProgramDetail = () => {
        if(this.props.currentProgram) {
            switch (this.props.currentProgram.title) {
                case 'Daily Undulating High Rep':
                    return <DUHR />
            }
        }
        else {
            return <h3 className="loading">Loading...</h3>
        }
    }

    render() {
        const { currentProgram } = this.props
        return (
            <ProgramDetail title={currentProgram && currentProgram.title}>
                {this.renderProgramDetail()}
            </ProgramDetail>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid,
        currentProgram: state.programs.current
    }
}

export default connect(mapStateToProps, {
    setCurrentProgram
})(ProgramDetailContainer)
