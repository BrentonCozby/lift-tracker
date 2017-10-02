import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    listenForAuthStateChanged,
    retrieveLoginResult
} from '../../actions/user.js'

import View from './view.jsx'

class App extends Component {

    componentWillMount() {
        this.props.retrieveLoginResult()
        this.props.listenForAuthStateChanged()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn === false && nextProps.location.pathname !== '/login') {
            this.props.history.replace(`${PP}login`)
        }
    }

    render() {
        return (
            <View
                isLoggedIn={this.props.isLoggedIn}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps, {
    listenForAuthStateChanged,
    retrieveLoginResult
})(App)
