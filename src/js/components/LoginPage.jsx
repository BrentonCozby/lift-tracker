import React from 'react'

const LoginPage = ({
    firebaseLoginRedirect,
    isLoading
}) => {
    const btnAttrs = {
        onClick: firebaseLoginRedirect,
        className: `login-button`,
        disabled: isLoading
    }

    return (
        <div className="LoginPage">
            <h1>Login Page</h1>
            <div className="login-buttons-container">
                <button data-method="Facebook" {...btnAttrs}>facebook</button>
                <button data-method="Google" {...btnAttrs}>google</button>
                <button data-method="Twitter" {...btnAttrs}>twitter</button>
            </div>
        </div>
    )
}

export default LoginPage
