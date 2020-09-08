import React from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';
import './App.css';

const countries = [
  { id: 1, name: "Azerbaijan" },
  { id: 2, name: "Armenia" },
  { id: 3, name: "Belarus" },
  { id: 4, name: "Kazakhstan" },
  { id: 5, name: "Kyrgyzstan" },
  { id: 6, name: "Moldova" },
  { id: 7, name: "Russia" },
  { id: 8, name: "Tajikistan" },
  { id: 9, name: "Turkmenistan" },
  { id: 10, name: "Uzbekistan" },
  { id: 11, name: "Ukraine" },
];

function App() {
  return (
    <div className="App">
      <div className="center">
        <MultiSelectDropdown options={countries}/>
      </div>
    </div>
  );
}

export default App;
