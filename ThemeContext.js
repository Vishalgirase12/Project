// src/Context/ThemeContext.js
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        sessionStorage.clear();
    };

    return (
        <ThemeContext.Provider value={{ user, login, logout }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
