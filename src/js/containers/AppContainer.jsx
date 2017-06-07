import React, { Component } from 'react'
import { connect } from 'react-redux'
import { listenForAuthStateChanged } from '../actions/user.js'
import { getProgramTitles } from '../actions/programs.js'

import App from '../components/App.jsx'

class AppContainer extends Component {

    componentDidMount() {
        this.props.listenForAuthStateChanged()
        this.props.getProgramTitles()
    }

    render() {
        return (
            <App
                isLoggedIn={this.props.isLoggedIn}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        isLoggedIn: Boolean(state.user.uid)
    }
}

export default connect(mapStateToProps, {
    listenForAuthStateChanged,
    getProgramTitles
})(AppContainer)
