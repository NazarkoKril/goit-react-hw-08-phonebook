import React, {useState} from 'react'
import { Navigation } from '../Navigation/Navigation'
import { useHttp } from '../hooks/http.hook'

export const RegisterPage = () => {
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: '', name: ''
    })

    const changeHendler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try{
            const data = await request('https://connections-api.herokuapp.com/users/signup', 'POST', {...form})
            console.log(data)
            if (error) {
                window.alert("Sth went wrong.")
                clearError()

                return
            }

            window.alert("User has been created.")

        } catch (e) {
            window.alert("Sth went wrong.")
            clearError()
        }
    }

    return (
        <>
            <Navigation />
            <h1>REGISTER</h1>

            <div>
                <input
                    placeholder="Enter Name"
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={changeHendler}
                />
                <label htmlFor="name">Name</label>
            </div>
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
                onClick={registerHandler}
                disabled={loading}
            >
                Register
            </button>
        </>
    )
}