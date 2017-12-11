import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { setCurrentProgram } from '../../actions-and-reducers/programs/programs-action-creators.js'

export class ProgramDetail extends Component {

    static propTypes = {
        setCurrentProgram: PropTypes.func,
        currentProgram: PropTypes.object,
        uid: PropTypes.string,
        programId: PropTypes.string,
    }

    static defaultProps = {
        currentProgram: null,
    }

    componentWillMount() {
        this.props.uid && this.props.setCurrentProgram({
            uid: this.props.uid,
            programId: this.props.programId,
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
        uid: state.user.uid,
        currentProgram: state.programs.current,
    }
}

const actions = {
    setCurrentProgram,
}

export default connect(mapStateToProps, actions)(ProgramDetail)
