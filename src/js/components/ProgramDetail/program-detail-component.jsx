import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setCurrentProgram } from '../../actions-and-reducers/programs/programs-action-creators.js'

export class ProgramDetail extends Component {

    static propTypes = {
        setCurrentProgram: PropTypes.func,
        currentProgram: PropTypes.object,
        userId: PropTypes.string,
        programId: PropTypes.string
    }

    componentWillMount() {
        this.props.setCurrentProgram({
            userId: this.props.userId,
            programId: this.props.programId
        })
    }

    render() {
        const { currentProgram } = this.props

        const CurrentProgramComponent = (function () {
            if (currentProgram) {
                return require(`../../programs/${currentProgram.dirName}/${currentProgram.dirName}-component.jsx`).default
            }

            return null
        })()

        if (!currentProgram) {
            return <div></div>
        }
        
        return (
            <div className="ProgramDetail">
                <h1 className="ProgramDetail-title">{currentProgram.title}</h1>
                <CurrentProgramComponent />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid,
        currentProgram: state.programs.current
    }
}

const actions = {
    setCurrentProgram
}

export default connect(mapStateToProps, actions)(ProgramDetail)
