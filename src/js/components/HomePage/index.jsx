import React, { Component } from 'react'
import { connect } from 'react-redux'

import View from './view.jsx'

class HomeContainer extends Component {

    componentWillMount() {
        if (this.props.isLoggedIn === false) {
            this.props.history.push(`${PP}login`)
        }
    }

    render() {
        return (
            <View />
        )
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

const actions = {

}

export default connect(mapStateToProps, actions)(HomeContainer)
