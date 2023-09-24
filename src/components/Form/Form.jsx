import { nanoid } from 'nanoid';
import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormSection,
  FormTitle,
  StyledForm,
  SubmitButton,
  StyledLabel,
} from './form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-operations';
import { getContacts } from '../../redux/contacts/contacts-selectors';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Name is required'),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{2}-\d{2}$/,
      'Invalid phone number format,must be (&&&-&&-&&)'
    )
    .required('Phone number is required'),
});

export const ContactsForm = () => {
  const nameUniqueId = nanoid(20);
  const telUniqueId = nanoid(25);

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const addNewContact = e => {
    if (Array.isArray(contacts) && contacts.length >= 1) {
      if (
        contacts.find(contact => {
          return contact.name === e.name;
        })
      ) {
        return alert(`${e.name} is already in contacts`);
      }
    }

    dispatch(addContact(e));
  };

  return (
    <FormSection>
      <FormTitle>Phonebook</FormTitle>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          addNewContact(values);
          actions.resetForm();
        }}
      >
        <StyledForm>
          <StyledLabel htmlFor={nameUniqueId}>Name</StyledLabel>
          <Field
            id={nameUniqueId}
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component="div" />
          <StyledLabel htmlFor={telUniqueId}>Number</StyledLabel>
          <Field
            id={telUniqueId}
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="number" />
          <SubmitButton type="submit">Add contact</SubmitButton>
        </StyledForm>
      </Formik>
    </FormSection>
  );
};
