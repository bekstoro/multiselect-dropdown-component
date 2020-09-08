import React from 'react';
import classNames from 'classnames';

const ListOfAvailableOptions = ({className, currentOptionIndex, isVisible, options = [], onSelect}) => (
  <div className={classNames(className, {'invisible': !isVisible})}>
    <ul>
      {
        options.length ?
          options
            .filter((el, i) => i < 5)
            .map(({id, name}, i) => (
              <li
                key={id}
                onClick={() => onSelect(id)}
                className={classNames({'focused': i === currentOptionIndex})}
              >
                {name}
              </li>
            )) : <li>No options found</li>

      }
    </ul>
  </div>
);

export default ListOfAvailableOptions;
