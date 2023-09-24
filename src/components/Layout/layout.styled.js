import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: none;
    
    padding: 0 3rem;
`;

export const NavLinkItem = styled.li`
  padding: 1rem 0;
  
`;

export const NavLinkList = styled.ul`
  display: flex;
  list-style: none;
  gap: 3rem;
`;

export const Link = styled(NavLink)`
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  font-weight: 500;
  font-size: 20px;
  color: grey;

  border: solid 1px grey;
  border-radius: 0.5rem;

  &:hover,
  :focus {
    background-color: #D7D3DE;
  }
`;

export const UserBar = styled.ul`
  display: flex;
  list-style: none;
  gap: 3rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;

  padding: 3rem;
`
