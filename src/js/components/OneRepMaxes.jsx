import React, { Component } from 'react'
import classnames from 'classnames'

const OneRepMaxes = ({
    maxesContainerClasses,
    oneRepMaxes,
    setOneRepMax,
    dbref,
    expand
}) => (
    <div className="ProgramDetail-one-rep-maxes">
        <h3 className="title" onClick={expand}>one rep maxes</h3>
        <div className={maxesContainerClasses}>
            {oneRepMaxes && oneRepMaxes.map((max, maxIndex) => (
                <div key={maxIndex} className="form-input">
                    <label>{max.name}</label>
                    <input
                        type="number"
                        value={max.oneRepMax}
                        onChange={setOneRepMax}
                        data-location={maxIndex}
                    />
                </div>
            ))}
        </div>
    </div>
)

export default OneRepMaxes
