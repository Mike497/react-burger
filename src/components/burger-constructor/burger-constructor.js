import React from 'react';
import PropTypes from 'prop-types';

import { ingredientPropType } from '../../utils/types.js';
import BurgerConstructorItem from './burger-constructor-item.js';

import styles from './burger-constructor.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ items }) => {
  const fillings = items.filter((item) => item.type !== 'bun');

  return (
    <aside className={styles.constructorPanel}>
      <div className={styles.constructorItemsWrapper}>
        <div className={styles.constructorItems}>
          <BurgerConstructorItem
            type="top"
            isLocked={true}
            text={items[0].name + ' (верх)'}
            price={items[0].price}
            thumbnail={items[0].image}
          />
          {fillings.map((ingredient) => (
            <BurgerConstructorItem
              key={ingredient._id}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          ))}
          <BurgerConstructorItem
            type="bottom"
            isLocked={true}
            text={items[0].name + ' (низ)'}
            price={items[0].price}
            thumbnail={items[0].image}
          />
        </div>
      </div>

      <div className={styles.orderSummary}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </aside>
  );
};

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;