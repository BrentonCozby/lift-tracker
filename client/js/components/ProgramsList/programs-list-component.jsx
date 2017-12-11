import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProgramCard from './ProgramCard/program-card-component.jsx'
import {
    stopListeningToCurrentProgram,
    nullifyCurrentProgram,
    saveNewProgram,
    getProgramTitles,
} from '../../actions-and-reducers/programs/programs-action-creators.js'

export class ProgramsList extends Component {

    static propTypes = {
        stopListeningToCurrentProgram: PropTypes.func,
        nullifyCurrentProgram: PropTypes.func,
        saveNewProgram: PropTypes.func,
        getProgramTitles: PropTypes.func,
        uid: PropTypes.string,
        isAdmin: PropTypes.bool,
        programTitles: PropTypes.array,
    }

    static defaultProps = {
        programTitles: [],
        uid: '',
        isAdmin: false,
    }

    componentWillMount() {
        this.props.uid && this.props.stopListeningToCurrentProgram({uid: this.props.uid})
        this.props.nullifyCurrentProgram()

        if (this.props.uid) {
            this.props.getProgramTitles()
        }
    }

    saveNewProgram = (program) => {
        this.props.saveNewProgram({programData: program})
    }

    render() {
        const { programTitles = [], uid, isAdmin } = this.props // eslint-disable-line no-unused-vars

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
                    {programTitles.map(program => (
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
                            {uid && isAdmin &&
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
    uid: state.user.uid,
    isAdmin: state.user.isAdmin,
})

const actions = {
    stopListeningToCurrentProgram,
    nullifyCurrentProgram,
    saveNewProgram,
    getProgramTitles,
}

export default connect(mapStateToProps, actions)(withRouter(ProgramsList))
