import { nanoid } from 'nanoid';
import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormSection,
  StyledLabel,
  SubmitButton,
  StyledForm,
} from './loginForm.styled';
import operations from 'redux/auth/auth-operations';
import { useDispatch } from 'react-redux';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(5, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Name is required'),
  password: Yup.string()
    .min(5, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Name is required'),
});

export const LoginForm = () => {
  const emailUniqueId = nanoid(20);
  const passUniqueId = nanoid(25);

  const dispatch = useDispatch();

  return (
    <FormSection>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          dispatch(operations.loggining(values));
          actions.resetForm();
        }}
      >
        <StyledForm>
          <StyledLabel htmlFor={emailUniqueId}>Email</StyledLabel>
          <Field
            id={emailUniqueId}
            type="text"
            name="email"
            title="please try with correct email"
          />
          <ErrorMessage name="name" component="div" />
          <StyledLabel htmlFor={passUniqueId}>Password</StyledLabel>
          <Field
            id={passUniqueId}
            type="password"
            name="password"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="password" />
          <SubmitButton type="submit">Login</SubmitButton>
        </StyledForm>
      </Formik>
    </FormSection>
  );
};
