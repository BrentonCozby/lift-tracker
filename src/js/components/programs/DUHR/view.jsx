import React from 'react'
import Week from './Week/index.jsx'
import OneRepMaxes from './OneRepMaxes/index.jsx'

const DUHR = ({
    currentProgram
}) => {
    const { plan } = currentProgram

    return (
        <div className="DUHR">
            <OneRepMaxes currentProgram={currentProgram} />
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
