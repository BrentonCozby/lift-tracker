import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { firebaseLoginRedirect, setUserLoadingState } from '../../actions-and-reducers/user/user-actions.js'

class LoginPage extends Component {

    static propTypes = {
        firebaseLoginRedirect: PropTypes.func,
        setUserLoadingState: PropTypes.func,
        history: PropTypes.object,
        isLoggedIn: PropTypes.bool,
        isGettingUserData: PropTypes.bool,
        isLoading: PropTypes.bool,
        uid: PropTypes.string
    }

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
        const { isLoading } = this.props

        const btnAttrs = {
            onClick: this.firebaseLoginRedirect,
            disabled: isLoading
        }

        return (
            <div className="LoginPage">
                <h1 className="LoginPage-title">Login Required</h1>

                {!isLoading && (
                    <div className="login-buttons-container">
                        <button data-method="Facebook" {...btnAttrs} className="login-btn facebook">facebook</button>
                        <button data-method="Google" {...btnAttrs} className="login-btn google">google</button>
                        <button data-method="Twitter" {...btnAttrs} className="login-btn twitter">twitter</button>
                    </div>
                )}
            </div>
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
