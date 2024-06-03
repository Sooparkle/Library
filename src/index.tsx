import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/Header.jsx';
import { BookDetail } from './components/BookDetail.jsx';
import { FaqComponent } from './components/FaqComponent.jsx';
import { ErrorPage } from './components/ErrorPage.jsx';


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
