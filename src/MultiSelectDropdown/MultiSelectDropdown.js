import React, { useEffect, useRef, useState } from 'react';
import Input from './Input';
import ListOfAvailableOptions from './ListOfAvailableOptions';
import ListOfSelectedOptions from './ListOfSelectedOptions';
import './styles.scss';

export default function MultiSelectDropdown(props) {
  const {options = []} = props;

  const inputElement = useRef(null);
  const wrapperElement = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [keyCode, setKeyCode] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [currentOptionIndex, setCurrentOptionIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState([]);
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
    wrapperElement.current.addEventListener('keydown', ({keyCode}) => onKeyDown(keyCode));
    return function () {
      wrapperElement.current.removeEventListener('keydown', ({keyCode}) => onKeyDown(keyCode));
    };
  }, []);

  useEffect(() => {
    switch (keyCode) {
      case 40: // keydown
        if (currentOptionIndex >= 0 && currentOptionIndex < Math.min(filteredOptions.length - 1, 4)) {
          setCurrentOptionIndex(currentOptionIndex + 1);
        } else {
          setCurrentOptionIndex(0);
        }
        break;
      case 38: // keyup
        if (currentOptionIndex > 0 && currentOptionIndex <= Math.min(filteredOptions.length - 1, 4)) {
          setCurrentOptionIndex(currentOptionIndex - 1);
        } else {
          setCurrentOptionIndex(Math.min(filteredOptions.length - 1, 4));
        }
        break;
      case 13: // enter
        if (filteredOptions && filteredOptions.length > 0 && filteredOptions[currentOptionIndex]) {
          onSelect(filteredOptions[currentOptionIndex].id);
        }
        break;
      case 27: // esc
        setIsVisible(false);
        break;
      default:
        break;
    }
  }, [keyCode]);

  useEffect(() => {
    setCurrentOptionIndex(filteredOptions.length > 0 ? 0 : -1);
  }, [filteredOptions]);

  return (
    <div className="multi-select-dropdown-container" ref={wrapperElement}>
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
        currentOptionIndex={currentOptionIndex}
        options={filteredOptions}
        onSelect={onSelect}
        isVisible={isVisible}
      />
    </div>
  )
}
