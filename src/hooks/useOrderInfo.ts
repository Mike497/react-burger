import { useEffect, useState } from 'react';
import { useAppSelector } from '../services/hooks';
import { getOrderRequest } from '../utils/burgers-api';
import { TOrder } from '../utils/types';

export const useOrderInfo = (number: string | undefined) => {
  const { orders: feedOrders } = useAppSelector(state => state.feed);
  const { orders: userFeedOrders } = useAppSelector(state => state.userFeed);

  const [order, setOrder] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!number) {
        setIsLoading(false);
        return;
    }

    const allOrders = [...feedOrders, ...userFeedOrders];
    
    const orderFromStore = allOrders.find(o => o.number === Number(number));

    if (orderFromStore) {
      setOrder(orderFromStore);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      getOrderRequest(number)
        .then(res => {
          if (res.success && res.orders.length > 0) {
            setOrder(res.orders[0]);
          }
        })
        .catch(err => {
          console.error("Failed to fetch order details:", err);
          setOrder(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [number, feedOrders, userFeedOrders]);

  return { order, isLoading };
};