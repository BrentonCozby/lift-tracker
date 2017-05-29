import React from 'react'
import { Link } from 'react-router-dom'
import { rootUrl } from '../../../config.js'

const Menu = ({
    toggleMenu,
    menuBtnClasses,
    menuClasses,
    menuOverlayClasses,
    logoutOfFirebase,
    isLoggedIn,
    username
}) => {
    return (
        <div>
            <div className={menuOverlayClasses} onClick={toggleMenu}></div>
            <div className={menuBtnClasses} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <div className={menuClasses}>
                <Link className="Menu-item" onClick={toggleMenu} to={`${rootUrl}`}>Home</Link>
                {(isLoggedIn)
                    ? <a className="Menu-item" onClick={logoutOfFirebase}>Logout</a>
                    : <Link className="Menu-item" onClick={toggleMenu} to={`${rootUrl}login`}>Login</Link>
                }
                {isLoggedIn && <p className="username">Logged in as {username}</p>}
            </div>
        </div>
    )
}

export default Menu
