import { Navigate } from 'react-router-dom';

export default function RequireRole({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
