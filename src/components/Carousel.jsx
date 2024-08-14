import React, { useState } from 'react';
import './styles/Carousel.css';



function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        {
            iconClass: 'icon_1',
            text: 'Высокая и оперативная скорость обработки заявки'
        },
        {
            iconClass: 'icon_2',
            text: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'
        },
        {
            iconClass: 'icon_3',
            text: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству'
        }
    ];
    
    const handleClickLeft = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const handleClickRight = () => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    };


    return (
        <div className='carousel'>
            <div className='carousel_text'>ПОЧЕМУ ИМЕННО МЫ</div>
            <div className='carousel_main'>
                <div className='left_icon' onClick={handleClickLeft}></div>
                <div className='item_1'>
                    <div className={items[currentIndex].iconClass}></div>
                    <div className='text_1'>{items[currentIndex].text}</div>
                </div>
                <div className='item_2'>
                    <div className={items[(currentIndex + 1) % items.length].iconClass}></div>
                    <div className='text_2'>{items[(currentIndex + 1) % items.length].text}</div>
                </div>
                <div className='item_3'>
                    <div className={items[(currentIndex + 2) % items.length].iconClass}></div>
                    <div className='text_3'>{items[(currentIndex + 2) % items.length].text}</div>
                </div>
                <div className='right_icon' onClick={handleClickRight}></div>
            </div>
        </div>
    );
}

export default Carousel;


