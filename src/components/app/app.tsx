import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appData from '../../utils/data.js';

import styles from './app.module.css';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <AppHeader />
      <main className={styles.appBody}>
        <BurgerIngredients items={appData} />
        <BurgerConstructor items={appData} />
      </main>
    </div>
  );
}

export default App;