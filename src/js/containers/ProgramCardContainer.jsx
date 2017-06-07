import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProgramCard from '../components/ProgramCard.jsx'
import { setCurrentProgram } from '../actions/programs.js'

class ProgramCardContainer extends Component {

    setCurrentProgram = () => {
        this.props.setCurrentProgram(this.props.userId, this.props.programId)
    }

    render() {
        return (
            <ProgramCard
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
