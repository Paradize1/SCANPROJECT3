import React, { useState } from 'react';


const Tonality = ({ tonality, setTonality }) => {
    return (
      <div className="form-field form-field-inputs">
        <label htmlFor="tonality">Тональность</label>
        <div className="select-wrapper"> 
          <select id="tonality" name="tonality" value={tonality} onChange={(e) => setTonality(e.target.value)}>
            <option value="Любая">Любая</option>
            <option value="Позитивная">Позитивная</option>
            <option value="Негативная">Негативная</option>
          </select>
        </div>
      </div>
    );
};

export default Tonality;