import React, { Component } from 'react'
import { connect } from 'react-redux'

import Home from '../components/Home.jsx'

class HomeContainer extends Component {

    render() {
        return (
            <Home />
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, {
    
})(HomeContainer)
