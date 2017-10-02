import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    firebaseLoginRedirect,
    setUserLoadingState
} from '../../actions/user.js'

import View from './view.jsx'

class LoginPage extends Component {

    componentWillMount() {
        if (this.props.isLoggedIn) {
            this.props.history.replace(PP)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isGettingUserData === false && nextProps.uid) {
            this.props.history.push(PP)
        }
    }

    firebaseLoginRedirect = e => {
        this.props.firebaseLoginRedirect(e.currentTarget.dataset.method)
    }

    render() {
        return (
            <View
                firebaseLoginRedirect={this.firebaseLoginRedirect}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        uid: state.user.uid,
        isLoggedIn: state.user.isLoggedIn,
        isGettingUserData: state.user.loadingStates.isGettingUserData
    }
}

const actions = {
    firebaseLoginRedirect,
    setUserLoadingState
}

export default connect(mapStateToProps, actions)(LoginPage)
