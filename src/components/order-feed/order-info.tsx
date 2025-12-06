import React, { useMemo } from 'react';
import { useAppSelector } from '../../services/hooks';
import { TIngredient } from '../../utils/types';
import { TOrder } from '../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-feed.module.css';

type TOrderInfoProps = {
  order: TOrder;
};

const OrderInfo: React.FC<TOrderInfoProps> = ({ order }) => {
  const { items: allIngredients } = useAppSelector(state => state.ingredients);

  const { orderIngredients, totalPrice } = useMemo(() => {
    if (!order || !Array.isArray(order.ingredients) || !allIngredients.length) {
      return { orderIngredients: [], totalPrice: 0 };
    }

    const ingredientsInOrder = order.ingredients.map(id => 
      allIngredients.find((item: TIngredient) => item._id === id)
    ).filter((item): item is TIngredient => !!item);

    const price = ingredientsInOrder.reduce((sum, item) => sum + item.price, 0);

    return {
      orderIngredients: ingredientsInOrder,
      totalPrice: price,
    };
  }, [order, allIngredients]);

  const ingredientCounts = useMemo(() => {
    return orderIngredients.reduce((acc: Record<string, { item: TIngredient, count: number }>, item) => {
      if (!acc[item._id]) {
        acc[item._id] = { item: item, count: 0 };
      }
      acc[item._id].count++;
      return acc;
    }, {});
  }, [orderIngredients]);

  const statusText = order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : 'Создан';
  const statusStyle = order.status === 'done' ? styles.statusDone : '';

  return (
    <div className={styles.orderInfoContainer}>
      <p className="text text_type_digits-default mb-10">#{order.number}</p>
      <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
      <p className={`${styles.status} ${statusStyle} text text_type_main-default mb-15`}>
        {statusText}
      </p>
      <h3 className="text text_type_main-medium mb-6">Состав:</h3>
      <ul className={`${styles.ingredientsList} custom-scroll`}>
        {Object.values(ingredientCounts).map(({ item, count }) => (
          <li key={item._id} className={styles.ingredientItem}>
            <div className={styles.ingredientIconName}>
              <div className={styles.iconBorder}>
                <img src={item.image_mobile} alt={item.name} className={styles.ingredientIcon} />
              </div>
              <p className="text text_type_main-default ml-4">{item.name}</p>
            </div>
            <div className={styles.priceContainer}>
              <span className="text text_type_digits-default">{count} x {item.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.footer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
        <div className={styles.priceContainer}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;