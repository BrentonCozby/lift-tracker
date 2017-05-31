import React from 'react'

const Day = ({
    setProgramValue,
    dayIndex,
    dbref,
    sets,
    reps,
    rest,
    exercises
}) => {
    const setDifficulty = function(e) {
        setProgramValue(e.target.dataset.dbref, e.target.value)
    }

    return (
        <table className="ProgramDetail-day">
            <thead>
                <tr>
                    <th className="day-number" colSpan="3">
                        Day {dayIndex + 1}
                    </th>
                </tr>
                <tr>
                    <td colSpan="3" className="sets-reps-rest">
                        <div>
                            <span>Sets: {sets}</span>
                            <span>Reps: {reps}</span>
                            <span>Rest: {rest}</span>
                        </div>
                    </td>
                </tr>
                <tr className="labels">
                    <th>Exercise</th>
                    <th>Weight</th>
                    <th>Difficuty</th>
                </tr>
            </thead>
            <tbody>
                {exercises && exercises.map((exercise, index) => (
                    <tr key={index}>
                        <td className="exercise-name">
                            {exercise.name}
                        </td>
                        <td className="exercise-weight">{exercise.weight}</td>
                        <td className="exercise-difficulty">
                            <select
                                value={exercise.difficulty}
                                data-dbref={`${dbref}/exercises/${index}/difficulty`}
                                onChange={setDifficulty}>
                                <option value="">--</option>
                                <option value="easy">Easy</option>
                                <option value="ok">Ok</option>
                                <option value="difficult">Difficult</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Day
