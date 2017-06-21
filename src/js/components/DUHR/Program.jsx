import React from 'react'
import Week from './Week.jsx'
import OneRepMaxesContainer from '../../containers/DUHR/OneRepMaxesContainer.jsx'

const DUHR = ({
    currentProgram
}) => {
    const { plan } = currentProgram

    return (
        <div className="DUHR">
            <OneRepMaxesContainer currentProgram={currentProgram} />
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
