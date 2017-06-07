import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setProgramValue } from '../../actions/programs.js'

import Day from '../../components/DUHR/Day.jsx'

class DayContainer extends Component {

    render() {
        return (
            <Day {...this.props} />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        userId: state.user.uid,
        programId: state.programs.current.id
    }
}

export default connect(mapStateToProps, {
    setProgramValue
})(DayContainer)
