import { useDispatch, useSelector } from 'react-redux';
import { getUserEmail } from '../../redux/auth/auth-selectors';
import operations from '../../redux/auth/auth-operations';
import { Container, Title, Button } from './userMenu.styled';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);

  return (
    <Container>
      <Title>{email}</Title>
      <Button type="button" onClick={() => dispatch(operations.logOut())}>
        Logout
      </Button>
    </Container>
  );
};
