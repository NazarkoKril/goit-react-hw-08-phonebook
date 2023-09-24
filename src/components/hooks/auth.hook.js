import {useState, useCallback, useEffect} from 'react'
import { useHttp } from './http.hook'

const storageName = 'userData'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [ready, setReady] = useState(false)
    const { loading, request, error, clearError } = useHttp()

    const login = useCallback((jwtToken, userEmailParam) => {
        setToken(jwtToken)
        setUserEmail(userEmailParam)

        localStorage.setItem(storageName, JSON.stringify({
            userEmail: userEmailParam,
            token: jwtToken
        }))
    }, [])

    const logout = useCallback(async () => {
        localStorage.removeItem(storageName)
        await request('https://connections-api.herokuapp.com/users/logout', 'POST', null, { Authorization: token})
        setToken(null)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token) {
            login(data.token, data.userEmail)
        }
        setReady(true)
    }, [login])


    return {login, logout, token, userEmail, ready}
}