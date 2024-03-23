import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import { BookDetail } from './components/BookDetail';

const router = createBrowserRouter([
  {
    path:"/",
    element : <Header />,
    children:[
      {
        path:'/',
        element:<App />
      },
      {
        path:"book/:isbn",
        element:<BookDetail />
      }
    ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
