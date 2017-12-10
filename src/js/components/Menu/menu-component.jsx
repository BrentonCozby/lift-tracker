import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { logoutOfFirebase } from '../../actions-and-reducers/user/user-action-creators.js'

export class Menu extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        logoutOfFirebase: PropTypes.func,
        uid: PropTypes.string,
        fullName: PropTypes.string
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
        const { uid, fullName } = this.props

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
            <div>
                <div className={menuOverlayClasses} onClick={this.toggleMenu}></div>
                <div className={menuBtnClasses} onClick={this.toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <div className={menuClasses}>
                    <Link to={PP} className="Menu-item" onClick={this.toggleMenu}>Home</Link>
                    {(uid)
                        ? <a className="Menu-item" onClick={this.logout}>Logout</a>
                        : <Link to={`${PP}login`} className="Menu-item" onClick={this.toggleMenu}>Login</Link>
                    }
                    {uid && <p className="fullName">Logged in as {fullName}</p>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.user.uid,
        fullName: state.user.fullName
    }
}

const actions = {
    logoutOfFirebase
}

export default connect(mapStateToProps, actions)(withRouter(Menu))
