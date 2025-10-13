import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import BurgerConstructorItem from './burger-constructor-item.js';
import OrderTotal from './order-total.js';
import styles from './burger-constructor.module.css';
import { addIngredient, removeIngredient } from '../../services/constructorSlice';
import { createOrder } from '../../services/orderSlice';

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, fillings } = useSelector(state => state.burgerConstructor);
  const { isLoading } = useSelector(state => state.order);

  const [{ isOver }, dropTargetRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const handleRemoveIngredient = (uniqueId) => {
    dispatch(removeIngredient(uniqueId));
  };

  const totalPrice = React.useMemo(() => {
    const fillingsPrice = fillings.reduce((s, i) => s + i.price, 0);
    const bunPrice = bun ? bun.price * 2 : 0;
    return bunPrice + fillingsPrice;
  }, [bun, fillings]);

  const handleOrderClick = () => {
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
      ref={dropTargetRef}
      className={`${styles.constructorPanel} pt-25`}
      style={constructorStyle}
    >
      {bun && (
        <div className="pl-8 pr-4">
          <BurgerConstructorItem
            type="top"
            isLocked={true}
            item={bun} 
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