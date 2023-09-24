import { useSelector } from 'react-redux';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Container, Header } from './login.styled';
import { getIsLoggedIn } from '../../redux/auth/auth-selectors';

export const Login = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return (
    <>
      {!isLoggedIn && (
        <Container>
          <Header>Login</Header>
          <LoginForm />
        </Container>
      )}
    </>
  );
};
