import React, { Component } from 'react'
import { connect } from 'react-redux'
import View from './view.jsx'
import { setCurrentProgram } from '../../../actions/programs.js'

class ProgramCardContainer extends Component {

    setCurrentProgram = () => {
        this.props.setCurrentProgram(this.props.userId, this.props.programId)
    }

    render() {
        return (
            <View
                setCurrentProgram={this.setCurrentProgram}
                title={this.props.title}
                id={this.props.programId}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.user.uid
    }
}

export default connect(mapStateToProps, {
    setCurrentProgram
})(ProgramCardContainer)
