import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setProgramValue } from '../actions/programs.js'

import Day from '../components/Day.jsx'

class DayContainer extends Component {

    render() {
        return (
            <Day {...this.props} />
        )
    }
}

const mapStateToProps = function(state) {
    return {

    }
}

export default connect(mapStateToProps, {
    setProgramValue
})(DayContainer)
