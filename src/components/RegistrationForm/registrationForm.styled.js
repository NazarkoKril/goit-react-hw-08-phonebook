import styled from "@emotion/styled";
import { Form } from 'formik';

export const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    gap: 10px;
`

export const StyledLabel = styled.label`
    color: grey;
`

export const SubmitButton = styled.button`
    border: solid 1px grey;
    border-radius: 0.5rem;
    color: grey;
    padding: 0.2rem 0.5rem;
    margin: 0 auto;
`

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`
