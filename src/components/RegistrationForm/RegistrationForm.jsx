import { nanoid } from 'nanoid';
import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormSection,
  StyledLabel,
  SubmitButton,
  StyledForm,
} from './registrationForm.styled';
import operations from 'redux/auth/auth-operations';
import { useDispatch } from 'react-redux';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Name is required'),
  email: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Name is required'),
});

export const RegistrationForm = () => {
  const nameUniqueId = nanoid(20);
  const emailUniqueId = nanoid(25);
  const passUniqueId = nanoid(25);

  const dispatch = useDispatch();

  return (
    <FormSection>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          dispatch(operations.registration(values));
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
          <StyledLabel htmlFor={emailUniqueId}>Email</StyledLabel>
          <Field
            id={emailUniqueId}
            type="email"
            name="email"
            title="paste your email correctly"
          />
          <ErrorMessage name="email" component="div" />
          <StyledLabel htmlFor={passUniqueId}>Password</StyledLabel>
          <Field
            id={passUniqueId}
            type="password"
            name="password"
            title="Paste youe password correctly"
          />
          <ErrorMessage name="password" component="div" />
          <SubmitButton type="submit">Register</SubmitButton>
        </StyledForm>
      </Formik>
    </FormSection>
  );
};
