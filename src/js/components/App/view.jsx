import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'

import Menu from '../Menu/index.jsx'
import NoMatch from '../NoMatch/index.jsx'
import Footer from '../Footer/index.jsx'
import HomePage from '../HomePage/index.jsx'
import LoginPage from '../LoginPage/index.jsx'
import ProgramDetail from '../ProgramDetail/index.jsx'
import PaymentPage from '../PaymentPage/index.jsx'
import LoadingOverlay from '../LoadingOverlay/index.jsx'

export default ({
    isLoggedIn
}) => (
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
                <Route component={NoMatch}/>
            </Switch>
            <Footer />
        </div>
    </StripeProvider>
)
