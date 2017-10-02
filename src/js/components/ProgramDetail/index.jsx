import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCurrentProgram } from '../../actions/programs.js'

import View from './view.jsx'

class ProgramDetail extends Component {

    componentWillMount() {
        this.props.setCurrentProgram(this.props.userId, this.props.programId)
    }

    render() {
        const { currentProgram } = this.props

        const CurrentProgramComponent = (function () {
            if (currentProgram) {
                return require(`../programs/${currentProgram.dirName}/index.jsx`).default
            }

            return null
        })()
        
        return (
            <View
                currentProgram={currentProgram}
                CurrentProgramComponent={CurrentProgramComponent}
            />
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
})(ProgramDetail)
