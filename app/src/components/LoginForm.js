import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

export default function LoginForm ({handleSubmit, handleUsernameChange, handlePasswordChange, username, password}) {
    return (
        <Togglable buttonLabel = 'Show login'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        placeholder='Username'
                        onChange={handleUsernameChange}
                    />
                    </div>
                    <div>
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        placeholder='Password'
                        onChange={handlePasswordChange}
                    />
                    </div>
                    <div>
                        <button id='form-login-button' type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </div> 
        </Togglable>
    )
}

LoginForm.propTypes = { // Adding the propTypes to LoginForm
    handleSubmit: PropTypes.func,
    username: PropTypes.string,
    password: PropTypes.string
}