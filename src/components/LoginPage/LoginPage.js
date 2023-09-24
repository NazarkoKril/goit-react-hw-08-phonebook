import React, { useState, useContext } from 'react'
import { Navigation } from '../Navigation/Navigation'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'


export const LoginPage = () => {
    const { loading, request, error, clearError } = useHttp()
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '', password: ''
    })

    const changeHendler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('https://connections-api.herokuapp.com/users/login', 'POST', { ...form })
            auth.login(data.token, data.user.email)
            window.location.replace('/');

        } catch (e) {
            window.alert("Wrong credentials.")
            clearError()
        }
    }

    return (
        <>
            <Navigation />
            <h1>LOGIN</h1>
            <div>
                <input
                    placeholder="Enter Email"
                    id="email"
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={changeHendler}
                />
                <label htmlFor="email">Email</label>
            </div>
            <div>
                <input
                    placeholder="Enter Password"
                    id="password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={changeHendler}
                />
                <label htmlFor="password">Password</label>
            </div>
            <button
                style={{ marginRight: 10 }}
                disabled={loading}
                onClick={loginHandler}
            >
                LogIn
            </button>
        </>
    )
}