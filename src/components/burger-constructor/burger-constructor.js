import React from 'react';
import PropTypes from 'prop-types';

import BurgerConstructorItem from './burger-constructor-item.js';

import styles from './burger-constructor.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class BurgerConstructor extends React.Component {
  render() {
    return (
      <aside className={styles.constructorPanel}>
        <div className={styles.constructorItemsWrapper}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <BurgerConstructorItem
              type="top"
              isLocked={true}
              text={this.props.items[0].name + ' (верх)'}
              price={this.props.items[0].price}
              thumbnail={this.props.items[0].image}
            />
            <BurgerConstructorItem
              text={this.props.items[1].name}
              price={this.props.items[1].price}
              thumbnail={this.props.items[1].image}
            />
            <BurgerConstructorItem
              text={this.props.items[2].name}
              price={this.props.items[2].price}
              thumbnail={this.props.items[2].image}
            />
            <BurgerConstructorItem
              text={this.props.items[3].name}
              price={this.props.items[3].price}
              thumbnail={this.props.items[3].image}
            />
            <BurgerConstructorItem
              type="bottom"
              isLocked={true}
              text={this.props.items[0].name + ' (низ)'}
              price={this.props.items[0].price}
              thumbnail={this.props.items[0].image}
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
  }
}

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;