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

const queryClient = new QueryClient();

const rootElement =document.getElementById('root');

if(rootElement){
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient} >
          <RouterProvider router={router} />
        </QueryClientProvider >
    </React.StrictMode>
  );
}  else {
  console.error("Root element not found.")
}
