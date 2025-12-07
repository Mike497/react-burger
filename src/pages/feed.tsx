import React, { useEffect } from 'react';
import OrderCard from '../components/order-feed/order-card';
import styles from './feed.module.css';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { wsConnect, wsDisconnect } from '../services/feedSlice';
import { TOrder } from '../utils/types';

const FEED_WEBSOCKET_URL = 'wss://norma.education-services.ru/orders/all';

const FeedPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, status } = useAppSelector(state => state.feed);

  useEffect(() => {
    dispatch(wsConnect(FEED_WEBSOCKET_URL));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const doneOrders = orders.filter((o: TOrder) => o.status === 'done').slice(0, 10);
  const pendingOrders = orders.filter((o: TOrder) => o.status === 'pending').slice(0, 10);

  if (status === 'connecting' || orders.length === 0) {
      return <p className="text text_type_main-medium">Загрузка ленты заказов...</p>;
  }

  return (
    <div className={styles.feedContainer}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={styles.columns}>
        <section className={`${styles.ordersColumn} custom-scroll`}>
          {orders.map((order: TOrder) => (
            <OrderCard key={order._id} order={order} basePath="/feed" />
          ))}
        </section>
        <section className={styles.statsColumn}>
          <div className={styles.boards}>
            <div className={styles.board}>
              <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
              <ul className={styles.boardList}>
                {doneOrders.map((order: TOrder) => (
                  <li key={order._id} className={`${styles.orderNumber} ${styles.orderNumberDone} text text_type_digits-default`}>
                    {order.number}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.board}>
              <h2 className="text text_type_main-medium mb-6">В работе:</h2>
              <ul className={styles.boardList}>
                 {pendingOrders.map((order: TOrder) => (
                  <li key={order._id} className={`${styles.orderNumber} text text_type_digits-default`}>
                    {order.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-15">
            <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
            <p className={`${styles.glow} text text_type_digits-large`}>{total.toLocaleString('ru-RU')}</p>
          </div>
          <div className="mt-15">
            <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className={`${styles.glow} text text_type_digits-large`}>{totalToday}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeedPage;