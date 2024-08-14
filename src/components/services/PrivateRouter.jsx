import {Navigate, Outlet } from "react-router-dom"
import React, { useState, useEffect } from 'react';


function PrivateRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
    }, []);


    if (isAuthenticated === undefined) {
        return null; // Показать индикатор загрузки, пока проверяем аутентификацию
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoute;