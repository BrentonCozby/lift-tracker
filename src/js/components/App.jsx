import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { rootUrl } from '../../../config.js'

import Menu from './Menu.jsx'
import NoMatch from './NoMatch.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Menu />
                <Switch>
                    <Route exact path={`${rootUrl}/`} component={Home} />
                    <Route component={NoMatch}/>
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default App
