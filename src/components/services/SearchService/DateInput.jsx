import React, { useState, useEffect } from 'react';

const DateInput = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [error, setError] = useState('');
  const [inputTypeStart, setInputTypeStart] = useState('text');
  const [inputTypeEnd, setInputTypeEnd] = useState('text');

  useEffect(() => {
    validateDateRange();
  }, [startDate, endDate]);

  const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    if (!startDate || !endDate) {
      setError("Обязательное поле");
    } else if (new Date(startDate) > new Date(endDate)) {
      setError("Введите корректные данные");
    } else if (new Date(startDate) > currentDate || new Date(endDate) > currentDate) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError("");
    }
  };

  return (
    <div className="form-field">
      <label htmlFor="startDate">Диапазон поиска <span className={error ? "required-asterisk error" : "required-asterisk"}>*</span></label>
      <div className='form-field-date-inputs'>
        <div className="date-input-container">
          <input
            type={inputTypeStart}
            onFocus={() => setInputTypeStart('date')}
            onBlur={() => {
              validateDateRange();
              if (!startDate) setInputTypeStart('text');
            }}
            id="startDate"
            name="startDate"
            placeholder="Дата начала"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={error ? 'error' : ''}
          />
          <input
            type={inputTypeEnd}
            onFocus={() => setInputTypeEnd('date')}
            onBlur={() => {
              validateDateRange();
              if (!endDate) setInputTypeEnd('text');
            }}
            id="endDate"
            name="endDate"
            placeholder="Дата конца"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={error ? 'error' : ''}
          />
        </div>
        {error && <div className="date-error-message error">{error}</div>}
      </div>  
    </div>
  );
};

export default DateInput;