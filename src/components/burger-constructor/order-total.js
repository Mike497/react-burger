import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderTotal = ({ totalPrice, onOrderClick, isButtonDisabled }) => {
  return (
      <div className={`${styles.orderSummary} mt-10 pr-4`}>
        <div className={styles.totalPrice}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={onOrderClick}
          disabled={isButtonDisabled}
        >
          Оформить заказ
        </Button>
      </div>
  );
};

OrderTotal.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  onOrderClick: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool,
};

export default OrderTotal;