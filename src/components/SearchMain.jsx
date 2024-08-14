import React, { useState, useEffect } from 'react';
import './styles/SearchMain.css';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

import Tonality from './services/SearchService/Tonality'; 
import DocumentCount from './services/SearchService/DocumentCount';
import DateInput from './services/SearchService/DateInput'; 
import CompanyINN from './services/SearchService/CompanyINN'; 
import CheckboxBlock from './services/SearchService/CheckboxBlock'; 

function SearchMain() {
  const navigate = useNavigate();

  const [companyINN, setCompanyINN] = useState('');
  const [tonality, setTonality] = useState('Любая');
  const [documentCount, setDocumentCount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkboxStates, setCheckboxStates] = useState({
      maxCompleteness: false,
      businessMentions: false,
      mainRole: false,
      riskFactorsOnly: false,
      includeMarketNews: true,
      includeAnnouncements: true,
      includeNewsSummaries: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
      const isValid = companyINN && documentCount && startDate && endDate;
      setIsFormValid(isValid);
  }, [companyINN, documentCount, startDate, endDate, checkboxStates]);

  const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      setCheckboxStates(prevState => ({
          ...prevState,
          [name]: checked,
      }));
  };

  const handleSubmit = async (event) => {
      event.preventDefault();

      let apiTonality;
      switch (tonality) {
          case 'Любая':
              apiTonality = 'any';
              break;
          case 'Позитивная':
              apiTonality = 'positive';
              break;
          case 'Негативная':
              apiTonality = 'negative';
              break;
          default:
              apiTonality = 'any';
      }

      if (isFormValid) {
          const searchParams = {
              issueDateInterval: {
                  startDate: `${startDate}T00:00:00+03:00`,
                  endDate: `${endDate}T23:59:59+03:00`
              },
              searchContext: {
                  targetSearchEntitiesContext: {
                      targetSearchEntities: [{
                          type: "company",
                          inn: companyINN,
                          maxFullness: checkboxStates.maxCompleteness,
                      }],
                      onlyMainRole: checkboxStates.mainRole,
                      tonality: apiTonality,
                      onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
                  }
              },
              attributeFilters: {
                  excludeTechNews: !checkboxStates.includeMarketNews,
                  excludeAnnouncements: !checkboxStates.includeAnnouncements,
                  excludeDigests: !checkboxStates.includeNewsSummaries,
              },
              limit: Number(documentCount),
              sortType: "sourceInfluence",
              sortDirectionType: "desc",
              intervalType: "month",
              histogramTypes: ["totalDocuments", "riskFactors"]
          };

          console.log('Отправка запроса на сервер с данными:', searchParams);

          navigate('/results', { state: { searchParams: searchParams } });
      } else {
          console.log('Форма не валидна, перенаправление не выполнено.');
      }
  };

  return (
      <div className='SearchMainPage'>
          <div className='search_content_top'>
              <div className='search_top_text'>
                  <div className='search_top_text_main'>НАЙДИТЕ НЕОБХОДИМЫЕ <br />
                      ДАННЫЕ В ПАРУ КЛИКОВ</div>
                  <div className='search_top_text_dop'>Задайте параметры поиска. <br />
                      Чем больше заполните, тем точнее поиск</div>
              </div>
              <div className='search_top_img'>
                  <div className='search_top_img_1'></div>
                  <div className='search_top_img_2'></div>
              </div>
          </div>

          <div className="search_content_bot">
              <div className="search_panel_main">
                  <div className="search_input_block">
                      <form onSubmit={handleSubmit} className="search-form">
                          <div className="left-part-search-form">
                              <CompanyINN companyINN={companyINN} setCompanyINN={setCompanyINN} />
                              <Tonality tonality={tonality} setTonality={setTonality} />
                              <DocumentCount documentCount={documentCount} setDocumentCount={setDocumentCount} />
                              <DateInput startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                          </div>

                          <div className="right-part-search-form">
                              <CheckboxBlock checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange} />
                              <div className='main_search_button_container'>
                                  <button className="main_search_button" type="submit" disabled={!isFormValid}>Поиск</button>
                                  <div className='main_search_button_doptext'>* Обязательные к заполнению поля</div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
              <div className="search_content_bot_img"></div>
          </div>
      </div>
  );
}

export default SearchMain;