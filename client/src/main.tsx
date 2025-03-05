import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Board from './pages/Board';
import CreateTicket from './pages/CreateTicket';
import EditTicket from './pages/EditTicket';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

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
        element: <ProtectedRoute />,  // ✅ Protect all these child routes
        children: [
          {
            index: true,  // Makes `/` point to the Board
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

export default router;
