import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Input from './Input';
import ListOfAvailableOptions from './ListOfAvailableOptions';
import ListOfSelectedOptions from './ListOfSelectedOptions';
import './styles.scss';

export default function MultiSelectDropdown(props) {
  const {options = []} = props;

  const inputElement = useRef(null);
  const listElement = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [keyCode, setKeyCode] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [currentOptionIndex, setCurrentOptionIndex] = useState(1);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const onChange = (value) => {
    setInputValue(value || '');
    if (value) {
      setIsVisible(true);
      if (options.length > 0) {
        setFilteredOptions(options.filter(option =>
          option.name.toLowerCase().includes(value.toLowerCase()) &&
          !selectedOptions.find(option2 => option.id === option2.id))
        );
      }
    } else {
      setFilteredOptions([]);
    }
  };

  const onClick = () => {
    setIsVisible(!isVisible);
    setCurrentOptionIndex(1);
  };

  const onFocus = () => inputElement.current.focus();

  const onKeyDown = (keyCode) => {
    setKeyCode(keyCode);
    setKeyCode(-1);
  };

  const onRemove = (removedOptionId) => {
    setSelectedOptions(selectedOptions.filter(({id}) => id !== removedOptionId));
    setFilteredOptions([]);
    onReset();
  };

  const onReset = () => {
    onChange();
    onFocus();
    setCurrentOptionIndex(-1);
  };

  const onSelect = (selectedOptionId) => {
    setIsVisible(false);
    const currentOption = filteredOptions.find(({id}) => id === selectedOptionId);
    setSelectedOptions(selectedOptions.concat(currentOption));
    setFilteredOptions([]);
    onReset();
  };

  useEffect(() => {
    onFocus();
    document.addEventListener('keydown', ({keyCode}) => onKeyDown(keyCode));
    return function () {
      document.removeEventListener('keydown', ({keyCode}) => onKeyDown(keyCode));
    };
  }, []);

  useEffect(() => {
    switch (keyCode) {
      case 40: // keydown
        if (currentOptionIndex >= 1 && currentOptionIndex < filteredOptions.length) {
          setCurrentOptionIndex(currentOptionIndex + 1);
          listElement.current.scrollTo(0, 50 * currentOptionIndex);
        } else {
          setCurrentOptionIndex(1);
          listElement.current.scrollTo(0, 0);
        }
        break;
      case 38: // keyup
        if (currentOptionIndex > 1 && currentOptionIndex <= filteredOptions.length) {
          setCurrentOptionIndex(currentOptionIndex - 1);
          listElement.current.scrollTo(0, 50 * (currentOptionIndex - 2));
        } else {
          setCurrentOptionIndex(filteredOptions.length);
          listElement.current.scrollTo(0, 50 * filteredOptions.length);
        }
        break;
      case 13: // enter
        if (filteredOptions && filteredOptions.length > 0 && filteredOptions[currentOptionIndex - 1]) {
          onSelect(filteredOptions[currentOptionIndex - 1].id);
        }
        break;
      case 27: // esc
        setIsVisible(false);
        break;
      default:
        break;
    }
  }, [keyCode]);

  return (
    <div className="multi-select-dropdown-container">
      <div className="multi-select-dropdown-container__input-wrapper" onClick={onClick}>
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
        <span
          className={classNames({
            'multi-select-dropdown-container__input-wrapper__arrow-up': isVisible,
            'multi-select-dropdown-container__input-wrapper__arrow-down': !isVisible,
          })}
        />
      </div>
      <ListOfAvailableOptions
        className="multi-select-dropdown-container__dropdown"
        ref={listElement}
        currentOptionIndex={currentOptionIndex}
        options={filteredOptions}
        onSelect={onSelect}
        isVisible={isVisible}
      />
    </div>
  )
}
