import React from 'react'

const Day = ({
    updatePlan,
    programId,
    weekIndex,
    dayIndex,
    sets,
    reps,
    rest,
    exercises
}) => (
    <table className="ProgramDetail-day">
        <thead>
            <tr>
                <th className="day-number" colSpan="3">
                    Day {dayIndex + 1}
                </th>
            </tr>
            <tr>
                <td colSpan="3">
                    <div className="sets-reps-rest">
                        <span>Sets: {sets}</span>
                        <span>Reps: {reps}</span>
                        <span>Rest: {rest}</span>
                    </div>
                </td>
            </tr>
            <tr>
                <th>Exercise</th>
                <th>Weight</th>
                <th>Difficuty</th>
            </tr>
        </thead>
        <tbody>
            {exercises.map((exercise, index) => (
                <tr key={index}>
                    <td className="exercise-name">
                        {exercise.name}
                    </td>
                    <td className="exercise-weight">{exercise.weight}</td>
                    <td className="exercise-difficulty">
                        <select
                            value={exercise.difficulty}
                            data-dbref={`${programId}/plan/${weekIndex}/${dayIndex}/exercises/${index}/difficulty`}
                            onChange={updatePlan}>
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

export default Day
