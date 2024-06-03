import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/Header';
import { BookDetail } from './components/BookDetail';
import { FaqComponent } from './components/FaqComponent';
import { ErrorPage } from './components/ErrorPage';


const router = createBrowserRouter([
  {
    path:"/",
    element : <Header />,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'/',
        element:<App />
      },
      {
        path:"book/:isbn13",
        element:<BookDetail />
      },
      {
        path:"/faq",
        element:<FaqComponent />
      },
    ]
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient} >
        <RouterProvider router={router} />
      </QueryClientProvider >
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
