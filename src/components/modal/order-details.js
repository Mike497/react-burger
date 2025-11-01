import { useSelector } from 'react-redux';
import styles from './modals.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../loader/loader';

const OrderDetails = () => {
  const { orderNumber, isLoading, hasError } = useSelector(state => state.order);

  return (
    <div className={`${styles.orderDetailsContainer}`}>
      {isLoading && <Loader />}
      
      {hasError && <p className="text text_type_main-medium">Не удалось создать заказ. Попробуйте снова.</p>}
      
      {!isLoading && !hasError && orderNumber && (
        <>
          <p className="text text_type_digits-large">{orderNumber}</p>
          <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
          <div className={`${styles.orderDetailsIconContainer} mt-15 mb-15`}>
            <CheckMarkIcon type="primary" />
          </div>
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </>
      )}
    </div>
  );
};

export default OrderDetails;