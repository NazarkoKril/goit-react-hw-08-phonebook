// import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Home } from '../pages/Home/Home';
import { Login } from 'pages/Login/Login';
import { Registration } from 'pages/Registration/Registration';
import { Contacts } from './Contacts/Contacts';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="contacts"
            element={<PrivateRoute redirectTo="/" component={<Contacts />} />}
          />
          <Route
            path="login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          ></Route>
          <Route
            path="registration"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Registration />}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
};
