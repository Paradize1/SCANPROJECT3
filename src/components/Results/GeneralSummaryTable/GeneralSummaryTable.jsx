import React, { useRef, useEffect, useState } from 'react';
import { formatDate, combineDataByDate } from './helpers';
import './GeneralSummaryTable.css'


const GeneralSummaryTable = ({ searchData, isLoading, isError }) => {
  const [combinedData, setCombinedData] = useState([]);
  const [totalDataCount, setTotalDataCount] = useState(0); 
  
  const tableWrapperRef = useRef(null);

  useEffect(() => {
      if (tableWrapperRef.current) {
          tableWrapperRef.current.scrollLeft = 0;
      }
  }, [combinedData]);

  useEffect(() => {
      if (searchData && !isError) {
          
          const totalDocuments = searchData.data.find(histogram => histogram.histogramType === 'totalDocuments');
          if (totalDocuments) {
              const total = totalDocuments.data.reduce((acc, item) => acc + item.value, 0);
              setTotalDataCount(total);
          }
          
          const combined = combineDataByDate(searchData.data);
          setCombinedData(combined); 
      }
  }, [searchData, isError]);

  const scrollTable = (direction) => {
      const scrollAmount = direction === 'left' ? -300 : 300;
      if (tableWrapperRef.current) {
          tableWrapperRef.current.scrollLeft += scrollAmount;
      }
  };

  return (
      <div className="general-summary-block">
          <h2 className="h2-search-results-page">Общая сводка</h2>
          <p className="p-general-summary-title-block">Найдено данных: {totalDataCount}</p>
            <div className="table-and-arrows-container">
                <button className="scroll-btn left" onClick={() => scrollTable('left')}></button>
                <div className="table-wrapper-main">
                    <div className="table-headers">
                        <div className="header-period">Период</div>
                        <div className="header-total">Всего</div>
                        <div className="header-risks">Риски</div>
                    </div>
                    <div className="table-wrapper" ref={tableWrapperRef}>
                        {isLoading ? (
                            <div className="table-data-loading">
                                <p className="loading-sign">Загружаем данные...</p>
                            </div>
                        ) : isError ? (
                          <div className="table-data-error">
                            <p className="error-500-message">Ошибка сервера. Попробуйте чуть позже или проверьте свой тариф.</p>
                          </div>    
                        ) : (
                            <div className="table-data">
                                {combinedData.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="data-row">
                                            <div className="data-cell">{item.period}</div>
                                            <div className="data-cell">{item.total}</div>
                                            <div className="data-cell">{item.risks}</div>
                                        </div>
                                        {index < combinedData.length - 1 && <div className="divider"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button className="scroll-btn right" onClick={() => scrollTable('right')}></button>
            </div>
        </div>
    );
};

export default GeneralSummaryTable;


