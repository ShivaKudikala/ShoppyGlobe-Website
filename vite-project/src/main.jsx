import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Header from './components/Header.jsx';
import { Provider } from "react-redux";
import store from './utils/Store.js';
import Cart from './components/Cart.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import { lazy, Suspense } from 'react';

const Checkout = lazy(() => import("./components/Checkout.jsx")); // lazy imports
const NotFound = lazy(() => import("./components/NotFound.jsx"));

// using router for different routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Suspense fallback={<div className="loading-container"><div className="spinner"></div></div>}><NotFound /></Suspense>,
    children: [
      {
        path: "/",
        element: <Header />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/Product-Detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/products/:name",
        element: <Header />,
      },
      {
        path: "/checkout",
        element: <Suspense fallback={<div className="loading-container"><div className="spinner"></div></div>}><Checkout /></Suspense>,
      },
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  </StrictMode>,
)
