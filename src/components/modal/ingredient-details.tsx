import { useParams } from 'react-router-dom';
import styles from './modals.module.css';
import { useAppSelector } from '../../services/hooks';
import { TIngredient } from '../../utils/types';

const IngredientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { items } = useAppSelector(state => state.ingredients);
  const ingredientFromUrl = items.find((item: TIngredient) => item._id === id);
  const ingredientFromState = useAppSelector(state => state.details.selectedIngredient);
  const ingredient = ingredientFromUrl || ingredientFromState;

  if (!ingredient) {
    return <p className="text text_type_main-large">Ингредиент не найден...</p>;
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