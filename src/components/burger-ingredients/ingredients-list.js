import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import IngredientCard from './ingredient-card';
import { ingredientPropType } from '../../utils/types.js';

import styles from './burger-ingredients.module.css';

const IngredientsList = ({ items, title, onIngredientClick }) => {
  const [ingredientItems, setIngredientItems] = useState([]);

  useEffect(() => {
    setIngredientItems(items);
  }, [items]);

  return (
    <>
      <p className="text text_type_main-medium pt-10">{title}</p>
      <div className={styles.itemsGrid}>
        {ingredientItems.map((it) => (
          <IngredientCard item={it} key={it._id} onIngredientClick={onIngredientClick} />
        ))}
      </div>
    </>
  );
};

IngredientsList.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType).isRequired,
  title: PropTypes.string.isRequired,
  onIngredientClick: PropTypes.func.isRequired
};

export default IngredientsList;