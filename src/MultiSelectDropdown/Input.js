import React, { forwardRef } from 'react';

const Input = forwardRef(({className, value, onChange}, ref) => (
  <input
    className={className}
    ref={ref}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Type here..."
  />
));

export default Input;
