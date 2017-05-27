import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

import { rootUrl } from '../../../config.js'

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

    render() {
        const menuBtnClasses = classnames({
            'menu-button': true,
            'close': this.state.isMenuVisible
        })
        const menuClasses = classnames({
            'menu-button': true,
            'visible': this.state.isMenuVisible
        })
        return (
            <div>
                <div className={menuBtnClasses} onClick={this.toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <div className={(this.state.isMenuVisible) ? 'Menu visible' : 'Menu'}>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(
    mapStateToProps,
    {

    }
)(Menu)
