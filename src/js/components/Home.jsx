import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOneThing } from '../actions/index.js'
import computerMouseImg from '../../../assets/images/computer-mouse.jpg'

class Home extends Component {

    componentWillMount() {
        this.props.getOneThing('the things is this')
    }

    render() {
        return (
            <div className="Home">
                <h2>This is the homepage</h2>
                <h4>The active thing:</h4>
                <p>{this.props.activeThing}</p>
                <img src={computerMouseImg} width="400px" alt=""/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeThing: state.things.active
    }
}

export default connect(
    mapStateToProps,
    {
        getOneThing
    }
)(Home)
