import React from 'react'

const LoginPage = ({
    firebaseLoginRedirect,
    isLoading
}) => {
    const btnAttrs = {
        onClick: firebaseLoginRedirect,
        disabled: isLoading
    }

    return (
        <div className="LoginPage">
            <h1 className="LoginPage-title">Login</h1>
            <div className="login-buttons-container">
                <button data-method="Facebook" {...btnAttrs} className="login-btn facebook">facebook</button>
                <button data-method="Google" {...btnAttrs} className="login-btn google">google</button>
                <button data-method="Twitter" {...btnAttrs} className="login-btn twitter">twitter</button>
            </div>
        </div>
    )
}

export default LoginPage
