import React, { forwardRef } from 'react';
import classNames from 'classnames';

const ListOfAvailableOptions = forwardRef(({className, currentOptionIndex, isVisible, options = [], onSelect}, ref) => (
  <div className={classNames(className, {'invisible': !isVisible})}>
    <ul ref={ref}>
      {
        options.length ?
          options.map(({id, name}, i) => (
            <li
              key={id}
              onClick={() => onSelect(id)}
              className={classNames({'focused': i === currentOptionIndex - 1})}
            >
              {name}
            </li>
          )) : <li>No options found</li>

      }
    </ul>
  </div>
));

export default ListOfAvailableOptions;
