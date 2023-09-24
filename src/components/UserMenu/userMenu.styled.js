import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.h4`
  color: gray;
  margin: 0;
`;

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    font-size: 20px;
  color: grey;

  background-color: transparent;    

  border: solid 1px grey;
  border-radius: 0.5rem;

  padding: 0.2rem 0.5rem;

  cursor: pointer;

  &:hover,
  :focus {
    background-color: #D7D3DE;
  }
`;
