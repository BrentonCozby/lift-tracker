import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import loadingSpinner from '../../../../assets/images/loading-spinner.gif'

class LoadingOverlay extends Component {

    state = {
        isVisible: false
    }

    componentWillMount() {
        const isVisible = Object.values(this.props.loadingStates).some(state => state === true)

        this.setState({
            isVisible
        })
    }

    componentWillReceiveProps(nextProps) {
        const isVisible = Object.values(nextProps.loadingStates).some(state => state === true)
        
        this.setState({
            isVisible
        })
    }

    render() {
        const classes = classnames({
            'LoadingOverlay': true,
            'visible': this.state.isVisible
        })

        return (
            <div className={classes}>
                <img src={loadingSpinner} alt="loading spinner" className="spinner"/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loadingStates: state.user.loadingStates
})

const actions = {

}

export default connect(mapStateToProps, actions)(LoadingOverlay)