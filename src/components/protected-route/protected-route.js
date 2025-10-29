import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({ element, unAuthRoute = false }) => {
  const { user, isAuthChecked } = useSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthChecked) {
    return (
        <p className="text text_type_main-large">Загрузка...</p>
    );
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

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
  onlyUnauth: PropTypes.bool,
};

export default ProtectedRouteElement;