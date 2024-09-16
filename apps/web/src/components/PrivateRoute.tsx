import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to='/sign-in' replace />;
};

export const AdminRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/dashboard' replace />
  );
};
