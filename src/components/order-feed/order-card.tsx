import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';
import { TIngredient, TOrder } from '../../utils/types';
import styles from './order-card.module.css';

const MAX_ICONS = 6;

type TOrderCardProps = {
  order: TOrder;
  basePath: '/feed' | '/profile/orders';
};

const OrderCard: React.FC<TOrderCardProps> = ({ order, basePath }) => {
  const location = useLocation();
  const { items: allIngredients } = useAppSelector(state => state.ingredients);

  const { orderIngredients, totalPrice, remainingCount } = useMemo(() => {
    if (!order || !Array.isArray(order.ingredients) || !allIngredients.length) {
      return { orderIngredients: [], totalPrice: 0, remainingCount: 0 };
    }
    const ingredientsInOrder = order.ingredients
      .map(id => allIngredients.find((item: TIngredient) => item._id === id))
      .filter((item): item is TIngredient => !!item);

    const price = ingredientsInOrder.reduce((sum: number, item: TIngredient) => sum + item.price, 0);
    const count = ingredientsInOrder.length > MAX_ICONS ? ingredientsInOrder.length - MAX_ICONS : 0;
    
    return {
      orderIngredients: ingredientsInOrder.slice(0, MAX_ICONS),
      totalPrice: price,
      remainingCount: count
    };
  }, [order, allIngredients]);

  const statusText = order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : 'Создан';
  const statusStyle = order.status === 'done' ? styles.statusDone : '';

  return (
    <Link to={`${basePath}/${order.number}`} state={{ background: location }} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.header}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        <h3 className="text text_type_main-medium mt-6">{order.name}</h3>
        {basePath === '/profile/orders' && (
          <p className={`${styles.status} ${statusStyle} text text_type_main-default mt-2`}>
            {statusText}
          </p>
        )}
        <div className={styles.footer}>
          <div className={styles.iconsContainer}>
            {orderIngredients.map((ingredient: TIngredient, index: number) => (
              <div key={index} className={styles.iconWrapper} style={{ zIndex: MAX_ICONS - index }}>
                <img className={styles.icon} src={ingredient.image_mobile} alt={ingredient.name} />
                {index === MAX_ICONS - 1 && remainingCount > 0 && (
                  <div className={styles.counter}>
                    <p className="text text_type_main-default">+{remainingCount}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.price}>
            <span className="text text_type_digits-default mr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default OrderCard;