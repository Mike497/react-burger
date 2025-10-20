import { useSelector } from 'react-redux';
import styles from './modals.module.css';

const IngredientDetails = () => {
  const ingredient = useSelector(state => state.details.selectedIngredient);

  if (!ingredient) {
    return null;
  }

  return (
    <div className={styles.ingredientDetailsContainer}>
      <img src={ingredient.image_large} alt={ingredient.name} className="mb-4" />
      <p className="text text_type_main-medium mb-8">{ingredient.name}</p>
      <div className={`${styles.ingredientDetailsNutrition} mb-5`}>
        <div className={styles.ingredientDetailsNutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div className={styles.ingredientDetailsNutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div className={styles.ingredientDetailsNutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div className={styles.ingredientDetailsNutritionItem}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;