import { Container, Header } from './contacts.styled';
import { ContactsForm } from '../Form';
import { ContactsList } from '../ContactsList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../redux/contacts/contacts-operations';
import { getError } from '../../redux/contacts/contacts-selectors';
import { useEffect } from 'react';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

export const Contacts = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const isLoggedIn = useSelector(getIsLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(fetchContacts());
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Container>
        {isLoggedIn ? (
          <>
            <ContactsForm />
            <ContactsList />
          </>
        ) : (
          <Header>Please Login!!!</Header>
        )}
      </Container>
      {error && <h3>Error</h3>}
    </>
  );
};
