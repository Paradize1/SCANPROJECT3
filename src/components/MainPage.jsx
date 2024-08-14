import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tariffs from './Tariffs';
import Carousel from './Carousel';
import './styles/MainPage.css';



function MainPage({isAuthenticated}) {
    const navigate = useNavigate();

    const handleGetInfoClick = () => {
        navigate('/search');
    };





    return(
        <div className='MainPage'>
            <div className='first_block'>
                    <div className='fb_1'>
                        <div className='fb_1_1'>СЕРВИС ПО ПОИСКУ <br />
                        ПУБЛИКАЦИЙ<br /> О КОМПАНИИ<br /> ПО ЕГО ИНН  </div>
                        <div className='fb_1_2'>Комплексный анализ публикаций, получение данных <br />
                        в формате PDF на электронную почту.</div>
                        
                        {isAuthenticated && (
                        <button className='button_info' onClick={handleGetInfoClick}>
                            Запросить данные
                        </button>
                    )}
                        
                    
                    
                    
                    </div>
                    <div className='fb_2'></div>
            </div>

            <>
                <Carousel />
            </>

            <div className='second_block'></div>

            <>
                <Tariffs isAuthenticated={isAuthenticated}/>
            </>
        </div>
    );

}

export default MainPage;