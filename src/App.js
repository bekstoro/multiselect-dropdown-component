import React from 'react';
import { colors, countries } from './constants/sources';
import MultiSelectDropdown from './MultiSelectDropdown';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="center">
        <div>
          <h3>Choose countries:</h3>
          <MultiSelectDropdown options={countries}/>
        </div>
        <div>
          <h3>Choose colors:</h3>
          <MultiSelectDropdown options={colors}/>
        </div>
      </div>
    </div>
  );
}

export default App;
