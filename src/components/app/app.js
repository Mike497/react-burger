import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details';
import IngredientDetails from '../modal/ingredient-details';
import styles from './app.module.css';
import { getIngredients } from '../../services/ingredientsSlice';
import { clearOrder } from '../../services/orderSlice';
import { getUser, setAuthChecked } from '../../services/authSlice';
import { getCookie } from '../../utils/cookies';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot';
import ResetPasswordPage from '../../pages/reset';
import ProfilePage, { ProfileForm, OrdersHistory } from '../../pages/profile';
import IngredientPage from '../../pages/ingredient-page';
import ProtectedRouteElement from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const { items, isLoading, hasError } = useSelector(state => state.ingredients);
  const orderNumber = useSelector(state => state.order.orderNumber);

  React.useEffect(() => {
    if (getCookie('token')) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
    dispatch(getIngredients());
  }, [dispatch]);

  const handleCloseIngredientModal = () => {
    navigate(-1);
  };

  const handleCloseOrderModal = () => {
    dispatch(clearOrder());
  };

  const MainPage = () => (
    <>
      {hasError && <p>Произошла ошибка при загрузке данных!</p>}
      {isLoading && <p>Загрузка ингредиентов...</p>}
      {!isLoading && !hasError && items.length > 0 && (
        <div className={styles.appBody}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      )}
    </>
  );

  return (
    <>
      <AppHeader />
      <main className={styles.mainContent}>
        <Routes location={background || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />

          {/* Unauthorized routes */}
          <Route path="/login" element={<ProtectedRouteElement unAuthRoute={true} element={<LoginPage />} />} />
          <Route path="/register" element={<ProtectedRouteElement unAuthRoute={true} element={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<ProtectedRouteElement unAuthRoute={true} element={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<ProtectedRouteElement unAuthRoute={true} element={<ResetPasswordPage />} />} />

          {/* Authorized routes */}
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<OrdersHistory />} />
          </Route>
        </Routes>
      </main>

      {orderNumber && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}

      {background && (
        <Routes>
          <Route 
            path="/ingredients/:id" 
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseIngredientModal}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;