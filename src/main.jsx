import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './Pages/Home'

const  router = createBrowserRouter([
  {
    path:"/Currency/",
    element: <App/>,
    children:[
      {
        path:"/Currency/",
        element:<Home/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />    
    </RouterProvider>
  </React.StrictMode>,
)
