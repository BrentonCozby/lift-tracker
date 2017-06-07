import React, { Component } from 'react'
import classnames from 'classnames'

import DayContainer from '../../containers/DUHR/DayContainer.jsx'

class Week extends Component {

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
                        <DayContainer
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
