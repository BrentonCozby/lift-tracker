import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { setCurrentProgram } from '../../../actions-and-reducers/programs/programs-actions.js'

class ProgramCard extends Component {

    static propTypes = {
        setCurrentProgram: PropTypes.func,
        programId: PropTypes.string,
        title: PropTypes.string,
        userId: PropTypes.string
    }

    setCurrentProgram = () => {
        this.props.setCurrentProgram(this.props.userId, this.props.programId)
    }

    render() {
        return (
            <Link
                to={`${PP}programs/${this.props.programId}`}
                className="ProgramCard">
                <h3 className="ProgramCard-title">{this.props.title}</h3>
            </Link>
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
})(ProgramCard)
