import React from 'react';

const CheckboxBlock = ({ checkboxStates, handleCheckboxChange }) => {
  const labels = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  return (
    <div className="right-part-search-checkbox-block">
      {Object.keys(checkboxStates).map((key) => (
        <div key={key} className="checkbox-container">
          <input
            type="checkbox"
            id={`checkbox-${key}`}
            name={key}
            checked={checkboxStates[key]}
            onChange={handleCheckboxChange}
            className="hidden-checkbox"
          />
          <label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? "checked-label" : ""}>
            <span className="custom-checkbox"></span>
            <span className="label-text">{labels[key]}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxBlock;