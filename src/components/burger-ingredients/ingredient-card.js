import React from 'react';

import styles from './burger-ingredients.module.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class IngredientCard extends React.Component {
  render() {
    return (
      <article className={styles.ingredientCard}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img
          className={styles.cardImage}
          src={this.props.item.image}
          alt={this.props.item.name}
        />
        <div className={styles.cardPrice + ' mt-1 mb-1'}>
          <span className="text text_type_digits-default m-1">
            {this.props.item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className="text text_type_main-default"
          style={{ justifyContent: 'center' }}
        >
          {this.props.item.name}
        </p>
      </article>
    );
  }
}

export default IngredientCard;