import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { loadIngredients } from '../../utils/burgers-api';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-details';
import IngredientDetails from '../modal/ingredient-details';

import styles from './app.module.css';

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const [isOrderModalOpen, setOrderModalOpen] = React.useState(false);
  const [selectedIngredient, setSelectedIngredient] = React.useState(null);

  const ingredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };
  const orderClick = () => {
    setOrderModalOpen(true);
  };
  const closeModal = () => {
    setOrderModalOpen(false);
    setSelectedIngredient(null);
  };

  React.useEffect(() => {
    loadIngredients()
      .then(response => {
        setIngredients(response.data);
      })
      .catch(error => {
        console.error(error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className={styles.appContainer}>
        <AppHeader />
        <main className={styles.appBody}>
          {hasError && <p>Произошла ошибка при загрузке данных!</p>}
          {isLoading && <p>Загрузка ингредиентов...</p>}
          {!isLoading && !hasError && ingredients.length > 0 && (
            <>
              <BurgerIngredients items={ingredients} onIngredientClick={ingredientClick} />
              <BurgerConstructor items={ingredients} onOrderClick={orderClick} />
            </>
          )}
        </main>
      </div>

      {isOrderModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}

      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
}

export default App;