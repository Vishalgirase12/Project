// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App1 from './Component/App1';
import Nav from './Component/Nav';
import Login from './Component/Login';
import Logout from './Component/Logout';
import Register from './Component/Register';
import Home from './Component/Home';
import BookingPage from './Component/BookingPage';
import BookAdd from './Component/BookAdd';
import PaymentPage from './Component/PaymentPage';
import Checkout from './Component/Checkout'; // ✅ This is the correct import
import ThemeProvider from './Context/ThemeContext';
import BookSlider from './Component/BookSlider';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      { path: '/product', element: <App1 /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/logout', element: <Logout /> },
      { path: '/home', element: <Home /> },

      { path: '/bookadd', element: <BookAdd /> },
      { path: '/productview/:id', element: <BookingPage /> },
      { path: '/payment', element: <PaymentPage /> },
      { path: '/checkout', element: <Checkout /> }, // optional route
      { path: '/bookslider', element: <BookSlider /> }, // optional route
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);

reportWebVitals();
