import React, { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import './styles/Main.css'; 
import Header from "./Header";
import Footer from "./Footer";
import MainPage from './MainPage';
import Login from './Login';
import SearchMain from './SearchMain';
import Results from './Results';
import PrivateRoute from './services/PrivateRouter';





function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize on mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <AuthProvider>
            <>
            <Header 
            isMobile={isMobile}  
            isAuthenticated={isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated}
            />
            <Routes>
                <Route path="/login" element={<Login isMobile={isMobile} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/" element={<MainPage isMobile={isMobile} isAuthenticated={isAuthenticated} />} />
                <Route path="/main" element={<MainPage isMobile={isMobile} isAuthenticated={isAuthenticated} />} />
                
                {/* Защищенные маршруты */}
                <Route element={<PrivateRoute />}>

                    <Route path="/search" 
                    element={
                    <SearchMain 
                    isMobile={isMobile} 
                    isAuthenticated={isAuthenticated} 
                    />} />

                    <Route path="/results" 
                    element={<Results 
                    isMobile={isMobile} 
                    isAuthenticated={isAuthenticated} 
                    />} />

                </Route>

            </Routes>
            <Footer isMobile={isMobile} />
            </>
        </AuthProvider>
    );
}

export default App;