import React from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../components/order-feed/order-info';
import styles from './form.module.css';
import { useOrderInfo } from '../hooks/useOrderInfo';
import { useAppSelector } from '../services/hooks';

const OrderInfoPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const { order, isLoading: isOrderLoading } = useOrderInfo(orderNumber);
  const { isLoading: isIngredientsLoading } = useAppSelector(state => state.ingredients);

  if (isOrderLoading || isIngredientsLoading) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-medium">Загрузка заказа...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <p className="text text_type_main-large">Заказ не найден...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <OrderInfo order={order} />
    </div>
  );
};

export default OrderInfoPage;