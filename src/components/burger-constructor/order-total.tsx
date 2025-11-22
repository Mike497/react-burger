import styles from './burger-constructor.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderTotalProps = {
  totalPrice: number;
  onOrderClick: () => void;
  isButtonDisabled?: boolean;
};

const OrderTotal: React.FC<TOrderTotalProps> = ({ totalPrice, onOrderClick, isButtonDisabled }) => {
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

export default OrderTotal;