import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

type TProtectedRouteProps = {
  element: ReactElement;
  unAuthRoute?: boolean;
};

const ProtectedRouteElement: React.FC<TProtectedRouteProps> = ({ element, unAuthRoute = false }) => {
  const { user, isAuthChecked } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthChecked) {
    return <p className="text text_type_main-large">Загрузка...</p>;
  }

  if (unAuthRoute && user) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} />;
  }

  if (!unAuthRoute && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRouteElement;