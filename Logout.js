// src/Components/Logout.js
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

function Logout() {
    const { logout } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.get('http://localhost:8080/user/logout');
                logout(); // 👈 fixed
                navigate("/login");
            } catch (error) {
                console.error("Logout failed", error);
            }
        };

        performLogout();
    }, [logout, navigate]); // 👈 removed 'Logout' from dependency array

    return (
        <div className="text-center mt-5">
            <h3>Logging out...</h3>
        </div>
    );
}

export default Logout;
