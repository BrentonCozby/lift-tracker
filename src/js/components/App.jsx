import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { rootUrl } from '../../../config.js'

import MenuContainer from '../containers/MenuContainer.jsx'
import NoMatch from './NoMatch.jsx'
import Footer from './Footer.jsx'
import HomeContainer from '../containers/HomeContainer.jsx'
import LoginPageContainer from '../containers/LoginPageContainer.jsx'
import ProgramDetailContainer from '../containers/ProgramDetailContainer.jsx'

const App = () => (
    <div className="App">
        <MenuContainer />
        <Switch>
            <Route exact path={`${rootUrl}`} component={HomeContainer} />
            <Route exact path={`${rootUrl}Login`} component={LoginPageContainer} />
            <Route path={`${rootUrl}programs/:id`} exact component={ProgramDetailContainer} />
            <Route component={NoMatch}/>
        </Switch>
        <Footer />
    </div>
)

export default App
