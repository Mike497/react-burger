import React, { Ref } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/hooks';
import { TIngredient } from '../../utils/types';

type TIngredientCardProps = {
  item: TIngredient;
};

const IngredientCard: React.FC<TIngredientCardProps> = ({ item }) => {
  const location = useLocation();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'ingredient',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [item]);

  const { bun, fillings } = useAppSelector(state => state.burgerConstructor);

  const count = React.useMemo(() => {
    if (item.type !== 'bun') {
      return fillings.filter(filling => filling._id === item._id).length;
    }
    return bun?._id === item._id ? 2 : 0;
  }, [item, fillings, bun]);

  const opacity = isDragging ? 0.3 : 1;

  return (
    <Link
      key={item._id}
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
      className={styles.ingredientCardLink}
    >
      <article
        ref={dragRef as unknown as Ref<HTMLElement>}
        className={styles.ingredientCard}
        style={{ opacity }}
      >
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        <img
          className={styles.cardImage}
          src={item.image}
          alt={item.name}
        />
        <div className={`${styles.cardPrice} mt-1 mb-1`}>
          <span className="text text_type_digits-default m-1">
            {item.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">
          {item.name}
        </p>
      </article>
    </Link>
  );
};

export default IngredientCard;