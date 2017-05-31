import React from 'react'
import ProgramCard from './ProgramCard.jsx'

const ProgramsList = ({
    programTitles,
    isLoggedIn,
    isAdmin,
    saveNewProgram
}) => {
    return (
        <table className="ProgramsList">
            <thead>
                <tr>
                    <th>
                        <h2 className="ProgramsList-title">Programs</h2>
                    </th>
                </tr>
            </thead>
            <tbody>
                {programTitles.map(program => (
                    <tr key={program.id}>
                        <td>
                            <ProgramCard
                                id={program.id}
                                title={program.title}
                            />
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        {isLoggedIn && isAdmin &&
                            <button
                                className="save-new-program-btn"
                                onClick={saveNewProgram}>
                                Save New Program
                            </button>
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ProgramsList
