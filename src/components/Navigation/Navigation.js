import React from 'react'
import { useAuth } from 'components/hooks/auth.hook';

export const Navigation = () => {
    const { token, userEmail, login, logout, ready } = useAuth()
    const isAuthenticated = !!token

    const logoutHandler = () => {
        logout()
        window.location.replace('/');
    }

    if (!isAuthenticated) {
        return (
            <>
                <ul>
                    <li>
                        <a href='/login'>Login</a>
                    </li>
                    <li>
                        <a href='/register'>Register</a>
                    </li>
                </ul>
            </>
        )
    }
    return (
        <>
            <ul>
                <li>
                    <span onClick={logoutHandler}>Logout</span>
                </li>
                <li>
                    <span>{ userEmail }</span>
                </li>
            </ul>
        </>
    )
}