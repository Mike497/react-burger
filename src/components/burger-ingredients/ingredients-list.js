import PropTypes from 'prop-types';
import IngredientCard from './ingredient-card';
import { ingredientPropType } from '../../utils/types.js';
import styles from './burger-ingredients.module.css';

const IngredientsList = ({ items, title, innerRef }) => {
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

IngredientsList.propTypes = {
  items: PropTypes.arrayOf(ingredientPropType).isRequired,
  title: PropTypes.string.isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default IngredientsList;