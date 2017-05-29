import React from 'react'
import { Link } from 'react-router-dom'
import { rootUrl } from '../../../config.js'

const ProgramCard = ({
    title,
    id
}) => (
    <Link
        to={`${rootUrl}programs/${id}`}
        className="ProgramCard">
        <h3 className="ProgramCard-title">{title}</h3>
    </Link>
)

export default ProgramCard
