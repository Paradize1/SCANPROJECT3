import React, { useState, useEffect } from 'react';

const DocumentCount = ({ documentCount, setDocumentCount }) => {
  const [error, setError] = useState('');

  const validateDocumentCount = () => {
    const count = parseInt(documentCount, 10);

    if (!documentCount) {
      setError("Обязательное поле");
    } else if (isNaN(count) || count < 1) {
      setError("Введите корректные данные");
    } else if (count > 1000) {
      setError("Введите корректные данные");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    validateDocumentCount();
  }, [documentCount]);

  return (
    <div className="form-field form-field-inputs">
      <label htmlFor="documentCount">Количество документов в выдаче <span className={error ? "required-asterisk error" : "required-asterisk"}>*</span></label>
      <input
        type="number"
        id="documentCount"
        name="documentCount"
        className={error ? 'input-error' : ''}
        value={documentCount}
        onChange={(e) => {
          const newValue = e.target.value;
          setDocumentCount(newValue);
          validateDocumentCount();
        }}
        onBlur={validateDocumentCount}
        placeholder="от 1 до 1000"
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DocumentCount;