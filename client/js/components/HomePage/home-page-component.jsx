import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ProgramsList from '../ProgramsList/programs-list-component.jsx'

export class HomePage extends Component {

    static propTypes = {
        uid: PropTypes.string,
        history: PropTypes.object,
    }

    componentWillMount() {
        if (!this.props.uid) {
            this.props.history.push(`${PP}login`)
        }
    }

    render() {
        return (
            <div className="HomePage">
                <h2 className="app-title">Lift Tracker</h2>
                <ProgramsList />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.user.uid,
})

const actions = {

}

export default connect(mapStateToProps, actions)(HomePage)
