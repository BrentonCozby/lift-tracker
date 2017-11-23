import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProgramCard from './ProgramCard/program-card-component.jsx'
import {
    stopListeningToCurrentProgram,
    nullifyCurrentProgram,
    saveNewProgram,
    getProgramTitles
} from '../../actions-and-reducers/programs/programs-action-creators.js'

class ProgramsList extends Component {

    static propTypes = {
        stopListeningToCurrentProgram: PropTypes.func,
        nullifyCurrentProgram: PropTypes.func,
        saveNewProgram: PropTypes.func,
        getProgramTitles: PropTypes.func,
        userId: PropTypes.string,
        isLoggedIn: PropTypes.bool,
        isAdmin: PropTypes.bool,
        programTitles: PropTypes.array
    }

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
        const { programTitles, isLoggedIn, isAdmin, userId } = this.props // eslint-disable-line no-unused-vars

        return (
            <table className="ProgramsList">
                <thead>
                    <tr>
                        <th>
                            <h2 className="ProgramsList-title">Programs</h2>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {programTitles && programTitles.map(program => (
                        <tr key={program.id}>
                            <td>
                                <ProgramCard
                                    programId={program.id}
                                    title={program.title}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td>
                            {isLoggedIn && isAdmin &&
                                <button
                                    className="save-new-program-btn"
                                    onClick={this.saveNewProgram}>
                                    Save New Program
                                </button>
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
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
