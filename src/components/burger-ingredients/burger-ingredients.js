import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IngredientsList from './ingredients-list.js';
import { ingredientPropType } from '../../utils/types.js';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({ items }) => {
  const [currentTab, setCurrentTab] = useState('bun');

  return (
    <div className={styles.ingredientsPanel}>
      <p className="text text_type_main-large pt-5">Соберите бургер</p>

      <div className={styles.ingredientsTab}>
        <Tab
          value="bun"
          active={currentTab === 'bun'}
          onClick={() => setCurrentTab('bun')}
        >
          Булки
        </Tab>
        <Tab
          value="sause"
          active={currentTab === 'sause'}
          onClick={() => setCurrentTab('sause')}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === 'main'}
          onClick={() => setCurrentTab('main')}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredientsScrollArea}>
        <IngredientsList
          items={items.filter((item) => item.type === 'bun')}
          title="Булки"
        />
        <IngredientsList
          items={items.filter((item) => item.type === 'sauce')}
          title="Соусы"
        />
        <IngredientsList
          items={items.filter((item) => item.type === 'main')}
          title="Начинки"
        />
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;