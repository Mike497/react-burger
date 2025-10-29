import IngredientDetails from '../components/modal/ingredient-details';
import styles from './form.module.css';

const IngredientPage = () => {
  return (
    <div className={styles.container}>
      <h2 className="text text_type_main-large mb-15">Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  );
};

export default IngredientPage;