import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'

export class LoadingOverlay extends Component {

    static propTypes = {
        loadingStates: PropTypes.object,
    }

    state = {
        isVisible: false,
    }

    componentWillMount() {
        const isVisible = Object.values(this.props.loadingStates).some(state => state === true)

        this.setState({ isVisible })
    }

    componentWillReceiveProps(nextProps) {
        const isVisible = Object.values(nextProps.loadingStates).some(state => state === true)
        
        this.setState({ isVisible })
    }

    render() {
        const classes = classnames({
            'LoadingOverlay': true,
            'visible': this.state.isVisible,
        })

        return (
            <div className={classes}>
                <span className="loader"></span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loadingStates: state.loadingStates,
})

const actions = {

}

export default connect(mapStateToProps, actions)(LoadingOverlay)