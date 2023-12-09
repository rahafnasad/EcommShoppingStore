import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './component/user/contex/User.jsx';
import { CartContextProvider } from './component/user/contex/Cart.jsx';
const queryClient=new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
            <CartContextProvider>

      <UserContextProvider>

  <QueryClientProvider client={queryClient}>
  <ToastContainer/>

<App />
  </QueryClientProvider>
  </UserContextProvider>
  </CartContextProvider>


  </>
  
)
