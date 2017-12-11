import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { firebaseLoginRedirect } from '../../actions-and-reducers/user/user-action-creators.js'

export class LoginPage extends Component {

    static propTypes = {
        firebaseLoginRedirect: PropTypes.func,
        history: PropTypes.object,
        isGettingUserData: PropTypes.bool,
        isLoading: PropTypes.bool,
        uid: PropTypes.string,
    }

    componentWillMount() {
        if (this.props.uid) {
            this.props.history.replace(PP)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isGettingUserData === false && nextProps.uid) {
            this.props.history.push(PP)
        }
    }

    firebaseLoginRedirect = e => {
        this.props.firebaseLoginRedirect({loginMethod: e.currentTarget.dataset.method})
    }

    render() {
        const btnAttrs = {
            onClick: this.firebaseLoginRedirect,
        }

        return (
            <div className="LoginPage">
                <h1 className="LoginPage-title">Login Required</h1>
                <div className="login-buttons-container">
                    <button data-method="Facebook" {...btnAttrs} className="login-btn facebook">facebook</button>
                    <button data-method="Google" {...btnAttrs} className="login-btn google">google</button>
                    <button data-method="Twitter" {...btnAttrs} className="login-btn twitter">twitter</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        uid: state.user.uid,
        isGettingUserData: state.loadingStates.isGettingUserData,
    }
}

const actions = {
    firebaseLoginRedirect,
}

export default connect(mapStateToProps, actions)(LoginPage)
