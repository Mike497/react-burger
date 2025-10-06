import React from 'react';

import styles from './modals.module.css';

import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = () => {
  const orderId = '777777';

  return (
    <div className={styles.orderDetailsContainer}>
      <p className="text text_type_digits-large">{orderId}</p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={styles.orderDetailsIconContainer}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;