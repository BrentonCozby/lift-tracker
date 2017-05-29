import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveNewProgram } from '../actions/programs.js'
import { cloneDeep } from 'lodash'

import DUHR from '../../../program-data/DUHR.js'

import Home from '../components/Home.jsx'

class HomeContainer extends Component {

    saveNewProgram = (program) => {
        this.props.saveNewProgram(DUHR)
    }

    render() {
        return (
            <div>
                <Home
                    saveNewProgram={this.saveNewProgram}
                    isLoggedIn={this.props.isLoggedIn}
                    username={this.props.username}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: Boolean(state.user.uid),
        username: state.user.username
    }
}

export default connect(mapStateToProps, {
    saveNewProgram
})(HomeContainer)
