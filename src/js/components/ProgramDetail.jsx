import React from 'react'
import Week from './Week.jsx'
import OneRepMaxesContainer from '../containers/OneRepMaxesContainer.jsx'

const ProgramDetail = ({
    dbref,
    title,
    plan,
    oneRepMaxes,
    setProgramValue
}) => {
    return (
        <div className="ProgramDetail">
            <h1 className="ProgramDetail-title">{title}</h1>
            <OneRepMaxesContainer
                dbref={dbref}
            />
            {plan && plan.map((week, index) => (
                <Week
                    dbref={`${dbref}/plan/${index}`}
                    weekIndex={index}
                    days={week}
                    key={index}
                />
            ))}
        </div>
    )
}

export default ProgramDetail
