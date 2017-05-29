import React from 'react'

import DayContainer from '../containers/DayContainer.jsx'

const Week = ({ days, programId, weekIndex }) => (
    <div className="ProgramDetail-week">
        {days.map((day, index) => (
            <DayContainer
                {...day}
                programId={programId}
                weekIndex={weekIndex}
                dayIndex={index}
                key={index}
            />
        ))}
    </div>
)

const ProgramDetail = ({
    programId,
    title,
    plan
}) => (
    <div className="ProgramDetail">
        <h1 className="ProgramDetail-title">{title}</h1>
        {plan && plan.map((week, index) => (
            <Week
                programId={programId}
                weekIndex={index}
                days={week}
                key={index}
            />
        ))}
    </div>
)

export default ProgramDetail
