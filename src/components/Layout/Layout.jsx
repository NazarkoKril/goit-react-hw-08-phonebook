import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  NavLinkItem,
  NavLinkList,
  Link,
  UserBar,
  Header,
  Container,
} from './layout.styled';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';
import { UserMenu } from '../UserMenu/UserMenu';
import operations from '../../redux/auth/auth-operations';

export const Layout = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(operations.fetchCurrentUser());
  }, [dispatch, navigate, isLoggedIn, location.pathname]);

  return (
    <>
      <Header>
        <NavLinkList>
          <NavLinkItem>
            <Link to="/">Home</Link>
          </NavLinkItem>
          {isLoggedIn && (
            <NavLinkItem>
              <Link to="/contacts">Contacts</Link>
            </NavLinkItem>
          )}
        </NavLinkList>
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <UserBar>
            <NavLinkItem>
              <Link to="/login">Login</Link>
            </NavLinkItem>
            <NavLinkItem>
              <Link to="/registration">Registration</Link>
            </NavLinkItem>
          </UserBar>
        )}
      </Header>
      <main>
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
    </>
  );
};
