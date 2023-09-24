import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './components/LoginPage/LoginPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { ContactsPage } from './components/ContactsPage/ContactsPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/" element={<ContactsPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
            </Routes>
        )
    }
    return (
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
}