import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Main from './pages/main/Main';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import About from './pages/about/About';
import Layout from './pages/layout/Layout';
import NotFound from './pages/404/NotFound';
import AnimeDetails from './pages/anime-details/AnimeDetails';
import ErrorUI from './components/ui/error-ui/ErrorUI';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <Main />
          </ErrorBoundary>
        ),
        children: [
          {
            errorElement: <ErrorUI className="min-w-1/2 max-w-1/2" />,
            path: 'details/:id',
            element: <AnimeDetails />,
          },
        ],
      },
      {
        path: '/about',
        element: (
          <ErrorBoundary>
            <About />
          </ErrorBoundary>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
