import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details';
import IngredientDetails from '../modal/ingredient-details';
import styles from './app.module.css';
import { getIngredients } from '../../services/ingredientsSlice';
import { clearIngredient } from '../../services/detailsSlice';
import { clearOrder } from '../../services/orderSlice';

const App = () => {
  const dispatch = useDispatch();

  const { items, isLoading, hasError } = useSelector(state => state.ingredients);
  const selectedIngredient = useSelector(state => state.details.selectedIngredient);
  const orderNumber = useSelector(state => state.order.orderNumber);

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleCloseIngredientModal = () => {
    dispatch(clearIngredient());
  };

  const handleCloseOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <>
      <div className={styles.appContainer}>
        <AppHeader />
        <main className={styles.appBody}>
          {hasError && <p>Произошла ошибка при загрузке данных!</p>}
          {isLoading && <p>Загрузка ингредиентов...</p>}
          {!isLoading && !hasError && items.length > 0 && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </div>

      {orderNumber && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleCloseIngredientModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;