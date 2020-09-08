import React from 'react';

const ListOfSelectedOptions = ({className, options = [], onRemove}) => (
  <ul className={className}>
    {
      options?.map(({id, name}) => (
        <li key={id}>
          {name} <span onClick={() => onRemove(id)}>&#10005;</span>
        </li>
      ))
    }
  </ul>
);

export default ListOfSelectedOptions;
