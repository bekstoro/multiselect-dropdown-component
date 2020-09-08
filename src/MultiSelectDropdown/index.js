import React, { forwardRef, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './styles.scss';

const ListOfSelectedOptions = ({ options = [], onRemove }) => (
  <ul>
    {
      options?.map(({ id, name }) => (
        <li key={id}>
          {name} <span onClick={() => onRemove(id)}>X</span>
        </li>
      ))
    }
  </ul>
);

const Input = forwardRef(({ value, onChange }, ref) => (
  <input
    ref={ref}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Select option"
  />
));

const ListOfAvailableOptions = forwardRef(({ currentOptionIndex, options = [], onSelect }, ref) => (
  <ul ref={ref}>
    {
      options.map(({ id, name }, index) => (
        <li
          key={id}
          onClick={() => onSelect(id)}
          className={classNames({'focused': index === currentOptionIndex})}
        >
          {name}
        </li>
      ))
    }
  </ul>
));

export default function MultiSelectDropdown(props) {
  const { options = [] } = props;

  const inputElement = useRef(null);
  const listElement = useRef(null);

  const [inputValue, setInputValue] = useState('');
  const [currentOptionIndex, setCurrentOptionIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    focus();
  }, []);

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setFilteredOptions(options.filter(option => !selectedOptions.find(option2 => option.id === option2.id)));
    }
  }, [options, selectedOptions]);

  const focus = () => inputElement.current.focus();

  const onChange = (value) => {
    setInputValue(value);
    options.length > 0 && setFilteredOptions(options.filter(option => option.name.toLowerCase().includes(value)));
  };

  const onRemove = (removedOptionId) => {
    const currentOption = selectedOptions.find(({ id }) => id === removedOptionId);
    setSelectedOptions(selectedOptions.filter(({ id }) => id !== removedOptionId ));
    setFilteredOptions(filteredOptions.concat(currentOption));
    onChange('');
    focus();
  };

  const onSelect = (selectedOptionId) => {
    const currentOption = filteredOptions.find(({ id }) => id === selectedOptionId);
    setFilteredOptions(filteredOptions.filter(({ id }) => id !== selectedOptionId ));
    setSelectedOptions(selectedOptions.concat(currentOption));
    onChange('');
    focus();
  };

  return (
    <div className="multi-select-dropdown-container">
      <div className="multi-select-dropdown-container__input-wrapper">
        <ListOfSelectedOptions
          className="multi-select-dropdown-container__input-wrapper__list"
          options={selectedOptions}
          onRemove={onRemove}
        />
        <Input
          className="multi-select-dropdown-container__input-wrapper__input"
          ref={inputElement}
          value={inputValue}
          onChange={onChange}
        />
      </div>
      <ListOfAvailableOptions
        className="multi-select-dropdown-container__dropdown"
        ref={listElement}
        currentOptionIndex={currentOptionIndex}
        options={filteredOptions}
        onSelect={onSelect}
      />
    </div>
  )
}
