import { Navigate, Outlet } from 'react-router-dom';
import Auth from '../utils/auth';

const ProtectedRoute = () => {
  // ✅ Redirect to /login if the user is not logged in
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Render the child routes (like Board, Create, Edit) if logged in
  return <Outlet />;
};

export default ProtectedRoute;
