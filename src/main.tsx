import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './pages/Main';
import ErrorBoundary from './components/ui/ErrorBoundary';
import About from './pages/About';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <ErrorBoundary><Main /></ErrorBoundary> },
      { path: '/about', element: <ErrorBoundary><About /></ErrorBoundary> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
