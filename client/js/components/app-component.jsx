import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import Menu from './Menu/menu-component.jsx'
import NoMatch from './NoMatch/no-match-component.jsx'
import Footer from './Footer/footer-component.jsx'
import HomePage from './HomePage/home-page-component.jsx'
import LoginPage from './LoginPage/login-page-component.jsx'
import ProgramDetail from './ProgramDetail/program-detail-component.jsx'
import PaymentPage from './PaymentPage/payment-page-component.jsx'
import LoadingOverlay from './LoadingOverlay/loading-overlay-component.jsx'
import {
    listenForAuthStateChanged,
    retrieveLoginResult,
} from '../actions-and-reducers/user/user-action-creators.js'

export class App extends Component {

    static propTypes = {
        loadingStates: PropTypes.object,
        history: PropTypes.object,
        location: PropTypes.object,
        retrieveLoginResult: PropTypes.func,
        listenForAuthStateChanged: PropTypes.func,
        stripe: PropTypes.object,
        user: PropTypes.object,
    }

    componentWillMount() {
        this.props.retrieveLoginResult()
        this.props.listenForAuthStateChanged()
    }

    componentWillReceiveProps(nextProps) {
        const isDoneLoading = Object.values(nextProps.loadingStates).every(state => state === false)

        if (isDoneLoading && !nextProps.user.uid && nextProps.location.pathname !== `${PP}login`) {
            this.props.history.replace(`${PP}login`)
        }
    }

    render() {
        return (
            <div className="App">
                <Menu />
                <LoadingOverlay />
                <Switch>
                    <Route exact path={PP} component={HomePage} />
                    <Route exact path={`${PP}login`} component={LoginPage} />
                    <Route exact path={`${PP}programs/:id`} component={ProgramDetail} />
                    <Route exact path={`${PP}payment`} component={PaymentPage} />
                    <Route component={NoMatch} />
                </Switch>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        loadingStates: state.loadingStates,
        user: {
            uid: state.user.uid,
        },
    }
}

const actions = {
    listenForAuthStateChanged,
    retrieveLoginResult,
}

export default connect(mapStateToProps, actions)(App)
