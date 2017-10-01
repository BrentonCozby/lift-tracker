import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseLoginRedirect, retrieveLoginResult } from '../actions/user.js'
import { PP } from '../../../config.js'

import LoginPage from '../components/LoginPage.jsx'

class LoginPageContainer extends Component {

    state = {
        isLoading: true
    }

    componentWillMount() {
        this.props.retrieveLoginResult().then(() => {
            this.setState({isLoading: false})
        })
    }

    componentDidUpdate() {
        if(!this.state.isLoading && this.props.uid && this.props.history) {
            this.props.history.push(`${PP}`)
        }
    }

    firebaseLoginRedirect = (e) => {
        this.props.firebaseLoginRedirect(e.currentTarget.dataset.method)
    }

    render() {
        return (
            <LoginPage
                firebaseLoginRedirect={this.firebaseLoginRedirect}
                isLoading={this.state.isLoading}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        uid: state.user.uid
    }
}

export default connect(mapStateToProps, {
    firebaseLoginRedirect,
    retrieveLoginResult
})(LoginPageContainer)
