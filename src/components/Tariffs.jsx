import React from 'react';

import './styles/Tariffs.css';




function Tariffs({isAuthenticated}) {
    return (
        <div className='Tariffs'>
            <div className='about_tariffs'>НАШИ ТАРИФЫ</div>
            <div className='cards'>
                <div className={`first_card ${isAuthenticated ? 'authenticated' : 'not_authenticated'}`}>
                    <div className='card_1_head'>
                        <div className='card_1_head_text_container'>
                            <div className='card_1_head_text_1'>Beginner</div>
                            <div className='card_1_head_text_2'>Для небольшого исследования</div>
                        </div>
                        <div className='card_1_head_image'></div>
                    </div>
                    <div className='card_1_content'>


                    {isAuthenticated ? (
                        <div className='current_tariff'>Текущий тариф</div>
                    ) : (
                        <div className='current_tariff' style={{ visibility: 'hidden' }}>Текущий тариф</div>
                    )}


                        <div className='prices_1'>
                            <div className='card_1_content_price_1'>799 ₽ </div>
                            <div className='card_1_content_price_1_1'><del>1200 ₽</del></div>
                        </div>
                        
                        <div className='card_1_content_price_2'>или 150 ₽/мес. при рассрочке на 24 мес.</div>
                        <div className='card_1_about'>
                            <div className='tariff_include_1'>В тариф входит</div>
                            <div className='card_1_about_1'>Безлимитная история запросов</div>
                            <div className='card_1_about_2'>Безопасная сделка</div>
                            <div className='card_1_about_3'>Поддержка 24/7</div>
                        </div>

                        {isAuthenticated ? (
                            <>
                                <button className='go_to_office'>Перейти в личный кабинет</button>
                            </>
                        ) : (
                            <>
                                <div className='spacer'></div> {/* Заполнитель пространства */}

                                <button className='more_info_2'>Подробнее</button>                            
                            </>
                        )}


                    
                    
                    
                    
                    </div>



                </div>
                <div className='second_card'>
                    <div className='card_2_head'>
                            <div className='card_2_head_text_container'>
                                <div className='card_2_head_text_1'>Pro</div>
                                <div className='card_2_head_text_2'>Для HR и фрилансеров</div>
                            </div>
                            <div className='card_2_head_image'></div>
                        </div>
                        <div className='card_2_content'>
                            <div className='prices_2'>
                                <div className='card_2_content_price_1'>1299 ₽</div>
                                <div className='card_2_content_price_1_1'><del>2600 ₽</del></div>
                            </div>
                            <div className='card_2_content_price_2'>или 279 ₽/мес. при рассрочке на 24 мес.</div>
                            <div className='card_2_about'>
                            <div className='tariff_include_2'>В тариф входит</div>
                                <div className='card_2_about_1'>Все пункты тарифа Beginner</div>
                                <div className='card_2_about_2'>Экспорт истории</div>
                                <div className='card_2_about_3'>Рекомендации по приоритетам</div>
                            </div>
                            <button className='more_info_1'>Подробнее</button>
                        </div>
                
                </div>
                <div className='third_card'>
                    <div className='card_3_head'>
                            <div className='card_3_head_text_container'>
                                <div className='card_3_head_text_1'>Business</div>
                                <div className='card_3_head_text_2'>Для корпоративных клиентов</div>
                            </div>
                            <div className='card_3_head_image'></div>
                        </div>
                        <div className='card_3_content'>
                            <div className='prices_3'>
                                <div className='card_3_content_price_1'>2379 ₽</div>
                                <div className='card_3_content_price_1_1'><del>3700 ₽</del></div>
                        </div>
                            <div className='card_3_about'>
                            <div className='tariff_include_3'>В тариф входит</div>
                                <div className='card_3_about_1'>Все пункты тарифа Pro</div>
                                <div className='card_3_about_2'>Безлимитное количество запросов</div>
                                <div className='card_3_about_3'>Приоритетная поддержка</div>
                            </div>
                            <button className='more_info_2'>Подробнее</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default Tariffs;
