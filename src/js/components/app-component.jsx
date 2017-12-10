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
} from '../actions-and-reducers/user/user-action-creators.js'

const PUBLIC_STRIPE_API_KEY = process.env.NODE_ENV === 'production'
    ? 'pk_live_PMELFEvTng3WDCk0LDtP21w6'
    : 'pk_test_EoGExNoDDEaXgpne0NKt4x7F'

export class App extends Component {

    static propTypes = {
        history: PropTypes.object,
        location: PropTypes.object,
        retrieveLoginResult: PropTypes.func,
        listenForAuthStateChanged: PropTypes.func,
        uid: PropTypes.string
    }

    componentWillMount() {
        this.props.retrieveLoginResult()
        this.props.listenForAuthStateChanged()
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.uid && nextProps.location.pathname !== `${PP}login`) {
            this.props.history.replace(`${PP}login`)
        }
    }

    render() {
        return (
            <StripeProvider apiKey={PUBLIC_STRIPE_API_KEY}>
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
        uid: state.user.uid
    }
}

export default connect(mapStateToProps, {
    listenForAuthStateChanged,
    retrieveLoginResult
})(App)
