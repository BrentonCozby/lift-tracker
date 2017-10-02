import React, { Component } from 'react'
import classnames from 'classnames'

export default ({
    maxesContainerClasses,
    oneRepMaxes,
    setOneRepMax,
    setExerciseName,
    addExercise,
    expand
}) => (
    <div className="DUHR-one-rep-maxes">
        <h3 className="title" onClick={expand}>one rep maxes</h3>
        <div className={maxesContainerClasses}>
            {oneRepMaxes && oneRepMaxes.map((max, maxIndex) => (
                <div key={maxIndex} className="form-input">
                    <input
                        className="name"
                        type="text"
                        value={max.name}
                        onChange={setExerciseName}
                        data-location={maxIndex}
                    />
                    <input
                        className="weight"
                        type="number"
                        value={max.oneRepMax}
                        onChange={setOneRepMax}
                        data-location={maxIndex}
                    />
                </div>
            ))}
            <div className="form-input">
                <button onClick={addExercise} className="add-exercise">+ Add Exercise</button>
            </div>
        </div>
    </div>
)
