import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({
    toggleMenu,
    menuBtnClasses,
    menuClasses,
    menuOverlayClasses,
    logout,
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
                <Link to={PP} className="Menu-item" onClick={toggleMenu}>Home</Link>
                {(isLoggedIn)
                    ? <a className="Menu-item" onClick={logout}>Logout</a>
                    : <Link to={`${PP}login`} className="Menu-item" onClick={toggleMenu}>Login</Link>
                }
                {isLoggedIn && <p className="username">Logged in as {username}</p>}
            </div>
        </div>
    )
}

export default Menu
