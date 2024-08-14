import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Header.css';
import { getStoredAccountInfo } from './services/Companys';



function Header({ isAuthenticated, setIsAuthenticated}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Добавляем состояние загрузки
    const [usedCompanyCount, setUsedCompanyCount] = useState(0);
    const [companyLimit, setCompanyLimit] = useState(0);

    useEffect(() => {
        if (isAuthenticated) {
            const storedAccountInfo = getStoredAccountInfo(); // Получаем сохранённые данные об аккаунте из Companys.js
            if (storedAccountInfo) {
                const { usedCompanyCount, companyLimit } = storedAccountInfo.eventFiltersInfo;
                setUsedCompanyCount(usedCompanyCount); // Устанавливаем состояние использованных компаний
                setCompanyLimit(companyLimit); // Устанавливаем состояние лимита компаний
                console.log('Использованные компании:', usedCompanyCount);
                console.log('Лимит по компаниям:', companyLimit);
            }
        }
    }, [isAuthenticated]);







    useEffect(() => {
        // Этот эффект будет вызываться при каждом изменении isAuthenticated
        console.log('isAuthenticated изменился:', isAuthenticated);
    }, [isAuthenticated]);


    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLoginClick = () => {
        navigate('/login');
      };

    const handleMainClick = () => {
        navigate('/main');
    };

    const handleTariffsClick = () => {
        alert('Tariffs');
    };

    const handleFAQClick = () => {
        alert('FAQ');
    };



    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpire');
        setIsAuthenticated(false);
        navigate('/login');
    };

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true); // Устанавливаем состояние загрузки в true
            const timer = setTimeout(() => {
                setLoading(false); // Снимаем состояние загрузки через 2 секунды
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            setLoading(false);
        }
    }, [isAuthenticated]);



  


    return(
        <div className='header'>
            <div className='top-left'></div>
            <div className='top-middle'>
                <div className='first_link' onClick={handleMainClick}>Главная</div>
                <div className='second_link' onClick={handleTariffsClick}>Тарифы</div>
                <div className='third_link' onClick={handleFAQClick}>FAQ</div>
            </div>
            <div className='top-right'>

                {isAuthenticated ? (
                <>
                    <div className='company_or_spinner'>
                        {loading ? (
                            <div className='loading-spinner rotate'></div>
                        ) : (
                            <div className='companys'>
                                <div className='used_companys'>Использовано компаний: <span className='count'>{usedCompanyCount}</span> </div>
                                <div className='limits_company'>Лимит по компаниям: <span className='limit'>{companyLimit}</span></div>
                            </div>
                        )}

                    </div>


                    <div className='avatar'>
                        <button className='logout' onClick={handleLogout}>Выйти</button>
                    </div>
                </>
            ) : (
                <>
                    <button className='register_button' onClick={handleRegisterClick}>Зарегистрироваться</button>
                    <div className='head_palka'></div>
                    <button className='login_button' onClick={handleLoginClick}>Войти</button>
                </>
                )}
            </div>
        </div>
        
    );

}

export default Header;



