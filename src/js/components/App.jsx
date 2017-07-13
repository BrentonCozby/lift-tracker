import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { rootUrl } from '../../../config.js'
import { StripeProvider } from 'react-stripe-elements'

import MenuContainer from '../containers/MenuContainer.jsx'
import NoMatch from './NoMatch.jsx'
import Footer from './Footer.jsx'
import HomeContainer from '../containers/HomeContainer.jsx'
import LoginPageContainer from '../containers/LoginPageContainer.jsx'
import ProgramDetailContainer from '../containers/ProgramDetailContainer.jsx'
import PaymentForm from './Payment/PaymentFormWrapper.jsx'

const App = ({ isLoggedIn }) => (
    <StripeProvider apiKey={process.env.perishable_key}>
        <div className="App">
            <MenuContainer />
            <Switch>
                <Route exact path={`${rootUrl}`} component={HomeContainer} />
                <Route exact path={`${rootUrl}login`} component={LoginPageContainer} />
                <Route path={`${rootUrl}programs/:id`} exact component={({ match }) => {
                    return <ProgramDetailContainer programId={match.params.id} />
                }} />
                <Route exact path={`${rootUrl}payment`} component={PaymentForm} />
                <Route component={NoMatch}/>
            </Switch>
            <Footer />
        </div>
    </StripeProvider>
)

export default App
