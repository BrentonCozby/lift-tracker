import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import {
    logoutOfFirebase
} from '../../actions/user.js'

import View from './view.jsx'

class Menu extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    state = {
        isMenuVisible: false
    }

    toggleMenu = () => {
        this.setState({ isMenuVisible: !this.state.isMenuVisible })
    }

    logout = () => {
        this.props.logoutOfFirebase()
        this.toggleMenu()
    }

    render() {
        const menuBtnClasses = classnames({
            'menu-button': true,
            'close': this.state.isMenuVisible
        })
        const menuClasses = classnames({
            'Menu': true,
            'visible': this.state.isMenuVisible
        })
        const menuOverlayClasses = classnames({
            'menu-overlay': true,
            'visible': this.state.isMenuVisible
        })
        return (
            <View
                menuOverlayClasses={menuOverlayClasses}
                menuBtnClasses={menuBtnClasses}
                menuClasses={menuClasses}
                toggleMenu={this.toggleMenu}
                logout={this.logout}
                isLoggedIn={this.props.isLoggedIn}
                username={this.props.username}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        username: state.user.username
    }
}

const actions = {
    logoutOfFirebase
}

export default connect(mapStateToProps, actions)(withRouter(Menu))
