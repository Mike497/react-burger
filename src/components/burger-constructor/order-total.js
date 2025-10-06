import React from 'react';
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderTotal = ({ onOrderClick }) => {
  return (
      <div className={styles.orderSummary}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onOrderClick}>
          Оформить заказ
        </Button>
      </div>
  );
};

OrderTotal.propTypes = {
  onOrderClick: PropTypes.func.isRequired
};

export default OrderTotal;