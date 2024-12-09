import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import DetailsProduct from './pages/product-detail/DetailsProduct';

import Product from './components/Product';
import AddProduct from './components/AddProduct';

import Login from './pages/LoginSignup/login';
import Signup from './pages/LoginSignup/signup';
import CartPayment from './pages/cart-payment/cartpayment';
import AdminPage from './pages/admin/AdminPage';

import ManageProduct from './components/ManageProduct';
import ManageRequest from './components/ManageRequest';
import ManageOrder from './components/ManageOrder';
//import { CartProvider } from './components/component_dinh/Cart/CartContext';
// import ReactDOM from 'react-dom';
// import BrowserRouter from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Products",
    element: <Product />,
    children: [{
      path: "/Products/:productId",
      element: <DetailsProduct />,
    }]
  },


  {
    path: "/Admin",
    element: <AdminPage />,
    children: [{
      path: "/Admin/ManageProduct",
      element: <ManageProduct />,
      children: [{
        path: "/Admin/ManageProduct/AddProduct",
          element: <AddProduct />,
        }]
    },
    {
      path: "/Admin/ManageRequest",
      element: <ManageRequest />,
    },
    {
      path: "/Admin/ManageOrder",
      element: <ManageOrder />,
      // children: [{
      //   path: "/Admin/ManageOrder/:orderId",
      //   element: <DetailsProduct />,
      // }]
    }]
  },


{
  path: "/login",
    element: <Login />
},
{
  path: "/signup",
    element: <Signup />
},
{
  path: "/cart&payment",
    element: <CartPayment />
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
//CONTEXT CHO CART ARRAY
/*ReactDOM.render(
  <CartProvider>
      <App />
  </CartProvider>,
  document.getElementById('root')
);*/


reportWebVitals();
