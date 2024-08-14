import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/Login.css';
import { getAccountInfo } from './services/Companys';



const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({login: '',password: ''});
  const [ButtonActive, setButtonActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setError] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    const newLoginData = { ...loginData, [name]: value };
    setLoginData(newLoginData);
  
    // Проверяем, заполнены ли оба поля логина и пароля
    if (newLoginData.login !== '' && newLoginData.password !== '') {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };


  const handleLogin = async () => {
    setLoading(true);


    try {
      const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ login: loginData.login, password: loginData.password })
      });

      if (!response.ok) {
        throw new Error('Ошибка при авторизации');
      }

      const data = await response.json();
      const { accessToken, expire } = data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('tokenExpire', expire);
      setIsAuthenticated(true);


      const accountInfoData = await getAccountInfo(accessToken);
      setAccountInfo(accountInfoData);



      setLoginData({ login: '', password: '' });
      setButtonActive(false);


      setLoading(false);
      navigate('/');

    } catch (error) {
      setLoading(false);
      setError(error.message); // Устанавливаем сообщение об ошибке

      console.error('Ошибка:', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };





  return (
    <div className='Login_Container'>
      <div className='text_and_image'>
        <div className='main_text'>
          ДЛЯ ОФОРМЛЕНИЯ ПОДПИСКИ <br />
          <div className='img_2'></div>
          НА ТАРИФ, НЕОБХОДИМО <br />
          АВТОРИЗОВАТЬСЯ.
        </div>
        <div className='main_img'></div>
      </div>

      <div className='login_group'>

        <div className='login_panel'>

          <div className='login_or_register'>
            <div className='login'>Войти</div>
            <div className='register'>Зарегистрироваться</div>
          </div>

          <div className='login_and_password_block'>
            <div className='login_text_1'>Логин или номер телефона</div>
            <div className='login_block'>
              <input 
              type="login_of_phone" 
              name="login" 
              value={loginData.login}
              onChange={handleChange}
              required

              
              />
            </div>
            <div className='login_text_2'>Пароль</div>
            <div className='password_block'>
              <div className='inputContainer'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="passwordInput"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required

                />
                <span id="togglePassword" onClick={togglePasswordVisibility}>
                  {passwordVisible ? '👁️‍🗨️' : '👁️'}
                </span>
              </div>
            </div>
          </div>

          <button 
          className={`inside_button ${ButtonActive ? 'active' : ''}`} 
          disabled={!ButtonActive}
          onClick={handleLogin}
          >
            {loading ? (
          <div className='loading-spinner'>
          </div>
        ) : (
          'Войти'
        )}
      </button>


          <div className='recover'>Восстановить пароль</div>

          <div className='alternative'>
            <div className='block_1'>Войти через:</div>
            <div className='block_2'>
              <div className='login_item_1'></div>
              <div className='login_item_2'></div>
              <div className='login_item_3'></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;



