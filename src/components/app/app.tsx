import React from 'react';
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
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import FeedPage from '../../pages/feed';
import OrderInfoPage from '../../pages/order-info-page';
import OrderInfoModal from '../order-feed/order-info-modal';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state && location.state.background;

  const { items, isLoading, hasError } = useAppSelector(state => state.ingredients);
  const { orderNumber, isLoading: isOrderLoading } = useAppSelector(state => state.order);

  React.useEffect(() => {
    if (getCookie('token')) {
      dispatch(getUser());
    } else {
      dispatch(setAuthChecked(true));
    }
    dispatch(getIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    navigate(-1);
  };

  const handleCloseOrderModal = () => {
    dispatch(clearOrder());
  };

  const MainPage: React.FC = () => (
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
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:orderNumber" element={<OrderInfoPage />} />
          <Route path="/login" element={<ProtectedRouteElement unAuthRoute={true} element={<LoginPage />} />} />
          <Route path="/register" element={<ProtectedRouteElement unAuthRoute={true} element={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<ProtectedRouteElement unAuthRoute={true} element={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<ProtectedRouteElement unAuthRoute={true} element={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}>
            <Route index element={<ProfileForm />} />
            <Route path="orders" element={<OrdersHistory />} />
            <Route path="orders/:orderNumber" element={<OrderInfoPage />} />
          </Route>
        </Routes>
      </main>

      {(isOrderLoading || orderNumber) && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}

      {background && (
        <Routes>
          <Route 
            path="/ingredients/:id" 
            element={
              <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route 
            path="/feed/:orderNumber" 
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfoModal />
              </Modal>
            }
          />
          <Route 
            path="/profile/orders/:orderNumber" 
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfoModal />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;