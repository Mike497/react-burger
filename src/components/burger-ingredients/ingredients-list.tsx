import React from 'react';
import IngredientCard from './ingredient-card';
import { TIngredient } from '../../utils/types';
import styles from './burger-ingredients.module.css';

type TIngredientsListProps = {
  items: TIngredient[];
  title: string;
  innerRef: React.Ref<HTMLParagraphElement>;
};

const IngredientsList: React.FC<TIngredientsListProps> = ({ items, title, innerRef }) => {
  return (
    <>
      <p className="text text_type_main-medium pt-10" ref={innerRef}>
        {title}
      </p>
      <div className={styles.itemsGrid}>
        {items.map((it) => (
          <IngredientCard item={it} key={it._id} />
        ))}
      </div>
    </>
  );
};

export default IngredientsList;