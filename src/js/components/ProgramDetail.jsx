import React from 'react'

const ProgramDetail = ({
    children,
    title
}) => {

    return (
        <div className="ProgramDetail">
            <h1 className="ProgramDetail-title">{title}</h1>
            {children}
        </div>
    )
}

export default ProgramDetail
