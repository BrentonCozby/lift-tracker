import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import Day from '../Day/day-component.jsx'

class Week extends Component {

    static propTypes = {
        weekIndex: PropTypes.number,
        days: PropTypes.array,
        dbref: PropTypes.string
    }

    state = {
        isExpanded: false
    }

    expand = () => {
        this.setState({ isExpanded: !this.state.isExpanded })
    }

    render() {
        const { weekIndex, days, dbref } = this.props

        const daysContainerClasses = classnames({
            'days-container': true,
            'expanded': this.state.isExpanded
        })

        return (
            <div className="DUHR-week">
                <h3
                    className="title"
                    onClick={this.expand}>
                    Week {weekIndex + 1}
                </h3>
                <div className={daysContainerClasses}>
                    {days && days.map((day, index) => (
                        <Day
                            {...day}
                            dbref={`${dbref}/${index}`}
                            dayIndex={index}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default Week
