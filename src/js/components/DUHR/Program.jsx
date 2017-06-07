import React from 'react'
import Week from './Week.jsx'
import OneRepMaxesContainer from '../../containers/DUHR/OneRepMaxesContainer.jsx'

const DUHR = ({
    title,
    plan,
    oneRepMaxes,
    updates,
    setProgramValue
}) => {
    return (
        <div className="DUHR">
            <OneRepMaxesContainer />
            {plan && plan.map((week, index) => (
                <Week
                    dbref={`plan/${index}`}
                    weekIndex={index}
                    days={week}
                    key={index}
                />
            ))}
        </div>
    )
}

export default DUHR
