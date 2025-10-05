import React from 'react';

import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructorItem = ({ type, isLocked, text, price, thumbnail }) => {
  return (
    <article>
      <span className="pr-1">
        {type !== 'top' && type !== 'bottom' ? (
          <DragIcon type="primary" />
        ) : (
          <span className="pr-6" />
        )}
      </span>
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={text}
        price={price}
        thumbnail={thumbnail}
      />
    </article>
  );
};

export default BurgerConstructorItem;