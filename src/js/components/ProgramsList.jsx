import React from 'react'
import ProgramCard from './ProgramCard.jsx'

const ProgramsList = ({
    programTitles
}) => {
    return (
        <div className="ProgramsList">
            {programTitles.map(program => (
                <ProgramCard
                    key={program.id}
                    id={program.id}
                    title={program.title}
                />
            ))}
        </div>
    )
}

export default ProgramsList
