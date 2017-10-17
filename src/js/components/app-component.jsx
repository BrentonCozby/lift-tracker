import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'
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
    retrieveLoginResult
} from '../actions-and-reducers/user/user-actions.js'

class App extends Component {

    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        retrieveLoginResult: PropTypes.func,
        listenForAuthStateChanged: PropTypes.func,
        isLoggedIn: PropTypes.bool
    }

    componentWillMount() {
        this.props.retrieveLoginResult()
        this.props.listenForAuthStateChanged()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn === false && nextProps.location.pathname !== '/login') {
            this.props.history.replace(`${PP}login`)
        }
    }

    render() {
        return (
            <StripeProvider apiKey={process.env.perishable_key}>
                <div className="App">
                    <Menu />
                    <LoadingOverlay />
                    <Switch>
                        <Route exact path={PP} component={HomePage} />
                        <Route exact path={`${PP}login`} component={LoginPage} />
                        <Route exact path={`${PP}programs/:id`} component={({ match }) => {
                            return <ProgramDetail programId={match.params.id} />
                        }} />
                        <Route exact path={`${PP}payment`} component={PaymentPage} />
                        <Route component={NoMatch} />
                    </Switch>
                    <Footer />
                </div>
            </StripeProvider>
        )
    }
}

const mapStateToProps = function(state) {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps, {
    listenForAuthStateChanged,
    retrieveLoginResult
})(App)
