import React from 'react';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/types.js';

import styles from './burger-ingredients.module.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ item }) => {
  return (
    <article className={styles.ingredientCard}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img
        className={styles.cardImage}
        src={item.image}
        alt={item.name}
      />
      <div className={styles.cardPrice + ' mt-1 mb-1'}>
        <span className="text text_type_digits-default m-1">
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">
        {item.name}
      </p>
    </article>
  );
};

IngredientCard.propTypes = {
  item: ingredientPropType.isRequired,
};

export default IngredientCard;