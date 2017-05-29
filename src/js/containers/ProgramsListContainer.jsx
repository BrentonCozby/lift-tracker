import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProgramsList from '../components/ProgramsList.jsx'

class ProgramsListContainer extends Component {

    render() {
        return (
            <ProgramsList
                programTitles={this.props.programTitles || []}
            />
        )
    }
}

const mapStateToProps = function(state) {
    return {
        programTitles: state.programs.titles
    }
}

export default connect(mapStateToProps, {

})(ProgramsListContainer)
