import React, { useMemo, Ref } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import BurgerConstructorItem from './burger-constructor-item';
import OrderTotal from './order-total';
import styles from './burger-constructor.module.css';
import { addIngredient, removeIngredient } from '../../services/constructorSlice';
import { createOrder } from '../../services/orderSlice';
import { TIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks';

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);
  const { isLoading } = useAppSelector(state => state.order);
  const { user } = useAppSelector(state => state.auth);

  const [{ isOver }, drop] = useDrop<TIngredient, void, { isOver: boolean }>(() => ({
      accept: 'ingredient',
      drop: (item) => {
        dispatch(addIngredient(item));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      }),
  }), [dispatch]);


  const handleRemoveIngredient = (uniqueId: string) => {
    dispatch(removeIngredient(uniqueId));
  };

  const totalPrice = useMemo(() => {
    const fillingsPrice = fillings.reduce((s, i) => s + i.price, 0);
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + fillingsPrice;
  }, [bun, fillings]);

  const handleOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!bun) {
      alert("Добавьте булку!");
      return;
    }
    const ingredientIds = [
      bun._id,
      ...fillings.map(item => item._id),
      bun._id
    ];
    dispatch(createOrder(ingredientIds));
  };

  const constructorStyle = {
    borderColor: isOver ? 'lightgreen' : 'transparent',
  };

  return (
    <aside
      ref={drop as unknown as Ref<HTMLElement>}
      className={`${styles.constructorPanel} pt-25`}
      style={constructorStyle}
      data-testid="constructor-drop-area"
    >
      {bun && (
        <div className="pl-8 pr-4">
          <BurgerConstructorItem
            type="top"
            isLocked={true}
            item={bun}
            index={-1} 
          />
        </div>
      )}

      <div className={styles.fillingsScrollArea}>
        {fillings.map((ingredient, index) => (
          <BurgerConstructorItem
            key={ingredient.uniqueId}
            index={index}
            item={ingredient}
            handleClose={() => handleRemoveIngredient(ingredient.uniqueId)}
          />
        ))}
      </div>

      {bun && (
        <div className="pl-8 pr-4">
          <BurgerConstructorItem
            type="bottom"
            isLocked={true}
            item={bun}
            index={-1}
          />
        </div>
      )}
      
      <OrderTotal
        totalPrice={totalPrice}
        onOrderClick={handleOrderClick}
        isButtonDisabled={!bun || isLoading}
      />
    </aside>
  );
};

export default BurgerConstructor;