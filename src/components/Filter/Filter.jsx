import React from 'react';
import { nanoid } from 'nanoid';
import { Title, Input, FilterCOntainer } from './filter.styled';
import { useDispatch } from 'react-redux';
import { filter } from '../../redux/filter/filter';

export const Filter = () => {
  const filterUniqueId = nanoid(10);
  const dispatch = useDispatch();

  return (
    <FilterCOntainer>
      <Title>Find contacts by name</Title>
      <label htmlFor={filterUniqueId}></label>
      <Input
        id={filterUniqueId}
        type="text"
        onChange={e => dispatch(filter(e.target.value))}
      />
    </FilterCOntainer>
  );
};
