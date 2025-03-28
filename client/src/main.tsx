import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Board from './pages/Board';
import CreateTicket from './pages/CreateTicket';
import EditTicket from './pages/EditTicket';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Board />
          },
          {
            path: 'create',
            element: <CreateTicket />
          },
          {
            path: 'edit',
            element: <EditTicket />
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default router;
