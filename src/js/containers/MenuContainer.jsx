import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { logoutOfFirebase } from '../actions/user.js'

import Menu from '../components/Menu.jsx'

class MenuContainer extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    state = {
        isMenuVisible: false
    }

    toggleMenu = () => {
        this.setState({ isMenuVisible: !this.state.isMenuVisible })
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
            <Menu
                menuOverlayClasses={menuOverlayClasses}
                menuBtnClasses={menuBtnClasses}
                menuClasses={menuClasses}
                toggleMenu={this.toggleMenu}
                logoutOfFirebase={this.props.logoutOfFirebase}
                isLoggedIn={this.props.isLoggedIn}
                username={this.props.username}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: Boolean(state.user.uid),
        username: state.user.username
    }
}

export default connect(
    mapStateToProps,
    {
        logoutOfFirebase
    }
)(MenuContainer)
