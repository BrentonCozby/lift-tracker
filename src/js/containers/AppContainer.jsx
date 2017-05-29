import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listenForAuthStateChanged } from '../actions/user.js'
import { listenForProgramsEdit } from '../actions/programs.js'

import App from '../components/App.jsx'

class AppContainer extends Component {

    componentDidMount() {
        this.props.listenForAuthStateChanged()
        this.props.listenForProgramsEdit()
    }

    render() {
        return (
            <App />
        )
    }
}

const mapStateToProps = function(state) {
    return {

    }
}

export default connect(mapStateToProps, {
    listenForAuthStateChanged,
    listenForProgramsEdit
})(AppContainer)
