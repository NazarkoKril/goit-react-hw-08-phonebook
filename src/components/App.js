import { useRoutes } from '../router'
import { BrowserRouter as Router } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

export const App = () => {
  const {token, userEmail, login, logout, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <></>
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, isAuthenticated, userEmail
    }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};
