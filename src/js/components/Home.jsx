import React from 'react'

import ProgramsListContainer from '../containers/ProgramsListContainer.jsx'

const Home = ({
    isLoggedIn,
    username,
    saveNewProgram
}) => (
    <div className="Home">
        <h2>This is the homepage</h2>
        <ProgramsListContainer />
        {isLoggedIn && <button onClick={saveNewProgram}>Save New Program</button>}
    </div>
)

export default Home
