import React from 'react';

import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import appData from './utils/data.js';

import './App.css';

function App() {
  return (
    <div className="appContainer">
      <AppHeader />
      <div className="appBody">
        <BurgerIngredients items={appData} />
        <BurgerConstructor items={appData} />
      </div>
    </div>
  );
}

export default App;