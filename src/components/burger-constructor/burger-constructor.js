import React from 'react';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/types.js';
import BurgerConstructorItem from './burger-constructor-item.js';
import OrderTotal from './order-total.js';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ items, onOrderClick }) => {
  const fillings = items.filter((item) => item.type !== 'bun');

  return (
    <aside className={styles.constructorPanel}>
      <div className="pl-8 pr-4">
        <BurgerConstructorItem
          type="top"
          isLocked={true}
          text={items[0].name + ' (верх)'}
          price={items[0].price}
          thumbnail={items[0].image}
        />
      </div>
      <div className={styles.fillingsScrollArea}>
        {fillings.map((ingredient) => (
          <BurgerConstructorItem
            key={ingredient._id}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
      ))}
      </div>
      <div className="pl-8 pr-4">
        <BurgerConstructorItem
          type="bottom"
          isLocked={true}
          text={items[0].name + ' (низ)'}
          price={items[0].price}
          thumbnail={items[0].image}
        />
      </div>

      <OrderTotal onOrderClick={onOrderClick} />
    </aside>
  );
};

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType).isRequired,
  onOrderClick: PropTypes.func.isRequired
};

export default BurgerConstructor;