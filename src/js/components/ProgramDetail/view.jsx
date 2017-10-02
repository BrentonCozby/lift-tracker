import React from 'react'

export default ({
    currentProgram,
    CurrentProgramComponent
}) => {

    if (!currentProgram) {
        return <div></div>
    }

    return (
        <div className="ProgramDetail">
            <h1 className="ProgramDetail-title">{currentProgram.title}</h1>
            <CurrentProgramComponent />
        </div>
    )
}
