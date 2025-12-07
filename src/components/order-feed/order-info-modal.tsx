import React from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from './order-info';
import { useOrderInfo } from '../../hooks/useOrderInfo';

const OrderInfoModal: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();

  const { order, isLoading } = useOrderInfo(orderNumber);

  if (isLoading) {
    return <p className="text text_type_main-medium">Загрузка заказа...</p>;
  }

  if (!order) {
    return <p className="text text_type_main-medium">Заказ не найден...</p>;
  }

  return <OrderInfo order={order} />;
};

export default OrderInfoModal;