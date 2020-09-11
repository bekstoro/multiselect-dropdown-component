import React from 'react';

const ListOfSelectedOptions = ({className, options = [], onRemove}) => {
  const onClick = (id) => (e) => {
    e.stopPropagation();
    onRemove(id);
  };

  return (
    <ul className={className}>
      {
        options?.map(({id, name}) => (
          <li key={id}>
            {name} <span onClick={onClick(id)}>&#10005;</span>
          </li>
        ))
      }
    </ul>
  );
};

export default ListOfSelectedOptions;
